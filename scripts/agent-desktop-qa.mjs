import fs from "node:fs/promises";
import { openBrowser } from "@remotion/renderer";

// Studio-only QA, adapted from kronos-qa.mjs. Never bundles or renders.
const composition = "AgentDesktop006";
const url = `http://localhost:3000/${composition}`;
const outputDir = ".preview/agent-desktop";
const captions = JSON.parse(
  await fs.readFile("src/episodes/agent-desktop/data/subtitles.json", "utf8"),
);
const timing = JSON.parse(
  await fs.readFile("src/episodes/agent-desktop/data/timing.json", "utf8"),
);
const fps = 30;
const lastFrame = Math.ceil(timing.audioSeconds * fps) - 1;
const referenceFrames = [
  145, 169, 300, 430, 702, 870, 907, 975, 1050, 1110, 1250, 1415,
];
const keyframes = Array.from({ length: 50 }, (_, i) =>
  Math.round((i * lastFrame) / 49),
);
const subtitleBoundaries = [
  ...new Set(captions.flatMap((c) => [c.startMs, c.endMs])),
].map((ms) => ({
  ms,
  firstFrameAtOrAfter: Math.ceil((ms * fps) / 1000),
  frames: [-1, 0, 1]
    .map((d) => Math.ceil((ms * fps) / 1000) + d)
    .filter((f) => f >= 0 && f <= lastFrame),
}));
const animationFrames = Object.entries(timing)
  .filter(([name]) => name !== "audioSeconds")
  .flatMap(([, seconds]) =>
    [-1, 0, 1, 5, 12].map((d) => Math.round(seconds * fps) + d),
  );
const frames = [
  ...new Set([
    ...keyframes,
    ...referenceFrames,
    ...subtitleBoundaries.flatMap((b) => b.frames),
    ...animationFrames,
  ]),
]
  .filter((f) => f >= 0 && f <= lastFrame)
  .sort((a, b) => a - b);
await fs.mkdir(`${outputDir}/studio`, { recursive: true });
const browserLogs = [];
const runtimeErrors = [];
const networkErrors = [];
const fontRequests = [];
const browser = await openBrowser("chrome", {
  browserExecutable:
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  logLevel: "error",
});
let report;
try {
  const page = await browser.newPage({
    context: () => null,
    logLevel: "error",
    indent: false,
    pageIndex: 0,
    onBrowserLog: (log) => browserLogs.push(log),
    onLog: () => {},
  });
  page.on("error", (error) => runtimeErrors.push({ message: error.message }));
  const client = page._client();
  client.on("Runtime.exceptionThrown", ({ exceptionDetails }) => {
    runtimeErrors.push({
      message: exceptionDetails.exception?.description ?? exceptionDetails.text,
      url: exceptionDetails.url,
      lineNumber: exceptionDetails.lineNumber,
    });
  });
  client.on("Network.responseReceived", ({ response, type }) => {
    if (type === "Font" || /\.woff2?(?:\?|$)/.test(response.url))
      fontRequests.push({
        url: response.url,
        status: response.status,
        mimeType: response.mimeType,
      });
    if (response.status >= 400)
      networkErrors.push({ url: response.url, status: response.status, type });
  });
  client.on("Network.loadingFailed", (event) => {
    if (!event.canceled)
      networkErrors.push({ type: event.type, message: event.errorText });
  });
  await client.send("Network.enable");
  await page.setViewport({ width: 1600, height: 1500, deviceScaleFactor: 1 });
  await page.goto({ url, timeout: 60000 });
  report = await page.evaluate(
    async (input) => {
      const raf = () => new Promise(requestAnimationFrame);
      for (
        let i = 0;
        i < 1800 && !document.querySelector('[data-subtitle="stable"]');
        i++
      )
        await raf();
      if (!document.querySelector('[data-subtitle="stable"]'))
        throw new Error("AgentDesktop006 did not mount in Studio.");
      await document.fonts.ready;
      const originalSubtitle = document.querySelector(
        '[data-subtitle="stable"]',
      );
      const originalCharacter = document.querySelector("[data-character-pose]");
      let subtitleAnchor;
      let characterAnchor;
      const epsilon = 0.75;
      const almost = (a, b) => Math.abs(a - b) <= epsilon;
      const sameBox = (a, b) => Object.keys(a).every((k) => almost(a[k], b[k]));
      const plainRect = (r) => ({
        left: r.left,
        top: r.top,
        right: r.right,
        bottom: r.bottom,
      });
      const intersect = (a, b) => ({
        left: Math.max(a.left, b.left),
        top: Math.max(a.top, b.top),
        right: Math.min(a.right, b.right),
        bottom: Math.min(a.bottom, b.bottom),
      });
      // Account for premounts, opacity on any ancestor, and headline reveal masks.
      // Do not clip to the canvas here: real canvas overflow must remain detectable.
      const visibleRect = (node, rect) => {
        let result = plainRect(rect);
        let opacity = 1;
        for (let el = node; el; el = el.parentElement) {
          const style = getComputedStyle(el);
          if (
            style.display === "none" ||
            style.visibility === "hidden" ||
            style.visibility === "collapse"
          )
            return null;
          opacity *= Number(style.opacity);
          if (opacity <= 0.01) return null;
          const clip = el.getBoundingClientRect();
          if (el !== node && /hidden|clip|scroll|auto/.test(style.overflowX)) {
            result.left = Math.max(result.left, clip.left);
            result.right = Math.min(result.right, clip.right);
          }
          if (el !== node && /hidden|clip|scroll|auto/.test(style.overflowY)) {
            result.top = Math.max(result.top, clip.top);
            result.bottom = Math.min(result.bottom, clip.bottom);
          }
          if (el.hasAttribute("data-ad-design")) break;
        }
        return result.right - result.left > 0.5 &&
          result.bottom - result.top > 0.5
          ? result
          : null;
      };
      const active = (el) => {
        if (!el.getClientRects().length) return false;
        for (let p = el.parentElement; p; p = p.parentElement) {
          const s = getComputedStyle(p);
          if (
            s.display === "none" ||
            s.visibility === "hidden" ||
            Number(s.opacity) <= 0.01
          )
            return false;
          if (p.hasAttribute("data-ad-design")) break;
        }
        return true;
      };
      const checks = [];
      for (const frame of input.frames) {
        window.remotion_setFrame(frame, input.composition, 0);
        let acknowledged = false;
        for (let i = 0; i < 180; i++) {
          await raf();
          if (
            document.querySelector("[data-ad-frame]")?.dataset.adFrame ===
            String(frame)
          ) {
            acknowledged = true;
            break;
          }
        }
        await raf();
        const design = document.querySelector("[data-ad-design]");
        const root = design.getBoundingClientRect();
        const scale = root.width / 1080;
        const norm = (r) => ({
          left: (r.left - root.left) / scale,
          top: (r.top - root.top) / scale,
          right: (r.right - root.left) / scale,
          bottom: (r.bottom - root.top) / scale,
        });
        const subtitle = document.querySelector('[data-subtitle="stable"]');
        const subtitleBox = norm(subtitle.getBoundingClientRect());
        subtitleAnchor ??= subtitleBox;
        const subtitleRange = document.createRange();
        subtitleRange.selectNodeContents(subtitle);
        const subtitleRects = [...subtitleRange.getClientRects()]
          .filter((r) => r.width > 0)
          .map(norm);
        const character = document.querySelector("[data-character-pose]");
        const characterBox = norm(character.getBoundingClientRect());
        characterAnchor ??= characterBox;
        const image = character.querySelector("img");
        if (image && !image.complete) await image.decode();
        const heading = [...design.querySelectorAll("[data-ad-heading]")].find(
          active,
        );
        const stage = [...design.querySelectorAll("[data-ad-stage]")].find(
          active,
        );
        const headingBox = heading
          ? norm(heading.getBoundingClientRect())
          : null;
        const stageBox = stage ? norm(stage.getBoundingClientRect()) : null;
        const stageStyle = stage && getComputedStyle(stage);
        const textEntries = [];
        const walker = document.createTreeWalker(design, NodeFilter.SHOW_TEXT);
        while (walker.nextNode()) {
          const node = walker.currentNode;
          if (
            !node.textContent.trim() ||
            node.parentElement.closest("script, style")
          )
            continue;
          const range = document.createRange();
          range.selectNodeContents(node);
          const rects = [...range.getClientRects()]
            .map((r) => visibleRect(node.parentElement, r))
            .filter(Boolean)
            .map(norm);
          if (!rects.length) continue;
          const ui = node.parentElement.closest("[data-ad-ui]");
          const textAttribute = node.parentElement.closest("[data-ad-text]");
          textEntries.push({
            text: node.textContent.trim(),
            rects,
            tagged: Boolean(textAttribute),
            heading: Boolean(node.parentElement.closest("[data-ad-heading]")),
            ui: ui
              ? [...design.querySelectorAll("[data-ad-ui]")].indexOf(ui)
              : null,
            element: node.parentElement,
          });
        }
        const unsafeText = textEntries.flatMap(
          ({ text, rects, tagged, heading: inHeading }) => {
            const outside = rects.filter(
              (r) =>
                r.left < 84 - epsilon ||
                r.right > 996 + epsilon ||
                r.top < -epsilon ||
                r.bottom > 1920 + epsilon,
            );
            return outside.length
              ? [{ text, rects: outside, tagged, heading: inHeading }]
              : [];
          },
        );
        const uiOverlaps = [];
        for (let i = 0; i < textEntries.length; i++) {
          const a = textEntries[i];
          if (a.ui === null) continue;
          for (let j = i + 1; j < textEntries.length; j++) {
            const b = textEntries[j];
            if (b.ui !== a.ui) continue;
            for (const ra of a.rects)
              for (const rb of b.rects) {
                const overlap = intersect(ra, rb);
                if (
                  overlap.right - overlap.left > 1 &&
                  overlap.bottom - overlap.top > 2
                )
                  uiOverlaps.push({
                    textA: a.text,
                    textB: b.text,
                    overlap,
                    ui: a.ui,
                  });
              }
          }
        }
        const stageTextOverflow = textEntries.flatMap(
          ({ text, rects, heading: inHeading }) =>
            !inHeading && rects.some((r) => r.bottom > 1380 + epsilon)
              ? [{ text, rects }]
              : [],
        );
        const headingText = textEntries.filter((entry) => entry.heading);
        const fontFamilies = [
          ...new Set(
            textEntries.map((e) => getComputedStyle(e.element).fontFamily),
          ),
        ];
        const expectedSubtitle =
          input.captions.find(
            (c) =>
              (frame * 1000) / 30 >= c.startMs && (frame * 1000) / 30 < c.endMs,
          )?.text ?? "";
        const watermark = document.querySelector(
          "[data-full-canvas-watermark]",
        );
        const ss = getComputedStyle(subtitle);
        checks.push({
          frame,
          acknowledged,
          scale,
          sameSubtitleNode: subtitle === originalSubtitle,
          subtitleNodeCount: document.querySelectorAll(
            '[data-subtitle="stable"]',
          ).length,
          subtitleStationary: sameBox(subtitleBox, subtitleAnchor),
          subtitleFixed: sameBox(subtitleBox, {
            left: 84,
            right: 634,
            top: 1570,
            bottom: 1705,
          }),
          subtitleVisible:
            ss.opacity === "1" &&
            ss.visibility === "visible" &&
            ss.display !== "none",
          subtitle: subtitle.textContent,
          expectedSubtitle,
          subtitleMatchesCue:
            subtitle.textContent === expectedSubtitle &&
            Boolean(expectedSubtitle),
          subtitleLines: new Set(subtitleRects.map((r) => Math.round(r.top)))
            .size,
          subtitleFits: subtitleRects.every(
            (r) =>
              r.left >= subtitleBox.left - epsilon &&
              r.right <= subtitleBox.right + epsilon &&
              r.top >= subtitleBox.top - epsilon &&
              r.bottom <= subtitleBox.bottom + epsilon,
          ),
          subtitleBox,
          character: {
            sameNode: character === originalCharacter,
            nodeCount: document.querySelectorAll("[data-character-pose]")
              .length,
            stationary: sameBox(characterBox, characterAnchor),
            fixed:
              almost(characterBox.right - characterBox.left, 320) &&
              almost(characterBox.right, 996) &&
              almost(characterBox.bottom, 1740),
            pose: character.dataset.characterPose,
            box: characterBox,
            imageLoaded: Boolean(image?.complete && image?.naturalWidth),
            clearsSubtitles: characterBox.left >= subtitleBox.right,
            clearsStage: Boolean(
              stageBox && characterBox.top > stageBox.bottom,
            ),
          },
          fullCanvas: almost(root.height / scale, 1920),
          headingBox,
          stageBox,
          fullCanvasLayout: Boolean(
            headingBox &&
            stageBox &&
            almost(headingBox.left, 84) &&
            almost(headingBox.right, 996) &&
            almost(headingBox.top, 240) &&
            almost(stageBox.left, 84) &&
            almost(stageBox.right, 996) &&
            almost(stageBox.top, 720) &&
            almost(stageBox.bottom, 1380),
          ),
          headingClearsContent: Boolean(
            headingBox &&
            headingBox.bottom <= 696 &&
            headingText.every((e) => e.rects.every((r) => r.bottom <= 696)),
          ),
          cardlessStage: Boolean(
            stageStyle &&
            stageStyle.backgroundColor === "rgba(0, 0, 0, 0)" &&
            stageStyle.borderTopWidth === "0px" &&
            stageStyle.borderRadius === "0px" &&
            stageStyle.boxShadow === "none" &&
            stageStyle.padding === "0px",
          ),
          watermarkCorrect: Boolean(
            watermark &&
            watermark.textContent === "@prof.deps" &&
            !watermark.querySelector("img, svg") &&
            almost(norm(watermark.getBoundingClientRect()).right, 996) &&
            almost(norm(watermark.getBoundingClientRect()).top, 108),
          ),
          fontFamilies,
          allTextUsesLocalFamily: fontFamilies.every((family) =>
            family.includes("Plus Jakarta Sans"),
          ),
          visibleTextCount: textEntries.length,
          taggedTextCount: textEntries.filter((e) => e.tagged).length,
          unsafeText,
          stageTextOverflow,
          uiOverlaps,
          uiGeometry: [...design.querySelectorAll("[data-ad-ui]")]
            .filter((el) => visibleRect(el, el.getBoundingClientRect()))
            .map((el) => ({
              box: norm(el.getBoundingClientRect()),
              text: el.textContent,
            })),
        });
      }
      return {
        checks,
        fonts: [...document.fonts].map((font) => ({
          family: font.family,
          status: font.status,
          weight: font.weight,
        })),
        fontAvailable:
          document.fonts.check('800 96px "Plus Jakarta Sans"') &&
          document.fonts.check('600 36px "Plus Jakarta Sans"'),
        fontResources: performance
          .getEntriesByType("resource")
          .filter((r) => /\.woff2?(?:\?|$)/.test(r.name))
          .map((r) => ({ url: r.name, duration: r.duration })),
        safeZonePresent: Boolean(
          document.querySelector(
            '[data-tiktok-safe-zone], [data-safe-zone], img[src*="safe-zone"], img[src*="safezone"]',
          ),
        ),
        studioErrorText: [...document.querySelectorAll("body *")]
          .filter(
            (el) =>
              el.childElementCount === 0 &&
              /Error loading composition|Could not render|delayRender\(\).*timeout/i.test(
                el.textContent,
              ),
          )
          .map((el) => el.textContent),
        documentTitle: document.title,
      };
    },
    { frames, composition, captions },
  );

  const screenshots = [];
  const screenshotFrames = [
    ...new Set([
      ...referenceFrames,
      ...report.checks
        .filter((c) => c.unsafeText.length || c.uiOverlaps.length)
        .map((c) => c.frame),
    ]),
  ].sort((a, b) => a - b);
  for (const frame of screenshotFrames) {
    await page.evaluate(
      async (f, id) => {
        window.remotion_setFrame(f, id, 0);
        for (let i = 0; i < 180; i++) {
          await new Promise(requestAnimationFrame);
          if (
            document.querySelector("[data-ad-frame]")?.dataset.adFrame ===
            String(f)
          )
            break;
        }
        await new Promise(requestAnimationFrame);
      },
      frame,
      composition,
    );
    const capture = await client.send("Page.captureScreenshot", {
      format: "png",
    });
    const path = `${outputDir}/studio/frame-${frame}.png`;
    await fs.writeFile(path, Buffer.from(capture.value.data, "base64"));
    screenshots.push({ frame, path });
  }
  const failures = report.checks.flatMap((check) => {
    const reasons = [];
    for (const key of [
      "acknowledged",
      "sameSubtitleNode",
      "subtitleStationary",
      "subtitleFixed",
      "subtitleVisible",
      "subtitleMatchesCue",
      "subtitleFits",
      "fullCanvas",
      "fullCanvasLayout",
      "headingClearsContent",
      "cardlessStage",
      "watermarkCorrect",
      "allTextUsesLocalFamily",
    ])
      if (!check[key]) reasons.push(key);
    if (check.subtitleNodeCount !== 1) reasons.push("subtitleNodeCount");
    if (check.subtitleLines > 2) reasons.push("subtitleMax2Lines");
    for (const key of [
      "sameNode",
      "stationary",
      "fixed",
      "imageLoaded",
      "clearsSubtitles",
      "clearsStage",
    ])
      if (!check.character[key]) reasons.push(`character.${key}`);
    if (check.character.nodeCount !== 1) reasons.push("character.nodeCount");
    if (check.unsafeText.length) reasons.push("textOutsideEditorialBounds");
    if (check.stageTextOverflow.length) reasons.push("stageTextBelow1380");
    return reasons.length ? [{ frame: check.frame, reasons }] : [];
  });
  const concerns = report.checks
    .filter((c) => c.uiOverlaps.length)
    .map((c) => ({ frame: c.frame, uiOverlaps: c.uiOverlaps }));
  const consoleErrors = browserLogs.filter((log) => log.type === "error");
  const fontLoadedLocally =
    report.fonts.some(
      (f) =>
        f.family.replaceAll('"', "").replaceAll("'", "") ===
          "Plus Jakarta Sans" && f.status === "loaded",
    ) &&
    fontRequests.some(
      (r) =>
        r.status === 200 &&
        new URL(r.url).origin === "http://localhost:3000" &&
        r.url.includes("plus-jakarta-sans"),
    );
  const globalFailures = [
    ...(!report.fontAvailable || !fontLoadedLocally
      ? ["localFontNotLoaded"]
      : []),
    ...(report.safeZonePresent ? ["safeZonePresent"] : []),
    ...(consoleErrors.length ? ["consoleErrors"] : []),
    ...(runtimeErrors.length ? ["runtimeErrors"] : []),
    ...(networkErrors.length ? ["networkErrors"] : []),
    ...(report.studioErrorText.length ? ["studioErrorOverlay"] : []),
  ];
  const result = {
    url,
    composition,
    checkedAt: new Date().toISOString(),
    lastFrame,
    keyframes,
    referenceFrames,
    subtitleBoundaries,
    sampling: {
      keyframeCount: keyframes.length,
      checkedFrames: frames.length,
      subtitleBoundaryCount: subtitleBoundaries.length,
      animationFrames,
    },
    methodology:
      "Studio seeks via remotion_setFrame and data-ad-frame; normalized data-ad-design coordinates; text ranges filtered by ancestor opacity and overflow masks. UI intersections are geometric concerns, not pixel-perfect occlusion proofs. Final audio end boundary is outside the composition and is clamped to the last valid frame. Screenshots capture Studio, not rendered exports.",
    ...report,
    fontLoadedLocally,
    fontRequests,
    browserLogs,
    consoleErrors,
    runtimeErrors,
    networkErrors,
    failures,
    globalFailures,
    concerns,
    screenshots,
  };
  await fs.writeFile(
    `${outputDir}/studio-qa.json`,
    JSON.stringify(result, null, 2),
  );
  console.log(
    JSON.stringify(
      {
        script: "scripts/agent-desktop-qa.mjs",
        report: `${outputDir}/studio-qa.json`,
        checkedFrames: frames.length,
        subtitleBoundaries: subtitleBoundaries.length,
        failures,
        globalFailures,
        uiConcernFrames: concerns.map((c) => c.frame),
        consoleErrors,
        runtimeErrors,
        networkErrors,
        fontLoadedLocally,
        screenshots: screenshots.length,
      },
      null,
      2,
    ),
  );
  if (failures.length || globalFailures.length || concerns.length)
    process.exitCode = 1;
} catch (error) {
  await fs.writeFile(
    `${outputDir}/studio-qa.json`,
    JSON.stringify(
      {
        url,
        composition,
        fatalError: error.stack ?? String(error),
        browserLogs,
        runtimeErrors,
        networkErrors,
        fontRequests,
        ...(report ?? {}),
      },
      null,
      2,
    ),
  );
  throw error;
} finally {
  await browser.close({ silent: true });
}

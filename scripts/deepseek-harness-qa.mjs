import fs from "node:fs/promises";
import { createHash } from "node:crypto";
import { openBrowser } from "@remotion/renderer";

// Live Studio inspection only: no bundling, renderStill, or video export.
const id = "DeepSeekHarness011";
const url = `http://localhost:3000/${id}`;
const output = ".preview/deepseek-harness";
const manifest = JSON.parse(
  await fs.readFile("src/episodes/deepseek-harness/data/timing.json", "utf8"),
);
const captions = JSON.parse(
  await fs.readFile(
    "src/episodes/deepseek-harness/data/subtitles.json",
    "utf8",
  ),
);
const fps = manifest.fps ?? 30;
const durationFrames = Math.ceil(manifest.audio.durationSeconds * fps);
const finalFrame = durationFrames - 1;
const uniqueFrames = (values) =>
  [...new Set(values)]
    .filter((f) => Number.isInteger(f) && f >= 0 && f <= finalFrame)
    .sort((a, b) => a - b);
const around = (frame) => [-1, 0, 1].map((offset) => frame + offset);
const midpoints = manifest.scenes.map((s) =>
  Math.floor((s.startFrame + s.endFrameExclusive - 1) / 2),
);
const explanationShots = manifest.explanationShots ?? [];
const captures = uniqueFrames([
  0,
  6,
  ...midpoints,
  ...explanationShots.map((s) =>
    Math.round(((s.startSeconds + s.endSeconds) * fps) / 2),
  ),
  ...manifest.cues.map((c) => Math.round(c.seconds * fps) + 6),
  finalFrame,
]);
const frames = uniqueFrames([
  ...captures,
  ...Array.from({ length: 60 }, (_, i) => Math.round((i * finalFrame) / 59)),
  ...manifest.scenes.flatMap((s) => [
    ...around(s.startFrame),
    ...around(s.endFrameExclusive),
  ]),
  ...captions.flatMap((c) => [
    ...around(Math.ceil((c.startMs * fps) / 1000)),
    ...around(Math.ceil((c.endMs * fps) / 1000)),
  ]),
  ...manifest.cues.flatMap((c) => around(Math.round(c.seconds * fps))),
  ...explanationShots.flatMap((s) => [
    ...around(Math.round(s.startSeconds * fps)),
    ...around(Math.round(s.endSeconds * fps)),
  ]),
]);
const errors = [];
const checks = [];
const screenshots = [];
const report = {
  composition: id,
  url,
  fps,
  durationFrames,
  finalFrame,
  sceneMidpoints: midpoints,
  requestedFrames: frames,
  checks,
  screenshots,
  errors,
  failures: [],
};
await fs.mkdir(`${output}/studio`, { recursive: true });
let browser;
try {
  if (fps !== 30 || !Number.isFinite(durationFrames) || durationFrames <= 0)
    throw new Error("Expected a positive-duration 30fps episode");
  const audioFile = `public/${manifest.audio.path.replace(/^\/+/, "")}`;
  const hash = async () =>
    createHash("sha256")
      .update(await fs.readFile(audioFile))
      .digest("hex");
  report.audioHashBefore = await hash();
  if (report.audioHashBefore !== manifest.audio.sha256)
    errors.push("Original recording fingerprint differs from timing.json");
  if (manifest.scenes.length !== 6) errors.push("Expected six scene midpoints");
  if (
    manifest.scenes[0]?.startFrame !== 0 ||
    manifest.scenes.at(-1)?.endFrameExclusive !== durationFrames ||
    manifest.scenes.some(
      (s, i) =>
        !Number.isInteger(s.startFrame) ||
        !Number.isInteger(s.endFrameExclusive) ||
        s.endFrameExclusive <= s.startFrame ||
        !Number.isFinite(s.startSeconds) ||
        !Number.isFinite(s.endSeconds) ||
        s.endSeconds <= s.startSeconds ||
        Math.abs(s.startFrame - s.startSeconds * fps) > 1 ||
        Math.abs(s.endFrameExclusive - s.endSeconds * fps) > 1 ||
        (i > 0 &&
          (s.startFrame !== manifest.scenes[i - 1].endFrameExclusive ||
            Math.abs(s.startSeconds - manifest.scenes[i - 1].endSeconds) >
              0.001)),
    )
  )
    errors.push("Scenes must be adjacent and cover the complete recording");
  if (
    manifest.audio.durationSeconds * fps >
      manifest.scenes.at(-1)?.endFrameExclusive ||
    (manifest.audio.durationFrames !== undefined &&
      manifest.audio.durationFrames !== durationFrames) ||
    (manifest.audio.playbackRate !== undefined &&
      manifest.audio.playbackRate !== 1)
  )
    errors.push("Recording does not fit the declared frame duration at rate 1");
  if (
    !captions.length ||
    captions.some(
      (c, i) =>
        typeof c.text !== "string" ||
        !c.text.trim() ||
        !Number.isFinite(c.startMs) ||
        !Number.isFinite(c.endMs) ||
        c.startMs < 0 ||
        c.endMs <= c.startMs ||
        c.endMs > manifest.audio.durationSeconds * 1000 + 1 ||
        (i > 0 && c.startMs < captions[i - 1].endMs),
    )
  )
    errors.push("Invalid, overlapping, or out-of-recording captions");

  browser = await openBrowser("chrome", {
    browserExecutable:
      process.env.CHROME_PATH ??
      "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    logLevel: "error",
  });
  const page = await browser.newPage({
    context: () => null,
    logLevel: "error",
    indent: false,
    pageIndex: 0,
    onBrowserLog: () => {},
    onLog: () => {},
  });
  const client = page._client();
  client.on("Runtime.exceptionThrown", ({ exceptionDetails: e }) =>
    errors.push(`Runtime: ${e.exception?.description ?? e.text}`),
  );
  client.on("Runtime.consoleAPICalled", ({ type, args }) => {
    if (type === "error")
      errors.push(
        `Console: ${args.map((a) => a.value ?? a.description ?? a.type).join(" ")}`,
      );
  });
  await client.send("Runtime.enable");
  await page.setViewport({ width: 1800, height: 1600, deviceScaleFactor: 1 });
  await page.goto({ url, timeout: 60000 });
  report.studio = await page.evaluate(
    async ({ id, audioPath }) => {
      // Poll real readiness on animation frames; timers are watchdogs, not sleeps.
      const wait = (predicate, label, timeout = 30000) =>
        new Promise((resolve, reject) => {
          let handle;
          const timer = setTimeout(() => {
            cancelAnimationFrame(handle);
            reject(new Error(`Timed out: ${label}`));
          }, timeout);
          const poll = () => {
            try {
              if (predicate()) {
                clearTimeout(timer);
                resolve();
              } else handle = requestAnimationFrame(poll);
            } catch (error) {
              clearTimeout(timer);
              reject(error);
            }
          };
          poll();
        });
      const audio = () =>
        [...document.querySelectorAll("audio")].find((a) => {
          const path = decodeURIComponent(
            new URL(a.currentSrc || a.src, location.href).pathname,
          );
          return path.endsWith(`/${audioPath.replace(/^\/+/, "")}`);
        });
      const fontReady = () =>
        [...document.fonts].some(
          (f) =>
            f.family.replaceAll('"', "") === "Plus Jakarta Sans" &&
            f.status === "loaded",
        ) &&
        document.fonts.check('800 100px "Plus Jakarta Sans"') &&
        document.fonts.check('600 36px "Plus Jakarta Sans"');
      const imagesReady = () => {
        const images = [
          ...document.querySelectorAll("[data-full-canvas-overlays] img"),
        ];
        return (
          images.length > 0 &&
          images.every((img) => img.complete && img.naturalWidth > 0)
        );
      };
      await wait(
        () =>
          window.remotion_setFrame &&
          document.querySelector("[data-deepseek-design]") &&
          document.querySelector("[data-episode-frame]") &&
          document.querySelector('[data-subtitle="stable"]') &&
          document.querySelector("[data-character-pose]"),
        "composition mount",
      );
      await wait(
        () => fontReady() && imagesReady() && audio()?.readyState >= 1,
        "local font, character image, and narration metadata",
      );
      const persistent = document.querySelector('[data-subtitle="stable"]');
      const character = document.querySelector("[data-character-pose]");
      // Retain element references in this page, not serialized copies in Node.
      window.__deepseekHarnessQA = {
        persistent,
        character,
        audio,
        fontReady,
        seek: async (frame) => {
          window.remotion_setFrame(frame, id, 0);
          await wait(
            () =>
              document.querySelector("[data-episode-frame]")?.dataset
                .episodeFrame === String(frame),
            `seek frame ${frame}`,
            10000,
          );
          let painted = false;
          requestAnimationFrame(() =>
            requestAnimationFrame(() => {
              painted = true;
            }),
          );
          await wait(
            () => painted && imagesReady(),
            `paint frame ${frame}`,
            10000,
          );
        },
      };
      return {
        documentTitle: document.title,
        pathname: location.pathname,
        titleMatches: document.title.includes(id),
        routeMatches: location.pathname === `/${id}`,
        fontResources: performance
          .getEntriesByType("resource")
          .filter((r) => /\/assets\/fonts\/.*\.woff2(?:\?|$)/.test(r.name))
          .map((r) => r.name),
      };
    },
    { id, audioPath: manifest.audio.path },
  );
  if (!report.studio.titleMatches || !report.studio.routeMatches)
    errors.push("Studio document title/route does not identify the episode");
  if (!report.studio.fontResources.length)
    errors.push("No locally loaded font resource was observed");

  checks.push(
    ...(await page.evaluate(
      async ({ frames, captions, fps, expectedDuration, explanationShots }) => {
        const qa = window.__deepseekHarnessQA;
        const results = [];
        let baselineCharacter;
        for (const frame of frames) {
          await qa.seek(frame);
          const root = document
            .querySelector("[data-deepseek-design]")
            .getBoundingClientRect();
          const scale = root.width / 1080;
          const norm = (r) => ({
            left: (r.left - root.left) / scale,
            right: (r.right - root.left) / scale,
            top: (r.top - root.top) / scale,
            bottom: (r.bottom - root.top) / scale,
          });
          const visible = (el) =>
            el.checkVisibility({
              checkVisibilityCSS: true,
              checkOpacity: true,
            }) && el.getBoundingClientRect().width > 0;
          const textRects = (el) => {
            // Text-node ranges avoid counting nested block/inline wrapper rectangles.
            const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
            const rects = [];
            for (let node = walker.nextNode(); node; node = walker.nextNode()) {
              if (!node.textContent.trim()) continue;
              const range = document.createRange();
              range.selectNodeContents(node);
              rects.push(
                ...[...range.getClientRects()]
                  .filter((r) => r.width > 0)
                  .map(norm),
              );
            }
            return rects;
          };
          const sub = document.querySelector('[data-subtitle="stable"]');
          const character = document.querySelector("[data-character-pose]");
          const sb = norm(sub.getBoundingClientRect());
          const cb = norm(character.getBoundingClientRect());
          baselineCharacter ??= cb;
          const rects = textRects(sub);
          const expected =
            captions.find(
              (c) =>
                (frame * 1000) / fps >= c.startMs &&
                (frame * 1000) / fps < c.endMs,
            )?.text ?? "";
          const headlines = [
            ...document.querySelectorAll("[data-harness-headline]"),
          ].filter(visible);
          const headlineRects = headlines.flatMap(textRects);
          const audio = qa.audio();
          const subStyle = getComputedStyle(sub);
          const characterStyle = getComputedStyle(character);
          const watermark = document.querySelector(
            "[data-full-canvas-watermark]",
          );
          const explanation = explanationShots.find(
            (s) =>
              frame >= Math.round(s.startSeconds * fps) &&
              frame < Math.round(s.endSeconds * fps),
          );
          const soloSystems = [
            ...document.querySelectorAll("[data-single-system]"),
          ].filter(visible);
          results.push({
            frame,
            oneSystemAtATime:
              !explanation ||
              (soloSystems.length === 1 &&
                soloSystems[0].dataset.singleSystem === explanation.system &&
                [
                  ...document.querySelectorAll(
                    "[data-harness-content] svg[role='img']",
                  ),
                ].filter(visible).length === 1),
            episodeFrame: document.querySelector("[data-episode-frame]")
              ?.dataset.episodeFrame,
            frameMatches:
              document.querySelector("[data-episode-frame]")?.dataset
                .episodeFrame === String(frame),
            designCount: document.querySelectorAll("[data-deepseek-design]")
              .length,
            persistent:
              sub === qa.persistent &&
              character === qa.character &&
              document.querySelectorAll('[data-subtitle="stable"]').length ===
                1,
            captionText: sub.textContent,
            expectedCaption: expected,
            captionMatches: sub.textContent === expected,
            lines: new Set(rects.map((r) => Math.round(r.top))).size,
            captionFits: rects.every(
              (r) =>
                r.left >= 83.5 &&
                r.right <= 634.5 &&
                r.top >= 1569.5 &&
                r.bottom <= 1705.5,
            ),
            subtitleStable:
              visible(sub) &&
              Number(subStyle.opacity) === 1 &&
              Math.abs(sb.left - 84) < 0.5 &&
              Math.abs(sb.right - 634) < 0.5 &&
              Math.abs(sb.top - 1570) < 0.5 &&
              Math.abs(sb.bottom - 1705) < 0.5 &&
              subStyle.transform === "none" &&
              subStyle.translate === "none",
            anchors:
              Math.abs(cb.right - 996) < 0.5 &&
              Math.abs(cb.bottom - 1740) < 0.5 &&
              Math.abs(cb.right - cb.left - 320) < 0.5,
            characterStationary:
              Object.keys(cb).every(
                (key) => Math.abs(cb[key] - baselineCharacter[key]) < 0.5,
              ) &&
              characterStyle.transform === "none" &&
              characterStyle.translate === "none" &&
              characterStyle.rotate === "none" &&
              characterStyle.scale === "none",
            subtitleBounds: sb,
            characterBounds: cb,
            captionRects: rects,
            headlineText: headlines.map((el) => el.textContent),
            headlineRects,
            headlineFits:
              headlineRects.length > 0 &&
              headlineRects.every(
                (r) =>
                  r.left >= 83.5 &&
                  r.right <= 996.5 &&
                  r.top >= 0 &&
                  r.bottom <= 650,
              ),
            disclosure: [
              ...document.querySelectorAll("[data-conceptual-disclosure]"),
            ].some(
              (el) =>
                visible(el) && el.textContent.trim() === "ILUSTRASI KONSEPTUAL",
            ),
            watermark:
              watermark?.textContent.trim() === "@prof.deps" &&
              !watermark.querySelector("img,svg"),
            fontReady:
              qa.fontReady() &&
              subStyle.fontFamily.includes("Plus Jakarta Sans"),
            canvasFits: Math.abs(root.height / scale - 1920) < 0.5,
            audio: audio
              ? {
                  src: audio.currentSrc || audio.src,
                  duration: audio.duration,
                  rate: audio.playbackRate,
                  readyState: audio.readyState,
                  error: audio.error?.message ?? null,
                  valid:
                    Number.isFinite(audio.duration) &&
                    Math.abs(audio.duration - expectedDuration) < 0.08 &&
                    Math.ceil(audio.duration * fps) <=
                      Math.ceil(expectedDuration * fps) &&
                    audio.playbackRate === 1 &&
                    audio.readyState >= 1 &&
                    !audio.error,
                }
              : null,
          });
        }
        return results;
      },
      {
        frames,
        captions,
        fps,
        expectedDuration: manifest.audio.durationSeconds,
        explanationShots,
      },
    )),
  );

  for (const frame of captures) {
    const clip = await page.evaluate(async (frame) => {
      await window.__deepseekHarnessQA.seek(frame);
      const b = document
        .querySelector("[data-deepseek-design]")
        .getBoundingClientRect();
      return { x: b.left, y: b.top, width: b.width, height: b.height };
    }, frame);
    for (const size of [1080, 540]) {
      const shot = await client.send("Page.captureScreenshot", {
        format: "png",
        clip: { ...clip, scale: size / clip.width },
        captureBeyondViewport: true,
      });
      const file = `${output}/studio/${size}-${frame}.png`;
      const data = Buffer.from(shot.value.data, "base64");
      await fs.writeFile(file, data);
      const width = data.readUInt32BE(16);
      const height = data.readUInt32BE(20);
      screenshots.push({ frame, file, width, height });
      if (width !== size || height !== (size * 1920) / 1080)
        errors.push(
          `Unexpected screenshot dimensions: ${file} (${width}x${height})`,
        );
    }
  }
  report.audioHashAfter = await hash();
  if (
    report.audioHashAfter !== report.audioHashBefore ||
    report.audioHashAfter !== manifest.audio.sha256
  )
    errors.push("Original recording fingerprint changed during QA");
} catch (error) {
  errors.push(error.stack ?? String(error));
} finally {
  if (browser)
    await browser
      .close({ silent: true })
      .catch((error) => errors.push(`Browser cleanup: ${error.message}`));
  const predicates = [
    "frameMatches",
    "persistent",
    "captionMatches",
    "captionFits",
    "subtitleStable",
    "anchors",
    "characterStationary",
    "headlineFits",
    "disclosure",
    "watermark",
    "fontReady",
    "canvasFits",
    "oneSystemAtATime",
  ];
  report.failures = checks.filter(
    (c) =>
      c.lines > 2 ||
      c.designCount !== 1 ||
      !c.audio?.valid ||
      predicates.some((key) => !c[key]),
  );
  report.checkedFrames = checks.length;
  if (checks.length !== frames.length)
    errors.push("Not all requested frames were inspected");
  report.passed = errors.length === 0 && report.failures.length === 0;
  await fs.writeFile(
    `${output}/studio-qa.json`,
    JSON.stringify(report, null, 2) + "\n",
  );
  console.log(
    JSON.stringify(
      {
        passed: report.passed,
        checkedFrames: checks.length,
        finalFrame,
        screenshots: screenshots.length,
        errors,
        failedFrames: report.failures.map((c) => c.frame),
        report: `${output}/studio-qa.json`,
      },
      null,
      2,
    ),
  );
  if (!report.passed) process.exitCode = 1;
}

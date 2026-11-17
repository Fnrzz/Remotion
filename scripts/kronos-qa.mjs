import fs from "node:fs/promises";
import { openBrowser } from "@remotion/renderer";

const cues = JSON.parse(
  await fs.readFile("src/episodes/kronos/data/subtitles.json", "utf8"),
);
const outputDir = process.env.KRONOS_QA_DIR ?? ".preview/kronos";
await fs.mkdir(`${outputDir}/studio`, { recursive: true });
const browser = await openBrowser("chrome", {
  browserExecutable:
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  logLevel: "error",
});
try {
  const page = await browser.newPage({
    context: () => null,
    logLevel: "error",
    indent: false,
    pageIndex: 0,
    onBrowserLog: null,
    onLog: () => {},
  });
  await page.setViewport({ width: 1600, height: 1500, deviceScaleFactor: 1 });
  await page.goto({
    url: "http://localhost:3000/KronosDocumentary",
    timeout: 60000,
  });
  const report = await page.evaluate(async (captions) => {
    for (
      let i = 0;
      i < 1800 && !document.querySelector('[data-subtitle="stable"]');
      i++
    )
      await new Promise(requestAnimationFrame);
    if (!document.querySelector('[data-subtitle="stable"]'))
      throw new Error("Komposisi belum termuat.");
    await document.fonts.ready;
    const original = document.querySelector('[data-subtitle="stable"]');
    const originalCharacter = document.querySelector("[data-character-pose]");
    let characterAnchor;
    let subtitleAnchor;
    const inActiveSequence = (node) => {
      if (!node.getClientRects().length) return false;
      for (
        let parent = node.parentElement;
        parent && !parent.hasAttribute("data-kronos-design");
        parent = parent.parentElement
      ) {
        const style = getComputedStyle(parent);
        if (
          style.display === "none" ||
          style.visibility === "hidden" ||
          style.opacity === "0"
        )
          return false;
      }
      return true;
    };
    const frames = new Set([
      0, 1, 40, 90, 120, 160, 220, 300, 400, 480, 600, 630, 680, 780, 850, 930,
      1000, 1060, 1150, 1200, 1280, 1400, 1424,
    ]);
    for (const cue of captions) {
      const f = Math.ceil((cue.startMs * 30) / 1000);
      for (const n of [f - 1, f, f + 1]) if (n >= 0 && n <= 1424) frames.add(n);
    }
    for (const cut of [126, 280, 617, 832, 1024, 1252])
      for (const d of [-1, 0, 1, 12]) frames.add(cut + d);
    const checks = [];
    for (const frame of [...frames].sort((a, b) => a - b)) {
      window.remotion_setFrame(frame, "KronosDocumentary", 0);
      for (let i = 0; i < 180; i++) {
        await new Promise(requestAnimationFrame);
        if (
          document.querySelector("[data-editorial-frame]")?.dataset
            .editorialFrame === String(frame)
        )
          break;
      }
      await new Promise(requestAnimationFrame);
      const root = document
        .querySelector("[data-kronos-design]")
        .getBoundingClientRect();
      const scale = root.width / 1080;
      const norm = (r) => ({
        left: (r.left - root.left) / scale,
        top: (r.top - root.top) / scale,
        right: (r.right - root.left) / scale,
        bottom: (r.bottom - root.top) / scale,
      });
      const subtitle = document.querySelector('[data-subtitle="stable"]');
      const box = norm(subtitle.getBoundingClientRect());
      subtitleAnchor ??= box;
      const range = document.createRange();
      range.selectNodeContents(subtitle);
      const rects = [...range.getClientRects()]
        .filter((r) => r.width)
        .map(norm);
      const unsafe = [];
      for (const node of document.querySelectorAll(
        "[data-kronos-focus], [data-kronos-content] text",
      )) {
        const r = document.createRange();
        r.selectNodeContents(node);
        const rs = [...r.getClientRects()].filter((r) => r.width).map(norm);
        if (
          rs.some(
            (r) =>
              r.left < -0.1 ||
              r.right > 1080.1 ||
              r.top < -0.1 ||
              r.bottom > 1920.1,
          )
        )
          unsafe.push({ text: node.textContent, rects: rs });
      }
      const character = document.querySelector("[data-character-pose]");
      const characterBox = norm(character.getBoundingClientRect());
      characterAnchor ??= characterBox;
      const content = [
        ...document.querySelectorAll("[data-kronos-content]"),
      ].find(inActiveSequence);
      const contentStyle = getComputedStyle(content);
      const contentBox = norm(content.getBoundingClientRect());
      const heading = [
        ...document.querySelectorAll("[data-kronos-heading-group]"),
      ].find(inActiveSequence);
      const headingBox = norm(heading.getBoundingClientRect());
      const githubImage = document.querySelector(
        "[data-kronos-github-screenshot]",
      );
      if (githubImage) await githubImage.decode();
      const githubUrl = document.querySelector("[data-kronos-github-url]");
      // Studio premounts with display:none or opacity:0 on the Sequence.
      // Ignore the content's own entrance opacity at the first active frame.
      const githubSequence = githubImage?.closest(
        "[data-kronos-content]",
      )?.parentElement;
      const githubActive = Boolean(
        githubImage?.getClientRects().length &&
        githubSequence &&
        getComputedStyle(githubSequence).opacity !== "0",
      );
      checks.push({
        frame,
        fullCanvasLayout:
          Math.abs(contentBox.left - 84) < 0.1 &&
          Math.abs(contentBox.right - 996) < 0.1 &&
          Math.abs(headingBox.left - 84) < 0.1 &&
          Math.abs(headingBox.right - 996) < 0.1,
        headingClearsContent: headingBox.bottom <= contentBox.top - 24,
        subtitleStationary: Object.keys(box).every(
          (key) => Math.abs(box[key] - subtitleAnchor[key]) < 0.1,
        ),
        githubCtaCorrect:
          frame >= 1252
            ? Boolean(
                githubActive &&
                githubImage?.naturalWidth &&
                githubUrl?.textContent === "github.com/shiyu-coder/Kronos",
              )
            : !githubActive,
        character: {
          pose: character.dataset.characterPose,
          sameNode: character === originalCharacter,
          stationary: Object.keys(characterBox).every(
            (key) => Math.abs(characterBox[key] - characterAnchor[key]) < 0.1,
          ),
          box: characterBox,
          clearsContent: characterBox.top >= contentBox.bottom,
          clearsSubtitles: characterBox.left >= box.right,
        },
        cardless:
          contentStyle.backgroundColor === "rgba(0, 0, 0, 0)" &&
          contentStyle.borderTopWidth === "0px" &&
          contentStyle.borderRadius === "0px" &&
          contentStyle.boxShadow === "none",
        sameNode: subtitle === original,
        subtitle: subtitle.textContent,
        lines: new Set(rects.map((r) => Math.round(r.top * 100) / 100)).size,
        fits: rects.every(
          (r) =>
            r.left >= box.left &&
            r.right <= box.right &&
            r.top >= box.top &&
            r.bottom <= box.bottom,
        ),
        box,
        unsafe,
      });
    }
    return {
      checks,
      fonts: [...document.fonts].map((f) => ({
        family: f.family,
        status: f.status,
      })),
      overlay: Boolean(document.querySelector("[data-tiktok-safe-zone]")),
      images: [...document.querySelectorAll("[data-kronos-design] img")].length,
    };
  }, cues);
  const failures = report.checks.filter(
    (c) =>
      !c.sameNode ||
      !c.fullCanvasLayout ||
      !c.headingClearsContent ||
      !c.subtitleStationary ||
      !c.githubCtaCorrect ||
      !c.cardless ||
      !c.character.sameNode ||
      !c.character.stationary ||
      !c.character.clearsContent ||
      !c.character.clearsSubtitles ||
      !c.subtitle ||
      c.lines > 2 ||
      !c.fits ||
      c.box.bottom > 1920 ||
      c.box.left < 0 ||
      c.character.box.right > 1080.1 ||
      c.character.box.bottom > 1920.1 ||
      c.unsafe.length,
  );
  await fs.writeFile(
    `${outputDir}/studio-qa.json`,
    JSON.stringify({ ...report, failures }, null, 2),
  );
  for (const frame of [40, 110, 200, 450, 760, 940, 1140, 1350]) {
    await page.evaluate(async (f) => {
      window.remotion_setFrame(f, "KronosDocumentary", 0);
      for (let i = 0; i < 120; i++) {
        await new Promise(requestAnimationFrame);
        if (
          document.querySelector("[data-editorial-frame]")?.dataset
            .editorialFrame === String(f)
        )
          break;
      }
      await new Promise(requestAnimationFrame);
    }, frame);
    const capture = await page
      ._client()
      .send("Page.captureScreenshot", { format: "png" });
    await fs.writeFile(
      `${outputDir}/studio/frame-${frame}.png`,
      Buffer.from(capture.value.data, "base64"),
    );
  }
  console.log(
    JSON.stringify(
      {
        checkedFrames: report.checks.length,
        failures,
        fonts: report.fonts,
        safeZoneAbsent: !report.overlay,
      },
      null,
      2,
    ),
  );
  if (failures.length || report.overlay) process.exitCode = 1;
} finally {
  await browser.close({ silent: true });
}

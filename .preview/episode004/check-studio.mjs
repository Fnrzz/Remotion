import fs from "node:fs/promises";
import { openBrowser } from "@remotion/renderer";

const captions = JSON.parse(
  await fs.readFile("src/episodes/mistral/data/subtitles.json", "utf8"),
);
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
  await page.setViewport({ width: 1450, height: 1100, deviceScaleFactor: 1 });
  await page.goto({
    url: "http://localhost:3000/MistralLarge4News",
    timeout: 30000,
  });
  const report = await page.evaluate(async (cues) => {
    while (!document.querySelector('[data-subtitle="stable"]'))
      await new Promise(requestAnimationFrame);
    await document.fonts.ready;
    const original = document.querySelector('[data-subtitle="stable"]');
    const frames = new Set([
      0, 1, 60, 240, 390, 600, 750, 850, 975, 1020, 1130, 1260, 1383,
    ]);
    for (const cue of cues) {
      const f = Math.ceil((cue.startMs * 30) / 1000);
      for (const n of [f - 1, f, f + 1]) if (n >= 0 && n <= 1383) frames.add(n);
    }
    for (const s of [143, 305, 490, 681, 1075, 1175])
      for (const d of [-1, 0, 1, 4]) frames.add(s + d);
    const checks = [];
    const visible = (n) => {
      if (!n.getBoundingClientRect().width) return false;
      for (let p = n; p; p = p.parentElement) {
        const s = getComputedStyle(p);
        if (
          s.display === "none" ||
          s.visibility === "hidden" ||
          Number(s.opacity) === 0
        )
          return false;
      }
      return true;
    };
    for (const frame of [...frames].sort((a, b) => a - b)) {
      window.remotion_setFrame(frame, "MistralLarge4News", 0);
      for (let attempts = 0; attempts < 120; attempts++) {
        await new Promise(requestAnimationFrame);
        if (
          document.querySelector("[data-editorial-frame]")?.dataset
            .editorialFrame === String(frame)
        )
          break;
      }
      await new Promise(requestAnimationFrame);
      const root = document.querySelector("[data-mistral-design]");
      const box = root.getBoundingClientRect();
      const scale = box.width / 1080;
      const norm = (r) => ({
        left: (r.left - box.left) / scale,
        top: (r.top - box.top) / scale,
        right: (r.right - box.left) / scale,
        bottom: (r.bottom - box.top) / scale,
      });
      const node = document.querySelector('[data-subtitle="stable"]');
      const subBox = norm(node.getBoundingClientRect());
      const range = document.createRange();
      range.selectNodeContents(node);
      const subRects = [...range.getClientRects()]
        .filter((r) => r.width > 0)
        .map(norm);
      const textNodes = [
        ...document.querySelectorAll(
          "[data-mistral-focus], [data-mistral-headline], [data-mistral-source]",
        ),
      ].filter(visible);
      const unsafe = [];
      for (const n of textNodes) {
        const r = document.createRange();
        r.selectNodeContents(n);
        const rects = [...r.getClientRects()]
          .filter((r) => r.width > 0)
          .map(norm);
        if (
          rects.some(
            (r) =>
              r.left < 109.9 ||
              r.right > 850.1 ||
              r.top < 219.9 ||
              r.bottom > 1215,
          )
        )
          unsafe.push({ text: n.textContent, rects });
      }
      const photos = [
        ...document.querySelectorAll("[data-mistral-photo] img"),
      ].filter(visible);
      await Promise.all(photos.map((i) => i.decode()));
      const cards = [...document.querySelectorAll("[data-mistral-choice]")]
        .filter(visible)
        .map((n) => norm(n.parentElement.getBoundingClientRect()));
      checks.push({
        frame,
        sameNode: node === original,
        text: node.textContent,
        subBox,
        lines: new Set(subRects.map((r) => Math.round(r.top * 100) / 100)).size,
        subtitleFits: subRects.every(
          (r) =>
            r.left >= subBox.left &&
            r.right <= subBox.right &&
            r.top >= subBox.top &&
            r.bottom <= subBox.bottom,
        ),
        unsafe,
        photosLoaded: photos.every((i) => i.complete && i.naturalWidth > 0),
        equalCards:
          cards.length !== 2 ||
          Math.abs(
            cards[0].right - cards[0].left - (cards[1].right - cards[1].left),
          ) < 0.1,
        headlineCount: [
          ...document.querySelectorAll("[data-mistral-headline]"),
        ].filter(visible).length,
      });
    }
    return {
      checks,
      fonts: [...document.fonts].map((f) => ({
        family: f.family,
        status: f.status,
      })),
      remoteAssets: performance
        .getEntriesByType("resource")
        .filter(
          (e) =>
            /^https?:/.test(e.name) &&
            !e.name.startsWith(location.origin) &&
            !e.name.startsWith("https://bugs.remotion.dev/"),
        )
        .map((e) => e.name),
      uiPresent: Boolean(document.querySelector("[data-mistral-ui]")),
    };
  }, captions);
  const failures = report.checks.filter(
    (c) =>
      !c.sameNode ||
      !c.text ||
      c.lines > 2 ||
      !c.subtitleFits ||
      c.subBox.bottom > 1400 ||
      c.unsafe.length ||
      !c.photosLoaded ||
      !c.equalCards ||
      c.headlineCount !== 1,
  );
  await fs.writeFile(
    ".preview/episode004/studio-qa.json",
    JSON.stringify({ ...report, failures }, null, 2),
  );
  for (const frame of [60, 240, 600, 1020, 1260]) {
    await page.evaluate(async (f) => {
      window.remotion_setFrame(f, "MistralLarge4News", 0);
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
      `.preview/episode004/studio-ui-${frame}.png`,
      Buffer.from(capture.value.data, "base64"),
    );
  }
  console.log(
    JSON.stringify(
      {
        frames: report.checks.length,
        failures,
        remoteAssets: report.remoteAssets,
        fonts: report.fonts,
        uiPresent: report.uiPresent,
      },
      null,
      2,
    ),
  );
  if (failures.length || report.remoteAssets.length) process.exitCode = 1;
} finally {
  await browser.close({ silent: true });
}

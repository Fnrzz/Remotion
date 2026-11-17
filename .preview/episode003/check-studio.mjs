import fs from "node:fs/promises";
import { openBrowser } from "@remotion/renderer";

const captions = JSON.parse(
  await fs.readFile("src/episodes/gemini-carbon/data/subtitles.json", "utf8"),
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
  await page.goto({
    url: "http://localhost:3000/Gemini4CarbonNews",
    timeout: 30000,
  });
  const result = await page.evaluate(async (cues) => {
    await new Promise((resolve) => {
      if (document.querySelector('[data-subtitle="stable"]')) return resolve();
      const observer = new MutationObserver(() => {
        if (document.querySelector('[data-subtitle="stable"]')) {
          observer.disconnect();
          resolve();
        }
      });
      observer.observe(document, { childList: true, subtree: true });
    });
    await document.fonts.ready;
    const original = document.querySelector('[data-subtitle="stable"]');
    const checks = [];
    const frames = new Set([
      0, 134, 135, 136, 139, 334, 335, 336, 339, 554, 555, 556, 559, 776, 777,
      778, 781, 1021, 1022, 1023, 1026, 1267,
    ]);
    for (const cue of cues) {
      const f = Math.ceil((cue.startMs * 30) / 1000);
      for (const frame of [Math.max(0, f - 1), f, Math.min(1267, f + 1)])
        frames.add(frame);
    }
    for (const frame of [...frames].sort((a, b) => a - b)) {
      window.remotion_setFrame(frame, "Gemini4CarbonNews", 0);
      await new Promise((resolve) =>
        requestAnimationFrame(() => requestAnimationFrame(resolve)),
      );
      const node = document.querySelector('[data-subtitle="stable"]');
      const style = getComputedStyle(node);
      const box = node.getBoundingClientRect();
      const parent = node.parentElement.getBoundingClientRect();
      const scale = box.width / parseFloat(style.width);
      const range = document.createRange();
      range.selectNodeContents(node);
      const rects = [...range.getClientRects()];
      checks.push({
        frame,
        text: node.textContent,
        sameNode: node === original,
        width: parseFloat(style.width),
        height: parseFloat(style.height),
        bottom: (box.bottom - parent.top) / scale,
        left: (box.left - parent.left) / scale,
        lines: new Set(rects.map((r) => Math.round(r.top * 100) / 100)).size,
        fits: rects.every(
          (r) =>
            r.left >= box.left &&
            r.right <= box.right &&
            r.top >= box.top &&
            r.bottom <= box.bottom,
        ),
      });
    }
    return {
      checks,
      fonts: [...document.fonts].map((f) => ({
        family: f.family,
        status: f.status,
      })),
      remote: performance
        .getEntriesByType("resource")
        .filter(
          (e) => /^https?:/.test(e.name) && !e.name.startsWith(location.origin),
        )
        .map((e) => e.name),
    };
  }, captions);
  const failures = result.checks.filter(
    (c) =>
      !c.sameNode ||
      !c.text ||
      c.lines > 2 ||
      !c.fits ||
      c.bottom > 1400 ||
      c.width !== 392 ||
      Math.abs(c.height - 119.2) > 0.1 ||
      Math.abs(c.left - 132) > 0.1,
  );
  const remoteAssets = result.remote.filter(
    (u) => !u.startsWith("https://bugs.remotion.dev/api/"),
  );
  await fs.writeFile(
    ".preview/episode003/studio-qa.json",
    JSON.stringify({ ...result, failures, remoteAssets }, null, 2),
  );
  console.log(
    JSON.stringify(
      {
        inspectedFrames: result.checks.length,
        failures,
        remoteAssets,
        fonts: result.fonts,
        subtitleBottom: result.checks[0].bottom,
      },
      null,
      2,
    ),
  );
  if (failures.length || remoteAssets.length) process.exitCode = 1;
} finally {
  await browser.close({ silent: true });
}

import fs from "node:fs/promises";
import { openBrowser } from "@remotion/renderer";

const captions = JSON.parse(
  await fs.readFile("src/episodes/terra-sol/data/subtitles.json", "utf8"),
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
    url: "http://localhost:3000/TerraVsSolNews",
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
    for (const cue of cues) {
      const boundary = Math.ceil((cue.startMs * 30) / 1000);
      for (const frame of [
        ...new Set([Math.max(0, boundary - 1), boundary, boundary + 1]),
      ]) {
        window.remotion_setFrame(frame, "TerraVsSolNews", 0);
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
        const lines = [...range.getClientRects()];
        const lineCount = new Set(
          lines.map((rect) => Math.round(rect.top * 100) / 100),
        ).size;
        checks.push({
          frame,
          text: node.textContent,
          sameNode: node === original,
          width: parseFloat(style.width),
          height: parseFloat(style.height),
          bottom: (box.bottom - parent.top) / scale,
          left: (box.left - parent.left) / scale,
          lines: lineCount,
          horizontalTextFits: lines.every(
            (rect) => rect.left >= box.left && rect.right <= box.right,
          ),
        });
      }
    }
    return {
      title: document.title,
      checks,
      remoteRequests: performance
        .getEntriesByType("resource")
        .filter(
          (entry) =>
            /^https?:/.test(entry.name) &&
            !entry.name.startsWith(location.origin),
        )
        .map((entry) => entry.name),
      fonts: [...document.fonts].map((font) => ({
        family: font.family,
        status: font.status,
      })),
    };
  }, captions);
  const failures = result.checks.filter(
    (check) =>
      !check.sameNode ||
      check.width !== 392 ||
      Math.abs(check.height - 119.2) > 0.1 ||
      Math.abs(check.bottom - 1343) > 0.1 ||
      Math.abs(check.left - 132) > 0.1 ||
      check.lines > 2 ||
      !check.horizontalTextFits,
  );
  // Studio checks its bug-advisory endpoint; this is not a render asset.
  const remoteAssetRequests = result.remoteRequests.filter(
    (url) => !url.startsWith("https://bugs.remotion.dev/api/"),
  );
  await fs.writeFile(
    ".preview/episode002/studio-qa.json",
    JSON.stringify({ ...result, remoteAssetRequests, failures }, null, 2),
  );
  console.log(
    JSON.stringify(
      {
        inspectedFrames: result.checks.length,
        failures,
        fonts: result.fonts,
        remoteAssetRequests,
        studioDiagnostics: result.remoteRequests.filter((url) =>
          url.startsWith("https://bugs.remotion.dev/api/"),
        ),
      },
      null,
      2,
    ),
  );
  if (failures.length || remoteAssetRequests.length) process.exitCode = 1;
} finally {
  await browser.close({ silent: true });
}

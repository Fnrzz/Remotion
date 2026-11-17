import fs from "node:fs/promises";
import { openBrowser } from "@remotion/renderer";

const browser = await openBrowser("chrome", {
  browserExecutable:
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  logLevel: "error",
});
const results = [];
try {
  for (const id of ["Genie4News", "TerraVsSolNews", "Gemini4CarbonNews"]) {
    const page = await browser.newPage({
      context: () => null,
      logLevel: "error",
      indent: false,
      pageIndex: 0,
      onBrowserLog: null,
      onLog: () => {},
    });
    await page.setViewport({ width: 1400, height: 1000, deviceScaleFactor: 1 });
    await page.goto({ url: `http://localhost:3000/${id}`, timeout: 30000 });
    const result = await page.evaluate(async (composition) => {
      await new Promise((resolve) => {
        if (document.querySelector('[data-tiktok-safe-zone="orson-lord"]'))
          return resolve();
        const observer = new MutationObserver(() => {
          if (document.querySelector('[data-tiktok-safe-zone="orson-lord"]')) {
            observer.disconnect();
            resolve();
          }
        });
        observer.observe(document, { childList: true, subtree: true });
      });
      const image = document.querySelector(
        '[data-tiktok-safe-zone="orson-lord"]',
      );
      await image.decode();
      window.remotion_setFrame(200, composition, 0);
      await new Promise((resolve) =>
        requestAnimationFrame(() => requestAnimationFrame(resolve)),
      );
      let node = image;
      let opacity = 1;
      let zIndex = "auto";
      while (node && node !== document.body) {
        const s = getComputedStyle(node);
        opacity *= Number(s.opacity);
        if (s.zIndex === "100") zIndex = s.zIndex;
        node = node.parentElement;
      }
      const style = getComputedStyle(image);
      const rect = image.getBoundingClientRect();
      return {
        id: composition,
        count: document.querySelectorAll('[data-tiktok-safe-zone="orson-lord"]')
          .length,
        source: new URL(image.currentSrc).pathname,
        naturalWidth: image.naturalWidth,
        naturalHeight: image.naturalHeight,
        width: parseFloat(style.width),
        height: parseFloat(style.height),
        aspectRatio: rect.width / rect.height,
        opacity,
        zIndex,
        pointerEvents: style.pointerEvents,
        fit: style.objectFit,
      };
    }, id);
    const capture = await page
      ._client()
      .send("Page.captureScreenshot", { format: "png" });
    await fs.writeFile(
      `.preview/episode003/${id}-shared-overlay.png`,
      Buffer.from(capture.value.data, "base64"),
    );
    results.push(result);
    await page.close();
  }
} finally {
  await browser.close({ silent: true });
}
const failures = results.filter(
  (r) =>
    r.count !== 1 ||
    r.naturalWidth !== 1080 ||
    r.naturalHeight !== 1920 ||
    Math.abs(r.opacity - 0.65) > 0.001 ||
    r.zIndex !== "100" ||
    r.pointerEvents !== "none" ||
    r.fit !== "fill" ||
    Math.abs(r.aspectRatio - 9 / 16) > 0.001,
);
await fs.writeFile(
  ".preview/episode003/shared-overlay-qa.json",
  JSON.stringify({ results, failures }, null, 2),
);
console.log(JSON.stringify({ results, failures }, null, 2));
if (failures.length) process.exitCode = 1;

import fs from "node:fs/promises";
import { openBrowser } from "@remotion/renderer";

const url = "https://github.com/shiyu-coder/Kronos";
const evidenceDir = ".preview/kronos/github-cta";
await fs.mkdir(evidenceDir, { recursive: true });
await fs.mkdir("public/assets/images/kronos", { recursive: true });
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
  await page.setViewport({ width: 1080, height: 900, deviceScaleFactor: 2 });
  await page.goto({ url, timeout: 60000 });
  const evidence = await page.evaluate(async () => {
    await document.fonts.ready;
    for (let i = 0; i < 600; i++) {
      if (
        [...document.querySelectorAll("h2")].some(
          (node) => node.textContent === "Folders and files",
        )
      )
        break;
      await new Promise(requestAnimationFrame);
    }
    if (
      !document.title.includes("shiyu-coder/Kronos") ||
      !document.body.innerText.includes("Folders and files")
    )
      throw new Error("GitHub repository content did not load.");
    return {
      title: document.title,
      url: location.href,
      headings: [...document.querySelectorAll("h1, h2")].map(
        (node) => node.textContent,
      ),
      bodyExcerpt: document.body.innerText.slice(0, 3500),
      capturedAt: new Date().toISOString(),
    };
  });
  const full = await page._client().send("Page.captureScreenshot", {
    format: "png",
    captureBeyondViewport: false,
  });
  await fs.writeFile(
    `${evidenceDir}/github-page.png`,
    Buffer.from(full.value.data, "base64"),
  );
  // Unaltered viewport crop: repository identity and upper file listing only.
  const crop = await page._client().send("Page.captureScreenshot", {
    format: "png",
    clip: { x: 0, y: 72, width: 1080, height: 442, scale: 1 },
    captureBeyondViewport: false,
  });
  await fs.writeFile(
    "public/assets/images/kronos/github-kronos.png",
    Buffer.from(crop.value.data, "base64"),
  );
  await fs.writeFile(
    `${evidenceDir}/capture.json`,
    JSON.stringify(evidence, null, 2),
  );
  console.log(JSON.stringify(evidence, null, 2));
} finally {
  await browser.close({ silent: true });
}

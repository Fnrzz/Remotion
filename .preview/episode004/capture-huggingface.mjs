import fs from "node:fs/promises";
import crypto from "node:crypto";
import { openBrowser } from "@remotion/renderer";

// Capture the real live page. No HTML recreation, inserted labels or text edits.
const url = "https://huggingface.co/mistralai/Mistral-Large-4-1T-A52B";
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
  await page.setViewport({ width: 1400, height: 1500, deviceScaleFactor: 2 });
  await page.goto({ url, timeout: 60000 });
  const info = await page.evaluate(async () => {
    await document.fonts.ready;
    const heading = document
      .querySelector("#mistral-large-4---le-chonk")
      ?.closest("h1");
    if (!heading)
      throw new Error(
        `Model card heading not found at ${location.href}: ${document.title}`,
      );
    const article = heading.closest("article") ?? heading.parentElement;
    const firstParagraph = heading.nextElementSibling;
    const secondParagraph = firstParagraph.nextElementSibling;
    const h = heading.getBoundingClientRect();
    const a = article.getBoundingClientRect();
    return {
      url: location.href,
      title: document.title,
      heading: heading.textContent,
      articleTag: article.tagName,
      articleClass: article.className,
      firstParagraph: firstParagraph?.textContent,
      secondParagraph: secondParagraph.textContent,
      clip: {
        x: Math.max(0, Math.floor(a.left)),
        y: Math.max(0, Math.floor(h.top + scrollY - 12)),
        width: Math.ceil(a.width),
        height: Math.ceil(
          secondParagraph.getBoundingClientRect().bottom - h.top + 28,
        ),
        scale: 1,
      },
    };
  });
  console.log(JSON.stringify(info, null, 2));
  const capture = await page._client().send("Page.captureScreenshot", {
    format: "png",
    captureBeyondViewport: true,
    clip: info.clip,
  });
  const bytes = Buffer.from(capture.value.data, "base64");
  await fs.mkdir("public/assets/mistral", { recursive: true });
  await fs.writeFile(
    "public/assets/mistral/huggingface-mistral-model-card.png",
    bytes,
  );
  await fs.writeFile(
    ".preview/episode004/huggingface-capture.json",
    JSON.stringify(
      {
        ...info,
        capturedOn: new Date().toISOString(),
        file: "public/assets/mistral/huggingface-mistral-model-card.png",
        sha256: crypto.createHash("sha256").update(bytes).digest("hex"),
      },
      null,
      2,
    ),
  );
} finally {
  await browser.close({ silent: true });
}

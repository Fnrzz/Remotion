import fs from "node:fs/promises";
import { openBrowser } from "@remotion/renderer";

// Browser inspection of the running Studio only. No bundling or video rendering.
const id = "GeminiOmni009";
const captions = JSON.parse(
  await fs.readFile("src/episodes/gemini-omni/data/subtitles.json", "utf8"),
);
const captures = [
  20, 60, 140, 210, 300, 397, 450, 525, 600, 650, 710, 760, 815, 880, 940, 1035,
  1090, 1200, 1290, 1320, 1370, 1410, 1450, 1459,
];
const frames = [
  ...new Set([
    ...captures,
    ...Array.from({ length: 75 }, (_, i) => Math.round((i * 1459) / 74)),
    ...captions.flatMap((c) =>
      [-1, 0, 1].map((d) => Math.ceil((c.startMs * 30) / 1000) + d),
    ),
  ]),
]
  .filter((f) => f >= 0 && f < 1460)
  .sort((a, b) => a - b);
const output = ".preview/gemini-omni/studio";
await fs.mkdir(output, { recursive: true });
const browser = await openBrowser("chrome", {
  browserExecutable:
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  logLevel: "error",
});
const errors = [];
try {
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
    errors.push(e.exception?.description ?? e.text),
  );
  await page.setViewport({ width: 1800, height: 1600, deviceScaleFactor: 1 });
  await page.goto({ url: `http://localhost:3000/${id}`, timeout: 60000 });
  const checks = await page.evaluate(
    async (input) => {
      const raf = () => new Promise(requestAnimationFrame);
      for (
        let i = 0;
        i < 1800 && !document.querySelector("[data-episode-frame]");
        i++
      )
        await raf();
      if (!document.querySelector("[data-episode-frame]"))
        throw new Error("Composition did not mount");
      await document.fonts.ready;
      await Promise.all(
        [...document.querySelectorAll("[data-full-canvas-overlays] img")].map(
          (i) => i.decode(),
        ),
      );
      const persistent = document.querySelector('[data-subtitle="stable"]');
      const character = document.querySelector("[data-character-pose]");
      const checks = [];
      for (const frame of input.frames) {
        window.remotion_setFrame(frame, input.id, 0);
        for (
          let i = 0;
          i < 180 &&
          document.querySelector("[data-episode-frame]").dataset
            .episodeFrame !== String(frame);
          i++
        )
          await raf();
        await raf();
        // Studio premounts later scenes; wait for newly mounted local images
        // before checking them instead of treating an in-flight load as failure.
        await Promise.all(
          [...document.querySelectorAll("[data-omni-design] img")].map(
            (image) => image.decode(),
          ),
        );
        const root = document
          .querySelector("[data-omni-design]")
          .getBoundingClientRect();
        const scale = root.width / 1080;
        const norm = (r) => ({
          left: (r.left - root.left) / scale,
          right: (r.right - root.left) / scale,
          top: (r.top - root.top) / scale,
          bottom: (r.bottom - root.top) / scale,
        });
        const sub = document.querySelector('[data-subtitle="stable"]');
        const sb = norm(sub.getBoundingClientRect());
        const cb = norm(character.getBoundingClientRect());
        const range = document.createRange();
        range.selectNodeContents(sub);
        const rects = [...range.getClientRects()]
          .filter((r) => r.width > 0)
          .map(norm);
        const expected =
          input.captions.find(
            (c) =>
              (frame * 1000) / 30 >= c.startMs && (frame * 1000) / 30 < c.endMs,
          )?.text ?? "";
        checks.push({
          frame,
          acknowledged:
            document.querySelector("[data-episode-frame]").dataset
              .episodeFrame === String(frame),
          persistent:
            persistent === sub &&
            character === document.querySelector("[data-character-pose]"),
          captionMatches: sub.textContent === expected,
          lines: new Set(rects.map((r) => Math.round(r.top))).size,
          captionFits: rects.every(
            (r) =>
              r.left >= 84 &&
              r.right <= 635 &&
              r.top >= 1570 &&
              r.bottom <= 1705,
          ),
          anchors:
            Math.abs(sb.bottom - 1705) < 1 &&
            Math.abs(cb.bottom - 1740) < 1 &&
            Math.abs(cb.right - 996) < 1,
          fontReady: document.fonts.check('800 100px "Plus Jakarta Sans"'),
          imagesLoaded: [
            ...document.querySelectorAll("[data-omni-design] img"),
          ].every((image) => image.complete && image.naturalWidth > 0),
          timeline: document.querySelector("[data-timeline-length]")?.dataset
            .timelineLength,
          priceRatio:
            document.querySelector("[data-price-ratio]")?.dataset.priceRatio,
          question:
            document.querySelector("[data-closing-question]")?.outerHTML ??
            null,
          questionBounds: document.querySelector("[data-closing-question]")
            ? norm(
                document
                  .querySelector("[data-closing-question]")
                  .getBoundingClientRect(),
              )
            : null,
        });
      }
      return checks;
    },
    { id, frames, captions },
  );
  for (const frame of captures) {
    const clip = await page.evaluate(
      async (frame, id) => {
        window.remotion_setFrame(frame, id, 0);
        for (
          let i = 0;
          i < 180 &&
          document.querySelector("[data-episode-frame]").dataset
            .episodeFrame !== String(frame);
          i++
        )
          await new Promise(requestAnimationFrame);
        await new Promise(requestAnimationFrame);
        const b = document
          .querySelector("[data-omni-design]")
          .getBoundingClientRect();
        return {
          x: b.left,
          y: b.top,
          width: b.width,
          height: b.height,
          scale: 1080 / b.width,
        };
      },
      frame,
      id,
    );
    for (const size of [1080, 540]) {
      const shot = await client.send("Page.captureScreenshot", {
        format: "png",
        clip: { ...clip, scale: (clip.scale * size) / 1080 },
        captureBeyondViewport: true,
      });
      await fs.writeFile(
        `${output}/${size}-${frame}.png`,
        Buffer.from(shot.value.data, "base64"),
      );
    }
  }
  const failures = checks.filter(
    (c) =>
      !c.acknowledged ||
      !c.persistent ||
      !c.captionMatches ||
      !c.captionFits ||
      !c.anchors ||
      !c.fontReady ||
      !c.imagesLoaded ||
      c.lines > 2,
  );
  const price = checks.find((c) => c.frame === 1090);
  if (Math.abs(Number(price?.priceRatio) - 0.7) > 0.0001)
    errors.push("Price bars must have a 0.70 length ratio");
  for (const frame of [1290, 1320, 1370, 1410, 1450, 1459]) {
    const check = checks.find((c) => c.frame === frame);
    if (
      !check?.question ||
      check.questionBounds.left < 83 ||
      check.questionBounds.right > 997 ||
      check.questionBounds.bottom > 1380
    )
      errors.push(
        `Closing question missing or out of content bounds at ${frame}`,
      );
  }
  if (
    checks.find((c) => c.frame === 1320)?.question ===
    checks.find((c) => c.frame === 1410)?.question
  )
    errors.push(
      "Closing question must progress between the two spoken options",
    );
  if (
    checks.find((c) => c.frame === 1450)?.question !==
    checks.find((c) => c.frame === 1459)?.question
  )
    errors.push(
      "Closing question must hold still through the final audio frames",
    );
  await fs.writeFile(
    ".preview/gemini-omni/studio-qa.json",
    JSON.stringify(
      { checkedFrames: checks.length, errors, failures, checks },
      null,
      2,
    ),
  );
  console.log(
    JSON.stringify({ checkedFrames: checks.length, errors, failures }, null, 2),
  );
  if (errors.length || failures.length) process.exitCode = 1;
} finally {
  await browser.close({ silent: true });
}

import fs from "node:fs/promises";
import { openBrowser } from "@remotion/renderer";

// Inspect the running Studio; no bundle, rendered frames, or video encoding.
const id = "OpenAIImages008";
const captions = JSON.parse(
  await fs.readFile("src/episodes/openai-images/data/subtitles.json", "utf8"),
);
const timing = JSON.parse(
  await fs.readFile("src/episodes/openai-images/data/timing.json", "utf8"),
);
const last = Math.ceil(timing.audioSeconds * 30) - 1;
const frames = [
  ...new Set([
    0,
    1,
    8,
    20,
    45,
    60,
    1530,
    1615,
    1710,
    1740,
    1800,
    1840,
    last,
    ...Array.from({ length: 100 }, (_, i) => Math.round((i * last) / 99)),
    ...Object.values(timing)
      .filter((s) => typeof s === "number")
      .flatMap((s) =>
        [-1, 0, 1, 15, 35, 70].map((d) => Math.round(s * 30) + d),
      ),
    ...captions.flatMap((c) =>
      [-1, 0, 1].map((d) => Math.ceil((c.startMs * 30) / 1000) + d),
    ),
  ]),
]
  .filter((f) => f >= 0 && f <= last)
  .sort((a, b) => a - b);
const browser = await openBrowser("chrome", {
  browserExecutable:
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  logLevel: "error",
});
const errors = [];
const output = ".preview/openai-images/studio";
await fs.mkdir(output, { recursive: true });
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
  const result = await page.evaluate(
    async (input) => {
      const raf = () => new Promise(requestAnimationFrame);
      for (
        let i = 0;
        i < 1800 && !document.querySelector("[data-episode-frame]");
        i++
      )
        await raf();
      await Promise.all(
        [...document.querySelectorAll("[data-images-design] img")].map(
          (image) => image.decode(),
        ),
      );
      if (!document.querySelector("[data-episode-frame]"))
        throw new Error("Episode did not mount in Studio");
      await document.fonts.ready;
      const persistent = document.querySelector('[data-subtitle="stable"]');
      const char = document.querySelector("[data-character-pose]");
      const checks = [];
      const visible = (node) => {
        for (let p = node; p; p = p.parentElement) {
          const s = getComputedStyle(p);
          if (
            s.display === "none" ||
            s.visibility === "hidden" ||
            Number(s.opacity) < 0.02
          )
            return false;
          if (p.hasAttribute("data-images-design")) break;
        }
        return true;
      };
      for (const f of input.frames) {
        window.remotion_setFrame(f, input.id, 0);
        for (
          let i = 0;
          i < 180 &&
          document.querySelector("[data-episode-frame]")?.dataset
            .episodeFrame !== String(f);
          i++
        )
          await raf();
        await raf();
        const root = document
          .querySelector("[data-images-design]")
          .getBoundingClientRect();
        const scale = root.width / 1080;
        const norm = (r) => ({
          left: (r.left - root.left) / scale,
          right: (r.right - root.left) / scale,
          top: (r.top - root.top) / scale,
          bottom: (r.bottom - root.top) / scale,
        });
        const sub = document.querySelector('[data-subtitle="stable"]');
        const range = document.createRange();
        range.selectNodeContents(sub);
        const lines = [...range.getClientRects()]
          .filter((r) => r.width > 0)
          .map(norm);
        const sb = norm(sub.getBoundingClientRect());
        const cb = norm(char.getBoundingClientRect());
        const scene = document.querySelector("[data-scenes]");
        const walker = document.createTreeWalker(scene, NodeFilter.SHOW_TEXT);
        const words = [];
        while (walker.nextNode()) {
          const n = walker.currentNode;
          if (!n.textContent.trim() || !visible(n.parentElement)) continue;
          const range = document.createRange();
          range.selectNodeContents(n);
          const rs = [...range.getClientRects()]
            .filter((r) => r.width > 0 && r.height > 0)
            .map(norm);
          if (rs.length) words.push({ text: n.textContent.trim(), rects: rs });
        }
        const overflow = words.filter((w) =>
          w.rects.some(
            (r) =>
              r.left < 109 || r.right > 851 || r.top < 219 || r.bottom > 1241,
          ),
        );
        const expected =
          input.captions.find(
            (c) => (f * 1000) / 30 >= c.startMs && (f * 1000) / 30 < c.endMs,
          )?.text ?? "";
        checks.push({
          frame: f,
          acknowledged:
            document.querySelector("[data-episode-frame]").dataset
              .episodeFrame === String(f),
          subtitleStable: sub === persistent,
          subtitleMatches: sub.textContent === expected,
          subtitleLines: new Set(lines.map((r) => Math.round(r.top))).size,
          subtitleBounds: lines.every(
            (r) =>
              r.left >= 84 &&
              r.right <= 634.5 &&
              r.bottom <= 1705 &&
              r.top >= 1570,
          ),
          subtitleAnchor:
            Math.abs(sb.bottom - 1705) < 0.8 && Math.abs(sb.left - 84) < 0.8,
          subtitleBesideCharacter:
            sb.right + 41 <= cb.left &&
            sb.top >= cb.top &&
            sb.bottom <= cb.bottom,
          characterPose: char.dataset.characterPose,
          closingMotion:
            document.querySelector("[data-closing-motion]")?.dataset
              .closingMotion ?? null,
          closingChoices: [
            ...document.querySelectorAll("[data-closing-choice]"),
          ].map((node) => ({
            kind: node.dataset.closingChoice,
            state: node.dataset.motionState,
            svgCount: node.querySelectorAll("svg").length,
            geometry: [...node.querySelectorAll("svg g[transform]")]
              .map((g) => g.getAttribute("transform"))
              .join(";"),
          })),
          revisionWipe:
            document.querySelector("[data-revision-wipe]")?.dataset
              .revisionWipe ?? null,
          characterStable:
            document.querySelector("[data-character-pose]") === char &&
            Math.abs(cb.bottom - 1740) < 0.8 &&
            Math.abs(cb.right - 996) < 0.8,
          fontReady: document.fonts.check('800 100px "Plus Jakarta Sans"'),
          overflow,
          visibleText: words.map((w) => w.text),
          imagesLoaded: [
            ...document.querySelectorAll("[data-images-design] img"),
          ].every((i) => i.complete && i.naturalWidth > 0),
        });
      }
      return checks;
    },
    { id, frames, captions },
  );
  const captures = [
    45,
    60,
    130,
    330,
    500,
    650,
    780,
    1000,
    1185,
    1270,
    1295,
    1325,
    1420,
    1530,
    1615,
    1710,
    1740,
    1800,
    last,
  ];
  for (const f of captures) {
    const clip = await page.evaluate(
      async (frame, composition) => {
        window.remotion_setFrame(frame, composition, 0);
        for (
          let i = 0;
          i < 180 &&
          document.querySelector("[data-episode-frame]")?.dataset
            .episodeFrame !== String(frame);
          i++
        )
          await new Promise(requestAnimationFrame);
        await new Promise(requestAnimationFrame);
        const b = document
          .querySelector("[data-images-design]")
          .getBoundingClientRect();
        return {
          x: b.left,
          y: b.top,
          width: b.width,
          height: b.height,
          scale: 1080 / b.width,
        };
      },
      f,
      id,
    );
    for (const size of [1080, 540]) {
      const screenshot = await client.send("Page.captureScreenshot", {
        format: "png",
        clip: { ...clip, scale: (clip.scale * size) / 1080 },
        captureBeyondViewport: true,
      });
      await fs.writeFile(
        `${output}/${size}-${f}.png`,
        Buffer.from(screenshot.value.data, "base64"),
      );
    }
  }
  const failures = result.filter(
    (c) =>
      !c.acknowledged ||
      !c.subtitleStable ||
      !c.subtitleMatches ||
      c.subtitleLines > 2 ||
      !c.subtitleBounds ||
      !c.subtitleAnchor ||
      !c.subtitleBesideCharacter ||
      !c.characterStable ||
      !c.fontReady ||
      !c.imagesLoaded ||
      c.overflow.length > 0,
  );
  const expressionChanges = result.filter(
    (c, i) => i > 0 && c.characterPose !== result[i - 1].characterPose,
  ).length;
  if (expressionChanges !== 39)
    errors.push(
      `Expected 39 expression changes; observed ${expressionChanges}.`,
    );
  const sample = (f) => result.find((c) => c.frame === f);
  if (
    sample(1530)?.closingMotion !== "revision" ||
    Number(sample(1615)?.revisionWipe) < 95
  )
    errors.push(
      "Closing revision must inspect the illustration and reveal the edited pot.",
    );
  for (const f of [1710, 1740, 1800, last]) {
    const choices = sample(f)?.closingChoices ?? [];
    if (
      choices.map((c) => c.kind).join(",") !== "gif,edit,svg" ||
      choices.some((c) => c.svgCount < 2)
    )
      errors.push(`Three illustrated closing choices missing at frame ${f}.`);
  }
  if (
    sample(1710)?.closingChoices[0]?.geometry ===
    sample(1740)?.closingChoices[0]?.geometry
  )
    errors.push("The closing GIF artwork must animate, not just its text.");
  if (
    JSON.stringify(sample(1840)?.closingChoices) !==
    JSON.stringify(sample(last)?.closingChoices)
  )
    errors.push(
      "The final clean hold must preserve the closing artwork geometry.",
    );
  await fs.writeFile(
    ".preview/openai-images/studio-qa.json",
    JSON.stringify(
      {
        checkedFrames: frames.length,
        expressionChanges,
        errors,
        failures,
        checks: result,
      },
      null,
      2,
    ),
  );
  console.log(
    JSON.stringify(
      {
        checkedFrames: frames.length,
        expressionChanges,
        errors,
        failures: failures.map((c) => ({
          frame: c.frame,
          overflow: c.overflow,
          subtitleLines: c.subtitleLines,
          subtitleBounds: c.subtitleBounds,
        })),
      },
      null,
      2,
    ),
  );
  if (failures.length || errors.length) process.exitCode = 1;
} finally {
  await browser.close({ silent: true });
}

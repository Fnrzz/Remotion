import fs from "node:fs/promises";
import { openBrowser } from "@remotion/renderer";

// Studio DOM/screenshot QA only. Does not bundle, render frames, or encode video.
const composition = "KimiComparison007";
const timing = JSON.parse(
  await fs.readFile("src/episodes/kimi-comparison/data/timing.json", "utf8"),
);
const captions = JSON.parse(
  await fs.readFile("src/episodes/kimi-comparison/data/subtitles.json", "utf8"),
);
const lastFrame = Math.ceil(timing.audioSeconds * 30) - 1;
const frames = [
  ...new Set([
    ...Array.from({ length: 90 }, (_, i) => Math.round((i * lastFrame) / 89)),
    ...Object.values(timing).flatMap((s) =>
      [-1, 0, 1, 8, 24].map((d) => Math.round(s * 30) + d),
    ),
    ...captions.flatMap((c) =>
      [-1, 0, 1].map((d) => Math.ceil((c.startMs * 30) / 1000) + d),
    ),
    259,
    315,
    360,
    380,
    385,
    700,
    1010,
    1350,
    lastFrame,
  ]),
]
  .filter((f) => f >= 0 && f <= lastFrame)
  .sort((a, b) => a - b);
const outputDir = ".preview/kimi-comparison/studio";
await fs.mkdir(outputDir, { recursive: true });
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
  await page.goto({
    url: `http://localhost:3000/${composition}`,
    timeout: 60000,
  });
  const report = await page.evaluate(
    async (input) => {
      const raf = () => new Promise(requestAnimationFrame);
      for (
        let i = 0;
        i < 1800 && !document.querySelector("[data-kimi-frame]");
        i++
      )
        await raf();
      if (!document.querySelector("[data-kimi-frame]"))
        throw new Error("Episode 007 did not mount.");
      await document.fonts.ready;
      const subtitleNode = document.querySelector('[data-subtitle="stable"]');
      const characterNode = document.querySelector("[data-character-pose]");
      const checks = [];
      const visible = (node, r) => {
        let box = {
          left: r.left,
          top: r.top,
          right: r.right,
          bottom: r.bottom,
        };
        for (let p = node; p; p = p.parentElement) {
          const s = getComputedStyle(p);
          if (
            s.display === "none" ||
            s.visibility === "hidden" ||
            Number(s.opacity) <= 0.01
          )
            return null;
          if (p !== node) {
            const b = p.getBoundingClientRect();
            if (/hidden|clip/.test(s.overflowX)) {
              box.left = Math.max(box.left, b.left);
              box.right = Math.min(box.right, b.right);
            }
            if (/hidden|clip/.test(s.overflowY)) {
              box.top = Math.max(box.top, b.top);
              box.bottom = Math.min(box.bottom, b.bottom);
            }
          }
          if (p.hasAttribute("data-kimi-design")) break;
        }
        return box.right > box.left && box.bottom > box.top ? box : null;
      };
      for (const frame of input.frames) {
        window.remotion_setFrame(frame, input.composition, 0);
        for (
          let i = 0;
          i < 180 &&
          document.querySelector("[data-kimi-frame]")?.dataset.kimiFrame !==
            String(frame);
          i++
        )
          await raf();
        await raf();
        const design = document.querySelector("[data-kimi-design]");
        const root = design.getBoundingClientRect();
        const scale = root.width / 1080;
        const norm = (r) => ({
          left: (r.left - root.left) / scale,
          right: (r.right - root.left) / scale,
          top: (r.top - root.top) / scale,
          bottom: (r.bottom - root.top) / scale,
        });
        const walker = document.createTreeWalker(design, NodeFilter.SHOW_TEXT);
        const text = [];
        while (walker.nextNode()) {
          const n = walker.currentNode;
          if (!n.textContent.trim()) continue;
          const range = document.createRange();
          range.selectNodeContents(n);
          const rects = [...range.getClientRects()]
            .map((r) => visible(n.parentElement, r))
            .filter(Boolean)
            .map(norm);
          if (rects.length)
            text.push({
              text: n.textContent.trim(),
              rects,
              flow: n.parentElement.closest("[data-kimi-focus]"),
            });
        }
        const overflows = text.filter((t) =>
          t.rects.some(
            (r) => r.left < 83 || r.right > 997 || r.top < 0 || r.bottom > 1381,
          ),
        );
        const collisions = [];
        for (let i = 0; i < text.length; i++)
          for (let j = i + 1; j < text.length; j++) {
            // Range rectangles contain unused font ascent/descent. Adjacent
            // lines in ONE authored text flow overlap in metrics, not glyphs.
            // Compare independent units; line spacing is reviewed in captures.
            if (text[i].flow && text[i].flow === text[j].flow) continue;
            if (
              text[i].rects.some((a) =>
                text[j].rects.some(
                  (b) =>
                    Math.min(a.right, b.right) - Math.max(a.left, b.left) > 2 &&
                    Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top) > 3,
                ),
              )
            )
              collisions.push([text[i].text, text[j].text]);
          }
        const subtitle = document.querySelector('[data-subtitle="stable"]');
        const sr = document.createRange();
        sr.selectNodeContents(subtitle);
        const captionRects = [...sr.getClientRects()]
          .filter((r) => r.width > 0)
          .map(norm);
        const sb = norm(subtitle.getBoundingClientRect());
        const character = document.querySelector("[data-character-pose]");
        const cb = norm(character.getBoundingClientRect());
        const expected =
          input.captions.find(
            (c) =>
              (frame * 1000) / 30 >= c.startMs && (frame * 1000) / 30 < c.endMs,
          )?.text ?? "";
        const scores = [...design.querySelectorAll("[data-score]")]
          .filter((el) => visible(el, el.getBoundingClientRect()))
          .map((el) => ({
            id: el.dataset.model,
            value: Number(el.dataset.score),
            barValue: Number(el.dataset.barValue),
            geometricValue:
              (el.querySelector("[data-benchmark-bar]").getBoundingClientRect()
                .width /
                el
                  .querySelector("[data-benchmark-track]")
                  .getBoundingClientRect().width) *
              100,
          }));
        const chart = design.querySelector("[data-benchmark-scale-max]");
        const source = [...design.querySelectorAll("[data-kimi-source]")]
          .filter((el) => visible(el, el.getBoundingClientRect()))
          .map((el) => el.textContent);
        const priceRatios = [
          ...design.querySelectorAll("[data-price-bar-kind]"),
        ]
          .filter((el) => visible(el, el.getBoundingClientRect()))
          .map((el) => ({
            model: el.closest("[data-model]").dataset.model,
            kind: el.dataset.priceBarKind,
            ratio:
              el.firstElementChild.getBoundingClientRect().width /
              el.getBoundingClientRect().width,
            max: Number(el.dataset.priceScaleMax),
          }));
        const benchmarkActive =
          frame >= Math.round(input.timing.code * 30) &&
          frame < Math.round(input.timing.closing * 30);
        const benchmarkIsTerminal =
          frame >= Math.round(input.timing.terminal * 30);
        const attributionCorrect =
          !benchmarkActive ||
          source.includes(
            benchmarkIsTerminal
              ? "ANGKA DIHIMPUN MOONSHOT"
              : "BENCHMARK INTERNAL MOONSHOT",
          );
        checks.push({
          frame,
          acknowledged:
            document.querySelector("[data-kimi-frame]")?.dataset.kimiFrame ===
            String(frame),
          overflows,
          collisions,
          visibleText: text.map((t) => t.text),
          logos: [...design.querySelectorAll("img[data-model-logo]")]
            .filter((el) => visible(el, el.getBoundingClientRect()))
            .map((el) => ({
              model: el.dataset.modelLogo,
              loaded: el.complete && el.naturalWidth > 0,
              src: el.src,
            })),
          motionDiagrams: [...design.querySelectorAll("[data-motion-diagram]")]
            .filter((el) => visible(el, el.getBoundingClientRect()))
            .map((el) => el.dataset.motionDiagram),
          subtitleStable: subtitle === subtitleNode,
          subtitleMatches: subtitle.textContent === expected,
          subtitleLines: new Set(captionRects.map((r) => Math.round(r.top)))
            .size,
          subtitleAnchorCorrect:
            Math.abs(sb.bottom - 1705) < 0.8 && Math.abs(sb.left - 84) < 0.8,
          characterStable:
            character === characterNode &&
            Math.abs(cb.bottom - 1740) < 0.8 &&
            Math.abs(cb.right - 996) < 0.8,
          source,
          scores,
          priceRatios,
          attributionCorrect,
          accurateChartGeometry: scores.every(
            (s) => Math.abs(s.geometricValue - s.value) < 0.02,
          ),
          chartScale: chart
            ? [
                Number(chart.dataset.benchmarkScaleMin),
                Number(chart.dataset.benchmarkScaleMax),
              ]
            : null,
          fontReady: document.fonts.check('800 100px "Plus Jakarta Sans"'),
        });
      }
      return { checks };
    },
    { frames, composition, captions, timing },
  );
  const captures = [];
  const revealLogos = report.checks.find((c) => c.frame === 380)?.logos ?? [];
  if (
    revealLogos.length !== 3 ||
    revealLogos.some(
      (l, i) => !l.loaded || l.model !== ["kimi", "opus", "astra"][i],
    )
  )
    errors.push("Three model logos were not loaded in the reveal scene.");
  for (const [frame, expected] of [
    [1010, [61.2, 58.5, 66.5]],
    [1350, [65.7, 66.4, 58.2]],
  ]) {
    const check = report.checks.find((c) => c.frame === frame);
    if (
      !check ||
      check.scores.length !== 3 ||
      check.scores.some(
        (s, i) =>
          s.id !== ["kimi", "opus", "astra"][i] ||
          Math.abs(s.value - expected[i]) > 0.001,
      ) ||
      String(check.chartScale) !== "0,100"
    )
      errors.push(`Incorrect benchmark values/order/scale at frame ${frame}.`);
  }
  const pricing = report.checks.find((c) => c.frame === 700)?.priceRatios ?? [];
  if (
    pricing.length !== 6 ||
    pricing.some(
      (p) =>
        Math.abs(p.ratio - { kimi: 0.2, opus: 0.4, astra: 1 }[p.model]) >
          0.002 || p.max !== (p.kind === "input" ? 10 : 50),
    )
  )
    errors.push("Incorrect price bar scaling.");
  for (const frame of [
    80,
    145,
    380,
    550,
    700,
    1010,
    1200,
    1350,
    1500,
    1660,
    lastFrame,
  ]) {
    const clip = await page.evaluate(
      async (f, id) => {
        window.remotion_setFrame(f, id, 0);
        for (
          let i = 0;
          i < 180 &&
          document.querySelector("[data-kimi-frame]")?.dataset.kimiFrame !==
            String(f);
          i++
        )
          await new Promise(requestAnimationFrame);
        await new Promise(requestAnimationFrame);
        const b = document
          .querySelector("[data-kimi-design]")
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
      composition,
    );
    const capture = await client.send("Page.captureScreenshot", {
      format: "png",
      clip,
      captureBeyondViewport: true,
    });
    const path = `${outputDir}/frame-${frame}.png`;
    await fs.writeFile(path, Buffer.from(capture.value.data, "base64"));
    captures.push({ frame, path });
    if ([380, 700, 1010, 1350].includes(frame)) {
      const mobile = await client.send("Page.captureScreenshot", {
        format: "png",
        clip: { ...clip, scale: clip.scale / 2 },
        captureBeyondViewport: true,
      });
      await fs.writeFile(
        `${outputDir}/mobile-${frame}.png`,
        Buffer.from(mobile.value.data, "base64"),
      );
    }
  }
  // Same Studio canvas, capture at a 540px-wide mobile viewing size as well.
  const clip = await page.evaluate(() => {
    const b = document
      .querySelector("[data-kimi-design]")
      .getBoundingClientRect();
    return {
      x: b.left,
      y: b.top,
      width: b.width,
      height: b.height,
      scale: 540 / b.width,
    };
  });
  const mobile = await client.send("Page.captureScreenshot", {
    format: "png",
    clip,
    captureBeyondViewport: true,
  });
  await fs.writeFile(
    `${outputDir}/mobile-closing.png`,
    Buffer.from(mobile.value.data, "base64"),
  );
  const failures = report.checks.filter(
    (c) =>
      !c.acknowledged ||
      !c.subtitleStable ||
      !c.subtitleMatches ||
      c.subtitleLines > 2 ||
      !c.subtitleAnchorCorrect ||
      !c.characterStable ||
      !c.fontReady ||
      !c.attributionCorrect ||
      !c.accurateChartGeometry ||
      c.logos.some((l) => !l.loaded) ||
      c.overflows.length ||
      c.collisions.length ||
      !c.visibleText.length,
  );
  await fs.writeFile(
    ".preview/kimi-comparison/studio-qa.json",
    JSON.stringify({ ...report, errors, captures, failures }, null, 2),
  );
  console.log(
    JSON.stringify(
      {
        checkedFrames: frames.length,
        failures: failures.length,
        runtimeErrors: errors,
        details: failures.map((c) => ({
          frame: c.frame,
          overflows: c.overflows,
          collisions: c.collisions,
          subtitleLines: c.subtitleLines,
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

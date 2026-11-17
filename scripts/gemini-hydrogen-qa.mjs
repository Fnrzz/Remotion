import fs from "node:fs/promises";
import { createHash } from "node:crypto";
import { openBrowser } from "@remotion/renderer";

// Inspect live Studio. No bundling, still rendering, or MP4 export.
const id = "GeminiHydrogen012";
const url = `http://localhost:3000/${id}`;
const out = ".preview/gemini-hydrogen";
const timing = JSON.parse(
  await fs.readFile("src/episodes/gemini-hydrogen/data/timing.json", "utf8"),
);
const captions = JSON.parse(
  await fs.readFile("src/episodes/gemini-hydrogen/data/subtitles.json", "utf8"),
);
const last = timing.audio.durationFrames - 1;
const around = (f) => [f - 1, f, f + 1];
const captures = [
  20,
  65,
  103,
  210,
  371,
  445,
  646,
  718,
  812,
  896,
  953,
  1015,
  1065,
  1107,
  1135,
  1168,
  1185,
  1302,
  1405,
  1505,
  1615,
  1735,
  last,
];
const frames = [
  ...new Set([
    0,
    1,
    6,
    ...captures,
    ...timing.scenes.flatMap((s) => [
      ...around(s.startFrame),
      ...around(s.endFrameExclusive),
    ]),
    ...captions.flatMap((c) => around(Math.ceil((c.startMs * 30) / 1000))),
    ...timing.cues.flatMap((c) => around(c.frame)),
    ...Array.from({ length: 100 }, (_, i) => Math.round((i * last) / 99)),
  ]),
]
  .filter((f) => f >= 0 && f <= last)
  .sort((a, b) => a - b);
const report = {
  id,
  url,
  frames: frames.length,
  checks: [],
  errors: [],
  screenshots: [],
  failures: [],
};
const hash = async () =>
  createHash("sha256")
    .update(await fs.readFile(`public/${timing.audio.path}`))
    .digest("hex");
await fs.mkdir(`${out}/studio`, { recursive: true });
let browser;
try {
  report.originalAudioHash = await hash();
  if (report.originalAudioHash !== timing.audio.sha256)
    throw new Error("Narration fingerprint differs from alignment manifest");
  if (
    timing.scenes[0].startFrame !== 0 ||
    timing.scenes.at(-1).endFrameExclusive !== last + 1 ||
    timing.scenes.some(
      (s, i) => i && s.startFrame !== timing.scenes[i - 1].endFrameExclusive,
    )
  )
    throw new Error("Scene coverage is not continuous");
  browser = await openBrowser("chrome", {
    browserExecutable:
      "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
    logLevel: "error",
  });
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
    report.errors.push(e.exception?.description ?? e.text),
  );
  await client.send("Runtime.enable");
  await page.setViewport({ width: 1800, height: 1600, deviceScaleFactor: 1 });
  await page.goto({ url, timeout: 60000 });
  report.readiness = await page.evaluate(
    async ({ id, path }) => {
      const wait = (predicate, label) =>
        new Promise((resolve, reject) => {
          let h;
          const watchdog = setTimeout(() => {
            cancelAnimationFrame(h);
            reject(new Error(`Timeout: ${label}`));
          }, 30000);
          const check = () => {
            if (predicate()) {
              clearTimeout(watchdog);
              resolve();
            } else h = requestAnimationFrame(check);
          };
          check();
        });
      const audio = () =>
        [...document.querySelectorAll("audio")].find((a) =>
          decodeURIComponent(a.currentSrc || a.src).endsWith(path),
        );
      const imagesReady = () =>
        [...document.querySelectorAll("[data-full-canvas-overlays] img")].every(
          (i) => i.complete && i.naturalWidth > 0,
        );
      await wait(
        () =>
          window.remotion_setFrame &&
          document.querySelector("[data-hydrogen-design]") &&
          document.querySelector("[data-episode-frame]"),
        "Hydrogen composition",
      );
      await wait(
        () =>
          audio()?.readyState >= 1 &&
          imagesReady() &&
          [...document.fonts].some(
            (f) =>
              f.family.replaceAll('"', "") === "Plus Jakarta Sans" &&
              f.status === "loaded",
          ),
        "audio, images and local fonts",
      );
      const sub = document.querySelector('[data-subtitle="stable"]');
      const char = document.querySelector("[data-character-pose]");
      window.__hydrogenQA = {
        sub,
        char,
        audio,
        seek: async (frame) => {
          window.remotion_setFrame(frame, id, 0);
          await wait(
            () =>
              document.querySelector("[data-episode-frame]")?.dataset
                .episodeFrame === String(frame),
            `frame ${frame}`,
          );
          let painted = false;
          requestAnimationFrame(() =>
            requestAnimationFrame(() => {
              painted = true;
            }),
          );
          await wait(() => painted && imagesReady(), "paint");
        },
      };
      return {
        title: document.title,
        route: location.pathname,
        audioDuration: audio().duration,
        font: document.fonts.check('600 36px "Plus Jakarta Sans"'),
      };
    },
    { id, path: timing.audio.path },
  );
  report.checks = await page.evaluate(
    async ({ frames, captions, seconds }) => {
      const qa = window.__hydrogenQA;
      const results = [];
      for (const frame of frames) {
        await qa.seek(frame);
        const root = document
          .querySelector("[data-hydrogen-design]")
          .getBoundingClientRect();
        const scale = root.width / 1080;
        const norm = (r) => ({
          left: (r.left - root.left) / scale,
          right: (r.right - root.left) / scale,
          top: (r.top - root.top) / scale,
          bottom: (r.bottom - root.top) / scale,
        });
        const textRects = (el) => {
          const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
          const rs = [];
          for (let n = walker.nextNode(); n; n = walker.nextNode()) {
            if (!n.textContent.trim()) continue;
            const range = document.createRange();
            range.selectNodeContents(n);
            rs.push(
              ...[...range.getClientRects()]
                .filter((r) => r.width > 0)
                .map(norm),
            );
          }
          return rs;
        };
        const sub = document.querySelector('[data-subtitle="stable"]');
        const char = document.querySelector("[data-character-pose]");
        const sb = norm(sub.getBoundingClientRect());
        const cb = norm(char.getBoundingClientRect());
        const lines = textRects(sub);
        // Ignore Studio's retained, visibility:hidden premounted scenes.
        const active = (selector) =>
          [...document.querySelectorAll(selector)].find((el) =>
            el.checkVisibility({ checkVisibilityCSS: true }),
          );
        const h = active("[data-hydrogen-headline]");
        const hRects = h ? textRects(h) : [];
        const content = active("[data-kronos-content]");
        const diagram = content?.querySelector("svg");
        const svgText = diagram
          ? [...diagram.querySelectorAll("text")]
              .filter((el) => el.checkVisibility({ checkOpacity: true }))
              .flatMap(textRects)
          : [];
        const expected =
          captions.find(
            (c) =>
              (frame * 1000) / 30 >= c.startMs && (frame * 1000) / 30 < c.endMs,
          )?.text ?? "";
        const audio = qa.audio();
        results.push({
          frame,
          persistent:
            sub === qa.sub &&
            char === qa.char &&
            document.querySelectorAll('[data-subtitle="stable"]').length === 1,
          captionMatches: sub.textContent === expected,
          caption: sub.textContent,
          captionLines: new Set(lines.map((r) => Math.round(r.top))).size,
          captionFits: lines.every(
            (r) =>
              r.left >= 83.5 &&
              r.right <= 634.5 &&
              r.top >= 1569.5 &&
              r.bottom <= 1705.5,
          ),
          subtitleAnchors:
            Math.abs(sb.left - 84) < 0.5 &&
            Math.abs(sb.bottom - 1705) < 0.5 &&
            Math.abs(sb.top - 1570) < 0.5,
          characterAnchors:
            Math.abs(cb.right - 996) < 0.5 &&
            Math.abs(cb.bottom - 1740) < 0.5 &&
            Math.abs(cb.right - cb.left - 320) < 0.5,
          characterStationary:
            getComputedStyle(char).transform === "none" &&
            getComputedStyle(char).translate === "none" &&
            getComputedStyle(char).rotate === "none",
          headline: h?.textContent,
          headlineFits:
            hRects.length > 0 &&
            hRects.every(
              (r) =>
                r.left >= 83.5 &&
                r.right <= 996.5 &&
                r.top >= 220 &&
                r.bottom <= 650,
            ),
          diagramTextFits: svgText.every(
            (r) =>
              r.left >= 82 &&
              r.right <= 998 &&
              r.top >= 710 &&
              r.bottom <= 1380.5,
          ),
          outOfBoundsText: svgText.filter(
            (r) => r.left < 82 || r.right > 998 || r.bottom > 1380.5,
          ),
          diagram: Boolean(diagram),
          watermark:
            document.querySelector("[data-full-canvas-watermark]")
              ?.textContent === "@prof.deps",
          audio: {
            seconds: audio.duration,
            rate: audio.playbackRate,
            valid:
              Math.abs(audio.duration - seconds) < 0.08 &&
              audio.playbackRate === 1 &&
              !audio.error,
          },
        });
      }
      return results;
    },
    { frames, captions, seconds: timing.audio.durationSeconds },
  );
  for (const frame of captures) {
    const clip = await page.evaluate(async (frame) => {
      await window.__hydrogenQA.seek(frame);
      const r = document
        .querySelector("[data-hydrogen-design]")
        .getBoundingClientRect();
      return { x: r.left, y: r.top, width: r.width, height: r.height };
    }, frame);
    for (const size of [1080, 540]) {
      const shot = await client.send("Page.captureScreenshot", {
        format: "png",
        clip: { ...clip, scale: size / clip.width },
        captureBeyondViewport: true,
      });
      const file = `${out}/studio/${size}-${frame}.png`;
      await fs.writeFile(file, Buffer.from(shot.value.data, "base64"));
      report.screenshots.push(file);
    }
  }
  report.finalAudioHash = await hash();
  if (report.finalAudioHash !== report.originalAudioHash)
    report.errors.push("Original audio was modified");
} catch (error) {
  report.errors.push(error.stack ?? String(error));
} finally {
  if (browser) await browser.close({ silent: true });
  report.failures = report.checks.filter(
    (c) =>
      c.captionLines > 2 ||
      !c.persistent ||
      !c.captionMatches ||
      !c.captionFits ||
      !c.subtitleAnchors ||
      !c.characterAnchors ||
      !c.characterStationary ||
      !c.headlineFits ||
      !c.diagramTextFits ||
      !c.diagram ||
      !c.watermark ||
      !c.audio.valid,
  );
  report.passed =
    report.errors.length === 0 &&
    report.failures.length === 0 &&
    report.checks.length === frames.length;
  await fs.writeFile(
    `${out}/studio-qa.json`,
    JSON.stringify(report, null, 2) + "\n",
  );
  console.log(
    JSON.stringify(
      {
        passed: report.passed,
        checked: report.checks.length,
        screenshots: report.screenshots.length,
        readiness: report.readiness,
        errors: report.errors,
        failureCount: report.failures.length,
        failures: report.failures.slice(0, 20).map((c) => ({
          frame: c.frame,
          headlineFits: c.headlineFits,
          diagramTextFits: c.diagramTextFits,
          captionFits: c.captionFits,
          lines: c.captionLines,
          outOfBoundsText: c.outOfBoundsText,
        })),
      },
      null,
      2,
    ),
  );
  if (!report.passed) process.exitCode = 1;
}

import fs from "node:fs/promises";
import { createHash } from "node:crypto";
import { openBrowser } from "@remotion/renderer";

// Inspect the live Studio, not a bundle/export. Captures are browser screenshots.
const id = "ClaudeFable010";
const manifest = JSON.parse(
  await fs.readFile("src/episodes/claude-fable/data/timing.json", "utf8"),
);
const captions = JSON.parse(
  await fs.readFile("src/episodes/claude-fable/data/subtitles.json", "utf8"),
);
const finalFrame = Math.ceil(manifest.audio.durationSeconds * 30) - 1;
const captures = [
  ...new Set([
    0,
    18,
    55,
    1400,
    1450,
    ...manifest.scenes.flatMap((s) => [
      Math.round((s.startSeconds + 0.35) * 30),
      Math.round((s.startSeconds + s.endSeconds) * 15),
      Math.round(s.endSeconds * 30) - 1,
    ]),
    ...manifest.cues.map((c) => Math.round(c.seconds * 30) + 6),
    finalFrame,
  ]),
].filter((f) => f >= 0 && f <= finalFrame);
const frames = [
  ...new Set([
    ...captures,
    ...Array.from({ length: 90 }, (_, i) => Math.round((i * finalFrame) / 89)),
    ...captions.flatMap((c) =>
      [-1, 0, 1].map((d) => Math.ceil((c.startMs * 30) / 1000) + d),
    ),
  ]),
]
  .filter((f) => f >= 0 && f <= finalFrame)
  .sort((a, b) => a - b);
await fs.mkdir(".preview/claude-fable/studio", { recursive: true });
const browser = await openBrowser("chrome", {
  browserExecutable:
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  logLevel: "error",
});
const errors = [];
const originalHash = createHash("sha256")
  .update(await fs.readFile(`public/${manifest.audio.path}`))
  .digest("hex");
if (originalHash !== manifest.audio.sha256)
  errors.push("Original recording fingerprint changed");
if (
  manifest.scenes.some(
    (s, i) => i && s.startFrame !== manifest.scenes[i - 1].endFrameExclusive,
  )
)
  errors.push("Scene gap/overlap in manifest");
if ((finalFrame + 1) / 30 < manifest.audio.durationSeconds)
  errors.push("Composition truncates audio");
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
    async ({ id, frames, captions, expectedDuration }) => {
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
      for (const frame of frames) {
        window.remotion_setFrame(frame, id, 0);
        for (
          let i = 0;
          i < 180 &&
          document.querySelector("[data-episode-frame]").dataset
            .episodeFrame !== String(frame);
          i++
        )
          await raf();
        await raf();
        const root = document
          .querySelector("[data-fable-design]")
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
          captions.find(
            (c) =>
              (frame * 1000) / 30 >= c.startMs && (frame * 1000) / 30 < c.endMs,
          )?.text ?? "";
        const headline = [
          ...document.querySelectorAll("[data-fable-headline]"),
        ].filter(
          (el) => el.getBoundingClientRect().width && el.checkVisibility(),
        );
        const headlineRects = headline.flatMap((el) => {
          const r = document.createRange();
          r.selectNodeContents(el);
          return [...r.getClientRects()].map(norm);
        });
        const audio = [...document.querySelectorAll("audio")].find((a) =>
          decodeURIComponent(a.currentSrc || a.src).includes(
            "vo_test claude fable 5.2.mp3",
          ),
        );
        checks.push({
          frame,
          persistent:
            persistent === sub &&
            character === document.querySelector("[data-character-pose]"),
          captionMatches: sub.textContent === expected,
          lines: new Set(rects.map((r) => Math.round(r.top))).size,
          captionFits: rects.every(
            (r) =>
              r.left >= 83 &&
              r.right <= 635 &&
              r.top >= 1569 &&
              r.bottom <= 1706,
          ),
          anchors:
            Math.abs(sb.bottom - 1705) < 1 &&
            Math.abs(cb.bottom - 1740) < 1 &&
            Math.abs(cb.right - 996) < 1,
          headlineFits: headlineRects.every(
            (r) => r.left >= 82 && r.right <= 998 && r.bottom < 650,
          ),
          disclosure: [
            ...document.querySelectorAll("[data-conceptual-disclosure]"),
          ].some(
            (el) =>
              el.checkVisibility() && el.textContent === "ILUSTRASI KONSEPTUAL",
          ),
          fontReady: document.fonts.check('800 100px "Plus Jakarta Sans"'),
          audio: audio
            ? {
                duration: audio.duration,
                rate: audio.playbackRate,
                readyState: audio.readyState,
                error: audio.error?.message ?? null,
                valid:
                  Number.isFinite(audio.duration) &&
                  Math.abs(audio.duration - expectedDuration) < 0.08 &&
                  audio.playbackRate === 1 &&
                  !audio.error,
              }
            : null,
          closingArtwork:
            document.querySelector("[data-closing-network]")?.outerHTML ?? null,
          eightDayProgress: [
            ...document.querySelectorAll("[data-eight-day-progress]"),
          ].map((el) => Number(el.dataset.eightDayProgress)),
          networkExpansion: [
            ...document.querySelectorAll("[data-network-expansion]"),
          ].map((el) => Number(el.dataset.networkExpansion)),
          screenPower: [
            ...document.querySelectorAll("[data-screen-power]"),
          ].map((el) => Number(el.dataset.screenPower)),
          domNodes: document.querySelectorAll("[data-fable-design] *").length,
        });
      }
      return checks;
    },
    { id, frames, captions, expectedDuration: manifest.audio.durationSeconds },
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
        await Promise.all(
          [...document.querySelectorAll("[data-full-canvas-overlays] img")].map(
            (i) => i.decode(),
          ),
        );
        const b = document
          .querySelector("[data-fable-design]")
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
        `.preview/claude-fable/studio/${size}-${frame}.png`,
        Buffer.from(shot.value.data, "base64"),
      );
    }
  }
  const failures = checks.filter(
    (c) =>
      !c.persistent ||
      !c.captionMatches ||
      !c.captionFits ||
      !c.anchors ||
      !c.headlineFits ||
      !c.disclosure ||
      !c.fontReady ||
      c.lines > 2 ||
      (c.audio && !c.audio.valid),
  );
  if (!checks.some((c) => c.audio?.valid))
    errors.push("Original audio not verified in the Studio");
  if (
    checks.find((c) => c.frame === 1400)?.closingArtwork !==
    checks.find((c) => c.frame === finalFrame)?.closingArtwork
  )
    errors.push("Closing artwork does not hold through final word");
  const eightDayFrame =
    Math.round(manifest.cues.find((c) => c.id === "eightDays").seconds * 30) +
    6;
  if (
    !checks.find((c) => c.frame === eightDayFrame)?.eightDayProgress.includes(1)
  )
    errors.push("Eight-day timeline did not reach day 8");
  const hookFrame =
    Math.round(
      manifest.cues.find((c) => c.id === "hookNetworkPeak").seconds * 30,
    ) + 6;
  if (!checks.find((c) => c.frame === hookFrame)?.networkExpansion.includes(1))
    errors.push("Network did not peak on narration cue");
  const bootFrame =
    Math.round(manifest.cues.find((c) => c.id === "boot").seconds * 30) + 6;
  if (!checks.find((c) => c.frame === bootFrame)?.screenPower.includes(1))
    errors.push("Laptop did not power on at narration cue");
  const report = {
    checkedFrames: checks.length,
    finalFrame,
    errors,
    failures,
    checks,
  };
  await fs.writeFile(
    ".preview/claude-fable/studio-qa.json",
    JSON.stringify(report, null, 2) + "\n",
  );
  console.log(
    JSON.stringify(
      { checkedFrames: checks.length, finalFrame, errors, failures },
      null,
      2,
    ),
  );
  if (errors.length || failures.length) process.exitCode = 1;
} finally {
  await browser.close({ silent: true });
}

import fs from "node:fs/promises";
import { bundle } from "@remotion/bundler";
import { renderStill, selectComposition } from "@remotion/renderer";

const browserExecutable =
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const serveUrl = await bundle({ entryPoint: "src/index.ts" });
const inputProps = { audioSrc: "assets/audio/vo-agent-dekstop.mp3" };
const composition = await selectComposition({
  serveUrl,
  id: "AgentDesktop006",
  inputProps,
  browserExecutable,
});
const dir = ".preview/agent-desktop/stills";
await fs.mkdir(dir, { recursive: true });
const timing = JSON.parse(
  await fs.readFile("src/episodes/agent-desktop/data/timing.json", "utf8"),
);
const frames = [
  ...new Set([
    Math.round(timing.click * 30),
    Math.round((timing.typing + 0.4) * 30),
    Math.round((timing.reveal + 0.8) * 30),
    Math.round((timing.clarify + 0.6) * 30),
    Math.round((timing.read + 1) * 30),
    Math.round((timing.action + 0.85) * 30),
    Math.round((timing.check + 0.7) * 30),
    Math.round((timing.limits + 1) * 30),
    Math.round((timing.permissions + 0.8) * 30),
    Math.round((timing.sent + 0.7) * 30),
    Math.round((timing.boundary + 0.7) * 30),
    composition.durationInFrames - 3,
  ]),
];
for (const frame of frames) {
  await renderStill({
    composition,
    serveUrl,
    inputProps,
    output: `${dir}/frame-${frame}.png`,
    frame,
    browserExecutable,
  });
  console.log(`Reviewed still: ${frame}`);
}
for (const frame of [
  Math.round((timing.read + 1) * 30),
  composition.durationInFrames - 3,
]) {
  await renderStill({
    composition: { ...composition, width: 540, height: 960 },
    serveUrl,
    inputProps,
    output: `${dir}/responsive-${frame}.png`,
    frame,
    browserExecutable,
  });
}
console.log(
  `Composition: ${composition.durationInFrames} frames / ${composition.fps} fps`,
);

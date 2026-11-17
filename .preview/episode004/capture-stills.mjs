import fs from "node:fs/promises";
import { bundle } from "@remotion/bundler";
import { renderStill, selectComposition } from "@remotion/renderer";

const frames = [40, 110, 560, 620, 760, 900, 1030, 1110, 1240, 1330, 1370];
const serveUrl = await bundle({ entryPoint: "src/index.ts" });
const composition = await selectComposition({
  serveUrl,
  id: "MistralLarge4News",
  inputProps: {
    audioSrc: "assets/audio/vo-mistral.mp3",
    showTikTokOverlay: false,
  },
});
await fs.mkdir(".preview/episode004/stills", { recursive: true });
for (const frame of frames) {
  await renderStill({
    composition,
    serveUrl,
    output: `.preview/episode004/stills/frame-${frame}.png`,
    frame,
    inputProps: {
      audioSrc: "assets/audio/vo-mistral.mp3",
      showTikTokOverlay: false,
    },
  });
  console.log(frame);
}

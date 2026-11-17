import fs from "node:fs/promises";
import { bundle } from "@remotion/bundler";
import { renderStill, selectComposition } from "@remotion/renderer";

const serveUrl = await bundle({ entryPoint: "src/index.ts" });
const inputProps = {
  audioSrc: "assets/audio/vo-kronos.mp3",
};
const composition = await selectComposition({
  serveUrl,
  id: "KronosDocumentary",
  inputProps,
  browserExecutable:
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
});
const outputDir = process.env.KRONOS_QA_DIR ?? ".preview/kronos";
await fs.mkdir(`${outputDir}/stills`, { recursive: true });
for (const frame of [
  40, 110, 200, 330, 450, 590, 660, 760, 810, 940, 1140, 1350, 1424,
]) {
  await renderStill({
    composition,
    serveUrl,
    inputProps,
    output: `${outputDir}/stills/frame-${frame}.png`,
    frame,
    browserExecutable:
      "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  });
  console.log(`Still ${frame}`);
}
await renderStill({
  composition: { ...composition, width: 540, height: 960 },
  serveUrl,
  inputProps,
  output: `${outputDir}/stills/responsive-540.png`,
  frame: 760,
  browserExecutable:
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
});
console.log("Responsive 540×960");
await renderStill({
  composition: { ...composition, width: 540, height: 960 },
  serveUrl,
  inputProps,
  output: `${outputDir}/stills/responsive-closing-540.png`,
  frame: 1350,
  browserExecutable:
    "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
});
console.log("Responsive closing 540×960");

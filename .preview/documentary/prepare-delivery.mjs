import fs from "node:fs/promises";
import crypto from "node:crypto";
import { execFileSync } from "node:child_process";

const assets = JSON.parse(
  await fs.readFile("public/assets/documentary/manifest.json", "utf8"),
);
const checks = [];
for (const asset of assets) {
  const path = `public/assets/documentary/${asset.file}`;
  if (!/\.(jpe?g|png|webp|svg)$/i.test(path))
    throw new Error(`Invalid media type: ${path}`);
  const meta = JSON.parse(
    execFileSync(
      "ffprobe",
      ["-v", "error", "-count_frames", "-show_streams", "-of", "json", path],
      { encoding: "utf8" },
    ),
  );
  if (meta.streams.length !== 1 || Number(meta.streams[0].nb_read_frames) !== 1)
    throw new Error(`Animated or invalid image ${path}`);
  if (
    !asset.creator ||
    !asset.sourceUrl ||
    !asset.permissionBasis ||
    !asset.licenseUrl
  )
    throw new Error(`Incomplete rights record ${path}`);
  checks.push({
    file: asset.file,
    width: meta.streams[0].width,
    height: meta.streams[0].height,
    frames: meta.streams[0].nb_read_frames,
    license: asset.license,
    sha256: crypto
      .createHash("sha256")
      .update(await fs.readFile(path))
      .digest("hex"),
    used: asset.id !== "san-francisco-programmer",
  });
}
await fs.writeFile(
  ".preview/documentary/asset-qa.json",
  JSON.stringify({ assets: checks, failures: [] }, null, 2),
);
const used = assets.filter((a) => a.id !== "san-francisco-programmer");
let credits = `EPISODE 003 — GEMINI 4 CARBON / DOCUMENTARY REVISION\n\nIndependent Indonesian editorial report by @prof.deps.\nGoogle and Gemini are trademarks of Google LLC. This video is not affiliated with or endorsed by Google.\n\nFACTUAL SOURCE\nGoogle / Koray Kavukcuoglu, 28 October 2026:\nhttps://blog.google/innovation-and-ai/models-and-research/gemini-models/introducing-gemini-4-carbon/\nScenes 02 and 05 are original editorial summaries, not official screenshots or quotations.\n\nPHOTO CREDITS\nAll photos illustrate context, not a Carbon demonstration, Google's internal team or an actual security incident. All displayed photos: rectangular crop / rounded framing / restrained animated zoom; source files remain unmodified.\n\n`;
for (const a of used) {
  const title = decodeURIComponent(
    a.sourceUrl.split("File:").at(-1),
  ).replaceAll("_", " ");
  credits += `${title}\nCreator: ${a.creator}\n${a.sourceShortUrl}\n${a.license} — ${a.licenseUrl}\n\n`;
}
credits += `The Google/DeepMind London office photo is archive imagery from 2017, not documentation of the Carbon team. Its adapted visual presentation is available under CC BY-SA 4.0. No exclusive rights are claimed over this photograph or its adaptation; unrelated authored elements are not asserted to be relicensed.\n\nGemini wordmark: Google LLC; Wikimedia Commons PD-textlogo provenance:\nhttps://commons.wikimedia.org/wiki/File:Google_Gemini_logo.svg\nOriginal colors preserved. The separate “4 CARBON” label is editorial, not a verified official model-specific logo.\n\nOriginal voice-over, Indonesian caption cues and scene timing preserved unchanged. No downloaded footage, GIF or screen recording was used.\n\nPUBLICATION: Retain these credits in the post description or through a clearly accessible credits link. Full asset provenance and usage notes: public/assets/documentary/manifest.json, SOURCES.md, EDITORIAL-DECISIONS.md.\n`;
await fs.mkdir("out", { recursive: true });
await fs.writeFile(
  "out/episode-003-gemini-4-carbon-documentary-CREDITS.txt",
  credits,
);
console.log(
  JSON.stringify(
    {
      verifiedStaticImages: checks.length,
      usedPhotos: used.length,
      creditsFile: "out/episode-003-gemini-4-carbon-documentary-CREDITS.txt",
      failures: [],
    },
    null,
    2,
  ),
);

import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import fs from "node:fs/promises";

const file = "out/agent-desktop-006.mp4";
const source = "public/assets/audio/vo-agent-dekstop.mp3";
const hash = createHash("sha256")
  .update(await fs.readFile(source))
  .digest("hex");
if (hash !== "76f1b456a768f8db9e67f5d1fb493191b83cfadd1fc9d5520c55e00d286e5dfb")
  throw new Error("Source audio changed.");
const probe = JSON.parse(
  execFileSync(
    "ffprobe",
    ["-v", "error", "-show_streams", "-show_format", "-of", "json", file],
    { encoding: "utf8" },
  ),
);
const video = probe.streams.find((s) => s.codec_type === "video");
const audio = probe.streams.find((s) => s.codec_type === "audio");
if (
  video.codec_name !== "h264" ||
  audio.codec_name !== "aac" ||
  video.width !== 1080 ||
  video.height !== 1920 ||
  video.r_frame_rate !== "30/1" ||
  Number(video.nb_frames) !== 1428
)
  throw new Error("Delivery format mismatch.");
execFileSync("ffmpeg", ["-v", "error", "-i", file, "-f", "null", "-"], {
  timeout: 120000,
});

const decode = (path) => {
  const b = execFileSync(
    "ffmpeg",
    [
      "-v",
      "error",
      "-i",
      path,
      "-vn",
      "-ac",
      "1",
      "-ar",
      "16000",
      "-f",
      "f32le",
      "pipe:1",
    ],
    { maxBuffer: 16 * 1024 * 1024 },
  );
  return new Float32Array(
    b.buffer.slice(b.byteOffset, b.byteOffset + b.byteLength),
  );
};
const original = decode(source);
const exported = decode(file);
let best = { correlation: -1, offsetSamples: 0 };
for (let offset = -160; offset <= 160; offset += 4) {
  let ab = 0,
    aa = 0,
    bb = 0;
  for (
    let i = 160;
    i < Math.min(original.length, exported.length) - 160;
    i += 4
  ) {
    const a = original[i];
    const b = exported[i + offset];
    ab += a * b;
    aa += a * a;
    bb += b * b;
  }
  const correlation = ab / Math.sqrt(aa * bb);
  if (correlation > best.correlation)
    best = { correlation, offsetSamples: offset };
}
if (best.correlation < 0.97)
  throw new Error(`Narration mismatch: ${JSON.stringify(best)}`);
if (exported.length < original.length - 160)
  throw new Error("Narration truncated.");
const dir = ".preview/agent-desktop/export";
await fs.mkdir(dir, { recursive: true });
for (const frame of [145, 169, 702, 866, 907, 1055, 1258, 1425]) {
  execFileSync(
    "ffmpeg",
    [
      "-v",
      "error",
      "-y",
      "-i",
      file,
      "-vf",
      `select=eq(n\\,${frame})`,
      "-frames:v",
      "1",
      `${dir}/frame-${frame}.png`,
    ],
    { timeout: 120000 },
  );
}
const report = {
  output: file,
  sourceSha256: hash,
  decodedWithoutErrors: true,
  video: {
    codec: video.codec_name,
    width: video.width,
    height: video.height,
    fps: video.r_frame_rate,
    frames: video.nb_frames,
    duration: video.duration,
  },
  audio: {
    codec: audio.codec_name,
    duration: audio.duration,
    originalDecodedSamples: original.length,
    exportDecodedSamples: exported.length,
    ...best,
  },
};
await fs.writeFile(`${dir}/verification.json`, JSON.stringify(report, null, 2));
console.log(JSON.stringify(report, null, 2));

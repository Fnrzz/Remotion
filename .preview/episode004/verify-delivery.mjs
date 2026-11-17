import fs from "node:fs/promises";
import crypto from "node:crypto";
import { execFileSync } from "node:child_process";

const output = "out/episode-004-mistral-large-4.mp4";
const originalFile = "public/assets/audio/vo-mistral.mp3";
const meta = JSON.parse(
  execFileSync(
    "ffprobe",
    ["-v", "error", "-show_streams", "-show_format", "-of", "json", output],
    { encoding: "utf8" },
  ),
);
const video = meta.streams.find((s) => s.codec_type === "video");
const audio = meta.streams.find((s) => s.codec_type === "audio");
const decode = (file) => {
  const b = execFileSync(
    "ffmpeg",
    [
      "-v",
      "error",
      "-i",
      file,
      "-vn",
      "-ac",
      "1",
      "-ar",
      "8000",
      "-f",
      "f32le",
      "pipe:1",
    ],
    { maxBuffer: 20_000_000 },
  );
  return new Float32Array(b.buffer, b.byteOffset, b.byteLength / 4);
};
const original = decode(originalFile),
  delivered = decode(output);
const correlations = [];
for (const start of [0, 8, 16, 24, 32, 40, 44]) {
  let ab = 0,
    aa = 0,
    bb = 0;
  for (
    let i = start * 8000;
    i < Math.min(original.length, delivered.length, (start + 2) * 8000);
    i++
  ) {
    ab += original[i] * delivered[i];
    aa += original[i] ** 2;
    bb += delivered[i] ** 2;
  }
  correlations.push({ start, correlation: ab / Math.sqrt(aa * bb) });
}
// Decode EVERY video frame and test for uniform black/white/solid blank images.
const pixels = execFileSync(
  "ffmpeg",
  [
    "-v",
    "error",
    "-i",
    output,
    "-an",
    "-vf",
    "scale=54:96,format=gray",
    "-f",
    "rawvideo",
    "pipe:1",
  ],
  { maxBuffer: 20_000_000 },
);
const frameSize = 54 * 96;
const blankFrames = [];
let minimumStd = Infinity;
for (let f = 0; f < pixels.length / frameSize; f++) {
  let sum = 0,
    squares = 0;
  for (let p = f * frameSize; p < (f + 1) * frameSize; p++) {
    sum += pixels[p];
    squares += pixels[p] ** 2;
  }
  const std = Math.sqrt(squares / frameSize - (sum / frameSize) ** 2);
  minimumStd = Math.min(minimumStd, std);
  if (std < 1) blankFrames.push(f);
}
const sha256 = crypto
  .createHash("sha256")
  .update(await fs.readFile(originalFile))
  .digest("hex");
const failures = [];
if (
  video.codec_name !== "h264" ||
  video.width !== 1080 ||
  video.height !== 1920 ||
  video.r_frame_rate !== "30/1" ||
  !["yuv420p", "yuvj420p"].includes(video.pix_fmt)
)
  failures.push("Format video tidak sesuai");
if (audio.codec_name !== "aac") failures.push("Audio bukan AAC");
if (
  Number(video.nb_frames) !== 1384 ||
  Math.abs(Number(meta.format.duration) - 1384 / 30) > 0.04
)
  failures.push("Durasi/frame tidak sesuai");
if (correlations.some((c) => c.correlation < 0.95))
  failures.push("Audio tidak cocok dengan VO asli");
if (
  sha256 !== "7d83aa3d6cfa5b38c50da66868c8a75c609378854e191351d267b361b30bfc73"
)
  failures.push("Berkas VO asli berubah");
if (blankFrames.length || pixels.length / frameSize !== 1384)
  failures.push("Frame kosong atau dekode tidak lengkap");
const report = {
  output,
  bytes: (await fs.stat(output)).size,
  video: {
    codec: video.codec_name,
    width: video.width,
    height: video.height,
    fps: video.r_frame_rate,
    pixelFormat: video.pix_fmt,
    frames: video.nb_frames,
  },
  audio: {
    codec: audio.codec_name,
    channels: audio.channels,
    sampleRate: audio.sample_rate,
  },
  duration: meta.format.duration,
  sourceAudioSha256: sha256,
  correlations,
  decodedFrames: pixels.length / frameSize,
  blankFrames,
  minimumFrameStd: minimumStd,
  failures,
};
await fs.writeFile(
  ".preview/episode004/delivery-qa.json",
  JSON.stringify(report, null, 2),
);
console.log(JSON.stringify(report, null, 2));
if (failures.length) process.exitCode = 1;

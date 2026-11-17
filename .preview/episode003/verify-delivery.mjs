import fs from "node:fs/promises";
import { execFileSync } from "node:child_process";

const output = "out/episode-003-gemini-4-carbon.mp4";
const metadata = JSON.parse(
  execFileSync(
    "ffprobe",
    ["-v", "error", "-show_streams", "-show_format", "-of", "json", output],
    { encoding: "utf8" },
  ),
);
const video = metadata.streams.find((s) => s.codec_type === "video");
const audio = metadata.streams.find((s) => s.codec_type === "audio");
const decode = (file) => {
  const bytes = execFileSync(
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
    { maxBuffer: 10_000_000 },
  );
  return new Float32Array(bytes.buffer, bytes.byteOffset, bytes.byteLength / 4);
};
const original = decode("public/assets/audio/vo-gemini4carbon.mp3");
const delivered = decode(output);
const checks = [];
for (const start of [0, 10, 20, 30, 39]) {
  let ab = 0,
    aa = 0,
    bb = 0;
  const end = Math.min(original.length, delivered.length, (start + 3) * 8000);
  for (let i = start * 8000; i < end; i++) {
    const a = original[i],
      b = delivered[i];
    ab += a * b;
    aa += a * a;
    bb += b * b;
  }
  checks.push({ startSeconds: start, correlation: ab / Math.sqrt(aa * bb) });
}
const failures = [];
// JPEG-backed frames may signal full-range 8-bit 4:2:0 as yuvj420p.
// Both range variants satisfy the requested H.264 MP4 delivery.
if (
  video.codec_name !== "h264" ||
  video.width !== 1080 ||
  video.height !== 1920 ||
  video.r_frame_rate !== "30/1" ||
  !["yuv420p", "yuvj420p"].includes(video.pix_fmt)
)
  failures.push("Video format mismatch");
if (audio.codec_name !== "aac") failures.push("Audio codec mismatch");
if (Math.abs(Number(metadata.format.duration) - 42.266667) > 0.05)
  failures.push("Duration mismatch");
if (checks.some((c) => c.correlation < 0.95))
  failures.push("Audio correlation mismatch");
await fs.writeFile(
  ".preview/episode003/delivery-qa.json",
  JSON.stringify(
    {
      output,
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
        sampleRate: audio.sample_rate,
        channels: audio.channels,
      },
      duration: metadata.format.duration,
      audioChecks: checks,
      failures,
    },
    null,
    2,
  ),
);
console.log(
  JSON.stringify(
    {
      output,
      duration: metadata.format.duration,
      audioChecks: checks,
      failures,
    },
    null,
    2,
  ),
);
if (failures.length) process.exitCode = 1;

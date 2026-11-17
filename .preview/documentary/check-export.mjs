import fs from "node:fs/promises";
import { execFileSync, spawnSync } from "node:child_process";

const output = "out/episode-003-gemini-4-carbon-documentary.mp4";
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
const audioChecks = [];
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
  audioChecks.push({
    startSeconds: start,
    correlation: ab / Math.sqrt(aa * bb),
  });
}
const fullDecode = spawnSync(
  "ffmpeg",
  [
    "-hide_banner",
    "-i",
    output,
    "-vf",
    "blackdetect=d=0.02:pix_th=0.10:pic_th=0.995",
    "-an",
    "-f",
    "null",
    "-",
  ],
  { encoding: "utf8", maxBuffer: 10_000_000 },
);
await fs.writeFile(
  ".preview/documentary/export-decode-black-check.log",
  fullDecode.stderr,
);
const failures = [];
if (fullDecode.status !== 0) failures.push("Full decode error");
if (/black_start:/.test(fullDecode.stderr)) failures.push("Blank black frames");
if (
  video.codec_name !== "h264" ||
  video.width !== 1080 ||
  video.height !== 1920 ||
  video.r_frame_rate !== "30/1" ||
  Number(video.nb_frames) !== 1268 ||
  !["yuv420p", "yuvj420p"].includes(video.pix_fmt)
)
  failures.push("Video format mismatch");
if (audio.codec_name !== "aac") failures.push("Audio format mismatch");
if (Math.abs(Number(metadata.format.duration) - 42.266667) > 0.05)
  failures.push("Duration mismatch");
if (audioChecks.some((c) => c.correlation < 0.999))
  failures.push("VO waveform mismatch");
const references = [
  [60, ".preview/documentary/hook-60-single.png"],
  [200, ".preview/documentary/stills/element-0200.png"],
  [380, ".preview/documentary/workflow-380-single.png"],
  [480, ".preview/documentary/stills/element-0480.png"],
  [530, ".preview/documentary/stills/element-0530.png"],
  [620, ".preview/documentary/stills/element-0620.png"],
  [710, ".preview/documentary/cyber-710-single.png"],
  [900, ".preview/documentary/stills/element-0900.png"],
  [1160, ".preview/documentary/stills/element-1160.png"],
];
const visualChecks = [];
for (const [frame, ref] of references) {
  const res = spawnSync(
    "ffmpeg",
    [
      "-hide_banner",
      "-i",
      output,
      "-i",
      ref,
      "-lavfi",
      `[0:v]select=eq(n\\,${frame}),setpts=PTS-STARTPTS,scale=540:960,format=yuv420p[a];[1:v]scale=540:960,format=yuv420p[b];[a][b]ssim`,
      "-frames:v",
      "1",
      "-f",
      "null",
      "-",
    ],
    { encoding: "utf8", maxBuffer: 2_000_000 },
  );
  if (res.status !== 0) throw new Error(res.stderr);
  const similarity = Number(res.stderr.match(/All:([\d.]+)/)?.[1]);
  visualChecks.push({ frame, reference: ref, ssim: similarity });
  if (!Number.isFinite(similarity) || similarity < 0.94)
    failures.push(`Visual mismatch ${frame}: ${similarity}`);
}
const report = {
  output,
  video: {
    codec: video.codec_name,
    width: video.width,
    height: video.height,
    fps: video.r_frame_rate,
    frames: video.nb_frames,
    pixelFormat: video.pix_fmt,
  },
  audio: {
    codec: audio.codec_name,
    sampleRate: audio.sample_rate,
    channels: audio.channels,
  },
  duration: metadata.format.duration,
  fullDecodePassed: fullDecode.status === 0,
  noBlankBlackFrames: !/black_start:/.test(fullDecode.stderr),
  audioChecks,
  visualChecks,
  failures,
};
await fs.writeFile(
  ".preview/documentary/delivery-qa.json",
  JSON.stringify(report, null, 2),
);
console.log(JSON.stringify(report, null, 2));
if (failures.length) process.exitCode = 1;

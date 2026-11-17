import fs from "node:fs/promises";
import { createHash } from "node:crypto";
import { execFileSync } from "node:child_process";

const output = "out/kronos-documentary.mp4";
const source = "public/assets/audio/vo-kronos.mp3";
const ff = (args) =>
  execFileSync("ffmpeg", ["-hide_banner", "-y", ...args], {
    maxBuffer: 20 * 1024 * 1024,
  });
const probe = JSON.parse(
  execFileSync(
    "ffprobe",
    ["-v", "error", "-show_format", "-show_streams", "-of", "json", output],
    { encoding: "utf8" },
  ),
);
const video = probe.streams.find((s) => s.codec_type === "video");
const audio = probe.streams.find((s) => s.codec_type === "audio");
ff(["-v", "error", "-i", output, "-f", "null", "-"]);
const waveform = (path) => {
  const bytes = ff([
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
    "-",
  ]);
  return new Float32Array(
    bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength),
  );
};
const a = waveform(source);
const b = waveform(output);
let best = { correlation: -1, lagSamples: 0 };
for (let lag = -800; lag <= 800; lag += 8) {
  let ab = 0,
    aa = 0,
    bb = 0;
  for (let i = 800; i < Math.min(a.length, b.length) - 800; i += 8) {
    const x = a[i],
      y = b[i + lag];
    ab += x * y;
    aa += x * x;
    bb += y * y;
  }
  const correlation = ab / Math.sqrt(aa * bb);
  if (correlation > best.correlation) best = { correlation, lagSamples: lag };
}
const captions = JSON.parse(
  await fs.readFile("src/episodes/kronos/data/subtitles.json", "utf8"),
);
const stamp = (ms) => {
  const h = Math.floor(ms / 3600000),
    m = Math.floor(ms / 60000) % 60,
    s = Math.floor(ms / 1000) % 60;
  return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")},${String(ms % 1000).padStart(3, "0")}`;
};
await fs.writeFile(
  "docs/kronos/subtitles.srt",
  captions
    .map(
      (c, i) =>
        `${i + 1}\n${stamp(c.startMs)} --> ${stamp(c.endMs)}\n${c.text}\n`,
    )
    .join("\n"),
);
await fs.mkdir(".preview/kronos/export", { recursive: true });
const frames = [40, 110, 200, 450, 810, 940, 1140, 1350];
ff([
  "-v",
  "error",
  "-i",
  output,
  "-vf",
  `select=${frames.map((f) => `eq(n\\,${f})`).join("+")}`,
  "-fps_mode",
  "vfr",
  ".preview/kronos/export/frame-%02d.png",
]);
ff([
  "-v",
  "error",
  "-i",
  ".preview/kronos/export/frame-%02d.png",
  "-vf",
  "scale=270:480,tile=4x2",
  "-frames:v",
  "1",
  ".preview/kronos/export/contact-sheet.png",
]);
const studio = JSON.parse(
  await fs.readFile(".preview/kronos/studio-qa.json", "utf8"),
);
const failures = [];
if (
  video.codec_name !== "h264" ||
  video.width !== 1080 ||
  video.height !== 1920 ||
  video.r_frame_rate !== "30/1" ||
  video.pix_fmt !== "yuv420p" ||
  Number(video.nb_frames) !== 1425
)
  failures.push("Unexpected video specifications");
if (audio.codec_name !== "aac") failures.push("Audio is not AAC");
if (video.color_space !== "bt709" || video.color_range !== "tv")
  failures.push("Expected limited-range BT.709 delivery");
if (Math.abs(Number(probe.format.duration) - 47.5) > 0.05)
  failures.push("Unexpected duration");
if (best.correlation < 0.98 || Math.abs(best.lagSamples) > 160)
  failures.push("Audio correlation/alignment needs investigation");
if (studio.failures.length) failures.push("Studio QA failures remain");
const report = {
  output,
  sha256: createHash("sha256")
    .update(await fs.readFile(output))
    .digest("hex"),
  source_audio_sha256: createHash("sha256")
    .update(await fs.readFile(source))
    .digest("hex"),
  duration_seconds: Number(probe.format.duration),
  video: {
    codec: video.codec_name,
    width: video.width,
    height: video.height,
    fps: video.r_frame_rate,
    frames: video.nb_frames,
    pixel_format: video.pix_fmt,
    color_space: video.color_space,
    color_range: video.color_range,
    bitrate: video.bit_rate,
  },
  audio: {
    codec: audio.codec_name,
    sample_rate: audio.sample_rate,
    channels: audio.channels,
    bitrate: audio.bit_rate,
  },
  audio_waveform_check: {
    ...best,
    lag_ms: best.lagSamples / 16,
    method:
      "mono 16 kHz normalized cross-correlation, AAC vs supplied MP3; not listening verification",
  },
  complete_decode: "passed",
  studio_frames_checked: studio.checks.length,
  studio_failures: studio.failures.length,
  exported_frame_map: frames,
  representative_frames: ".preview/kronos/export/",
  caption_count: captions.length,
  publication_status:
    "Technical export checked. Native-speaker listening and final editorial approval still recommended; ASR timings are not audited forced alignment.",
  failures,
};
await fs.writeFile(
  "docs/kronos/delivery-qa.json",
  JSON.stringify(report, null, 2) + "\n",
);
console.log(JSON.stringify(report, null, 2));
if (failures.length) process.exitCode = 1;

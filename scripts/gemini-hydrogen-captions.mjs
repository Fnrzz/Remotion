import fs from "node:fs/promises";
import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";

// Onsets from the supplied recording's local whisper.cpp token offsets.
// These are ASR estimates, not forced alignment or human listening approval.
const phrases = [
  [110, "Model Gemini yang"],
  [1030, "fokus kecepatan,"],
  [2230, "malah bisa ngunggulin Argon?"],
  [4010, "Google baru aja merilis"],
  [5620, "Gemini 4 Hydrogen."],
  [7310, "Model ini dirancang buat"],
  [8610, "coding dan AI agent"],
  [9700, "yang butuh eksekusi cepat."],
  [11380, "Dari membaca proyek,"],
  [12500, "menggunakan tools,"],
  [13630, "sampai membantu mengecek"],
  [14920, "hasil pekerjaan."],
  [15910, "Yang menarik, di"],
  [16770, "Artificial Analysis"],
  [18040, "Intelligence Index,"],
  [19230, "Hydrogen mode high"],
  [20520, "dapat skor 51,"],
  [21950, "sedangkan Gemini 4 Argon"],
  [23710, "50."],
  [24310, "Tapi itu cuma satu indeks,"],
  [26040, "bukan berarti Hydrogen"],
  [27330, "menang di semua tugas."],
  [28650, "Dan ada fitur baru"],
  [29600, "di Google Antigravity"],
  [30940, "bernama Orchestrator."],
  [32540, "Sistem ini bisa berganti"],
  [33790, "antara model seperti Carbon"],
  [35360, "untuk pekerjaan rumit"],
  [36570, "dan Hydrogen untuk"],
  [37510, "membantu eksekusi"],
  [38680, "serta pengecekan."],
  [39760, "Dalam pengujian Google,"],
  [40920, "Orchestrator rata-rata"],
  [42390, "19% lebih cepat,"],
  [43880, "dengan penggunaan kuota"],
  [45190, "24% lebih sedikit,"],
  [46680, "sambil mendekati"],
  [47450, "hasil Carbon."],
  [48550, "Harga API Hydrogen,"],
  [49880, "1,50 dolar untuk input"],
  [51840, "dan 7,50 dolar"],
  [53140, "untuk output,"],
  [54260, "per 1 juta token."],
  [55460, "Menurut kamu,"],
  [56330, "lebih menarik satu AI"],
  [57680, "superkuat,"],
  [58510, "atau beberapa AI"],
  [59430, "yang pintar membagi tugas?"],
];
const audioPath = "assets/audio/vo_gemini hydrogen.mp3";
const probe = JSON.parse(
  execFileSync(
    "ffprobe",
    [
      "-v",
      "error",
      "-show_entries",
      "format=duration:stream=codec_name,sample_rate,channels",
      "-of",
      "json",
      `public/${audioPath}`,
    ],
    { encoding: "utf8" },
  ),
);
const durationSeconds = Number(probe.format.duration);
const sha256 = createHash("sha256")
  .update(await fs.readFile(`public/${audioPath}`))
  .digest("hex");
const captions = phrases.map(([startMs, text], i) => ({
  text,
  startMs,
  endMs: phrases[i + 1]?.[0] ?? durationSeconds * 1000,
  timestampMs: null,
  confidence: null,
}));
const scenes = [
  ["hook", 0, 3.88, "Two honest 0–100 meters → compact model geometry"],
  [
    "reveal",
    3.88,
    15.8,
    "Gemini 4 Hydrogen → conceptual repository/tool/review workflow",
  ],
  ["benchmark", 15.8, 28.56, "51 versus 50 on 0–100; one index, not all tasks"],
  [
    "orchestrator",
    28.56,
    39.68,
    "Project → hub → Carbon/Hydrogen → feedback → unified output",
  ],
  [
    "efficiency-pricing",
    39.68,
    55.36,
    "100→81 time, 100→76 quota; then separate API token streams",
  ],
  [
    "closing",
    55.36,
    durationSeconds,
    "Equally viable single-model and orchestrated workflows",
  ],
];
const cues = [
  ["opening", 0.11, "Model Gemini yang fokus kecepatan"],
  ["reveal", 5.62, "Gemini 4 Hydrogen"],
  ["codingAgent", 8.61, "coding dan AI agent"],
  ["readProject", 11.56, "membaca proyek"],
  ["tools", 13.15, "tools"],
  ["review", 14.46, "mengecek hasil pekerjaan"],
  ["highThinking", 20.15, "mode high"],
  ["score51", 21.36, "51"],
  ["score50", 23.71, "50"],
  ["context", 24.31, "cuma satu indeks"],
  ["notUniversal", 26.04, "bukan berarti ... semua tugas"],
  ["orchestrator", 31.43, "Orchestrator"],
  ["switch", 33.29, "berganti antara model"],
  ["carbon", 34.93, "Carbon"],
  ["hydrogen", 36.67, "Hydrogen"],
  ["execution", 37.99, "eksekusi"],
  ["verification", 38.8, "pengecekan"],
  ["evaluation", 39.76, "Dalam pengujian Google"],
  ["time19", 42.39, "19 persen"],
  ["quota24", 45.19, "24 persen"],
  ["nearCarbon", 47.04, "mendekati hasil Carbon"],
  ["pricing", 48.55, "Harga API Hydrogen"],
  ["inputPrice", 49.88, "1.50 dolar"],
  ["outputPrice", 52.05, "7.50 dolar"],
  ["perMillion", 54.26, "per satu juta token"],
  ["closing", 55.46, "Menurut kamu"],
  ["single", 57.53, "satu AI superkuat"],
  ["team", 58.51, "atau beberapa AI yang pintar membagi tugas"],
];
const manifest = {
  status: "PREVIEW_ASR_ESTIMATES_PUBLICATION_REVIEW_REQUIRED",
  fps: 30,
  audio: {
    path: audioPath,
    durationSeconds,
    durationFrames: Math.ceil(durationSeconds * 30),
    sha256,
    playbackRate: 1,
    streams: probe.streams,
  },
  alignment: {
    method:
      "Local whisper.cpp small multilingual language=id; onsets from token offsets",
    forcedAlignment: false,
    listeningApprovalRequired: true,
    approvedReferenceTranscriptProvided: false,
    notes: [
      "Entire supplied recording retained, including the complete closing question and tail.",
      "ASR Orkestrator/karbon normalized to official spellings; koding to coding. Prices displayed in Indonesian numeric form.",
      "Sentence punctuation inferred. No spoken facts added or rewritten; review ASR against original audio before publication.",
      "Launch date, Terminal-Bench name and pricing qualifications are visual context from user brief, not added narration.",
      "Adjacent caption end/start boundaries are shared; a single subtitle node persists across all scenes.",
    ],
  },
  scenes: scenes.map(([id, startSeconds, endSeconds, visual]) => ({
    id,
    startSeconds,
    endSeconds,
    visual,
    startFrame: Math.round(startSeconds * 30),
    endFrameExclusive:
      endSeconds === durationSeconds
        ? Math.ceil(endSeconds * 30)
        : Math.round(endSeconds * 30),
  })),
  cues: cues.map(([id, seconds, phrase]) => ({
    id,
    seconds,
    phrase,
    frame: Math.round(seconds * 30),
    timingStatus: "ASR_ESTIMATE_REVIEW_REQUIRED",
  })),
};
await fs.mkdir("src/episodes/gemini-hydrogen/data", { recursive: true });
await fs.writeFile(
  "src/episodes/gemini-hydrogen/data/subtitles.json",
  JSON.stringify(captions, null, 2) + "\n",
);
await fs.writeFile(
  "src/episodes/gemini-hydrogen/data/timing.json",
  JSON.stringify(manifest, null, 2) + "\n",
);
await fs.writeFile(
  ".preview/gemini-hydrogen/transcript-review.txt",
  phrases.map(([, text]) => text).join(" ") + "\n",
);
console.log(
  `${durationSeconds}s; ${manifest.audio.durationFrames} frames; ${captions.length} phrases; human listening review required.`,
);

import fs from "node:fs/promises";

// Phrase onsets from local whisper.cpp small multilingual token offsets.
// ASR timing estimates, NOT forced-aligned word timestamps or listening approval.
const phrases = [
  [50, "DeepSeek Harness"],
  [860, "mau nantang Claude Code?"],
  [2130, "Tapi ini bukan"],
  [3290, "sekadar adu model."],
  [4930, "Claude Code itu"],
  [5810, "coding agent siap pakai."],
  [7480, "Bisa membaca proyek,"],
  [8640, "mengedit file,"],
  [9700, "dan menggunakan tools."],
  [10910, "DeepSeek Harness beda."],
  [12410, "Ini sistem open source"],
  [13780, "buat merakit AI agent"],
  [15230, "dengan komponen"],
  [15960, "yang bisa diganti"],
  [16810, "lewat plugin."],
  [17670, "Bahkan ada Creator mode."],
  [19430, "Kamu bisa meminta AI"],
  [20510, "membuat plugin lewat chat,"],
  [22060, "misalnya timer Pomodoro."],
  [23890, "Tapi Claude Code"],
  [24700, "juga punya plugin,"],
  [26160, "skills, hooks, dan MCP."],
  [27990, "Bedanya, di"],
  [28730, "DeepSeek Harness"],
  [30030, "bagian inti agent pun"],
  [31060, "bisa diganti."],
  [32090, "Sedangkan Claude Code"],
  [33050, "lebih fokus memperluas"],
  [34360, "workflow yang sudah tersedia."],
  [35830, "Soal biaya?"],
  [36810, "Harness-nya open source,"],
  [38370, "tapi model yang digunakan"],
  [39460, "tetap bisa berbayar."],
  [40670, "Claude Code juga tersedia"],
  [41820, "lewat paket Pro."],
  [42830, "Mulai 20 dolar per bulan"],
  [44180, "jika ditagih bulanan."],
  [45530, "Tapi Harness masih"],
  [46680, "tahap preview."],
  [47670, "Jadi jangan anggap"],
  [48590, "semua fiturnya sudah stabil."],
  [50350, "Kalau kamu developer,"],
  [51500, "lebih pilih coding agent"],
  [52790, "yang langsung dipakai"],
  [54050, "atau yang bisa kamu"],
  [54960, "rakit sendiri?"],
];
const durationSeconds = 55.95425;
const subtitles = phrases.map(([startMs, text], i) => ({
  text,
  startMs,
  endMs: phrases[i + 1]?.[0] ?? durationSeconds * 1000,
  timestampMs: null,
  confidence: null,
}));
const scenes = [
  ["hook", 0, 4.88, "Dua sistem; bukan adu model"],
  [
    "architecture",
    4.88,
    17.62,
    "Agen siap pakai → runtime modular → penggantian komponen",
  ],
  [
    "creator",
    17.62,
    23.84,
    "Permintaan chat → kerangka → rakitan plugin → timer 25:00",
  ],
  [
    "extensions",
    23.84,
    35.78,
    "Ekstensi Claude → inti Harness → perluasan workflow",
  ],
  [
    "cost",
    35.78,
    50.3,
    "Alur biaya berbeda → Pro bulanan → preview dan kompatibilitas",
  ],
  [
    "closing",
    50.3,
    durationSeconds,
    "Rakit atau pakai; kedua pendekatan setara, tahan sampai VO berakhir",
  ],
];
const cues = [
  ["hookLabels", 0.45, "DeepSeek Harness", "Nama kedua sistem muncul"],
  ["notModels", 2.13, "Tapi ini bukan", "VS, kedua arsitektur tetap terlihat"],
  ["readyAgent", 4.93, "Claude Code itu", "Sorot workspace terintegrasi"],
  ["readProject", 7.72, "membaca proyek", "Pohon berkas terbuka"],
  ["editFile", 8.64, "mengedit file", "Garis kode direvisi"],
  ["tools", 9.7, "dan menggunakan tools", "Koneksi alat aktif"],
  [
    "harness",
    10.91,
    "DeepSeek Harness beda",
    "Fokus pindah ke jaringan modular",
  ],
  ["assemble", 14.08, "merakit AI agent", "Modul menyatu pada konektor"],
  [
    "replace",
    16.4,
    "diganti",
    "Komponen dilepas, konfigurasi, komponen baru dipasang",
  ],
  ["creator", 18.4, "Creator mode", "Permintaan chat muncul"],
  ["pluginSkeleton", 20.51, "membuat plugin", "Kerangka plugin dirakit"],
  ["install", 21.71, "chat", "Plugin dipasang pada jaringan konseptual"],
  [
    "pomodoro",
    23.15,
    "Pomodoro",
    "Timer menampilkan 25:00; bukan eksekusi nyata",
  ],
  [
    "plugin",
    25.23,
    "plugin",
    "Plugin mengemas kapabilitas, bukan mekanisme identik",
  ],
  ["skills", 26.16, "skills", "Koneksi pengetahuan/workflow"],
  ["hooks", 26.48, "hooks", "Koneksi peristiwa"],
  ["mcp", 27.48, "MCP", "Koneksi alat dan layanan"],
  [
    "core",
    30.03,
    "bagian inti agent",
    "Sorot loop agen Harness dan penggantian",
  ],
  [
    "workflow",
    32.09,
    "Sedangkan Claude Code",
    "Kembali ke perluasan workflow; bukan klaim ekstensi eksternal saja",
  ],
  ["cost", 35.83, "Soal biaya", "Dua jalur biaya tidak ekuivalen"],
  [
    "providerBilling",
    38.37,
    "tapi model",
    "Alur ke penyedia dan tagihan penggunaan",
  ],
  ["pro", 40.67, "Claude Code", "Jalur Pro menuju Claude Code"],
  [
    "monthlyPrice",
    43.13,
    "20 dolar",
    "US$20/bulan; ditagih bulanan; batas penggunaan berlaku",
  ],
  ["preview", 45.53, "Tapi Harness", "Peringatan preview/kompatibilitas"],
  ["closing", 50.35, "Kalau kamu developer", "Kedua sistem kembali seimbang"],
];
const manifest = {
  status: "ASR_ESTIMATES_REVIEW_REQUIRED",
  fps: 30,
  audio: {
    path: "assets/audio/vo_deepseek herness.mp3",
    format: "MP3, 44100 Hz, mono, 128 kbps",
    durationSeconds,
    durationFrames: Math.ceil(durationSeconds * 30),
    sha256: "9a379e12f7e3c42d0851012849699ce4e7e35f2de7a71c4963611999983a6a0a",
    playbackRate: 1,
  },
  alignment: {
    method:
      "Local whisper.cpp small multilingual, language=id; phrase onsets taken from token offsets",
    forcedAlignment: false,
    listeningApprovalRequired: true,
    approvedReferenceTranscriptProvided: false,
    notes: [
      "Audio is the authoritative source; raw ASR is retained under .preview/deepseek-harness/.",
      "Proper names normalized Deepseak→DeepSeek, Cloud→Claude. ASR 'int agent' normalized 'inti agent'.",
      "ASR 'tahap review' interpreted 'tahap preview' in context; this phrase especially requires listening confirmation.",
      "20 dollars rendered as spoken Indonesian, not an additional cost claim. No added narration or omitted recording.",
      "Phrase onsets are machine estimates; no exact word alignment is claimed. Adjacent cues share boundaries to avoid artificial flicker.",
    ],
  },
  explanationShots: [
    {
      system: "claude",
      startSeconds: 4.88,
      endSeconds: 10.91,
      motion: "Agen siap pakai → baca proyek → edit file → tools",
    },
    {
      system: "harness",
      startSeconds: 10.91,
      endSeconds: 17.62,
      motion: "Adaptor → loop → alat → penyimpanan → sandbox → ganti komponen",
    },
    {
      system: "claude",
      startSeconds: 23.84,
      endSeconds: 27.99,
      motion: "Plugin → Skills → Hooks → MCP",
    },
    {
      system: "harness",
      startSeconds: 27.99,
      endSeconds: 32.09,
      motion: "Penggantian loop inti, dengan konfigurasi",
    },
    {
      system: "claude",
      startSeconds: 32.09,
      endSeconds: 35.78,
      motion: "Perluasan workflow terintegrasi",
    },
  ],
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
  cues: cues.map(([id, seconds, phrase, motion]) => ({
    id,
    seconds,
    phrase,
    motion,
    frame: Math.round(seconds * 30),
    timingStatus: "ASR_ESTIMATE_REVIEW_REQUIRED",
  })),
};
await fs.mkdir("src/episodes/deepseek-harness/data", { recursive: true });
await fs.writeFile(
  "src/episodes/deepseek-harness/data/subtitles.json",
  JSON.stringify(subtitles, null, 2) + "\n",
);
await fs.writeFile(
  "src/episodes/deepseek-harness/data/timing.json",
  JSON.stringify(manifest, null, 2) + "\n",
);
await fs.writeFile(
  ".preview/deepseek-harness/transcript-review.txt",
  phrases.map(([, t]) => t).join(" ") + "\n",
);
console.log(
  `${subtitles.length} phrases, ${manifest.audio.durationFrames} frames. Listening review required.`,
);

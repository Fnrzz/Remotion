import fs from "node:fs/promises";

// Phrase onsets selected from the ORIGINAL file's local whisper.cpp token offsets.
// ASR estimates, not invented word-level timing. Full reference script not supplied.
const phrases = [
  [130, "Seribu AI agent?"],
  [1930, "Bikin sistem operasi"],
  [2960, "dalam delapan hari?"],
  [4500, "Ini eksperimen"],
  [4910, "yang baru diumumkan"],
  [6310, "Anthropic lewat"],
  [7100, "Claude Fable 5.2."],
  [8920, "Bayangin, seorang engineer"],
  [10710, "memulai dari folder kosong,"],
  [12430, "lalu memberi tugas,"],
  [13650, "bikin prototipe"],
  [14550, "sistem operasi."],
  [15550, "Fable kemudian"],
  [16230, "mengoordinasikan"],
  [17070, "lebih dari seribu subagent."],
  [19270, "Mereka menulis kode,"],
  [20530, "menjalankan tes,"],
  [21650, "dan mereview hasilnya"],
  [22980, "selama delapan hari."],
  [24130, "Dan menurut Anthropic,"],
  [25240, "hasilnya bisa boot di laptop."],
  [27130, "Ada driver,"],
  [27840, "penyimpanan file,"],
  [29140, "jendela, layar login,"],
  [30740, "bahkan installer."],
  [32220, "Tapi ingat,"],
  [32840, "ini masih prototipe"],
  [34150, "dalam eksperimen internal."],
  [36060, "Bukan sistem operasi"],
  [37070, "yang sudah siap"],
  [37930, "menggantikan Windows."],
  [39200, "Yang menarik justru"],
  [40110, "cara AI membagi"],
  [40950, "proyek besar jadi"],
  [41930, "banyak pekerjaan,"],
  [43130, "lalu menggabungkan hasilnya."],
  [45130, "Kalau seribu AI agent"],
  [46190, "bisa kerja bareng,"],
  [47000, "proyek apa yang pengen"],
  [48070, "kamu lihat mereka"],
  [49090, "bikin berikutnya?"],
];
const durationSeconds = 49.789375;
const subtitles = phrases.map(([startMs, text], i) => ({
  text,
  startMs,
  endMs: phrases[i + 1]?.[0] ?? durationSeconds * 1000,
  timestampMs: startMs,
  confidence: null,
}));
const cues = [
  [
    "hookNetworkPeak",
    1.2,
    "AI Agent",
    "Network reaches representative scale during first spoken AI agent.",
  ],
  ["hookEightDays", 3.28, "delapan hari", "Reveal 8 HARI."],
  [
    "modelName",
    7.1,
    "Claude Fable 5.2",
    "Central model name, then folder transformation.",
  ],
  [
    "emptyFolder",
    11.5,
    "folder kosong",
    "Empty folder fully visible; no fabricated prompt.",
  ],
  [
    "instruction",
    12.43,
    "lalu memberi tugas",
    "Abstract brief enters the folder/model.",
  ],
  ["prototype", 13.96, "prototipe", "Explicit prototype qualification."],
  [
    "subagents",
    17.59,
    "seribu subagent",
    "Delegation paths branch to all six workstreams.",
  ],
  [
    "write",
    19.62,
    "menulis kode",
    "Distinct module structures begin assembling.",
  ],
  ["test", 20.53, "menjalankan tes", "Conceptual scan; no PASS/scores."],
  ["review", 21.86, "mereview hasilnya", "Return packets and revision loop."],
  [
    "eightDays",
    23.61,
    "delapan hari",
    "Eight-day timeline reaches day 8; editorial build order.",
  ],
  ["reported", 24.23, "menurut Anthropic", "Company-report qualifier."],
  [
    "boot",
    25.99,
    "boot di laptop",
    "Screen powers on, exact phrase onset estimate.",
  ],
  ["drivers", 27.23, "driver", "Disk, keyboard, network glyphs."],
  [
    "storage",
    27.84,
    "penyimpanan file",
    "Persistent-storage geometry and folder.",
  ],
  [
    "windows",
    29.14,
    "jendela",
    "Window concept appears around laptop before conceptual login.",
  ],
  ["login", 29.82, "layar login", "Login glyph on original fictional screen."],
  [
    "installer",
    31.54,
    "installer",
    "Installer download glyph, not a real install test.",
  ],
  [
    "caveat",
    32.22,
    "Tapi ingat",
    "Motion reduces; laptop remains visibly a prototype.",
  ],
  ["internal", 34.6, "eksperimen internal", "Internal-experiment qualifier."],
  [
    "notReplacement",
    36.06,
    "Bukan sistem operasi yang sudah siap menggantikan Windows",
    "Unfinished system outline; no replacement claim.",
  ],
  [
    "coordinationRecap",
    39.2,
    "Yang menarik justru cara AI membagi proyek besar",
    "Laptop transforms to multi-agent architecture.",
  ],
  [
    "integrateRecap",
    43.54,
    "menggabungkan hasilnya",
    "Module streams converge again.",
  ],
  [
    "question",
    45.13,
    "Kalau seribu AI Agent bisa kerja bareng",
    "Re-expand into agent network; hold final question.",
  ],
];
const scenes = [
  [
    "hook",
    0,
    4.5,
    "Satu folder → 48 node representatif → 1.000+ agent / 8 hari",
  ],
  [
    "folder",
    4.5,
    15.55,
    "Model → folder kosong → instruksi abstrak → arsitektur",
  ],
  [
    "coordination",
    15.55,
    22.98,
    "Delegasi → menulis → menguji → review dan umpan balik",
  ],
  [
    "eightDays",
    22.98,
    25.24,
    "Delapan hari → integrasi; hasil menurut Anthropic",
  ],
  [
    "boot",
    25.24,
    32.22,
    "Laptop terbuka → boot → fitur → login → desktop konseptual",
  ],
  [
    "reality",
    32.22,
    durationSeconds,
    "Prototipe → batasan → koordinasi → pertanyaan lengkap",
  ],
];
const manifest = {
  status: "ASR_REVIEW_DRAFT",
  fps: 30,
  audio: {
    path: "assets/audio/vo_test claude fable 5.2.mp3",
    durationSeconds,
    durationFrames: Math.ceil(durationSeconds * 30),
    sha256: "5f5b62dbf3fb4bdeeabf3a4648920dfd2c2837ff286ba81b356925a2d64e4294",
    playbackRate: 1,
    finalSpeechEndEstimateSeconds: 49.595,
  },
  alignment: {
    method:
      "Local whisper.cpp small multilingual, language=id, token onsets; cross-checked against detected pauses",
    approvedReferenceTranscriptProvided: false,
    listeningApprovalRequired: true,
    notes: [
      "Proper nouns normalized: entropik → Anthropic, Cloud → Claude.",
      "Phrase confidence null; no fabricated word timestamps.",
      "ASR final punctuation extends to 50s; captions are capped at the measured recording end.",
      "The brief's writing/testing/review/eight-day sequence is compressed by the actual spoken pacing; no narration is slowed or moved.",
    ],
  },
  scenes: scenes.map(([id, startSeconds, endSeconds, visual]) => ({
    id,
    startSeconds,
    endSeconds,
    startFrame: Math.round(startSeconds * 30),
    endFrameExclusive:
      endSeconds === durationSeconds
        ? Math.ceil(endSeconds * 30)
        : Math.round(endSeconds * 30),
    visual,
  })),
  cues: cues.map(([id, seconds, phrase, motion]) => ({
    id,
    seconds,
    frame: Math.round(seconds * 30),
    phrase,
    motion,
    timingStatus: "ASR_ESTIMATE_REVIEW_REQUIRED",
  })),
  subtitles,
};
await fs.mkdir("src/episodes/claude-fable/data", { recursive: true });
await fs.writeFile(
  "src/episodes/claude-fable/data/subtitles.json",
  JSON.stringify(subtitles, null, 2) + "\n",
);
await fs.writeFile(
  "src/episodes/claude-fable/data/timing.json",
  JSON.stringify(manifest, null, 2) + "\n",
);
await fs.writeFile(
  ".preview/claude-fable/transcript-review.txt",
  phrases.map(([, text]) => text).join(" ") + "\n",
);
console.log(
  `${subtitles.length} phrase cues; ${manifest.audio.durationFrames} frames. ASR review draft.`,
);

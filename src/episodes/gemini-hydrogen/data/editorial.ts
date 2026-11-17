// Supplied editorial brief. Verification results live in docs/episode-012-hydrogen-source-review.md.
// Index/prices corroborated; efficiency remains vendor-reported with a version conflict.
// These are NOT measurements independently performed by Prof Deps.
export const HYDROGEN_DATA = {
  status: "PREVIEW — BENCHMARK VERSION AND LISTENING REVIEW REQUIRED",
  launchDate: "12 NOVEMBER 2026",
  models: {
    hydrogen: "GEMINI 4 HYDROGEN",
    carbon: "GEMINI 4 CARBON",
    argon: "GEMINI 4 ARGON",
  },
  benchmark: {
    name: "ARTIFICIAL ANALYSIS INTELLIGENCE INDEX",
    hydrogen: 51,
    argon: 50,
    scaleMax: 100,
    setting: "HIGH THINKING",
    qualifier: "BUKAN SEMUA TUGAS",
  },
  evaluation: {
    name: "GOOGLE · TERMINAL-BENCH 4.0",
    system: "ORCHESTRATOR",
    baseline: 100,
    time: 81,
    quota: 76,
    timeReduction: 19,
    quotaReduction: 24,
    qualifier: "RATA-RATA · HASIL MENDEKATI CARBON",
    units: "UNIT RELATIF · ACUAN = 100",
  },
  api: {
    input: "$1.50",
    output: "$7.50",
    units: "PER 1 JUTA TOKEN · API",
    qualifier: "TARIF TOKEN ≠ TOTAL BIAYA PROYEK",
  },
  conceptual: "ILUSTRASI KONSEPTUAL",
  colors: {
    black: "#000000",
    offWhite: "#FAF9F6",
    white: "#FFFFFF",
    slate: "#708090",
    gray: "#555555",
  },
  sources: [
    "https://blog.google/innovation-and-ai/models-and-research/gemini-models/introducing-gemini-4-hydrogen/",
    "https://deepmind.google/models/model-cards/gemini-4-hydrogen/",
    "https://blog.google/innovation-and-ai/technology/developers-tools/build-with-gemini-4-hydrogen/",
    "https://ai.google.dev/gemini-api/docs/pricing",
  ],
} as const;

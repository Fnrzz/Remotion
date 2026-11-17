// Fixed editorial inputs. Source validation and methodology: docs/kimi-comparison/README.md.
export const MODELS = [
  {
    id: "kimi",
    name: "Kimi K3.1 Pro",
    lines: ["KIMI", "K3.1 PRO"],
    color: "#000000",
  },
  {
    id: "opus",
    name: "Claude Opus 5.5",
    lines: ["CLAUDE", "OPUS 5.5"],
    color: "#555555",
  },
  {
    id: "astra",
    name: "GPT-6 Astra",
    lines: ["GPT-6", "ASTRA"],
    color: "#708090",
  },
] as const;

export const PRICING = {
  currency: "USD",
  unitTokens: 1_000_000,
  input: [2, 4, 10],
  output: [10, 20, 50],
  inputMax: 10,
  outputMax: 50,
} as const;

export const BENCHMARKS = {
  code: {
    title: "KIMI CODE BENCH 3.0",
    subtitle: "LONG-HORIZON",
    source: "BENCHMARK INTERNAL MOONSHOT",
    values: [61.2, 58.5, 66.5],
    highest: 2,
  },
  terminal: {
    title: "TERMINAL-BENCH 4.0",
    subtitle: "SKOR BENCHMARK",
    source: "ANGKA DIHIMPUN MOONSHOT",
    values: [65.7, 66.4, 58.2],
    highest: 1,
  },
  scale: { min: 0, max: 100 },
} as const;

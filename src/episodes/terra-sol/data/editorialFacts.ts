// Editorial facts supplied for this episode; do not extrapolate to all tasks.
export const PRICING = {
  currency: "USD",
  perTokens: 1_000_000,
  tier: "Standard",
  maxInputTokens: 272_000,
  terra: {
    input: 1,
    output: 5,
    cachedInput: 0.05,
  },
  sol: {
    input: 2,
    output: 10,
    cachedInput: 0.1,
  },
  caveats: [
    "Tarif API Standard untuk input hingga 272K token, per 1 juta token.",
    "Tarif token Sol dua kali Terra; total biaya bergantung pemakaian, bukan otomatis dua kali.",
    "Biaya aktual bergantung jumlah token input/output, pemakaian cache, dan konfigurasi.",
    "Tarif API bukan harga langganan ChatGPT.",
  ],
} as const;

export const BENCHMARK = {
  publisher: "Plotly",
  task: "Analisis data",
  totalQuestions: 43,
  terraCorrect: 40,
  solCorrect: 43,
  differenceCorrect: 3,
  data: "Data angin sintetis privat",
  terraConfiguration: {
    provider: "OpenRouter",
    reasoning: "default",
  },
  solConfiguration: null,
  caveats: [
    "Hasil dari satu tes analisis data Plotly, bukan peringkat kemampuan umum.",
    "Data uji angin sintetis bersifat privat.",
    "Terra diuji melalui OpenRouter dengan reasoning default.",
    "Konfigurasi Sol belum dikonfirmasi; jangan mengklaim kondisi pengujian identik.",
    "Hasil ini bukan jaminan performa untuk semua pekerjaan.",
  ],
} as const;

export type EditorialSource = {
  label: string;
  url: string;
  verifiedOn: string;
};

export const SOURCES: readonly EditorialSource[] = [
  {
    label: "Dokumentasi GPT-6.1 Terra",
    url: "https://developers.openai.com/api/docs/models/gpt-6.1-terra",
    verifiedOn: "2026-10-31",
  },
  {
    label: "Dokumentasi GPT-6.1 Sol",
    url: "https://developers.openai.com/api/docs/models/gpt-6.1-sol",
    verifiedOn: "2026-10-31",
  },
  {
    label: "Harga API Standard OpenAI",
    url: "https://developers.openai.com/api/docs/pricing",
    verifiedOn: "2026-10-31",
  },
  {
    label: "Plotly DataAnalyticsBench",
    url: "https://plotly.com/blog/gpt-6-1-terra-plotly-data-analytics-bench/",
    verifiedOn: "2026-10-31",
  },
];

export const EDITORIAL_FACTS = {
  models: ["GPT-6.1 Terra", "GPT-6.1 Sol"],
  developer: "OpenAI",
  pricing: PRICING,
  benchmark: BENCHMARK,
  sources: SOURCES,
  sourceVerification: {
    suppliedVerificationDate: "2026-10-31",
    status: "verified-against-original-sources",
  },
} as const;

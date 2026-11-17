import fs from "node:fs/promises";

// Phrase onsets taken from whisper.cpp's token offsets for the ORIGINAL MP3.
// No forced equal-duration phrases, stretched VO, or synthetic word timings.
// Proper names, punctuation and ASR misspellings are editorially normalized.
const phrases = [
  [90, "Harga AI buat coding"],
  [1650, "bisa beda lima kali lipat."],
  [3780, "Tapi, performanya juga"],
  [5220, "beda sejauh itu?"],
  [7010, "Kita bandingin tiga model."],
  [8530, "Kimi K3.1 Pro,"],
  [9940, "Claude Opus 5.5"],
  [11480, "dan GPT-6 Astra."],
  [13440, "Di tarif API standar"],
  [14520, "per sejuta token,"],
  [15800, "Kimi dua dolar input"],
  [16830, "dan sepuluh dolar output."],
  [18440, "Opus empat dan dua puluh."],
  [20130, "Astra, sepuluh"],
  [20940, "dan lima puluh dolar."],
  [22720, "Sekarang benchmark-nya."],
  [24840, "Di Kimi Code Bench 3.0,"],
  [26730, "tes internal Moonshot,"],
  [27980, "Astra dapat 66,5."],
  [30210, "Kimi 61,2"],
  [31770, "dan Opus 58,5."],
  [34510, "Tapi di angka"],
  [34960, "Terminal-Bench 4.0"],
  [36220, "yang dikumpulkan Moonshot,"],
  [37960, "Opus unggul tipis"],
  [39000, "dengan 66,4."],
  [40970, "Kimi 65,7"],
  [42530, "dan Astra 58,2."],
  [45220, "Ingat, pengaturan tesnya"],
  [46480, "nggak selalu sama."],
  [47760, "Dan harga per token"],
  [48440, "belum tentu menggambarkan"],
  [49660, "biaya menyelesaikan satu proyek."],
  [51730, "Jadi, kalau kamu pakai"],
  [52930, "AI buat coding,"],
  [54210, "lebih pilih tarif hemat"],
  [55200, "atau performa yang paling cocok"],
  [56830, "buat kebutuhanmu?"],
];
const captions = phrases.map(([startMs, text], i) => ({
  text,
  startMs,
  endMs: phrases[i + 1]?.[0] ?? 58122.438,
  timestampMs: startMs,
  confidence: null,
}));
await fs.mkdir("src/episodes/kimi-comparison/data", { recursive: true });
await fs.writeFile(
  "src/episodes/kimi-comparison/data/subtitles.json",
  JSON.stringify(captions, null, 2) + "\n",
);
console.log(`Wrote ${captions.length} narration-aligned phrase captions.`);

import fs from "node:fs/promises";

// Onsets from local whisper.cpp token offsets against the untouched supplied MP3.
// Only punctuation, official names, and the ASR homophone cat -> chat are normalized.
const phrases = [
  [50, "AI video sekarang"],
  [960, "bisa bikin klip 15 detik"],
  [2370, "sekali generate."],
  [3880, "Google baru aja memperkenalkan"],
  [5550, "Gemini Omni 1.2 Flash."],
  [7970, "Kalau sebelumnya batas klip"],
  [9230, "Omni 1.1, 10 detik,"],
  [11010, "sekarang versi barunya"],
  [12230, "bisa sampai 15 detik."],
  [14210, "Tapi bukan cuma"],
  [14870, "durasinya yang berubah."],
  [16770, "Video yang sudah dibuat"],
  [17860, "juga bisa direvisi lewat chat."],
  [19620, "Mau ganti background,"],
  [20640, "pencahayaan,"],
  [21640, "atau suasana adegan,"],
  [22930, "tinggal kasih instruksi lanjutan."],
  [24770, "Google juga mengklaim"],
  [25720, "konsistensi karakter dan objek"],
  [27470, "makin baik."],
  [28330, "Bahkan saat kamera bergerak."],
  [30170, "Dan untuk API video 720p,"],
  [32490, "Google menurunkan tarifnya"],
  [34160, "30%,"],
  [34860, "jadi 7 sen dolar per detik."],
  [37170, "Tapi ingat, batas durasi"],
  [38460, "dan akses fiturnya"],
  [39510, "bisa berbeda"],
  [40570, "tergantung mode dan layanan"],
  [41790, "yang dipakai."],
  [42850, "Kalau kamu jadi kreator,"],
  [44040, "lebih tertarik video"],
  [45160, "yang lebih panjang,"],
  [46490, "atau bisa ngedit video"],
  [47510, "cuma lewat chat?"],
];
const captions = phrases.map(([startMs, text], i) => ({
  text,
  startMs,
  endMs: phrases[i + 1]?.[0] ?? 48666.063,
  timestampMs: startMs,
  confidence: null,
}));
await fs.mkdir("src/episodes/gemini-omni/data", { recursive: true });
await fs.writeFile(
  "src/episodes/gemini-omni/data/subtitles.json",
  JSON.stringify(captions, null, 2) + "\n",
);
console.log(`${captions.length} original-VO phrase cues.`);

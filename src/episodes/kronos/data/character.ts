import type { CharacterEmotion } from "../../../data/character";

// Global phrase boundaries from the Kronos narration, not another episode.
// The shared overlay stays stationary; only its expression changes.
export const KRONOS_CHARACTER_CUES = [
  {
    fromMs: 0,
    emotion: "surprised",
    voiceover: "AI ini bisa memproyeksikan candlestick",
  },
  { fromMs: 2520, emotion: "curious", voiceover: "tanpa melihat grafiknya." },
  { fromMs: 4200, emotion: "friendly", voiceover: "Kenalin, Kronos," },
  {
    fromMs: 9320,
    emotion: "skeptical",
    voiceover: "Plot twist-nya, yang diproses bukan screenshot,",
  },
  {
    fromMs: 12460,
    emotion: "lookingLeft",
    voiceover: "tapi angka di balik setiap candle.",
  },
  {
    fromMs: 14520,
    emotion: "confident",
    voiceover: "Mulai dari harga buka, tertinggi, terendah,",
  },
  {
    fromMs: 20560,
    emotion: "lookingLeft",
    voiceover: "Nah, angka-angka ini diubah jadi token.",
  },
  {
    fromMs: 23400,
    emotion: "determined",
    voiceover: "Kronos memprediksi urutan berikutnya",
  },
  {
    fromMs: 27720,
    emotion: "curious",
    voiceover: "Bahkan lewat proses sampling,",
  },
  {
    fromMs: 30240,
    emotion: "lookingLeft",
    voiceover: "menghasilkan beberapa skenario pergerakan,",
  },
  {
    fromMs: 34120,
    emotion: "skeptical",
    voiceover: "Tapi ingat, ini bukan mesin pembaca masa depan.",
  },
  {
    fromMs: 37000,
    emotion: "determined",
    voiceover: "Proyeksi bukan kepastian,",
  },
  {
    fromMs: 41720,
    emotion: "curious",
    voiceover: "Menurut kamu, teknologi kayak gini",
  },
  {
    fromMs: 44800,
    emotion: "friendly",
    voiceover: "buat riset AI atau buat analisis pasar?",
  },
] satisfies readonly {
  fromMs: number;
  emotion: CharacterEmotion;
  voiceover: string;
}[];

import type { CharacterEmotion } from "../../../data/character";

// Same stationary character component and original poses as the other episodes.
// Expressions now follow individual subtitle beats, not only scene changes.
export const MISTRAL_CHARACTER_CUES: readonly {
  fromMs: number;
  emotion: CharacterEmotion;
  voiceover: string;
}[] = [
  {
    fromMs: 0,
    emotion: "surprised",
    voiceover: "AI ini bisa dijalankan",
  },
  {
    fromMs: 1450,
    emotion: "curious",
    voiceover: "di server sendiri",
  },
  {
    fromMs: 2780,
    emotion: "skeptical",
    voiceover: "tanpa harus lewat API Mistral?",
  },
  {
    fromMs: 4780,
    emotion: "friendly",
    voiceover: "Yup, Mistral baru aja merilis",
  },
  {
    fromMs: 6800,
    emotion: "confident",
    voiceover: "bobot model AI terbarunya,",
  },
  {
    fromMs: 8750,
    emotion: "happy",
    voiceover: "Mistral Large 4.",
  },
  {
    fromMs: 10180,
    emotion: "lookingLeft",
    voiceover: "Bobot ini adalah parameter",
  },
  {
    fromMs: 12010,
    emotion: "determined",
    voiceover: "yang dipakai AI saat bekerja.",
  },
  {
    fromMs: 13540,
    emotion: "friendly",
    voiceover: "Dan sekarang, file-nya",
  },
  {
    fromMs: 14850,
    emotion: "approval",
    voiceover: "tersedia di Hugging Face.",
  },
  {
    fromMs: 16340,
    emotion: "curious",
    voiceover: "Artinya, developer punya opsi",
  },
  {
    fromMs: 18150,
    emotion: "lookingLeft",
    voiceover: "buat menyesuaikan model",
  },
  {
    fromMs: 19600,
    emotion: "determined",
    voiceover: "dan menentukan sendiri",
  },
  {
    fromMs: 20870,
    emotion: "curious",
    voiceover: "di mana AI-nya dijalankan.",
  },
  {
    fromMs: 22700,
    emotion: "skeptical",
    voiceover: "Tapi tunggu dulu.",
  },
  {
    fromMs: 23680,
    emotion: "determined",
    voiceover: "Open-weight bukan berarti bebas aturan",
  },
  {
    fromMs: 26040,
    emotion: "disappointed",
    voiceover: "atau bisa langsung jalan di semua laptop.",
  },
  {
    fromMs: 28300,
    emotion: "determined",
    voiceover: "Kamu tetap perlu infrastruktur,",
  },
  {
    fromMs: 30160,
    emotion: "lookingLeft",
    voiceover: "keahlian teknis,",
  },
  {
    fromMs: 31280,
    emotion: "skeptical",
    voiceover: "dan memahami lisensinya.",
  },
  {
    fromMs: 32820,
    emotion: "determined",
    voiceover: "Apalagi kalau mau menyediakan",
  },
  {
    fromMs: 34240,
    emotion: "disappointed",
    voiceover: "model ini sebagai layanan.",
  },
  {
    fromMs: 35820,
    emotion: "friendly",
    voiceover: "Dan tenang, API Mistral",
  },
  {
    fromMs: 37410,
    emotion: "approval",
    voiceover: "masih tetap tersedia.",
  },
  {
    fromMs: 39180,
    emotion: "curious",
    voiceover: "Nah, kalau buat proyekmu sendiri,",
  },
  {
    fromMs: 41240,
    emotion: "confident",
    voiceover: "kamu lebih pilih praktis lewat API",
  },
  {
    fromMs: 43720,
    emotion: "determined",
    voiceover: "atau punya kendali lebih dengan",
  },
  {
    fromMs: 44910,
    emotion: "curious",
    voiceover: "menjalankannya sendiri?",
  },
];

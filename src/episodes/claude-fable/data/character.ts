import type { CharacterEmotion } from "../../../data/character";

export const FABLE_CHARACTER_CUES: {
  fromMs: number;
  emotion: CharacterEmotion;
  voiceover: string;
}[] = [
  { fromMs: 0, emotion: "surprised", voiceover: "Seribu AI agent?" },
  {
    fromMs: 4500,
    emotion: "friendly",
    voiceover: "Ini eksperimen yang baru diumumkan",
  },
  { fromMs: 8920, emotion: "curious", voiceover: "Bayangin, seorang engineer" },
  {
    fromMs: 15550,
    emotion: "lookingLeft",
    voiceover: "Fable kemudian mengoordinasikan",
  },
  {
    fromMs: 19270,
    emotion: "determined",
    voiceover: "Mereka menulis kode, menjalankan tes",
  },
  { fromMs: 24130, emotion: "confident", voiceover: "Dan menurut Anthropic" },
  {
    fromMs: 32220,
    emotion: "skeptical",
    voiceover: "Tapi ingat, ini masih prototipe",
  },
  {
    fromMs: 39200,
    emotion: "lookingLeft",
    voiceover: "Yang menarik justru cara AI membagi proyek besar",
  },
  {
    fromMs: 45130,
    emotion: "curious",
    voiceover: "Kalau seribu AI agent bisa kerja bareng",
  },
];

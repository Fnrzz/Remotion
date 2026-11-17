import type { CharacterEmotion } from "../../../data/character";

export const AGENT_CHARACTER_CUES: readonly {
  fromMs: number;
  emotion: CharacterEmotion;
  voiceover: string;
}[] = [
  { fromMs: 0, emotion: "curious", voiceover: "Bayangin!" },
  { fromMs: 4420, emotion: "surprised", voiceover: "bisa klik dan ngetik" },
  { fromMs: 9140, emotion: "friendly", voiceover: "agent-desktop" },
  { fromMs: 13440, emotion: "determined", voiceover: "bukan model AI" },
  { fromMs: 17540, emotion: "lookingLeft", voiceover: "Agent yang memakainya" },
  { fromMs: 27130, emotion: "confident", voiceover: "baca antarmuka" },
  { fromMs: 31060, emotion: "skeptical", voiceover: "Tapi jangan salah" },
  { fromMs: 39460, emotion: "determined", voiceover: "snapshot dan log" },
  {
    fromMs: 45180,
    emotion: "curious",
    voiceover: "bagian apa yang paling wajib dibatasi?",
  },
];

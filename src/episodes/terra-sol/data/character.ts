import type { CharacterEmotion } from "../../../data/character";
import subtitles from "./subtitles.json";

// Phrase-level direction: timestamps and copy come from the actual subtitle
// cues, so later timing edits cannot leave expression changes out of sync.
// Match the emotional tone, without celebrating or endorsing either model.
const EMOTION_BY_SUBTITLE: Readonly<Record<string, CharacterEmotion>> = {
  "Sol punya tarif token": "neutral",
  "dua kali Terra.": "surprised",
  "Tapi di satu tes,": "curious",
  "selisihnya cuma 3 jawaban!": "surprised",
  "Ini GPT-6.1": "friendly",
  "Terra dan Sol,": "lookingLeft",
  "dua model AI dari OpenAI.": "confident",
  "Di API standar": "determined",
  "per 1 juta token,": "lookingLeft",
  "Terra 1 dolar input": "neutral",
  "dan 5 dolar output.": "lookingLeft",
  "Sol 2 dolar input": "neutral",
  "dan 10 dolar output.": "lookingLeft",
  "Dalam tes analisis data": "curious",
  "Plotly, Terra benar": "lookingLeft",
  "40 dari 43 soal.": "confident",
  "Sol? Benar semua:": "surprised",
  "43 dari 43.": "confident",
  "Tapi ingat,": "determined",
  "ini cuma satu tes.": "skeptical",
  "Bukan jaminan performa": "determined",
  "untuk semua pekerjaan.": "neutral",
  "Dan harga tadi": "curious",
  "bukan harga langganan ChatGPT.": "determined",
  "Kalau kamu, lebih pilih": "curious",
  "tarif yang hemat,": "playful",
  "atau coba dulu": "curious",
  "sesuai kebutuhan?": "friendly",
};

export const TERRA_SOL_CHARACTER_CUES = subtitles.map((subtitle) => ({
  fromMs: subtitle.startMs,
  emotion: EMOTION_BY_SUBTITLE[subtitle.text] ?? "neutral",
  voiceover: subtitle.text,
}));

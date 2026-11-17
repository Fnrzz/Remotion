// Seconds, reviewed against .preview/episode002/narration.json token offsets.
// Sentence-level cuts use Whisper segment boundaries; detail reveals use tokens.
export const CUES = {
  hookSecond: 2.76, // “Tapi”
  intro: 5.82, // Segment preceding “Ini GPT-6.1”
  pricing: 10.68, // Segment preceding “Di API standar”
  terraInput: 14.03, // “1” in “Terra 1 dolar input”
  terraOutput: 15.27, // “5 dolar output”
  solInput: 16.78, // “2 dolar input”
  solOutput: 17.95, // “10 dolar output”
  terraBenchmark: 19.5, // Segment preceding “Dalam tes analisis data”
  terraScore: 22.71, // “40”
  solBenchmark: 24.62, // Segment preceding “Sol?”
  solScore: 26.05, // “semua”: reveal the full score on the spoken emphasis.
  comparison: 27.95, // “dari 43”: briefly compare after the full-score hold.
  context: 29.02, // Segment preceding “Tapi ingat”
  generalization: 31.35, // “Bukan jaminan performa”
  subscription: 34.06, // Segment preceding “Dan harga tadi”
  closing: 36.86, // Segment preceding “Kalau kamu”
  closingChoice: 39.58, // “atau”
  // Last lexical token ends at 41.360 in Whisper, beyond the audio duration.
  // Clamp to the last complete millisecond of the supplied audio, not 41.440.
  speechEnd: 41.325,
} as const;

export const AUDIO_SRC = "assets/audio/voiceover-gpt-6.1-terra-vs-sol.mp3";
// Metadata fallback for the scaffold; prefer measured audio metadata at runtime.
export const AUDIO_DURATION = 41.325688;
export const END_HOLD_SECONDS = 0.8;

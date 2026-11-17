// Pose IDs and expression descriptions follow karaktersheet.md.
export const CHARACTER_POSES = {
  neutral: { id: "R1C1", asset: "r1c1", description: "Netral" },
  friendly: { id: "R1C3", asset: "r1c3", description: "Senyum ramah" },
  surprised: { id: "R1C4", asset: "r1c4", description: "Terkejut" },
  curious: { id: "R1C5", asset: "r1c5", description: "Berpikir penasaran" },
  playful: { id: "R2C1", asset: "r2c1", description: "Senyum mengedip" },
  confident: { id: "R2C2", asset: "r2c2", description: "Percaya diri" },
  approval: { id: "R2C3", asset: "r2c3", description: "Senyum dan jempol" },
  happy: { id: "R2C4", asset: "r2c4", description: "Senyum antusias" },
  skeptical: { id: "R2C5", asset: "r2c5", description: "Berpikir skeptis" },
  disappointed: { id: "R3C1", asset: "r3c1", description: "Sedikit kecewa" },
  lookingLeft: { id: "R4C1", asset: "r4c1", description: "Melihat ke materi" },
  determined: { id: "R4C2", asset: "r4c2", description: "Fokus dan tegas" },
} as const;

export type CharacterEmotion = keyof typeof CHARACTER_POSES;

export type CharacterGesture =
  "nod" | "shake" | "lean" | "pop" | "think" | "glance" | "settle";

type CharacterCue = {
  fromMs: number;
  emotion: CharacterEmotion;
  gesture: CharacterGesture;
  voiceover: string;
};

// Phrase boundaries measured from assets/audio/voiceover2.mp3.
export const CHARACTER_CUES: CharacterCue[] = [
  {
    fromMs: 0,
    emotion: "neutral",
    gesture: "nod",
    voiceover: "Gambar buatan AI,",
  },
  {
    fromMs: 1630,
    emotion: "playful",
    gesture: "shake",
    voiceover: "itu udah biasa.",
  },
  {
    fromMs: 2940,
    emotion: "curious",
    gesture: "lean",
    voiceover: "Tapi kalau AI bisa",
  },
  {
    fromMs: 4100,
    emotion: "surprised",
    gesture: "pop",
    voiceover: "bikin dunia virtual",
  },
  {
    fromMs: 5440,
    emotion: "lookingLeft",
    gesture: "glance",
    voiceover: "yang bisa kamu jelajahi,",
  },
  {
    fromMs: 7040,
    emotion: "friendly",
    gesture: "nod",
    voiceover: "Google baru aja memperkenalkan",
  },
  {
    fromMs: 9080,
    emotion: "confident",
    gesture: "pop",
    voiceover: "Genie 4.",
  },
  {
    fromMs: 10040,
    emotion: "friendly",
    gesture: "lean",
    voiceover: "AI ini bisa menciptakan",
  },
  {
    fromMs: 11570,
    emotion: "lookingLeft",
    gesture: "glance",
    voiceover: "dunia virtual interaktif",
  },
  {
    fromMs: 13250,
    emotion: "determined",
    gesture: "nod",
    voiceover: "real time.",
  },
  {
    fromMs: 14140,
    emotion: "confident",
    gesture: "nod",
    voiceover: "Kamu bisa mengubah cuaca,",
  },
  {
    fromMs: 15820,
    emotion: "approval",
    gesture: "pop",
    voiceover: "menambahkan karakter,",
  },
  {
    fromMs: 17230,
    emotion: "determined",
    gesture: "lean",
    voiceover: "bahkan mengarahkan adegan,",
  },
  {
    fromMs: 18740,
    emotion: "playful",
    gesture: "nod",
    voiceover: "cukup lewat instruksi teks.",
  },
  {
    fromMs: 20380,
    emotion: "surprised",
    gesture: "pop",
    voiceover: "Bahkan suara dan dialognya",
  },
  {
    fromMs: 22370,
    emotion: "happy",
    gesture: "nod",
    voiceover: "juga bisa dihasilkan AI.",
  },
  {
    fromMs: 24140,
    emotion: "skeptical",
    gesture: "shake",
    voiceover: "Tapi teknologi ini",
  },
  {
    fromMs: 25210,
    emotion: "determined",
    gesture: "nod",
    voiceover: "masih dalam tahap riset",
  },
  {
    fromMs: 26620,
    emotion: "disappointed",
    gesture: "settle",
    voiceover: "dan belum tersedia untuk semua orang.",
  },
  {
    fromMs: 28640,
    emotion: "curious",
    gesture: "think",
    voiceover: "Kalau AI terus berkembang seperti ini,",
  },
  {
    fromMs: 31140,
    emotion: "friendly",
    gesture: "lean",
    voiceover: "menurut kamu,",
  },
  {
    fromMs: 32100,
    emotion: "curious",
    gesture: "think",
    voiceover: "gimana masa depan industri game?",
  },
];

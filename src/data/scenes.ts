import type { Caption } from "@remotion/captions";
import { FPS } from "../theme";

export type SceneId =
  "hook" | "intro" | "what" | "capabilities" | "audio" | "research" | "closing";

export type SceneMeta = {
  id: SceneId;
  index: string;
  label: string;
  meta: string;
  from: number;
  durationInFrames: number;
};

// Hold the black hook until “itu udah biasa” ends in voiceover2.
export const HOOK_BLACK_END = Math.ceil(2.94 * FPS);

export const SCENES: SceneMeta[] = [
  {
    id: "hook",
    index: "01",
    label: "PEMBUKA",
    meta: "SIMULASI DUNIA",
    from: 0,
    durationInFrames: 211,
  },
  {
    id: "intro",
    index: "02",
    label: "PERKENALAN",
    meta: "GOOGLE DEEPMIND",
    from: 211,
    durationInFrames: 90,
  },
  {
    id: "what",
    index: "03",
    label: "APA INI",
    meta: "WAKTU NYATA",
    from: 301,
    durationInFrames: 123,
  },
  {
    id: "capabilities",
    index: "04",
    label: "KEMAMPUAN",
    meta: "PERINTAH TEKS",
    from: 424,
    durationInFrames: 187,
  },
  {
    id: "audio",
    index: "05",
    label: "SUARA",
    meta: "AUDIO NATIF",
    from: 611,
    durationInFrames: 113,
  },
  {
    id: "research",
    index: "06",
    label: "STATUS",
    meta: "PRATINJAU RISET",
    from: 724,
    durationInFrames: 135,
  },
  {
    id: "closing",
    index: "07",
    label: "PENUTUP",
    meta: "MASA DEPAN",
    from: 859,
    durationInFrames: 156,
  },
];

export const AUDIO_SRC = "assets/audio/voiceover2.mp3";

export const CAPTIONS: Caption[] = [
  {
    text: "Gambar buatan AI,",
    startMs: 0,
    endMs: 1500,
    timestampMs: 500,
    confidence: null,
  },
  {
    text: "itu udah biasa.",
    startMs: 1500,
    endMs: 2940,
    timestampMs: 1700,
    confidence: null,
  },
  {
    text: "Tapi kalau AI bisa",
    startMs: 2940,
    endMs: 4100,
    timestampMs: 3100,
    confidence: null,
  },
  {
    text: "bikin dunia virtual",
    startMs: 4100,
    endMs: 5440,
    timestampMs: 4300,
    confidence: null,
  },
  {
    text: "yang bisa kamu jelajahi,",
    startMs: 5440,
    endMs: 7040,
    timestampMs: 5700,
    confidence: null,
  },
  {
    text: "Google baru aja",
    startMs: 7040,
    endMs: 8010,
    timestampMs: 7300,
    confidence: null,
  },
  {
    text: "memperkenalkan Genie 4.",
    startMs: 8010,
    endMs: 10040,
    timestampMs: 8300,
    confidence: null,
  },
  {
    text: "AI ini bisa menciptakan",
    startMs: 10040,
    endMs: 11570,
    timestampMs: 10300,
    confidence: null,
  },
  {
    text: "dunia virtual interaktif",
    startMs: 11570,
    endMs: 12750,
    timestampMs: 11800,
    confidence: null,
  },
  {
    text: "secara real time.",
    startMs: 12750,
    endMs: 14140,
    timestampMs: 13000,
    confidence: null,
  },
  {
    text: "Kamu bisa mengubah cuaca,",
    startMs: 14140,
    endMs: 15820,
    timestampMs: 14400,
    confidence: null,
  },
  {
    text: "menambahkan karakter,",
    startMs: 15820,
    endMs: 17230,
    timestampMs: 16000,
    confidence: null,
  },
  {
    text: "bahkan mengarahkan adegan,",
    startMs: 17230,
    endMs: 18740,
    timestampMs: 17400,
    confidence: null,
  },
  {
    text: "cukup lewat instruksi teks.",
    startMs: 18740,
    endMs: 20380,
    timestampMs: 19000,
    confidence: null,
  },
  {
    text: "Bahkan suara dan dialognya",
    startMs: 20380,
    endMs: 22370,
    timestampMs: 20600,
    confidence: null,
  },
  {
    text: "juga bisa dihasilkan AI.",
    startMs: 22370,
    endMs: 24140,
    timestampMs: 22600,
    confidence: null,
  },
  {
    text: "Tapi teknologi ini",
    startMs: 24140,
    endMs: 25210,
    timestampMs: 24400,
    confidence: null,
  },
  {
    text: "masih dalam tahap riset",
    startMs: 25210,
    endMs: 26620,
    timestampMs: 25500,
    confidence: null,
  },
  {
    text: "dan belum tersedia",
    startMs: 26620,
    endMs: 27600,
    timestampMs: 26800,
    confidence: null,
  },
  {
    text: "untuk semua orang.",
    startMs: 27600,
    endMs: 28640,
    timestampMs: 27900,
    confidence: null,
  },
  {
    text: "Kalau AI terus berkembang",
    startMs: 28640,
    endMs: 30330,
    timestampMs: 28900,
    confidence: null,
  },
  {
    text: "seperti ini, menurut kamu,",
    startMs: 30330,
    endMs: 31960,
    timestampMs: 30600,
    confidence: null,
  },
  {
    text: "gimana masa depan",
    startMs: 31960,
    endMs: 32900,
    timestampMs: 32200,
    confidence: null,
  },
  {
    text: "industri game?",
    startMs: 32900,
    endMs: 33802,
    timestampMs: 33100,
    confidence: null,
  },
];

export type Capability = {
  id: string;
  index: string;
  title: string[];
  titleSizes: number[];
  body: string;
  prompt: string;
  image: string;
  imagePosition: string;
  overlayLabel: string;
  overlayValue: string;
  from: number;
  durationInFrames: number;
};

export const CAPABILITIES: Capability[] = [
  {
    id: "weather",
    index: "01",
    title: ["UBAH", "CUACA"],
    titleSizes: [104, 104],
    body: "Cukup ubah satu kalimat, dan kondisi dunia ikut berubah.",
    prompt: "Ubah cuaca jadi salju.",
    image: "assets/images/genie4-balloons.jpg",
    imagePosition: "50% 58%",
    overlayLabel: "CUACA",
    overlayValue: "SALJU",
    from: 424,
    durationInFrames: 51,
  },
  {
    id: "character",
    index: "02",
    title: ["TAMBAHKAN", "KARAKTER"],
    titleSizes: [68, 86],
    body: "Karakter baru masuk, lalu bergerak dan bereaksi secara alami.",
    prompt: "Tambahkan satu karakter.",
    image: "assets/images/genie4-character.jpg",
    imagePosition: "50% 42%",
    overlayLabel: "KARAKTER",
    overlayValue: "+1",
    from: 475,
    durationInFrames: 42,
  },
  {
    id: "scene",
    index: "03",
    title: ["ATUR", "ADEGAN"],
    titleSizes: [104, 100],
    body: "Arahkan cerita, kamera, dan suasana dalam satu perintah.",
    prompt: "Arahkan adegan ke stasiun.",
    image: "assets/images/genie4-station.jpg",
    imagePosition: "52% 48%",
    overlayLabel: "ADEGAN",
    overlayValue: "03",
    from: 517,
    durationInFrames: 94,
  },
];

export const sceneFromMs = (ms: number) => Math.round((ms / 1000) * FPS);

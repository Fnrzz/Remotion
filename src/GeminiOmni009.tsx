import React from "react";
import { getAudioDurationInSeconds } from "@remotion/media-utils";
import {
  AbsoluteFill,
  Audio,
  type CalculateMetadataFunction,
  Sequence,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { FullCanvasOverlays } from "./components/FullCanvasOverlays";
import { FONT_FAMILY } from "./fonts";
import type { CharacterEmotion } from "./data/character";
import { OMNI } from "./episodes/gemini-omni/config";
import captions from "./episodes/gemini-omni/data/subtitles.json";
import {
  ClosingScene,
  ConsistencyScene,
  ConversationalEditScene,
  HookScene,
  PricingScene,
  ProductRevealScene,
  TimelineExtensionScene,
} from "./episodes/gemini-omni/scenes/OmniScenes";

type Props = { audioSrc: string };
export const calculateOmniMetadata: CalculateMetadataFunction<Props> = async ({
  props,
}) => {
  const seconds = await getAudioDurationInSeconds(staticFile(props.audioSrc));
  if (!Number.isFinite(seconds) || Math.abs(seconds - OMNI.audioSeconds) > 0.08)
    throw new Error(
      "Audio Gemini Omni berubah: sinkronkan ulang adegan dan subtitle sebelum ekspor.",
    );
  return { durationInFrames: Math.ceil(seconds * 30) };
};

// Curated reactions at narration onsets; no cycling or audio-reactive motion.
const cues: { fromMs: number; emotion: CharacterEmotion; voiceover: string }[] =
  [
    { fromMs: 0, emotion: "surprised", voiceover: "AI video sekarang" },
    { fromMs: 2370, emotion: "confident", voiceover: "sekali generate" },
    {
      fromMs: 3880,
      emotion: "friendly",
      voiceover: "Google baru aja memperkenalkan",
    },
    { fromMs: 5550, emotion: "confident", voiceover: "Gemini Omni 1.2 Flash" },
    {
      fromMs: 7970,
      emotion: "lookingLeft",
      voiceover: "Kalau sebelumnya batas klip",
    },
    { fromMs: 11010, emotion: "approval", voiceover: "sekarang versi barunya" },
    { fromMs: 14210, emotion: "curious", voiceover: "Tapi bukan cuma" },
    {
      fromMs: 16770,
      emotion: "lookingLeft",
      voiceover: "Video yang sudah dibuat",
    },
    {
      fromMs: 17860,
      emotion: "confident",
      voiceover: "juga bisa direvisi lewat chat",
    },
    { fromMs: 19620, emotion: "curious", voiceover: "Mau ganti background" },
    { fromMs: 21640, emotion: "lookingLeft", voiceover: "atau suasana adegan" },
    {
      fromMs: 22930,
      emotion: "approval",
      voiceover: "tinggal kasih instruksi lanjutan",
    },
    { fromMs: 24770, emotion: "skeptical", voiceover: "Google juga mengklaim" },
    {
      fromMs: 25720,
      emotion: "lookingLeft",
      voiceover: "konsistensi karakter dan objek",
    },
    {
      fromMs: 28330,
      emotion: "determined",
      voiceover: "Bahkan saat kamera bergerak",
    },
    {
      fromMs: 30170,
      emotion: "neutral",
      voiceover: "Dan untuk API video 720p",
    },
    {
      fromMs: 32490,
      emotion: "lookingLeft",
      voiceover: "Google menurunkan tarifnya",
    },
    { fromMs: 34160, emotion: "happy", voiceover: "30 persen" },
    {
      fromMs: 34860,
      emotion: "confident",
      voiceover: "jadi 7 sen dolar per detik",
    },
    {
      fromMs: 37170,
      emotion: "skeptical",
      voiceover: "Tapi ingat, batas durasi",
    },
    { fromMs: 39510, emotion: "determined", voiceover: "bisa berbeda" },
    { fromMs: 41790, emotion: "neutral", voiceover: "yang dipakai" },
    { fromMs: 42850, emotion: "curious", voiceover: "Kalau kamu jadi kreator" },
    { fromMs: 44040, emotion: "friendly", voiceover: "lebih tertarik video" },
    {
      fromMs: 46490,
      emotion: "lookingLeft",
      voiceover: "atau bisa ngedit video",
    },
    { fromMs: 47510, emotion: "curious", voiceover: "cuma lewat chat" },
  ];

const Overlays: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <>
      <div data-episode-frame={frame} style={{ display: "none" }} />
      <FullCanvasOverlays
        captions={captions}
        cues={cues}
        dark={frame < Math.round(3.88 * fps)}
      />
    </>
  );
};

export const GeminiOmni009: React.FC<Props> = ({ audioSrc }) => {
  const { width, height, fps, durationInFrames } = useVideoConfig();
  return (
    <AbsoluteFill
      style={{ backgroundColor: "#FAF9F6", fontFamily: FONT_FAMILY }}
    >
      <Audio
        name="VO Gemini Omni — ElevenLabs asli, tanpa perubahan"
        src={staticFile(audioSrc)}
      />
      <div
        data-omni-design
        style={{
          position: "absolute",
          width: 1080,
          height: 1920,
          transformOrigin: "top left",
          scale: `${width / 1080} ${height / 1920}`,
        }}
      >
        <div data-scenes>
          <Sequence
            name="01 — Timeline 10 → 15 detik"
            durationInFrames={Math.round(3.88 * fps)}
          >
            <HookScene />
          </Sequence>
          <Sequence
            name="02 — Timeline melebur ke product reveal"
            from={Math.round(3.88 * fps)}
            durationInFrames={Math.round(7.92 * fps) - Math.round(3.88 * fps)}
          >
            <ProductRevealScene />
          </Sequence>
          <Sequence
            name="01B — Perbandingan Omni 1.1 dan 1.2"
            from={Math.round(7.92 * fps)}
            durationInFrames={Math.round(14.16 * fps) - Math.round(7.92 * fps)}
          >
            <TimelineExtensionScene />
          </Sequence>
          <Sequence
            name="03 — Instruksi chat mengubah siang jadi malam"
            from={Math.round(14.16 * fps)}
            durationInFrames={Math.round(24.72 * fps) - Math.round(14.16 * fps)}
          >
            <ConversationalEditScene />
          </Sequence>
          <Sequence
            name="04 — Satu objek, tiga komposisi kamera"
            from={Math.round(24.72 * fps)}
            durationInFrames={Math.round(30.12 * fps) - Math.round(24.72 * fps)}
          >
            <ConsistencyScene />
          </Sequence>
          <Sequence
            name="05 — Tarif API 720p turun relatif 30 persen"
            from={Math.round(30.12 * fps)}
            durationInFrames={Math.round(37.12 * fps) - Math.round(30.12 * fps)}
          >
            <PricingScene />
          </Sequence>
          <Sequence
            name="06 — Batas mode, rekap visual, pertanyaan akhir"
            from={Math.round(37.12 * fps)}
            durationInFrames={durationInFrames - Math.round(37.12 * fps)}
          >
            <ClosingScene />
          </Sequence>
        </div>
      </div>
      <Sequence name="Subtitle persisten, ekspresi Prof Deps, watermark">
        <Overlays />
      </Sequence>
    </AbsoluteFill>
  );
};

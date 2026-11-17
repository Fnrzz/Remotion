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
import timing from "./episodes/gemini-hydrogen/data/timing.json";
import captions from "./episodes/gemini-hydrogen/data/subtitles.json";
import {
  BenchmarkScene,
  ClosingScene,
  EfficiencyPricingScene,
  HookScene,
  OrchestratorScene,
  RevealScene,
} from "./episodes/gemini-hydrogen/scenes/HydrogenScenes";

export type GeminiHydrogenProps = { audioSrc: string };

export const calculateHydrogenMetadata: CalculateMetadataFunction<
  GeminiHydrogenProps
> = async ({ props }) => {
  const seconds = await getAudioDurationInSeconds(staticFile(props.audioSrc));
  if (!Number.isFinite(seconds) || seconds <= 0)
    throw new Error(
      "VO Hydrogen tidak ditemukan atau format audio tidak didukung.",
    );
  if (Math.abs(seconds - timing.audio.durationSeconds) > 0.08)
    throw new Error(
      "VO Hydrogen berubah. Sinkronkan ulang timing.json dan subtitles.json dari rekaman baru sebelum ekspor.",
    );
  return { durationInFrames: Math.ceil(seconds * 30) };
};

const characterCues: {
  fromMs: number;
  emotion: CharacterEmotion;
  voiceover: string;
}[] = [
  {
    fromMs: 0,
    emotion: "surprised",
    voiceover: "Model Gemini ... ngunggulin Argon?",
  },
  { fromMs: 4010, emotion: "friendly", voiceover: "Google baru aja merilis" },
  { fromMs: 8610, emotion: "lookingLeft", voiceover: "coding dan AI agent" },
  { fromMs: 19230, emotion: "curious", voiceover: "Hydrogen mode high" },
  { fromMs: 24310, emotion: "skeptical", voiceover: "cuma satu indeks" },
  { fromMs: 30940, emotion: "lookingLeft", voiceover: "bernama Orchestrator" },
  { fromMs: 39760, emotion: "neutral", voiceover: "Dalam pengujian Google" },
  { fromMs: 48550, emotion: "confident", voiceover: "Harga API Hydrogen" },
  { fromMs: 55460, emotion: "curious", voiceover: "Menurut kamu" },
];

const StableOverlays: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <>
      <div data-episode-frame={frame} style={{ display: "none" }} />
      <FullCanvasOverlays
        captions={captions}
        cues={characterCues}
        dark={frame < Math.round(3.88 * fps)}
      />
    </>
  );
};

export const GeminiHydrogen012: React.FC<GeminiHydrogenProps> = ({
  audioSrc,
}) => {
  const { width, height, fps, durationInFrames } = useVideoConfig();
  return (
    <AbsoluteFill
      style={{ backgroundColor: "#FAF9F6", fontFamily: FONT_FAMILY }}
    >
      <Audio
        name="ElevenLabs VO Hydrogen — asli, utuh, kecepatan 1×"
        src={staticFile(audioSrc)}
      />
      <div
        data-hydrogen-design
        style={{
          position: "absolute",
          width: 1080,
          height: 1920,
          transformOrigin: "top left",
          scale: `${width / 1080} ${height / 1920}`,
        }}
      >
        <Sequence
          name="01 — Hook: 51 versus 50, skala jujur 0–100"
          durationInFrames={Math.round(3.88 * fps)}
        >
          <HookScene />
        </Sequence>
        <Sequence
          name="02 — Hydrogen: repositori, tool, review konseptual"
          from={Math.round(3.88 * fps)}
          durationInFrames={Math.round(15.8 * fps) - Math.round(3.88 * fps)}
        >
          <RevealScene />
        </Sequence>
        <Sequence
          name="03 — Artificial Analysis: satu poin, satu indeks"
          from={Math.round(15.8 * fps)}
          durationInFrames={Math.round(28.56 * fps) - Math.round(15.8 * fps)}
        >
          <BenchmarkScene />
        </Sequence>
        <Sequence
          name="04 — Hero: Orchestrator, Carbon ↔ Hydrogen"
          from={Math.round(28.56 * fps)}
          durationInFrames={Math.round(39.68 * fps) - Math.round(28.56 * fps)}
        >
          <OrchestratorScene />
        </Sequence>
        <Sequence
          name="05 — Evaluasi Google → tarif token API"
          from={Math.round(39.68 * fps)}
          durationInFrames={Math.round(55.36 * fps) - Math.round(39.68 * fps)}
        >
          <EfficiencyPricingScene />
        </Sequence>
        <Sequence
          name="06 — Pilihan: satu AI atau tim AI?"
          from={Math.round(55.36 * fps)}
          durationInFrames={durationInFrames - Math.round(55.36 * fps)}
        >
          <ClosingScene />
        </Sequence>
      </div>
      <Sequence name="Overlay full-canvas: karakter diam, subtitle stabil, @prof.deps">
        <StableOverlays />
      </Sequence>
    </AbsoluteFill>
  );
};

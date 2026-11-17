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
import { FONT_FAMILY } from "./fonts";
import { FullCanvasOverlays } from "./components/FullCanvasOverlays";
import type { CharacterEmotion } from "./data/character";
import timing from "./episodes/deepseek-harness/data/timing.json";
import subtitles from "./episodes/deepseek-harness/data/subtitles.json";
import {
  ArchitectureScene,
  ClosingScene,
  CostScene,
  CreatorScene,
  ExtensionsScene,
  HookScene,
} from "./episodes/deepseek-harness/scenes/HarnessScenes";

type Props = { audioSrc: string };

export const calculateHarnessMetadata: CalculateMetadataFunction<
  Props
> = async ({ props }) => {
  const seconds = await getAudioDurationInSeconds(staticFile(props.audioSrc));
  if (!Number.isFinite(seconds) || seconds <= 0)
    throw new Error("File VO DeepSeek Harness tidak dapat dibaca.");
  if (Math.abs(seconds - timing.audio.durationSeconds) > 0.08)
    throw new Error("VO berubah. Analisis ulang transkrip dan timing adegan.");
  return { durationInFrames: Math.ceil(seconds * 30) };
};

const expressions: {
  fromMs: number;
  emotion: CharacterEmotion;
  voiceover: string;
}[] = [
  {
    fromMs: 0,
    emotion: "curious",
    voiceover: "DeepSeek Harness mau nantang Claude Code?",
  },
  {
    fromMs: 2130,
    emotion: "determined",
    voiceover: "Tapi ini bukan sekadar adu model.",
  },
  {
    fromMs: 4930,
    emotion: "lookingLeft",
    voiceover: "Claude Code itu coding agent siap pakai.",
  },
  { fromMs: 10910, emotion: "confident", voiceover: "DeepSeek Harness beda." },
  { fromMs: 17670, emotion: "happy", voiceover: "Bahkan ada Creator mode." },
  {
    fromMs: 23890,
    emotion: "lookingLeft",
    voiceover: "Tapi Claude Code juga punya plugin.",
  },
  {
    fromMs: 27990,
    emotion: "curious",
    voiceover: "Bedanya, bagian inti agent pun bisa diganti.",
  },
  { fromMs: 35830, emotion: "neutral", voiceover: "Soal biaya?" },
  {
    fromMs: 45530,
    emotion: "skeptical",
    voiceover: "Tapi Harness masih tahap preview.",
  },
  {
    fromMs: 50350,
    emotion: "friendly",
    voiceover: "Kalau kamu developer, lebih pilih yang mana?",
  },
];

const StableOverlays: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <>
      <div data-episode-frame={frame} style={{ display: "none" }} />
      <FullCanvasOverlays
        captions={subtitles}
        cues={expressions}
        dark={frame < Math.round(4.88 * fps)}
      />
    </>
  );
};

export const DeepSeekHarness011: React.FC<Props> = ({ audioSrc }) => {
  const { width, height, fps, durationInFrames } = useVideoConfig();
  return (
    <AbsoluteFill
      style={{ fontFamily: FONT_FAMILY, backgroundColor: "#FAF9F6" }}
    >
      <Audio
        name="VO ElevenLabs asli — utuh, kecepatan 1×"
        src={staticFile(audioSrc)}
      />
      <div
        data-deepseek-design
        style={{
          position: "absolute",
          width: 1080,
          height: 1920,
          transformOrigin: "top left",
          scale: `${width / 1080} ${height / 1920}`,
        }}
      >
        <Sequence
          name="01 — Dua pendekatan, bukan adu model"
          durationInFrames={Math.round(4.88 * fps)}
        >
          <HookScene />
        </Sequence>
        <Sequence
          name="02 — Runtime modular dan agen terintegrasi"
          from={Math.round(4.88 * fps)}
          durationInFrames={Math.round(17.62 * fps) - Math.round(4.88 * fps)}
        >
          <ArchitectureScene />
        </Sequence>
        <Sequence
          name="03 — Creator mode: rakitan plugin Pomodoro"
          from={Math.round(17.62 * fps)}
          durationInFrames={Math.round(23.84 * fps) - Math.round(17.62 * fps)}
        >
          <CreatorScene />
        </Sequence>
        <Sequence
          name="04 — Ekstensi Claude dan perbedaan inti runtime"
          from={Math.round(23.84 * fps)}
          durationInFrames={Math.round(35.78 * fps) - Math.round(23.84 * fps)}
        >
          <ExtensionsScene />
        </Sequence>
        <Sequence
          name="05 — Biaya, pilihan akses, dan developer preview"
          from={Math.round(35.78 * fps)}
          durationInFrames={Math.round(50.3 * fps) - Math.round(35.78 * fps)}
        >
          <CostScene />
        </Sequence>
        <Sequence
          name="06 — Rakit atau pakai? Pertanyaan utuh"
          from={Math.round(50.3 * fps)}
          durationInFrames={durationInFrames - Math.round(50.3 * fps)}
        >
          <ClosingScene />
        </Sequence>
      </div>
      <Sequence name="Overlay tetap — subtitle, ekspresi, @prof.deps">
        <StableOverlays />
      </Sequence>
    </AbsoluteFill>
  );
};

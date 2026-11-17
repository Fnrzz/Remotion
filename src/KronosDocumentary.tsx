import React from "react";
import type { Caption } from "@remotion/captions";
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
import { KRONOS_CHARACTER_CUES } from "./episodes/kronos/data/character";
import { KRONOS_AUDIO_SECONDS } from "./episodes/kronos/data/timing";
import subtitleData from "./episodes/kronos/data/subtitles.json";
import {
  ClosingScene,
  HookScene,
  NumericalScene,
  RevealScene,
  ScenariosScene,
  TokenizationScene,
} from "./episodes/kronos/scenes/KronosScenes";

export type KronosDocumentaryProps = {
  audioSrc: string;
};

export const calculateKronosMetadata: CalculateMetadataFunction<
  KronosDocumentaryProps
> = async ({ props }) => {
  const seconds = await getAudioDurationInSeconds(staticFile(props.audioSrc));
  if (!Number.isFinite(seconds) || seconds <= 0)
    throw new Error("Audio final Kronos tidak tersedia atau tidak valid.");
  if (Math.abs(seconds - KRONOS_AUDIO_SECONDS) > 0.08)
    throw new Error(
      "Audio Kronos berubah. Sinkronkan ulang subtitle dan adegan sebelum ekspor.",
    );
  return { durationInFrames: Math.ceil(seconds * 30) };
};

const StableOverlays: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const dark = frame < Math.round(4.2 * fps);
  const captions: Caption[] = subtitleData;
  return (
    <>
      <div data-editorial-frame={frame} style={{ display: "none" }} />
      <FullCanvasOverlays
        captions={captions}
        cues={KRONOS_CHARACTER_CUES}
        dark={dark}
      />
    </>
  );
};

export const KronosDocumentary: React.FC<KronosDocumentaryProps> = ({
  audioSrc,
}) => {
  const { width, height, fps, durationInFrames } = useVideoConfig();
  return (
    <AbsoluteFill
      style={{ backgroundColor: "#FAF9F6", fontFamily: FONT_FAMILY }}
    >
      <Audio
        name="VO Kronos — ElevenLabs final, kecepatan asli"
        src={staticFile(audioSrc)}
      />
      <div
        data-kronos-design
        style={{
          position: "absolute",
          width: 1080,
          height: 1920,
          transformOrigin: "top left",
          transform: `scale(${width / 1080}, ${height / 1920})`,
        }}
      >
        <Sequence
          name="01 — Hook: candle menuju angka"
          durationInFrames={Math.round(4.2 * fps)}
        >
          <HookScene />
        </Sequence>
        <Sequence
          name="02 — Kenalin, Kronos: riset 2025"
          from={Math.round(4.2 * fps)}
          durationInFrames={Math.round(9.32 * fps) - Math.round(4.2 * fps)}
        >
          <RevealScene />
        </Sequence>
        <Sequence
          name="03 — Angka OHLC dan informasi waktu"
          from={Math.round(9.32 * fps)}
          durationInFrames={Math.round(20.56 * fps) - Math.round(9.32 * fps)}
        >
          <NumericalScene />
        </Sequence>
        <Sequence
          name="04 — Tokenisasi dan proyeksi autoregresif"
          from={Math.round(20.56 * fps)}
          durationInFrames={Math.round(27.72 * fps) - Math.round(20.56 * fps)}
        >
          <TokenizationScene />
        </Sequence>
        <Sequence
          name="05 — Sampling: beberapa jalur ilustratif"
          from={Math.round(27.72 * fps)}
          durationInFrames={Math.round(34.12 * fps) - Math.round(27.72 * fps)}
        >
          <ScenariosScene />
        </Sequence>
        <Sequence
          name="06 — Batasan dan pertanyaan penutup"
          from={Math.round(34.12 * fps)}
          durationInFrames={durationInFrames - Math.round(34.12 * fps)}
        >
          <ClosingScene />
        </Sequence>
      </div>
      <Sequence name="Karakter, subtitle stabil dan watermark @prof.deps">
        <StableOverlays />
      </Sequence>
    </AbsoluteFill>
  );
};

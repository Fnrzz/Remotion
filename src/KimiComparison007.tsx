import React from "react";
import { getAudioDurationInSeconds } from "@remotion/media-utils";
import {
  AbsoluteFill,
  Audio,
  type CalculateMetadataFunction,
  Sequence,
  staticFile,
  useVideoConfig,
} from "remotion";
import { FONT_FAMILY } from "./fonts";
import { DynamicSubtitles } from "./episodes/kimi-comparison/components/DynamicSubtitles";
import timing from "./episodes/kimi-comparison/data/timing.json";
import {
  BenchmarksScene,
  ClosingScene,
  HookScene,
  ModelRevealScene,
  PricingScene,
} from "./episodes/kimi-comparison/scenes/ComparisonScenes";

export type KimiComparisonProps = { audioSrc: string };

export const calculateKimiComparisonMetadata: CalculateMetadataFunction<
  KimiComparisonProps
> = async ({ props }) => {
  const seconds = await getAudioDurationInSeconds(staticFile(props.audioSrc));
  if (!Number.isFinite(seconds) || seconds <= 0)
    throw new Error("VO Kimi final tidak tersedia atau tidak valid.");
  if (Math.abs(seconds - timing.audioSeconds) > 0.08)
    throw new Error(
      "Audio berubah. Sinkronkan ulang subtitle dan angka sebelum ekspor.",
    );
  return { durationInFrames: Math.ceil(seconds * 30) };
};

export const KimiComparison007: React.FC<KimiComparisonProps> = ({
  audioSrc,
}) => {
  const { width, height, fps, durationInFrames } = useVideoConfig();
  return (
    <AbsoluteFill
      style={{ backgroundColor: "#FAF9F6", fontFamily: FONT_FAMILY }}
    >
      <Audio
        name="VO final Kimi — asli tanpa perubahan"
        src={staticFile(audioSrc)}
      />
      <div
        data-kimi-design
        style={{
          position: "absolute",
          width: 1080,
          height: 1920,
          transformOrigin: "top left",
          scale: `${width / 1080} ${height / 1920}`,
        }}
      >
        <Sequence
          name="01 — Harga beda 5×, performanya gimana?"
          durationInFrames={Math.round(timing.models * fps)}
        >
          <HookScene />
        </Sequence>
        <Sequence
          name="02 — Tiga model, dua sudut pandang"
          from={Math.round(timing.models * fps)}
          durationInFrames={
            Math.round(timing.pricing * fps) - Math.round(timing.models * fps)
          }
        >
          <ModelRevealScene />
        </Sequence>
        <Sequence
          name="03 — Tarif API standar, input dan output terpisah"
          from={Math.round(timing.pricing * fps)}
          durationInFrames={
            Math.round(timing.code * fps) - Math.round(timing.pricing * fps)
          }
        >
          <PricingScene />
        </Sequence>
        <Sequence
          name="04–05 — Transformasi benchmark, skala tetap"
          from={Math.round(timing.code * fps)}
          durationInFrames={
            Math.round(timing.closing * fps) - Math.round(timing.code * fps)
          }
        >
          <BenchmarksScene />
        </Sequence>
        <Sequence
          name="06 — Biaya nyata dan pilihan sesuai kebutuhan"
          from={Math.round(timing.closing * fps)}
          durationInFrames={durationInFrames - Math.round(timing.closing * fps)}
        >
          <ClosingScene />
        </Sequence>
      </div>
      <Sequence name="Overlay tetap — subtitle, karakter, watermark">
        <DynamicSubtitles />
      </Sequence>
    </AbsoluteFill>
  );
};

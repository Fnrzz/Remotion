import React from "react";
import type { Caption } from "@remotion/captions";
import { getAudioDurationInSeconds } from "@remotion/media-utils";
import {
  AbsoluteFill,
  Audio,
  type CalculateMetadataFunction,
  interpolate,
  Sequence,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { BackgroundCanvas } from "./components/BackgroundCanvas";
import { CharacterOverlay } from "./components/CharacterOverlay";
import { Subtitles } from "./components/Subtitles";
import { TikTokSafeStage } from "./components/TikTokSafeStage";
import { TikTokSafeAreaOverlay } from "./components/TikTokSafeAreaOverlay";
import { TikTokWatermark } from "./components/TikTokWatermark";
import {
  AUDIO_DURATION,
  CUES,
  END_HOLD_SECONDS,
} from "./episodes/terra-sol/data/sceneTimings";
import subtitleData from "./episodes/terra-sol/data/subtitles.json";
import { TERRA_SOL_CHARACTER_CUES } from "./episodes/terra-sol/data/character";
import { HookScene } from "./episodes/terra-sol/scenes/HookScene";
import { ModelIntroScene } from "./episodes/terra-sol/scenes/ModelIntroScene";
import { PricingScene } from "./episodes/terra-sol/scenes/PricingScene";
import {
  TerraBenchmarkScene,
  SolBenchmarkScene,
} from "./episodes/terra-sol/scenes/BenchmarkScenes";
import { ContextScene } from "./episodes/terra-sol/scenes/ContextScene";
import { ClosingScene } from "./episodes/terra-sol/scenes/ClosingScene";
import { FONT_FAMILY } from "./fonts";
import { COLORS } from "./theme";

export type TerraVsSolNewsProps = {
  audioSrc: string;
  audioDurationInSeconds: number;
  showSafeArea: boolean;
  showTikTokOverlay: boolean;
};

// Missing/replaced audio fails loudly instead of silently exporting a mute draft.
// Metadata is always measured; the supplied default is only a Studio scaffold.
export const calculateTerraSolMetadata: CalculateMetadataFunction<
  TerraVsSolNewsProps
> = async ({ props }) => {
  const audioDurationInSeconds = await getAudioDurationInSeconds(
    staticFile(props.audioSrc),
  );
  if (!Number.isFinite(audioDurationInSeconds) || audioDurationInSeconds <= 0) {
    throw new Error("Audio narasi tidak tersedia atau durasinya tidak valid.");
  }
  if (Math.abs(audioDurationInSeconds - AUDIO_DURATION) > 0.15) {
    throw new Error(
      "Audio berbeda dari narasi yang sudah disinkronkan. Perbarui subtitle dan sceneTimings sebelum ekspor.",
    );
  }
  return {
    durationInFrames: Math.ceil(
      (audioDurationInSeconds + END_HOLD_SECONDS) * 30,
    ),
    props: { ...props, audioDurationInSeconds },
  };
};

const EditorialSource: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const time = frame / fps;
  const pricing = time >= CUES.pricing && time < CUES.terraBenchmark;
  const benchmark = time >= CUES.terraBenchmark && time < CUES.context;
  if (!pricing && !benchmark) return null;
  return (
    <div
      data-editorial-source="true"
      style={{
        position: "absolute",
        left: (132 * width) / 1080,
        top: (606 * height) / 1920,
        width: (696 * width) / 1080,
        fontSize: (16 * width) / 1080,
        fontFamily: FONT_FAMILY,
        fontWeight: 500,
        lineHeight: 1.25,
        color: COLORS.gray,
      }}
    >
      <strong>Sumber: </strong>
      {pricing
        ? "developers.openai.com/api/docs/pricing"
        : "plotly.com/blog/gpt-6-1-terra-plotly-data-analytics-bench/"}
    </div>
  );
};

export const TerraVsSolNews: React.FC<TerraVsSolNewsProps> = ({
  audioSrc,
  audioDurationInSeconds,
  showSafeArea,
  showTikTokOverlay = true,
}) => {
  const frame = useCurrentFrame();
  const { fps, width, height, durationInFrames } = useVideoConfig();
  const time = frame / fps;
  const onDark =
    time < CUES.intro || (time >= CUES.context && time < CUES.closing);
  // A reading hold does not change the audio or its transcript timestamps.
  const captions: Caption[] = subtitleData.map((caption, index) => ({
    ...caption,
    endMs:
      index === subtitleData.length - 1
        ? (durationInFrames / fps) * 1000
        : caption.endMs,
  }));
  return (
    <AbsoluteFill
      style={{
        background: COLORS.offWhite,
        fontFamily: FONT_FAMILY,
        color: COLORS.black,
      }}
    >
      <Audio src={staticFile(audioSrc)} />
      <div
        style={{
          width: 1080,
          height: 1920,
          position: "absolute",
          scale: `${width / 1080} ${height / 1920}`,
          transformOrigin: "top left",
        }}
      >
        <BackgroundCanvas />
      </div>
      {onDark ? <AbsoluteFill style={{ background: COLORS.black }} /> : null}
      <TikTokSafeStage
        focusBounds={{ left: 60, top: 210, right: 1080, bottom: 1040 }}
      >
        <Sequence
          name="01 — Tarif API dan satu tes"
          durationInFrames={Math.round(CUES.intro * fps)}
        >
          <HookScene />
        </Sequence>
        <Sequence
          name="02 — Dua model OpenAI"
          from={Math.round(CUES.intro * fps)}
          durationInFrames={
            Math.round(CUES.pricing * fps) - Math.round(CUES.intro * fps)
          }
        >
          <ModelIntroScene />
        </Sequence>
        <Sequence
          name="03 — Harga API Standard"
          from={Math.round(CUES.pricing * fps)}
          durationInFrames={
            Math.round(CUES.terraBenchmark * fps) -
            Math.round(CUES.pricing * fps)
          }
        >
          <PricingScene />
        </Sequence>
        <Sequence
          name="04 — Terra: tes Plotly"
          from={Math.round(CUES.terraBenchmark * fps)}
          durationInFrames={
            Math.round(CUES.solBenchmark * fps) -
            Math.round(CUES.terraBenchmark * fps)
          }
        >
          <TerraBenchmarkScene />
        </Sequence>
        <Sequence
          name="05 — Sol dan selisih tiga jawaban"
          from={Math.round(CUES.solBenchmark * fps)}
          durationInFrames={
            Math.round(CUES.context * fps) - Math.round(CUES.solBenchmark * fps)
          }
        >
          <SolBenchmarkScene />
        </Sequence>
        <Sequence
          name="06 — Konteks penting"
          from={Math.round(CUES.context * fps)}
          durationInFrames={
            Math.round(CUES.closing * fps) - Math.round(CUES.context * fps)
          }
        >
          <ContextScene />
        </Sequence>
        <Sequence
          name="07 — Pilih sesuai kebutuhan"
          from={Math.round(CUES.closing * fps)}
        >
          <ClosingScene />
        </Sequence>
      </TikTokSafeStage>
      <EditorialSource />
      <CharacterOverlay cues={TERRA_SOL_CHARACTER_CUES} />
      <Subtitles
        captions={captions}
        persistent
        variant={onDark ? "onDark" : "light"}
      />
      <TikTokWatermark username="@prof.deps" onDark={onDark} />
      <AbsoluteFill
        style={{
          background: COLORS.offWhite,
          pointerEvents: "none",
          opacity: interpolate(
            frame,
            [(audioDurationInSeconds + 0.4) * fps, durationInFrames - 1],
            [0, 1],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
          ),
        }}
      />
      <TikTokSafeAreaOverlay enabled={showTikTokOverlay || showSafeArea} />
    </AbsoluteFill>
  );
};

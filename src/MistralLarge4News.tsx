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
import { CharacterOverlay } from "./components/CharacterOverlay";
import { Subtitles } from "./components/Subtitles";
import { TikTokSafeAreaOverlay } from "./components/TikTokSafeAreaOverlay";
import { TikTokWatermark } from "./components/TikTokWatermark";
import { MISTRAL_CHARACTER_CUES } from "./episodes/mistral/data/character";
import { FONT_FAMILY } from "./fonts";
import {
  MISTRAL_AUDIO_SECONDS,
  MISTRAL_CUES,
} from "./episodes/mistral/data/timing";
import subtitleData from "./episodes/mistral/data/subtitles.json";
import {
  ChoiceScene,
  ClosingScene,
  HookScene,
  LimitationsScene,
  ProductScene,
  WeightsScene,
} from "./episodes/mistral/scenes/MistralScenes";

export type MistralLarge4NewsProps = {
  audioSrc: string;
  showTikTokOverlay: boolean;
};

export const calculateMistralMetadata: CalculateMetadataFunction<
  MistralLarge4NewsProps
> = async ({ props }) => {
  const seconds = await getAudioDurationInSeconds(staticFile(props.audioSrc));
  if (!Number.isFinite(seconds) || seconds <= 0)
    throw new Error("VO Mistral tidak valid atau tidak tersedia.");
  if (Math.abs(seconds - MISTRAL_AUDIO_SECONDS) > 0.08)
    throw new Error(
      "VO Mistral berubah. Sinkronkan ulang subtitle dan adegan sebelum render.",
    );
  return { durationInFrames: Math.ceil(seconds * 30) };
};

const CaptionsAndBrand: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const captions: Caption[] = subtitleData;
  const dark =
    frame < Math.round(MISTRAL_CUES.reveal * fps) ||
    (frame >= Math.round(MISTRAL_CUES.limitations * fps) &&
      frame < Math.round(MISTRAL_CUES.apiReminder * fps));
  return (
    <>
      <div data-editorial-frame={frame} style={{ display: "none" }} />
      <CharacterOverlay cues={MISTRAL_CHARACTER_CUES} />
      <Subtitles
        captions={captions}
        persistent
        variant={dark ? "onDark" : "light"}
      />
      <TikTokWatermark username="@prof.deps" onDark={dark} />
    </>
  );
};

export const MistralLarge4News: React.FC<MistralLarge4NewsProps> = ({
  audioSrc,
  showTikTokOverlay,
}) => {
  const { width, height, fps, durationInFrames } = useVideoConfig();
  return (
    <AbsoluteFill
      style={{ backgroundColor: "#FAF9F6", fontFamily: FONT_FAMILY }}
    >
      <Audio
        name="VO ElevenLabs final — asli, tanpa perubahan kecepatan"
        src={staticFile(audioSrc)}
      />
      <div
        data-mistral-design
        style={{
          position: "absolute",
          width: 1080,
          height: 1920,
          transformOrigin: "top left",
          transform: `scale(${width / 1080}, ${height / 1920})`,
        }}
      >
        <Sequence
          name="01 — AI bisa jalan sendiri?!"
          durationInFrames={Math.round(4.78 * fps)}
        >
          <HookScene />
        </Sequence>
        <Sequence
          name="02 — Mistral Large 4"
          from={Math.round(4.78 * fps)}
          durationInFrames={Math.round(10.18 * fps) - Math.round(4.78 * fps)}
        >
          <ProductScene />
        </Sequence>
        <Sequence
          name="03 — Bobot AI tersedia"
          from={Math.round(10.18 * fps)}
          durationInFrames={Math.round(16.34 * fps) - Math.round(10.18 * fps)}
        >
          <WeightsScene />
        </Sequence>
        <Sequence
          name="04 — API atau server sendiri"
          from={Math.round(16.34 * fps)}
          durationInFrames={Math.round(22.7 * fps) - Math.round(16.34 * fps)}
        >
          <ChoiceScene />
        </Sequence>
        <Sequence
          name="05 — Lisensi dan infrastruktur"
          from={Math.round(22.7 * fps)}
          durationInFrames={Math.round(35.82 * fps) - Math.round(22.7 * fps)}
        >
          <LimitationsScene />
        </Sequence>
        <Sequence
          name="04b — API tetap tersedia, sesuai urutan VO"
          from={Math.round(35.82 * fps)}
          durationInFrames={Math.round(39.18 * fps) - Math.round(35.82 * fps)}
        >
          <ChoiceScene reminder />
        </Sequence>
        <Sequence
          name="06 — Kamu pilih yang mana?"
          from={Math.round(39.18 * fps)}
          durationInFrames={durationInFrames - Math.round(39.18 * fps)}
        >
          <ClosingScene />
        </Sequence>
      </div>
      <Sequence name="Karakter, subtitle stabil dan watermark @prof.deps">
        <CaptionsAndBrand />
      </Sequence>
      <TikTokSafeAreaOverlay enabled={showTikTokOverlay} />
    </AbsoluteFill>
  );
};

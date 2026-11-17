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
import { TikTokWatermark } from "./components/TikTokWatermark";
import { TikTokSafeAreaOverlay } from "./components/TikTokSafeAreaOverlay";
import { DocumentarySourceOverlay } from "./episodes/gemini-carbon/components/DocumentarySourceOverlay";
import {
  AUDIO_DURATION,
  CUES,
} from "./episodes/gemini-carbon/data/sceneTimings";
import subtitleData from "./episodes/gemini-carbon/data/subtitles.json";
import {
  AccessScene,
  ClosingScene,
  CyberScene,
  HookScene,
  ProductScene,
  WorkflowScene,
} from "./episodes/gemini-carbon/scenes/CarbonScenes";
import { FONT_FAMILY } from "./fonts";
import { COLORS } from "./theme";

export type Gemini4CarbonNewsProps = {
  audioSrc: string;
  showTikTokOverlay?: boolean;
  /** @deprecated Use showTikTokOverlay. Kept for saved Studio props. */
  showSafeArea?: boolean;
};

export const calculateCarbonMetadata: CalculateMetadataFunction<
  Gemini4CarbonNewsProps
> = async ({ props }) => {
  const seconds = await getAudioDurationInSeconds(staticFile(props.audioSrc));
  if (!Number.isFinite(seconds) || seconds <= 0) {
    throw new Error("File VO Gemini 4 Carbon tidak tersedia atau tidak valid.");
  }
  if (Math.abs(seconds - AUDIO_DURATION) > 0.1) {
    throw new Error(
      "VO telah berubah. Sinkronkan ulang subtitle dan batas adegan sebelum render.",
    );
  }
  // No tail, trimming, playback-rate or pitch changes. Only frame quantization.
  return { durationInFrames: Math.ceil(seconds * 30) };
};

const captions: Caption[] = subtitleData;
const characterCues = [
  { fromMs: 0, emotion: "surprised", voiceover: "AI ngoding, berhari-hari?" },
  { fromMs: 4500, emotion: "lookingLeft", voiceover: "Tapi Google bilang" },
  { fromMs: 9420, emotion: "confident", voiceover: "Gemini 4 Carbon" },
  { fromMs: 11180, emotion: "lookingLeft", voiceover: "Tugas coding kompleks" },
  { fromMs: 18500, emotion: "determined", voiceover: "Keamanan siber" },
  { fromMs: 25900, emotion: "skeptical", voiceover: "Akses masih terbatas" },
  { fromMs: 34060, emotion: "curious", voiceover: "Menurut kamu?" },
] as const;

const EditorialOverlays: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const time = frame / fps;
  const onDark =
    time < CUES.reveal || (time >= CUES.access && time < CUES.closing);
  return (
    <>
      <div
        aria-hidden
        data-editorial-frame={frame}
        style={{ display: "none" }}
      />
      <DocumentarySourceOverlay />
      <CharacterOverlay cues={characterCues} />
      <Subtitles
        captions={captions}
        persistent
        variant={onDark ? "onDark" : "light"}
      />
      <TikTokWatermark username="@prof.deps" onDark={onDark} />
    </>
  );
};

export const Gemini4CarbonNews: React.FC<Gemini4CarbonNewsProps> = ({
  audioSrc,
  showSafeArea,
  showTikTokOverlay,
}) => {
  const { fps, durationInFrames } = useVideoConfig();
  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.offWhite,
        color: COLORS.black,
        fontFamily: FONT_FAMILY,
      }}
    >
      <Audio
        name="VO ElevenLabs asli — tanpa modifikasi"
        src={staticFile(audioSrc)}
      />
      <Sequence
        name="01 — AI ngoding berhari-hari?"
        durationInFrames={Math.round(CUES.reveal * fps) + 4}
      >
        <HookScene />
      </Sequence>
      <Sequence
        name="02 — Google Gemini 4 Carbon"
        from={Math.round(CUES.reveal * fps)}
        durationInFrames={
          Math.round(CUES.workflow * fps) - Math.round(CUES.reveal * fps) + 4
        }
      >
        <ProductScene />
      </Sequence>
      <Sequence
        name="03 — Cari bug, perbaiki kode"
        from={Math.round(CUES.workflow * fps)}
        durationInFrames={
          Math.round(CUES.cyber * fps) - Math.round(CUES.workflow * fps) + 4
        }
      >
        <WorkflowScene />
      </Sequence>
      <Sequence
        name="04 — Keamanan siber"
        from={Math.round(CUES.cyber * fps)}
        durationInFrames={
          Math.round(CUES.access * fps) - Math.round(CUES.cyber * fps) + 4
        }
      >
        <CyberScene />
      </Sequence>
      <Sequence
        name="05 — Akses awal terbatas"
        from={Math.round(CUES.access * fps)}
        durationInFrames={
          Math.round(CUES.closing * fps) - Math.round(CUES.access * fps) + 4
        }
      >
        <AccessScene />
      </Sequence>
      <Sequence
        name="06 — Bantu developer atau perlu diawasi?"
        from={Math.round(CUES.closing * fps)}
        durationInFrames={durationInFrames - Math.round(CUES.closing * fps)}
      >
        <ClosingScene />
      </Sequence>
      <Sequence name="Subtitle stabil, maskot dan sumber">
        <EditorialOverlays />
      </Sequence>
      <TikTokSafeAreaOverlay
        enabled={showTikTokOverlay ?? showSafeArea ?? true}
      />
    </AbsoluteFill>
  );
};

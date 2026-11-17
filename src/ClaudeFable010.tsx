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
import {
  FABLE_AUDIO_SECONDS,
  FABLE_SCENES,
} from "./episodes/claude-fable/data/timing";
import subtitleData from "./episodes/claude-fable/data/subtitles.json";
import { FABLE_CHARACTER_CUES } from "./episodes/claude-fable/data/character";
import {
  BootScene,
  CoordinationScene,
  EightDaysScene,
  EmptyFolderScene,
  RealityAndQuestionScene,
  ThousandAgentsScene,
} from "./episodes/claude-fable/scenes/FableScenes";

export type ClaudeFableProps = { audioSrc: string };

export const calculateClaudeFableMetadata: CalculateMetadataFunction<
  ClaudeFableProps
> = async ({ props }) => {
  const seconds = await getAudioDurationInSeconds(staticFile(props.audioSrc));
  if (!Number.isFinite(seconds) || seconds <= 0)
    throw new Error("File VO Claude Fable tidak dapat dibaca.");
  if (Math.abs(seconds - FABLE_AUDIO_SECONDS) > 0.08)
    throw new Error(
      "VO Claude Fable berubah. Analisis ulang cue narasi sebelum melanjutkan.",
    );
  return { durationInFrames: Math.ceil(seconds * 30) };
};

const StableOverlays: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <>
      <div data-episode-frame={frame} style={{ display: "none" }} />
      <FullCanvasOverlays
        captions={subtitleData}
        cues={FABLE_CHARACTER_CUES}
        dark={frame < Math.round(FABLE_SCENES[1].startSeconds * fps)}
      />
    </>
  );
};

// Original VO is never trimmed, resampled, replaced or retimed for the visuals.
export const ClaudeFable010: React.FC<ClaudeFableProps> = ({ audioSrc }) => {
  const { width, height, fps, durationInFrames } = useVideoConfig();
  return (
    <AbsoluteFill
      style={{ fontFamily: FONT_FAMILY, backgroundColor: "#FAF9F6" }}
    >
      <Audio
        name="VO pengguna — asli, tanpa perubahan"
        src={staticFile(audioSrc)}
      />
      <div
        data-fable-design
        style={{
          position: "absolute",
          width: 1080,
          height: 1920,
          scale: `${width / 1080} ${height / 1920}`,
          transformOrigin: "top left",
        }}
      >
        <Sequence
          name="01 — Folder menjadi 1.000+ agent"
          durationInFrames={Math.round(FABLE_SCENES[0].endSeconds * fps)}
        >
          <ThousandAgentsScene />
        </Sequence>
        <Sequence
          name="02 — Claude Fable, folder kosong, instruksi"
          from={Math.round(FABLE_SCENES[1].startSeconds * fps)}
          durationInFrames={
            Math.round(FABLE_SCENES[1].endSeconds * fps) -
            Math.round(FABLE_SCENES[1].startSeconds * fps)
          }
        >
          <EmptyFolderScene />
        </Sequence>
        <Sequence
          name="03 — Delegasi, menulis, menguji, review"
          from={Math.round(FABLE_SCENES[2].startSeconds * fps)}
          durationInFrames={
            Math.round(FABLE_SCENES[2].endSeconds * fps) -
            Math.round(FABLE_SCENES[2].startSeconds * fps)
          }
        >
          <CoordinationScene />
        </Sequence>
        <Sequence
          name="04 — Delapan hari dan integrasi"
          from={Math.round(FABLE_SCENES[3].startSeconds * fps)}
          durationInFrames={
            Math.round(FABLE_SCENES[3].endSeconds * fps) -
            Math.round(FABLE_SCENES[3].startSeconds * fps)
          }
        >
          <EightDaysScene />
        </Sequence>
        <Sequence
          name="05 — Prototipe boot di laptop"
          from={Math.round(FABLE_SCENES[4].startSeconds * fps)}
          durationInFrames={
            Math.round(FABLE_SCENES[4].endSeconds * fps) -
            Math.round(FABLE_SCENES[4].startSeconds * fps)
          }
        >
          <BootScene />
        </Sequence>
        <Sequence
          name="06 — Batasan, koordinasi, pertanyaan lengkap"
          from={Math.round(FABLE_SCENES[5].startSeconds * fps)}
          durationInFrames={
            durationInFrames - Math.round(FABLE_SCENES[5].startSeconds * fps)
          }
        >
          <RealityAndQuestionScene />
        </Sequence>
      </div>
      <StableOverlays />
    </AbsoluteFill>
  );
};

import React from "react";
import { Audio } from "@remotion/media";
import { getAudioDurationInSeconds } from "@remotion/media-utils";
import {
  AbsoluteFill,
  type CalculateMetadataFunction,
  Sequence,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { FONT_FAMILY } from "./fonts";
import captions from "./episodes/openai-images/data/subtitles.json";
import timing from "./episodes/openai-images/data/timing.json";
import { OPENAI_IMAGES_CHARACTER_CUES } from "./episodes/openai-images/data/character";
import {
  EpisodeOverlays,
  SafeAreaOverlay,
} from "./episodes/openai-images/components/EpisodeOverlays";
import {
  ClosingScene,
  HookScene,
  MarkupScene,
  NewCapabilitiesScene,
  RevealScene,
  SpeedScene,
  VariantsScene,
  WorkflowScene,
} from "./episodes/openai-images/scenes";

type OpenAIImagesProps = { audioSrc: string; showSafeArea: boolean };

export const calculateOpenAIImagesMetadata: CalculateMetadataFunction<
  OpenAIImagesProps
> = async ({ props }) => {
  const seconds = await getAudioDurationInSeconds(staticFile(props.audioSrc));
  if (!Number.isFinite(seconds) || seconds <= 0)
    throw new Error("Audio Episode 008 tidak tersedia atau tidak valid.");
  if (Math.abs(seconds - timing.audioSeconds) > 0.08)
    throw new Error(
      "Audio Episode 008 berubah. Sinkronkan ulang adegan dan subtitle; jangan ubah kecepatan VO.",
    );
  return { durationInFrames: Math.ceil(seconds * 30) };
};

const PersistentOverlays: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <EpisodeOverlays
      captions={captions}
      cues={OPENAI_IMAGES_CHARACTER_CUES}
      dark={
        frame < Math.round(timing.reveal * fps) ||
        frame >= Math.round(timing.reality * fps)
      }
    />
  );
};

export const OpenAIImages008: React.FC<OpenAIImagesProps> = ({
  audioSrc,
  showSafeArea,
}) => {
  const { width, height, fps, durationInFrames } = useVideoConfig();
  return (
    <AbsoluteFill
      style={{ backgroundColor: "#FAF9F6", fontFamily: FONT_FAMILY }}
    >
      <Audio
        name="VO ElevenLabs Episode 008 — audio asli"
        src={staticFile(audioSrc)}
      />
      <div
        data-images-design
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
            name="01 — Gambar diam menjadi gerak"
            durationInFrames={Math.round(timing.reveal * fps)}
          >
            <HookScene />
          </Sequence>
          <Sequence
            name="02a — OpenAI Images 2.6"
            from={Math.round(timing.reveal * fps)}
            durationInFrames={
              Math.round(timing.edit * fps) - Math.round(timing.reveal * fps)
            }
          >
            <RevealScene />
          </Sequence>
          <Sequence
            name="02b — Revisi area tertentu"
            from={Math.round(timing.edit * fps)}
            durationInFrames={
              Math.round(timing.complexity * fps) -
              Math.round(timing.edit * fps)
            }
          >
            <MarkupScene />
          </Sequence>
          <Sequence
            name="02c — Bukan sekali jadi, alur revisi"
            from={Math.round(timing.complexity * fps)}
            durationInFrames={
              Math.round(timing.speed * fps) -
              Math.round(timing.complexity * fps)
            }
          >
            <WorkflowScene />
          </Sequence>
          <Sequence
            name="03 — Klaim 50 persen lebih cepat"
            from={Math.round(timing.speed * fps)}
            durationInFrames={
              Math.round(timing.variants * fps) - Math.round(timing.speed * fps)
            }
          >
            <SpeedScene />
          </Sequence>
          <Sequence
            name="04 — Flare dan Sunburst"
            from={Math.round(timing.variants * fps)}
            durationInFrames={
              Math.round(timing.features * fps) -
              Math.round(timing.variants * fps)
            }
          >
            <VariantsScene sunburstAt={timing.sunburst - timing.variants} />
          </Sequence>
          <Sequence
            name="05 — GIF, markup, ekspor SVG"
            from={Math.round(timing.features * fps)}
            durationInFrames={
              Math.round(timing.reality * fps) -
              Math.round(timing.features * fps)
            }
          >
            <NewCapabilitiesScene
              markupAt={timing.markup - timing.features}
              svgAt={timing.svg - timing.features}
            />
          </Sequence>
          <Sequence
            name="06 — Batasan dan pilihan penonton"
            from={Math.round(timing.reality * fps)}
            durationInFrames={
              durationInFrames - Math.round(timing.reality * fps)
            }
          >
            <ClosingScene
              ctaAt={timing.cta - timing.reality}
              promptAt={timing.prompt - timing.reality}
            />
          </Sequence>
        </div>
        <PersistentOverlays />
        {showSafeArea ? <SafeAreaOverlay /> : null}
      </div>
    </AbsoluteFill>
  );
};

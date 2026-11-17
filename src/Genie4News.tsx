import React from "react";
import {
  AbsoluteFill,
  Audio,
  CalculateMetadataFunction,
  interpolate,
  Sequence,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { getAudioDurationInSeconds } from "@remotion/media-utils";
import { BackgroundCanvas } from "./components/BackgroundCanvas";
import { CharacterOverlay } from "./components/CharacterOverlay";
import { PhotoSourceOverlay } from "./components/PhotoSourceOverlay";
import { Subtitles } from "./components/Subtitles";
import { TikTokWatermark } from "./components/TikTokWatermark";
import { TikTokSafeStage } from "./components/TikTokSafeStage";
import { TikTokSafeAreaOverlay } from "./components/TikTokSafeAreaOverlay";
import { AUDIO_SRC, HOOK_BLACK_END, SCENES, type SceneId } from "./data/scenes";
import { AudioScene } from "./scenes/AudioScene";
import { CapabilitiesScene } from "./scenes/CapabilitiesScene";
import { ClosingScene } from "./scenes/ClosingScene";
import { HookScene } from "./scenes/HookScene";
import { IntroScene } from "./scenes/IntroScene";
import { ResearchScene } from "./scenes/ResearchScene";
import { WhatScene } from "./scenes/WhatScene";
import { COLORS, FPS, HEIGHT, WIDTH } from "./theme";

export type Genie4NewsProps = {
  audioSrc: string;
  showTikTokOverlay: boolean;
};

export const GENIE4_DEFAULT_PROPS: Genie4NewsProps = {
  audioSrc: AUDIO_SRC,
  showTikTokOverlay: true,
};

export const GENIE4_FALLBACK_DURATION = 33.81;

type SceneComponent = React.FC<{ durationInFrames: number }>;

const sceneComponents: Record<SceneId, SceneComponent> = {
  hook: HookScene,
  intro: IntroScene,
  what: WhatScene,
  capabilities: CapabilitiesScene,
  audio: AudioScene,
  research: ResearchScene,
  closing: ClosingScene,
};

export const calculateGenie4Metadata: CalculateMetadataFunction<
  Genie4NewsProps
> = async ({ props }) => {
  try {
    const durationInSeconds = await getAudioDurationInSeconds(
      staticFile(props.audioSrc),
    );

    return {
      durationInFrames: Math.ceil(durationInSeconds * FPS),
      fps: FPS,
      height: HEIGHT,
      width: WIDTH,
    };
  } catch {
    return {
      durationInFrames: Math.ceil(GENIE4_FALLBACK_DURATION * FPS),
      fps: FPS,
      height: HEIGHT,
      width: WIDTH,
    };
  }
};

export const Genie4News: React.FC<Genie4NewsProps> = ({
  audioSrc,
  showTikTokOverlay = true,
}) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  const finalFade = interpolate(
    frame,
    [durationInFrames - 6, durationInFrames],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );

  return (
    <AbsoluteFill style={{ backgroundColor: COLORS.offWhite }}>
      <Audio src={staticFile(audioSrc)} />
      <BackgroundCanvas />
      {frame < HOOK_BLACK_END ? (
        <AbsoluteFill style={{ backgroundColor: COLORS.black }} />
      ) : null}

      <TikTokSafeStage
        focusBounds={{ left: 60, top: 210, right: 1080, bottom: 1040 }}
      >
        {SCENES.map((scene) => {
          const SceneComponent = sceneComponents[scene.id];

          return (
            <Sequence
              durationInFrames={scene.durationInFrames}
              from={scene.from}
              key={scene.id}
              name={`${scene.index} — ${scene.label}`}
            >
              <SceneComponent durationInFrames={scene.durationInFrames} />
            </Sequence>
          );
        })}
      </TikTokSafeStage>

      <Sequence name="Sumber foto — teks di atas foto">
        <PhotoSourceOverlay sourceUrl="https://deepmind.google/models/genie/" />
      </Sequence>

      <Sequence name="Karakter — ekspresi sesuai narasi">
        <CharacterOverlay />
      </Sequence>
      <Subtitles variant={frame < HOOK_BLACK_END ? "onDark" : "light"} />
      <Sequence name="Watermark — @prof.deps">
        <TikTokWatermark
          onDark={frame < HOOK_BLACK_END}
          username="@prof.deps"
        />
      </Sequence>

      <AbsoluteFill
        style={{
          backgroundColor: COLORS.offWhite,
          opacity: finalFade,
          pointerEvents: "none",
        }}
      />
      <TikTokSafeAreaOverlay enabled={showTikTokOverlay} />
    </AbsoluteFill>
  );
};

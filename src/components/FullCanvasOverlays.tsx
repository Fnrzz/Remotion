import React from "react";
import type { Caption } from "@remotion/captions";
import {
  AbsoluteFill,
  Img,
  interpolate,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { CHARACTER_POSES, type CharacterEmotion } from "../data/character";

type ExpressionCue = {
  fromMs: number;
  emotion: CharacterEmotion;
  voiceover: string;
};

const FullCanvasCharacter: React.FC<{
  cues: readonly ExpressionCue[];
}> = ({ cues }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const currentMs = (frame / fps) * 1000;
  const cue = cues.reduce(
    (active, item) => (currentMs >= item.fromMs ? item : active),
    cues[0],
  );
  const pose = CHARACTER_POSES[cue.emotion];
  return (
    <div
      data-character-pose={pose.id}
      data-voiceover-cue={cue.voiceover}
      style={{
        position: "absolute",
        right: 84,
        bottom: 180,
        width: 320,
        aspectRatio: "307 / 272",
        pointerEvents: "none",
        filter: "drop-shadow(0 6px 12px rgba(0,0,0,0.16))",
        opacity: interpolate(frame, [0, 0.2 * fps], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        }),
      }}
    >
      <Img
        name="Karakter Prof Deps — posisi tetap"
        alt={`Karakter berkacamata — ${pose.description}`}
        src={staticFile(
          `assets/images/charactersheet/karaktersheet-${pose.asset}.png`,
        )}
        style={{
          display: "block",
          width: "100%",
          height: "100%",
          objectFit: "contain",
        }}
      />
    </div>
  );
};

const FullCanvasSubtitles: React.FC<{
  captions: readonly Caption[];
  dark: boolean;
}> = ({ captions, dark }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const currentMs = (frame / fps) * 1000;
  const caption = captions.find(
    (item) => currentMs >= item.startMs && currentMs < item.endMs,
  );
  return (
    <div
      data-subtitle="stable"
      style={{
        position: "absolute",
        left: 84,
        bottom: 215,
        width: 550,
        height: 135,
        boxSizing: "border-box",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "18px 28px",
        fontSize: 36,
        fontWeight: 600,
        letterSpacing: "-0.015em",
        lineHeight: 1.3,
        textAlign: "center",
        color: dark ? "#FFFFFF" : "#000000",
        backgroundColor: dark ? "rgba(0,0,0,0.58)" : "rgba(255,255,255,0.88)",
        border: dark ? "1px solid #FFFFFF24" : "1px solid #0000000F",
        borderRadius: 18,
        boxShadow: dark ? "0 10px 32px #00000047" : "0 10px 32px #00000014",
        pointerEvents: "none",
      }}
    >
      {caption?.text ?? ""}
    </div>
  );
};

// Full-canvas editorial coordinates, independent of all legacy TikTok guides.
// One responsive design layer; captions and character keep their React identity.
export const FullCanvasOverlays: React.FC<{
  captions: readonly Caption[];
  cues: readonly ExpressionCue[];
  dark: boolean;
}> = ({ captions, cues, dark }) => {
  const { width, height } = useVideoConfig();
  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      <div
        data-full-canvas-overlays
        style={{
          position: "absolute",
          width: 1080,
          height: 1920,
          transformOrigin: "top left",
          scale: `${width / 1080} ${height / 1920}`,
        }}
      >
        <FullCanvasCharacter cues={cues} />
        <FullCanvasSubtitles captions={captions} dark={dark} />
        <div
          data-full-canvas-watermark
          style={{
            position: "absolute",
            right: 84,
            top: 108,
            fontSize: 30,
            fontWeight: 700,
            letterSpacing: "-0.02em",
            lineHeight: 1,
            color: dark ? "#FFFFFF" : "#000000",
            opacity: 0.58,
          }}
        >
          @prof.deps
        </div>
      </div>
    </AbsoluteFill>
  );
};

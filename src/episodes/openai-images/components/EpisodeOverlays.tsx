import React from "react";
import type { Caption } from "@remotion/captions";
import {
  Img,
  interpolate,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import {
  CHARACTER_POSES,
  type CharacterEmotion,
} from "../../../data/character";

export type ExpressionCue = { fromMs: number; emotion: CharacterEmotion };

// Revised on request: subtitles sit beside the fixed character, not above it.
// Keep a single persistent node: only its text changes at phrase boundaries.
export const DynamicSubtitles: React.FC<{
  captions: readonly Caption[];
  dark: boolean;
}> = ({ captions, dark }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const caption = captions.find(
    (cue) =>
      (frame * 1000) / fps >= cue.startMs && (frame * 1000) / fps < cue.endMs,
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
        padding: "18px 28px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        fontSize: 36,
        fontWeight: 600,
        lineHeight: 1.3,
        letterSpacing: "-0.015em",
        borderRadius: 18,
        color: dark ? "#FFFFFF" : "#000000",
        background: dark ? "#000000" : "#FFFFFF",
        border: dark ? "1px solid #FFFFFF30" : "1px solid #0000000F",
        whiteSpace: "pre-line",
      }}
    >
      {caption?.text ?? ""}
    </div>
  );
};

export const EpisodeOverlays: React.FC<{
  captions: readonly Caption[];
  cues: readonly ExpressionCue[];
  dark: boolean;
}> = ({ captions, cues, dark }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const cue = cues.reduce(
    (active, item) => ((frame * 1000) / fps >= item.fromMs ? item : active),
    cues[0],
  );
  const pose = CHARACTER_POSES[cue.emotion];
  return (
    <>
      <div style={{ display: "none" }} aria-hidden>
        {Object.values(CHARACTER_POSES).map((asset) => (
          <Img
            key={asset.id}
            src={staticFile(
              `assets/images/charactersheet/karaktersheet-${asset.asset}.png`,
            )}
          />
        ))}
      </div>
      <div data-episode-frame={frame} style={{ display: "none" }} />
      <DynamicSubtitles captions={captions} dark={dark} />
      <div
        data-character-pose={pose.id}
        style={{
          position: "absolute",
          width: 320,
          aspectRatio: "307 / 272",
          right: 84,
          bottom: 180,
          opacity: interpolate(frame, [0, 0.2 * fps], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        <Img
          name="Karakter Prof Deps — posisi tetap"
          src={staticFile(
            `assets/images/charactersheet/karaktersheet-${pose.asset}.png`,
          )}
          style={{ width: "100%", height: "100%", objectFit: "contain" }}
        />
      </div>
      <div
        style={{
          position: "absolute",
          top: 108,
          right: 84,
          fontSize: 30,
          fontWeight: 700,
          opacity: 0.58,
          color: dark ? "#FFFFFF" : "#000000",
        }}
      >
        @prof.deps
      </div>
    </>
  );
};

// Opt-in authoring guide requested in the brief; never enabled in final output.
export const SafeAreaOverlay: React.FC = () => (
  <svg
    width="1080"
    height="1920"
    style={{ position: "absolute", inset: 0, pointerEvents: "none" }}
  >
    <rect
      x="110"
      y="220"
      width="740"
      height="1180"
      fill="none"
      stroke="#708090"
      strokeWidth="2"
      strokeDasharray="12 12"
    />
    <text x="120" y="205" fill="#708090" fontSize="20">
      PANDUAN EDITOR · BUKAN BAGIAN VIDEO
    </text>
  </svg>
);

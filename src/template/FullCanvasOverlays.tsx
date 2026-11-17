import React from "react";
import type { Caption } from "@remotion/captions";
import {
  AbsoluteFill,
  Img,
  Interactive,
  interpolate,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { DesignSpace } from "./Editorial";

export type CharacterCue = {
  fromMs: number;
  /** Image path relative to public/, on a consistent transparent 307:272 canvas. */
  src: string;
  description?: string;
};

export type FullCanvasOverlaysProps = {
  captions: readonly Caption[];
  cues?: readonly CharacterCue[];
  dark: boolean;
};

const FullCanvasCharacter: React.FC<{ cues: readonly CharacterCue[] }> = ({
  cues,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const currentMs = (frame / fps) * 1000;
  const cue = cues.reduce<CharacterCue | undefined>(
    (active, item) =>
      currentMs >= item.fromMs &&
      (!active || active.fromMs > currentMs || item.fromMs >= active.fromMs)
        ? item
        : active,
    cues[0],
  );
  if (!cue) return null;
  return (
    <div
      data-character-src={cue.src}
      data-voiceover-cue={cue.description}
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
        name="Karakter narasi — posisi tetap"
        alt={cue.description ?? "Karakter narasi"}
        src={staticFile(cue.src)}
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
    <Interactive.Div
      name="Subtitle stabil"
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
      <span
        style={{
          display: "-webkit-box",
          WebkitBoxOrient: "vertical",
          WebkitLineClamp: 2,
          overflow: "hidden",
        }}
      >
        {caption?.text ?? ""}
      </span>
    </Interactive.Div>
  );
};

// Mount once beside the scene sequences, never inside Canvas or ContentStage.
export const FullCanvasOverlays: React.FC<FullCanvasOverlaysProps> = ({
  captions,
  cues = [],
  dark,
}) => (
  <AbsoluteFill style={{ pointerEvents: "none" }}>
    <DesignSpace>
      <div data-full-canvas-overlays>
        <FullCanvasCharacter cues={cues} />
        <FullCanvasSubtitles captions={captions} dark={dark} />
        <Interactive.Div
          name="Watermark @prof.deps"
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
        </Interactive.Div>
      </div>
    </DesignSpace>
  </AbsoluteFill>
);

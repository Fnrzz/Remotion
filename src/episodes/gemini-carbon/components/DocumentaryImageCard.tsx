import React from "react";
import {
  Img,
  interpolate,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { COLORS } from "../../../theme";

export const PhotoDissolve: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        opacity: interpolate(frame, [0, 0.28 * fps], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        }),
      }}
    >
      {children}
    </div>
  );
};

/** Static documentary still. Movement is confined to its bounded photo window. */
export const DocumentaryImageCard: React.FC<{
  src: string;
  alt: string;
  height: number;
  duration?: number;
  position?: string;
  zoomOut?: boolean;
  revealAt?: number;
}> = ({
  src,
  alt,
  height,
  duration = 4,
  position = "50% 50%",
  zoomOut = false,
  revealAt = 0,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <div
      data-documentary-frame="true"
      style={{
        position: "relative",
        width: "100%",
        height,
        overflow: "hidden",
        borderRadius: 22,
        backgroundColor: COLORS.slate,
        border: "2px solid rgba(112,128,144,0.25)",
        boxSizing: "border-box",
        opacity: interpolate(
          frame,
          [revealAt * fps, (revealAt + 0.28) * fps],
          [0, 1],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
        ),
        translate: interpolate(
          frame,
          [revealAt * fps, (revealAt + 0.36) * fps],
          ["0px 12px", "0px 0px"],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
        ),
      }}
    >
      <Img
        name="Photo documentaire — image statique"
        data-documentary-image="true"
        alt={alt}
        src={staticFile(src)}
        style={{
          display: "block",
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: position,
          scale: interpolate(
            frame,
            [revealAt * fps, (revealAt + duration) * fps],
            zoomOut ? [1.05, 1] : [1, 1.05],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
          ),
        }}
      />
    </div>
  );
};

export const PhotoCaption: React.FC<{
  children: React.ReactNode;
  dark?: boolean;
}> = ({ children, dark = false }) => (
  <div
    data-documentary-caption="true"
    style={{
      marginTop: 14,
      color: dark ? COLORS.offWhite : COLORS.gray,
      fontSize: 23,
      fontWeight: 600,
      lineHeight: 1.35,
      letterSpacing: "-0.015em",
    }}
  >
    {children}
  </div>
);

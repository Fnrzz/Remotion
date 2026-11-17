import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { FONT_FAMILY } from "../fonts";
import { COLORS } from "../theme";

type SectionLabelProps = {
  index: string;
  label: string;
  meta?: string;
  delay?: number;
  tone?: "light" | "dark";
};

export const SectionLabel: React.FC<SectionLabelProps> = ({
  index,
  label,
  meta,
  delay = 0,
  tone = "light",
}) => {
  const frame = useCurrentFrame();
  const foreground = tone === "dark" ? COLORS.offWhite : COLORS.black;
  const secondary = tone === "dark" ? "rgba(250,249,246,0.62)" : COLORS.gray;

  const opacity = interpolate(frame - delay, [0, 12], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const lineScale = interpolate(frame - delay, [4, 30], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 16,
        width: "100%",
        opacity,
        fontFamily: FONT_FAMILY,
      }}
    >
      <div
        style={{
          alignItems: "center",
          border:
            tone === "dark"
              ? "1px solid rgba(250,249,246,0.28)"
              : "1px solid rgba(0,0,0,0.16)",
          borderRadius: 4,
          color: secondary,
          display: "flex",
          fontSize: 15,
          fontWeight: 600,
          height: 25,
          justifyContent: "center",
          letterSpacing: "0.08em",
          minWidth: 38,
          padding: "0 7px",
        }}
      >
        {index}
      </div>
      <div
        style={{
          color: foreground,
          fontSize: 18,
          fontWeight: 700,
          letterSpacing: "0.16em",
          whiteSpace: "nowrap",
        }}
      >
        {label}
      </div>
      <div
        style={{
          backgroundColor:
            tone === "dark" ? "rgba(250,249,246,0.2)" : "rgba(0,0,0,0.12)",
          flex: 1,
          height: 1,
          transform: `scaleX(${lineScale})`,
          transformOrigin: "left center",
        }}
      />
      {meta ? (
        <div
          style={{
            color: secondary,
            fontSize: 15,
            fontWeight: 600,
            letterSpacing: "0.11em",
            whiteSpace: "nowrap",
          }}
        >
          {meta}
        </div>
      ) : null}
    </div>
  );
};

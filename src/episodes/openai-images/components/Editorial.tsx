import React from "react";
import {
  AbsoluteFill,
  Easing,
  Interactive,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { BRAND, LAYOUT } from "../design";

export const SceneCanvas: React.FC<{
  dark?: boolean;
  children: React.ReactNode;
}> = ({ dark = false, children }) => (
  <AbsoluteFill
    style={{
      backgroundColor: dark ? BRAND.black : BRAND.paper,
      color: dark ? BRAND.white : BRAND.black,
    }}
  >
    {children}
  </AbsoluteFill>
);

export const AnimatedHeadline: React.FC<{
  lines: readonly string[];
  size?: number;
  accent?: number;
  dark?: boolean;
  emphasis?: number;
}> = ({ lines, size = 96, accent = -1, dark = false, emphasis = -1 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <div
      style={{ position: "absolute", left: 110, top: 250, width: 740 }}
      data-headline
    >
      {lines.map((line, index) => (
        <div key={line} style={{ overflow: "hidden", paddingBottom: 9 }}>
          <Interactive.Div
            name="Baris judul kinetik"
            data-text-unit
            style={{
              fontSize: index === emphasis ? size * 1.1 : size,
              lineHeight: 1.07,
              fontWeight: 800,
              letterSpacing: "-0.055em",
              whiteSpace: "nowrap",
              color:
                index === accent
                  ? BRAND.slate
                  : dark
                    ? BRAND.white
                    : BRAND.black,
              translate: interpolate(
                frame,
                [index * 0.13 * fps, (index * 0.13 + 0.48) * fps],
                ["0px 120px", "0px 0px"],
                {
                  easing: Easing.bezier(0.16, 1, 0.3, 1),
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                },
              ),
            }}
          >
            {line}
          </Interactive.Div>
        </div>
      ))}
    </div>
  );
};

export const Stage: React.FC<{
  children: React.ReactNode;
  top?: number;
}> = ({ children, top = LAYOUT.bodyTop }) => (
  <div style={{ position: "absolute", left: 110, top, width: 740 }} data-stage>
    {children}
  </div>
);

export const FeatureChip: React.FC<{
  children: React.ReactNode;
  delay?: number;
  dark?: boolean;
}> = ({ children, delay = 0, dark = false }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <Interactive.Div
      name="Fitur pilihan"
      data-text-unit
      style={{
        padding: "24px 28px",
        border: `1px solid ${dark ? "#FFFFFF45" : "#70809055"}`,
        borderRadius: 20,
        background: dark ? "#000000" : "#FFFFFF",
        color: dark ? "#FFFFFF" : "#000000",
        fontSize: 30,
        fontWeight: 800,
        letterSpacing: "-0.025em",
        opacity: interpolate(
          frame,
          [delay * fps, (delay + 0.25) * fps],
          [0, 1],
          {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          },
        ),
        translate: `0px ${(1 - spring({ frame: frame - delay * fps, fps, config: { damping: 22, stiffness: 180 } })) * 34}px`,
      }}
    >
      {children}
    </Interactive.Div>
  );
};

export const Note: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div
    data-text-unit
    style={{
      fontSize: 23,
      fontWeight: 600,
      lineHeight: 1.5,
      color: BRAND.gray,
    }}
  >
    {children}
  </div>
);

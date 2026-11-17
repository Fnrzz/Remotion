import React from "react";
import {
  AbsoluteFill,
  Easing,
  Interactive,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

export const Canvas: React.FC<{
  dark?: boolean;
  children: React.ReactNode;
}> = ({ dark = false, children }) => (
  <AbsoluteFill
    style={{
      backgroundColor: dark ? "#000000" : "#FAF9F6",
      color: dark ? "#FFFFFF" : "#000000",
    }}
  >
    {children}
  </AbsoluteFill>
);

export const Headline: React.FC<{
  children: React.ReactNode;
  size?: number;
}> = ({ children, size = 100 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <div
      style={{
        position: "absolute",
        left: 84,
        top: 240,
        width: 912,
        overflow: "hidden",
        paddingBottom: 12,
      }}
    >
      <Interactive.Div
        name="Judul editorial"
        data-harness-headline
        style={{
          fontSize: size,
          fontWeight: 800,
          lineHeight: 1.04,
          letterSpacing: "-0.045em",
          translate: interpolate(
            frame,
            [0, 0.45 * fps],
            ["0px 28px", "0px 0px"],
            {
              easing: Easing.bezier(0.16, 1, 0.3, 1),
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            },
          ),
        }}
      >
        {children}
      </Interactive.Div>
    </div>
  );
};

// Same open 636×400 diagram stage as Kronos. No card, safe-zone or UI matte.
export const ContentStage: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <div
    data-harness-content
    style={{
      position: "absolute",
      left: 84,
      top: 720,
      width: 912,
      height: 660,
    }}
  >
    <div
      style={{
        position: "relative",
        width: 636,
        height: 400,
        transformOrigin: "top left",
        scale: 912 / 636,
      }}
    >
      {children}
    </div>
  </div>
);

export const Disclosure: React.FC = () => (
  <div
    data-conceptual-disclosure
    style={{
      position: "absolute",
      left: 84,
      top: 640,
      fontSize: 22,
      letterSpacing: "0.04em",
      fontWeight: 700,
      color: "#708090",
    }}
  >
    ILUSTRASI KONSEPTUAL
  </div>
);

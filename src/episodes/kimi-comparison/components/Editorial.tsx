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
import { TokenRatioDiagram } from "./MotionDiagrams";

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

export const AnimatedHeadline: React.FC<{
  children: React.ReactNode;
  supporting: string;
  size?: number;
}> = ({ children, supporting, size = 100 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <div style={{ position: "absolute", left: 84, top: 240, width: 912 }}>
      <div style={{ overflow: "hidden", paddingBottom: 14 }}>
        <Interactive.Div
          name="Kinetic comparison headline"
          data-kimi-focus
          style={{
            fontSize: size,
            fontWeight: 800,
            letterSpacing: "-0.045em",
            lineHeight: 1.04,
            translate: interpolate(
              frame,
              [0, 0.4 * fps],
              ["0px 120px", "0px 0px"],
              {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
                easing: Easing.bezier(0.16, 1, 0.3, 1),
              },
            ),
          }}
        >
          {children}
        </Interactive.Div>
      </div>
      <Interactive.Div
        name="Editorial context"
        data-kimi-focus
        style={{
          marginTop: 26,
          fontSize: 29,
          fontWeight: 700,
          lineHeight: 1.4,
          opacity: interpolate(frame, [0.12 * fps, 0.4 * fps], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        {supporting}
      </Interactive.Div>
    </div>
  );
};

// The original unframed Kronos stage; the card artwork is an explicit EP007 brief override.
export const ContentStage: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <div
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

export const RatioReveal: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <div style={{ position: "relative" }}>
      <div style={{ position: "absolute", left: 484, top: 40 }}>
        <TokenRatioDiagram />
      </div>
      <div
        data-kimi-focus
        style={{ fontSize: 26, fontWeight: 700, marginBottom: 12 }}
      >
        BEDA
      </div>
      <div style={{ overflow: "hidden" }}>
        <Interactive.Div
          name="Standard token-rate ratio — five times"
          data-kimi-focus
          style={{
            fontSize: 218,
            fontWeight: 800,
            lineHeight: 1,
            letterSpacing: "-0.07em",
            scale:
              0.86 +
              0.14 *
                spring({
                  frame,
                  fps,
                  config: { damping: 200 },
                  durationInFrames: Math.round(0.4 * fps),
                }),
            opacity: interpolate(frame, [0, 0.12 * fps], [0, 1], {
              extrapolateRight: "clamp",
            }),
          }}
        >
          5×?!
        </Interactive.Div>
      </div>
      <div
        data-kimi-focus
        style={{
          marginTop: 22,
          fontSize: 21,
          fontWeight: 700,
          lineHeight: 1.6,
        }}
      >
        TARIF INPUT & OUTPUT STANDAR
        <br />
        KIMI K3.1 PRO ↔ GPT-6 ASTRA
      </div>
      <div
        data-kimi-focus
        style={{
          marginTop: 18,
          fontSize: 17,
          color: "#708090",
          fontWeight: 600,
        }}
      >
        BUKAN SELISIH BIAYA SATU PROYEK
      </div>
    </div>
  );
};

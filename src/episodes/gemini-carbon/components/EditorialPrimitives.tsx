import React from "react";
import {
  AbsoluteFill,
  Interactive,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { FONT_FAMILY } from "../../../fonts";
import { TIKTOK_VERTICAL_BALANCE } from "../../../layout/tiktokSafeArea";
import { COLORS } from "../../../theme";

// Same headline stage and lowered supporting group as the reference episodes.
export const BODY_TOP = 550 + TIKTOK_VERTICAL_BALANCE.sceneOffsetY;

export const Headline: React.FC<{
  children: React.ReactNode;
  dark?: boolean;
  immediate?: boolean;
  size?: number;
}> = ({ children, dark = false, immediate = false, size = 100 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <div style={{ position: "absolute", left: 72, top: 226, width: 1008 }}>
      <div style={{ overflow: "hidden", paddingBottom: 12 }}>
        <Interactive.Div
          name="Garis utama"
          data-carbon-headline="true"
          style={{
            fontFamily: FONT_FAMILY,
            color: dark ? COLORS.white : COLORS.black,
            fontSize: size,
            fontWeight: 800,
            lineHeight: 1.02,
            letterSpacing: "-0.045em",
            translate: interpolate(
              frame,
              [0, 0.3 * fps],
              [immediate ? "0px 12px" : "0px 32px", "0px 0px"],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
            ),
          }}
        >
          {children}
        </Interactive.Div>
      </div>
    </div>
  );
};

export const EditorialCard: React.FC<{
  children: React.ReactNode;
  dark?: boolean;
  height?: number;
}> = ({ children, dark = false, height = 590 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <Interactive.Div
      name="Kartu editorial"
      data-carbon-card="true"
      style={{
        position: "absolute",
        left: 60,
        top: BODY_TOP,
        width: 1020,
        height,
        boxSizing: "border-box",
        borderRadius: 30,
        border: dark
          ? "1.5px solid rgba(112,128,144,0.65)"
          : "1.5px solid rgba(112,128,144,0.2)",
        backgroundColor: dark ? COLORS.black : COLORS.white,
        color: dark ? COLORS.white : COLORS.black,
        boxShadow: dark ? "none" : "0 18px 46px rgba(0,0,0,0.055)",
        padding: "42px 48px",
        scale: interpolate(
          spring({ frame, fps, config: { damping: 200 } }),
          [0, 1],
          [0.985, 1],
        ),
        translate: interpolate(frame, [0, 0.4 * fps], ["0px 24px", "0px 0px"], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        }),
      }}
    >
      {children}
    </Interactive.Div>
  );
};

export const Label: React.FC<{
  children: React.ReactNode;
  style?: React.CSSProperties;
}> = ({ children, style }) => (
  <div
    style={{
      color: COLORS.gray,
      fontSize: 27,
      fontWeight: 600,
      letterSpacing: "0.035em",
      lineHeight: 1.4,
      ...style,
    }}
  >
    {children}
  </div>
);

// Incoming scene overlays the outgoing scene for four frames. No blank fades.
export const SceneTransition: React.FC<{
  children: React.ReactNode;
  dark?: boolean;
  immediate?: boolean;
}> = ({ children, dark = false, immediate = false }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <AbsoluteFill
      style={{
        backgroundColor: dark ? COLORS.black : COLORS.offWhite,
        opacity: immediate
          ? 1
          : interpolate(frame, [0, (4 / 30) * fps], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
      }}
    >
      {children}
    </AbsoluteFill>
  );
};

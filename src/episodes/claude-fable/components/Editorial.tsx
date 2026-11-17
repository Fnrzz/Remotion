import React from "react";
import {
  AbsoluteFill,
  Easing,
  Interactive,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

export const BRAND = {
  black: "#000000",
  paper: "#FAF9F6",
  white: "#FFFFFF",
  slate: "#708090",
  gray: "#555555",
} as const;

export const Canvas: React.FC<{
  dark?: boolean;
  children: React.ReactNode;
}> = ({ dark = false, children }) => (
  <AbsoluteFill
    style={{
      color: dark ? BRAND.white : BRAND.black,
      backgroundColor: dark ? BRAND.black : BRAND.paper,
    }}
  >
    {children}
  </AbsoluteFill>
);

export const MinimalHeadline: React.FC<{
  children: React.ReactNode;
  size?: number;
}> = ({ children, size = 104 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <Interactive.Div
      name="Judul editorial singkat"
      data-fable-headline
      style={{
        position: "absolute",
        left: 84,
        top: 240,
        width: 912,
        fontSize: size,
        fontWeight: 800,
        letterSpacing: "-0.045em",
        lineHeight: 1.05,
        translate: interpolate(frame, [0, 0.4 * fps], ["0px 22px", "0px 0px"], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.bezier(0.16, 1, 0.3, 1),
        }),
      }}
    >
      {children}
    </Interactive.Div>
  );
};

// Canonical 912 / 636 cardless stage; all art remains above Y1380.
// The readable disclosure belongs to every conceptual shot, not a source badge.
export const IllustrationStage: React.FC<{
  children: React.ReactNode;
  dark?: boolean;
}> = ({ children, dark = false }) => (
  <div
    data-fable-content
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
        scale: 912 / 636,
        transformOrigin: "top left",
      }}
    >
      <div
        data-conceptual-disclosure
        style={{
          fontSize: 17,
          fontWeight: 700,
          letterSpacing: "0.035em",
          color: dark ? "#FFFFFF" : "#555555",
        }}
      >
        ILUSTRASI KONSEPTUAL
      </div>
      <svg
        data-fable-artwork
        role="img"
        aria-label="Ilustrasi konseptual eksperimen prototipe OS, bukan rekaman pengujian Anthropic"
        viewBox="0 0 636 400"
        width="636"
        height="370"
        style={{ position: "absolute", top: 30, left: 0, overflow: "visible" }}
      >
        {children}
      </svg>
    </div>
  </div>
);

export const EightDayTimeline: React.FC<{
  progress: number;
  dark?: boolean;
}> = ({ progress, dark = false }) => (
  <g
    data-eight-day-progress={progress}
    aria-label="Delapan hari, progres editorial bukan log harian asli"
  >
    <text
      x="0"
      y="335"
      fontSize="14"
      fontWeight="700"
      fill={dark ? "#FFFFFF" : "#555555"}
    >
      HARI
    </text>
    <path d="M65 330H626" fill="none" stroke="#708090" strokeOpacity="0.28" />
    <path
      d="M65 330H626"
      fill="none"
      stroke={dark ? "#FFFFFF" : "#000000"}
      strokeWidth="2"
      pathLength="1"
      strokeDasharray="1"
      strokeDashoffset={1 - progress}
    />
    {Array.from({ length: 8 }, (_, i) => (
      <g key={i} opacity={progress >= i / 7 ? 1 : 0.3}>
        <circle
          cx={65 + i * 80}
          cy="330"
          r="4"
          fill={dark ? "#FFFFFF" : "#000000"}
        />
        <text
          x={65 + i * 80}
          y="363"
          fontSize="18"
          fontWeight="700"
          textAnchor="middle"
          fill={dark ? "#FFFFFF" : "#000000"}
        >
          {i + 1}
        </text>
      </g>
    ))}
  </g>
);

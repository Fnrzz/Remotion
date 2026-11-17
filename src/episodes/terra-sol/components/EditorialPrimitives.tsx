import React from "react";
import {
  Easing,
  Interactive,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { AnimatedText } from "../../../components/AnimatedText";
import { FONT_FAMILY } from "../../../fonts";
import { TIKTOK_VERTICAL_BALANCE } from "../../../layout/tiktokSafeArea";
import { COLORS } from "../../../theme";

export const BODY_TOP = 550 + TIKTOK_VERTICAL_BALANCE.sceneOffsetY;

export const Headline: React.FC<{
  children: React.ReactNode;
  dark?: boolean;
  size?: number;
  settled?: boolean;
}> = ({ children, dark = false, size = 100, settled = false }) => (
  <div style={{ position: "absolute", left: 72, top: 226, width: 1008 }}>
    <AnimatedText
      delay={settled ? -30 : -2}
      durationInFrames={12}
      distance={28}
      style={{
        color: dark ? COLORS.white : COLORS.black,
        fontSize: size,
        fontWeight: 800,
        letterSpacing: "-0.055em",
        lineHeight: 1.02,
      }}
    >
      {children}
    </AnimatedText>
  </div>
);

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

export const EditorialCard: React.FC<{
  children: React.ReactNode;
  left?: number;
  top?: number;
  width?: number;
  height?: number;
  delay?: number;
  emphasis?: number;
  settled?: boolean;
}> = ({
  children,
  left = 60,
  top = BODY_TOP,
  width = 1020,
  height = 625,
  delay = 0,
  emphasis = 0,
  settled = false,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <div
      data-editorial-card="true"
      style={{
        background: COLORS.white,
        border: `1.5px solid rgba(112,128,144,${0.16 + emphasis * 0.35})`,
        borderRadius: 30,
        boxShadow: "0 18px 46px rgba(0,0,0,0.055)",
        boxSizing: "border-box",
        fontFamily: FONT_FAMILY,
        height,
        left,
        opacity: interpolate(
          frame - delay + (settled ? 30 : 0),
          [0, 9],
          [0, 1],
          {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          },
        ),
        position: "absolute",
        scale: 1 + emphasis * 0.015,
        top,
        translate: `0 ${interpolate(
          spring({
            frame: frame - delay + (settled ? 30 : 0),
            fps,
            config: { damping: 200 },
            durationInFrames: Math.round(0.5 * fps),
          }),
          [0, 1],
          [26, 0],
        )}px`,
        width,
      }}
    >
      {children}
    </div>
  );
};

export const ComparisonCard: React.FC<{
  model: "TERRA" | "SOL";
  left: number;
  delay?: number;
}> = ({ model, left, delay = 0 }) => (
  <EditorialCard left={left} width={498} height={420} delay={delay}>
    <div style={{ padding: "52px 40px" }}>
      <Label>GPT-6.1</Label>
      <div
        style={{
          fontSize: 84,
          fontWeight: 800,
          letterSpacing: "-0.055em",
          marginTop: 58,
          lineHeight: 1,
        }}
      >
        {model}
      </div>
      <div
        style={{
          marginTop: 42,
          height: 5,
          width: 64,
          background: COLORS.slate,
          borderRadius: 8,
        }}
      />
    </div>
  </EditorialCard>
);

const Price: React.FC<{
  label: string;
  value: string;
  revealAt: number;
}> = ({ label, value, revealAt }) => {
  const frame = useCurrentFrame();
  return (
    <div>
      <Label style={{ fontSize: 25 }}>{label}</Label>
      <div style={{ height: 160, overflow: "hidden" }}>
        <div
          style={{
            fontSize: 136,
            fontWeight: 700,
            letterSpacing: "-0.06em",
            lineHeight: 1.15,
            opacity: interpolate(frame - revealAt, [0, 8], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
            translate: interpolate(
              frame - revealAt,
              [0, 12],
              ["0px 25px", "0px 0px"],
              {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
                easing: Easing.out(Easing.cubic),
              },
            ),
          }}
        >
          {value}
        </div>
      </div>
    </div>
  );
};

export const PriceCard: React.FC<{
  model: "TERRA" | "SOL";
  left: number;
  input: string;
  output: string;
  inputAt: number;
  outputAt: number;
  activeFrom: number;
  activeUntil: number;
}> = ({
  model,
  left,
  input,
  output,
  inputAt,
  outputAt,
  activeFrom,
  activeUntil,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const emphasis = interpolate(
    frame,
    [
      activeFrom,
      activeFrom + 0.35 * fps,
      activeUntil,
      activeUntil + 0.35 * fps,
    ],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  return (
    <EditorialCard left={left} width={498} emphasis={emphasis}>
      <div style={{ padding: "35px 40px" }}>
        <Label style={{ fontSize: 24 }}>GPT-6.1</Label>
        <div
          style={{
            fontSize: 47,
            fontWeight: 800,
            letterSpacing: "-0.04em",
            marginTop: 3,
          }}
        >
          {model}
        </div>
        <div
          style={{
            height: 1,
            background: "rgba(112,128,144,0.22)",
            margin: "25px 0",
          }}
        />
        <Price label="INPUT" value={input} revealAt={inputAt} />
        <div style={{ marginTop: 20 }}>
          <Price label="OUTPUT" value={output} revealAt={outputAt} />
        </div>
      </div>
    </EditorialCard>
  );
};

export const AnimatedProgressBar: React.FC<{
  score: number;
  revealAt: number;
}> = ({ score, revealAt }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const progress = interpolate(
    frame - revealAt,
    [0, 0.55 * fps],
    [0, score / 43],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.cubic),
    },
  );
  return (
    <div
      style={{ display: "flex", gap: 5, height: 27 }}
      aria-label={`${score} dari 43 jawaban benar`}
    >
      {Array.from({ length: 43 }, (_, index) => (
        <div
          key={index}
          style={{
            flex: 1,
            borderRadius: 3,
            background:
              index < progress * 43 ? COLORS.slate : "rgba(112,128,144,0.16)",
          }}
        />
      ))}
    </div>
  );
};

export const BenchmarkCard: React.FC<{
  model: "TERRA" | "SOL";
  score: number;
  revealAt: number;
  settled?: boolean;
}> = ({ model, score, revealAt, settled = false }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <EditorialCard height={660} settled={settled}>
      <div style={{ padding: "42px 52px" }}>
        <Interactive.Div
          name="Nama model"
          style={{ fontSize: 43, fontWeight: 700, letterSpacing: "-0.03em" }}
        >
          {model}
        </Interactive.Div>
        <div style={{ height: 245, marginTop: 16, overflow: "hidden" }}>
          <div
            style={{
              fontVariantNumeric: "tabular-nums",
              fontSize: 220,
              fontWeight: 800,
              letterSpacing: "-0.075em",
              lineHeight: 1,
              opacity: interpolate(frame - revealAt, [0, 8], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              }),
              scale: interpolate(
                spring({
                  frame: frame - revealAt,
                  fps,
                  config: { damping: 200 },
                  durationInFrames: 14,
                }),
                [0, 1],
                [0.96, 1],
              ),
              transformOrigin: "left center",
            }}
          >
            {score}
            <span style={{ color: COLORS.slate }}>/43</span>
          </div>
        </div>
        <Label style={{ fontSize: 28, marginTop: 0 }}>JAWABAN BENAR</Label>
        <div style={{ marginTop: 47 }}>
          <AnimatedProgressBar score={score} revealAt={revealAt} />
        </div>
        <Label style={{ marginTop: 24, fontSize: 25 }}>
          PLOTLY • 43 SOAL ANALISIS DATA
        </Label>
      </div>
    </EditorialCard>
  );
};

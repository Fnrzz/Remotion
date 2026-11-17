import React from "react";
import {
  Easing,
  Interactive,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { BRAND } from "../design";
import { Note } from "./Editorial";

const TimerBar: React.FC<{ faster?: boolean }> = ({ faster = false }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const elapsed = Math.max(0, frame / fps - 1.1) % 5.4;
  const progress = Math.min(1, elapsed / (faster ? 2 : 3));
  return (
    <Interactive.Div
      name="Bilahan waktu konseptual"
      style={{
        padding: "28px 30px",
        background: faster ? BRAND.black : BRAND.white,
        color: faster ? BRAND.white : BRAND.black,
        borderRadius: 24,
        border: "1px solid #70809045",
        opacity: interpolate(
          frame,
          [faster ? 0.5 * fps : 0, faster ? fps : 0.5 * fps],
          [0, 1],
          {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          },
        ),
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div data-text-unit style={{ fontSize: 29, fontWeight: 800 }}>
          {faster ? "IMAGES 2.6" : "SEBELUM"}
        </div>
        <svg width="42" height="42" viewBox="0 0 42 42">
          <circle
            cx="21"
            cy="23"
            r="15"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
          />
          <path d="M16 3h10M21 3v5" stroke="currentColor" strokeWidth="2" />
          <line
            x1="21"
            y1="23"
            x2={21 + Math.sin(progress * Math.PI * 2) * 11}
            y2={23 - Math.cos(progress * Math.PI * 2) * 11}
            stroke="currentColor"
            strokeWidth="2"
          />
        </svg>
      </div>
      <div
        style={{
          marginTop: 25,
          height: 17,
          borderRadius: 10,
          background: faster ? "#FFFFFF28" : "#70809025",
          overflow: "hidden",
        }}
      >
        <div
          data-timer-progress={faster ? "baru" : "sebelum"}
          style={{
            width: `${progress * 100}%`,
            height: "100%",
            background: faster ? BRAND.white : BRAND.slate,
          }}
        />
      </div>
    </Interactive.Div>
  );
};

export const TimerComparison: React.FC = () => (
  <div style={{ display: "grid", gap: 22 }}>
    <TimerBar />
    <TimerBar faster />
    <Note>
      Ilustrasi alur, bukan uji kecepatan.
      <br />
      Waktu aktual bergantung pada permintaan.
    </Note>
  </div>
);

export const VariantComparisonCard: React.FC<{
  variant: "Flare" | "Sunburst";
  focus: string;
  detail: React.ReactNode;
  active: boolean;
  delay?: number;
}> = ({ variant, focus, detail, active, delay = 0 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const bars = Math.floor(frame / (fps * 0.35)) % 5;
  return (
    <Interactive.Div
      name="Pilihan model API"
      style={{
        width: 358,
        height: 420,
        padding: "30px 25px",
        boxSizing: "border-box",
        background: active ? BRAND.black : BRAND.white,
        color: active ? BRAND.white : BRAND.black,
        border: "1px solid #70809055",
        borderRadius: 24,
        opacity: interpolate(
          frame,
          [delay * fps, (delay + 0.35) * fps],
          [0, 1],
          { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
        ),
        translate: `0px ${(1 - spring({ frame: frame - delay * fps, fps, config: { damping: 24 } })) * 50}px`,
      }}
    >
      <div
        data-text-unit
        style={{ fontSize: 37, fontWeight: 800, letterSpacing: "-0.04em" }}
      >
        {variant.toUpperCase()}
      </div>
      <div
        data-text-unit
        style={{ fontSize: 23, marginTop: 14, fontWeight: 700 }}
      >
        {focus}
      </div>
      <svg
        width="100%"
        height="100"
        viewBox="0 0 300 100"
        style={{ marginTop: 22 }}
      >
        {variant === "Flare" ? (
          <>
            {[0, 1, 2, 3, 4].map((i) => (
              <rect
                key={i}
                x={i * 61}
                y="35"
                width="43"
                height="18"
                rx="9"
                fill="currentColor"
                opacity={i <= bars ? 1 : 0.15}
              />
            ))}
            <path
              d="m263 14 27 30-27 30"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
            />
          </>
        ) : (
          <g stroke="currentColor" strokeWidth="1.5" fill="none">
            {[0, 1, 2].map((i) => (
              <rect
                key={i}
                x={80 + i * 19}
                y={6 + i * 13}
                width="94"
                height="65"
                rx="5"
                opacity={0.3 + i * 0.3}
              />
            ))}
            <path
              d="m121 47 15 16 34-37"
              pathLength="1"
              strokeDasharray="1"
              strokeDashoffset={interpolate(
                frame,
                [0.5 * fps, 1.7 * fps],
                [1, 0],
                {
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                  easing: Easing.bezier(0.2, 0.6, 0.2, 1),
                },
              )}
            />
          </g>
        )}
      </svg>
      <div
        data-text-unit
        style={{
          marginTop: 20,
          fontSize: 26,
          lineHeight: 1.45,
          fontWeight: 700,
        }}
      >
        {detail}
      </div>
    </Interactive.Div>
  );
};

import React from "react";
import { interpolate, useCurrentFrame } from "remotion";
import { COLORS } from "../theme";

type WaveformGraphicProps = {
  width: number;
  height: number;
  delay?: number;
  bars?: number;
};

export const WaveformGraphic: React.FC<WaveformGraphicProps> = ({
  width,
  height,
  delay = 0,
  bars = 72,
}) => {
  const frame = useCurrentFrame();
  const local = Math.max(0, frame - delay);

  const reveal = interpolate(frame - delay, [0, 22], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const gap = 4;
  const barWidth = (width - gap * (bars - 1)) / bars;
  const centerY = height / 2;

  return (
    <svg
      aria-label="Ilustrasi gelombang audio"
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      style={{ display: "block", overflow: "visible" }}
      width={width}
    >
      <line
        stroke="rgba(0,0,0,0.1)"
        strokeWidth={1}
        x1={0}
        x2={width}
        y1={centerY}
        y2={centerY}
      />
      {Array.from({ length: bars }).map((_, index) => {
        const base =
          0.18 +
          0.58 *
            Math.abs(Math.sin(index * 1.37 + 0.6)) *
            (0.68 + 0.32 * Math.abs(Math.sin(index * 0.21)));
        const pulse = 0.72 + 0.28 * Math.sin(local * 0.17 + index * 0.53);
        const barHeight = Math.max(
          5,
          height * base * pulse * (0.35 + 0.65 * reveal),
        );
        const accent = index % 13 === 0;
        const x = index * (barWidth + gap);
        const y = centerY - barHeight / 2;

        return (
          <rect
            fill={accent ? COLORS.black : COLORS.slate}
            height={barHeight}
            key={index}
            opacity={accent ? 0.9 : 0.48 + 0.34 * base}
            rx={barWidth / 2}
            width={barWidth}
            x={x}
            y={y}
          />
        );
      })}
    </svg>
  );
};

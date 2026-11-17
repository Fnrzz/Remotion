import React from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { MOTION } from "../design";

export const TypingEffect: React.FC<{
  text: string;
  start: number;
  duration?: number;
}> = ({ text, start, duration = 0.5 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const count = Math.floor(
    interpolate(
      frame / fps,
      [start, start + duration],
      [0, text.length],
      MOTION,
    ),
  );
  return (
    <span>
      {text.slice(0, count)}
      <span
        style={{
          opacity:
            frame / fps >= start && frame / fps < start + duration + 0.4
              ? 1
              : 0,
          color: "#708090",
        }}
      >
        │
      </span>
    </span>
  );
};

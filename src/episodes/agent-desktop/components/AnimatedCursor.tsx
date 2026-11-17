import React from "react";
import { Easing, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { MOTION } from "../design";

export const AnimatedCursor: React.FC<{
  times: readonly number[];
  xs: readonly number[];
  ys: readonly number[];
  click: number;
  dark?: boolean;
}> = ({ times, xs, ys, click, dark }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  return (
    <div
      style={{
        position: "absolute",
        left: interpolate(t, times, xs, {
          ...MOTION,
          easing: Easing.inOut(Easing.cubic),
        }),
        top: interpolate(t, times, ys, {
          ...MOTION,
          easing: Easing.inOut(Easing.cubic),
        }),
        opacity: interpolate(t, [times[0], times[0] + 0.15], [0, 1], MOTION),
        pointerEvents: "none",
      }}
    >
      <svg
        width="55"
        height="63"
        viewBox="-15 -15 70 80"
        style={{ overflow: "visible" }}
      >
        <circle
          cx="4"
          cy="6"
          r={interpolate(t, [click, click + 0.3], [4, 30], MOTION)}
          fill="none"
          stroke="#708090"
          strokeWidth="2"
          opacity={interpolate(
            t,
            [click - 0.01, click, click + 0.3],
            [0, 0.9, 0],
            MOTION,
          )}
        />
        <path
          d="M0 0V39L10 29L18 46L26 42L18 26H33Z"
          fill={dark ? "#FFFFFF" : "#000000"}
          stroke={dark ? "#000000" : "#FFFFFF"}
          strokeWidth="2"
          style={{
            scale: interpolate(
              t,
              [click - 0.04, click + 0.08, click + 0.22],
              [1, 0.86, 1],
              MOTION,
            ),
            transformOrigin: "0 0",
          }}
        />
      </svg>
    </div>
  );
};

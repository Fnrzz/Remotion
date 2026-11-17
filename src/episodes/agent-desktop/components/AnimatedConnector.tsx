import React from "react";
import {
  Interactive,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { MOTION } from "../design";

export const AnimatedConnector: React.FC<{
  d: string;
  start: number;
  width?: number;
  height?: number;
  packet?: number;
}> = ({ d, start, width = 636, height = 120, packet }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      style={{
        position: "absolute",
        inset: 0,
        overflow: "visible",
        pointerEvents: "none",
      }}
    >
      <Interactive.Path
        name="Connexion animée — flux conceptuel"
        d={d}
        fill="none"
        stroke="#708090"
        strokeWidth="2"
        pathLength="1"
        strokeDasharray="1"
        strokeDashoffset={interpolate(
          frame / fps,
          [start, start + 0.6],
          [1, 0],
          MOTION,
        )}
      />
      {packet !== undefined ? (
        <path
          d={d}
          fill="none"
          stroke="currentColor"
          strokeWidth="7"
          strokeLinecap="round"
          pathLength="1"
          strokeDasharray="0.05 1"
          strokeDashoffset={interpolate(
            frame / fps,
            [packet, packet + 0.7],
            [0, -0.95],
            MOTION,
          )}
          opacity={interpolate(
            frame / fps,
            [packet - 0.01, packet, packet + 0.65, packet + 0.75],
            [0, 1, 1, 0],
            MOTION,
          )}
        />
      ) : null}
    </svg>
  );
};

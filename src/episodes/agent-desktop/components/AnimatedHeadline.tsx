import React from "react";
import {
  Easing,
  Interactive,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { MOTION } from "../design";

export const AnimatedHeadline: React.FC<{
  lines: readonly string[];
  supporting?: string;
  size?: number;
  delay?: number;
  lineStarts?: readonly number[];
}> = ({ lines, supporting, size = 104, delay = 0, lineStarts }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <div
      data-ad-heading
      style={{ position: "absolute", left: 84, top: 240, width: 912 }}
    >
      {lines.map((line, i) => (
        <div key={line} style={{ overflow: "hidden", paddingBottom: 8 }}>
          <Interactive.Div
            name="Judul kinetik"
            data-ad-text
            style={{
              fontSize: size,
              fontWeight: 800,
              lineHeight: 1.06,
              letterSpacing: "-0.055em",
              color: i === 1 ? "#708090" : "inherit",
              translate: interpolate(
                frame,
                [
                  (lineStarts?.[i] ?? delay + i * 0.09) * fps,
                  ((lineStarts?.[i] ?? delay + i * 0.09) + 0.3) * fps,
                ],
                ["0px 120px", "0px 0px"],
                { ...MOTION, easing: Easing.bezier(0.16, 1, 0.3, 1) },
              ),
            }}
          >
            {line}
          </Interactive.Div>
        </div>
      ))}
      {supporting ? (
        <div
          data-ad-text
          style={{
            marginTop: 24,
            fontSize: 29,
            fontWeight: 700,
            lineHeight: 1.4,
            opacity: interpolate(
              frame,
              [(delay + 0.1) * fps, (delay + 0.45) * fps],
              [0, 1],
              MOTION,
            ),
          }}
        >
          {supporting}
        </div>
      ) : null}
    </div>
  );
};

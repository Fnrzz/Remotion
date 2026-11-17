import React from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { MOTION } from "../design";

export const AccessibilityTree: React.FC<{ start: number; select: number }> = ({
  start,
  select,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <div style={{ position: "relative", width: 245 }}>
      <div
        style={{
          fontSize: 16,
          fontWeight: 700,
          marginBottom: 16,
          color: "#708090",
        }}
      >
        STRUKTUR AKSESIBILITAS
      </div>
      <svg
        width="245"
        height="225"
        viewBox="0 0 245 225"
        style={{ position: "absolute", top: 42 }}
      >
        <path
          d="M9 10V48H29V185 M29 90H49 M29 136H49 M29 182H49"
          fill="none"
          stroke="#708090"
          strokeWidth="1.5"
          pathLength="1"
          strokeDasharray="1"
          strokeDashoffset={interpolate(
            frame / fps,
            [start, start + 0.6],
            [1, 0],
            MOTION,
          )}
        />
      </svg>
      {["Aplikasi", "Jendela", "Kolom teks", "Tombol", "Daftar"].map(
        (label, i) => (
          <div
            key={label}
            style={{
              position: "relative",
              marginLeft: i === 0 ? 0 : i === 1 ? 24 : 48,
              height: 46,
              display: "flex",
              alignItems: "center",
              paddingLeft: 10,
              fontSize: 21,
              fontWeight: 600,
              backgroundColor:
                i === 3 && frame / fps >= select ? "#70809025" : "transparent",
              opacity: interpolate(
                frame / fps,
                [start + i * 0.13, start + i * 0.13 + 0.3],
                [0, 1],
                MOTION,
              ),
              translate: interpolate(
                frame / fps,
                [start + i * 0.13, start + i * 0.13 + 0.3],
                ["12px 0px", "0px 0px"],
                MOTION,
              ),
            }}
          >
            {label}
            {i === 3 && frame / fps >= select ? (
              <span style={{ marginLeft: 10, fontSize: 16 }}>←</span>
            ) : null}
          </div>
        ),
      )}
    </div>
  );
};

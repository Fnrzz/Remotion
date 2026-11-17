import React from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { MOTION } from "../design";

export const BeforeAfterState: React.FC<{ start: number }> = ({ start }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <div
      style={{
        opacity: interpolate(frame / fps, [start, start + 0.4], [0, 1], MOTION),
        translate: interpolate(
          frame / fps,
          [start, start + 0.4],
          ["0px 18px", "0px 0px"],
          MOTION,
        ),
      }}
    >
      <div style={{ display: "flex", gap: 30 }}>
        <div
          style={{ flex: 1, borderTop: "2px solid #708090", paddingTop: 16 }}
        >
          <div style={{ fontSize: 19, color: "#555555" }}>SEBELUM</div>
          <div style={{ fontSize: 39, fontWeight: 700, marginTop: 10 }}>
            2 catatan
          </div>
        </div>
        <div style={{ fontSize: 36, paddingTop: 34, color: "#708090" }}>→</div>
        <div
          style={{ flex: 1, borderTop: "2px solid #000000", paddingTop: 16 }}
        >
          <div style={{ fontSize: 19, color: "#555555" }}>OBSERVASI BARU</div>
          <div style={{ fontSize: 39, fontWeight: 700, marginTop: 10 }}>
            3 catatan?
          </div>
        </div>
      </div>
      <div style={{ marginTop: 24, fontSize: 24, fontWeight: 700 }}>
        CEK HASIL{" "}
        <span style={{ fontWeight: 500, color: "#555555" }}>
          — bukan asumsi.
        </span>
      </div>
    </div>
  );
};

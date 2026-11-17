import React from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { MOTION } from "../design";

// Editorial rows, not actual OS dialogs or a tested application list.
export const PermissionCards: React.FC<{ start: number }> = ({ start }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <div>
      {["IZIN AKSES", "DUKUNGAN APLIKASI", "SISTEM OPERASI"].map((label, i) => (
        <div
          key={label}
          style={{
            padding: "18px 0",
            borderBottom: "1px solid #70809070",
            display: "flex",
            alignItems: "center",
            gap: 20,
            fontSize: 25,
            fontWeight: 700,
            opacity: interpolate(
              frame / fps,
              [start + i * 0.35, start + i * 0.35 + 0.35],
              [0, 1],
              MOTION,
            ),
            translate: interpolate(
              frame / fps,
              [start + i * 0.35, start + i * 0.35 + 0.35],
              ["0px 18px", "0px 0px"],
              MOTION,
            ),
          }}
        >
          <span style={{ color: "#708090", fontSize: 20 }}>0{i + 1}</span>
          {label}
          <span style={{ marginLeft: "auto", color: "#708090" }}>↗</span>
        </div>
      ))}
    </div>
  );
};

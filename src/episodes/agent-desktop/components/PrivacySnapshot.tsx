import React from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { MOTION } from "../design";

export const PrivacySnapshot: React.FC<{
  redact: number;
  boundary: number;
}> = ({ redact, boundary }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <div style={{ position: "relative", padding: "24px 26px" }}>
      <svg
        width="636"
        height="300"
        viewBox="0 0 636 300"
        style={{ position: "absolute", left: 0, top: 0 }}
      >
        <path
          d="M34 1H635V299H1V1H34"
          fill="none"
          stroke="#708090"
          strokeWidth="2"
          pathLength="1"
          strokeDasharray="1"
          strokeDashoffset={interpolate(
            frame / fps,
            [boundary, boundary + 0.7],
            [1, 0],
            MOTION,
          )}
        />
      </svg>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontWeight: 700,
          fontSize: 18,
          color: "#708090",
          marginBottom: 16,
        }}
      >
        <span>SNAPSHOT / LOG</span>
        <span>DATA DUMMY</span>
      </div>
      {[
        "Dokumen: rencana-contoh.txt",
        "Catatan: ide proyek fiktif",
        "Kontak: pengguna [contoh]",
      ].map((text, i) => (
        <div
          key={text}
          style={{
            position: "relative",
            fontSize: 24,
            lineHeight: 1.5,
            padding: "9px 0",
            borderBottom: "1px solid #70809040",
            opacity: interpolate(
              frame / fps,
              [i * 0.25, i * 0.25 + 0.3],
              [0, 1],
              MOTION,
            ),
          }}
        >
          {text}
          <div
            style={{
              position: "absolute",
              left: 126,
              right: 15 + i * 25,
              top: 14,
              bottom: 13,
              backgroundColor: "#000000",
              transformOrigin: "left",
              scale: `${interpolate(frame / fps, [redact + i * 0.15, redact + i * 0.15 + 0.3], [0, 1], MOTION)} 1`,
            }}
          />
        </div>
      ))}
      <div style={{ marginTop: 18, fontSize: 16, color: "#555555" }}>
        Penyamaran editorial, bukan fitur otomatis tool.
      </div>
    </div>
  );
};

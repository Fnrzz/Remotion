import React from "react";
import { interpolate } from "remotion";
import { OMNI, smooth } from "../config";

export const AnimatedPriceBars: React.FC<{ time: number }> = ({ time }) => {
  const reduction = interpolate(
    time,
    [2.1, 4.4],
    [0, OMNI.price.reduction],
    smooth,
  );
  return (
    <div
      data-price-ratio={1 - reduction}
      style={{ position: "relative", width: 912 }}
    >
      <div style={{ fontSize: 26, color: "#555555", marginBottom: 24 }}>
        Omni 1.1 Flash
      </div>
      <div
        style={{
          width: 912,
          height: 60,
          backgroundColor: "#708090",
          opacity: 0.3,
        }}
      />
      <div style={{ fontSize: 26, marginTop: 48, marginBottom: 24 }}>
        Omni 1.2 Flash
      </div>
      <div
        style={{
          width: 912 * (1 - reduction),
          height: 92,
          backgroundColor: "#000000",
        }}
      />
      <svg
        width="912"
        height="60"
        style={{
          marginTop: 16,
          opacity: interpolate(time, [3, 4.1], [0, 1], smooth),
        }}
      >
        <path
          d={`M${912 * 0.7} 8v20H912V8`}
          stroke="#708090"
          fill="none"
          strokeWidth="2"
        />
      </svg>
      <div
        style={{
          marginTop: 28,
          fontSize: 72,
          fontWeight: 800,
          letterSpacing: "-0.05em",
          opacity: interpolate(time, [4.74, 5.25], [0, 1], smooth),
        }}
      >
        $0.07{" "}
        <span style={{ fontSize: 30, fontWeight: 600, letterSpacing: 0 }}>
          / DETIK
        </span>
      </div>
      <div style={{ marginTop: 22, fontSize: 27, fontWeight: 600 }}>
        API · 720P
      </div>
    </div>
  );
};

import React from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { MOTION } from "../design";
import { AnimatedConnector } from "./AnimatedConnector";

export const AgentActionFlow: React.FC<{
  start?: number;
  action?: number;
  dark?: boolean;
}> = ({ start = 0, action = 2, dark }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <div style={{ position: "relative", height: 160 }}>
      <AnimatedConnector d="M83 68 H548" start={start + 0.25} packet={action} />
      {[
        { label: "AGENT /", sub: "PROGRAM", x: 0 },
        { label: "AGENT-", sub: "DESKTOP", x: 235 },
        { label: "APLIKASI", sub: "DIDUKUNG", x: 470 },
      ].map(({ label, sub, x }, i) => (
        <div
          key={label}
          style={{
            position: "absolute",
            left: x,
            top: 10,
            width: 166,
            padding: "20px 0",
            textAlign: "center",
            borderTop: `2px solid ${i === 1 ? "#708090" : "currentColor"}`,
            borderBottom: "1px solid #70809070",
            backgroundColor: dark ? "#000000" : "#FAF9F6",
            fontSize: 21,
            fontWeight: 800,
            lineHeight: 1.4,
            opacity: interpolate(
              frame / fps,
              [start + i * 0.15, start + i * 0.15 + 0.4],
              [0, 1],
              MOTION,
            ),
          }}
        >
          {label}
          <br />
          <span style={{ color: "#708090", fontSize: 19 }}>{sub}</span>
        </div>
      ))}
    </div>
  );
};

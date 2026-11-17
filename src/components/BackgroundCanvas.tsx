import React from "react";
import { AbsoluteFill } from "remotion";
import { COLORS } from "../theme";

export const BackgroundCanvas: React.FC = () => {
  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.offWhite,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          background:
            "radial-gradient(ellipse 70% 55% at 88% 12%, rgba(112,128,144,0.13) 0%, rgba(112,128,144,0) 70%)",
          inset: 0,
          position: "absolute",
        }}
      />
      <div
        style={{
          background:
            "radial-gradient(ellipse 60% 45% at 2% 92%, rgba(112,128,144,0.08) 0%, rgba(112,128,144,0) 70%)",
          inset: 0,
          position: "absolute",
        }}
      />
      <div
        style={{
          border: "1px solid rgba(112,128,144,0.17)",
          borderRadius: "50%",
          height: 790,
          position: "absolute",
          right: -330,
          top: 190,
          width: 790,
        }}
      />
      <div
        style={{
          border: "1px solid rgba(112,128,144,0.22)",
          borderRadius: "50%",
          height: 128,
          position: "absolute",
          right: 108,
          top: 698,
          width: 128,
        }}
      />
      <div
        style={{
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.035), rgba(0,0,0,0))",
          height: 320,
          left: 0,
          position: "absolute",
          top: 0,
          width: 320,
        }}
      />
      <div
        style={{
          backgroundImage:
            "radial-gradient(rgba(0,0,0,0.09) 0.7px, transparent 0.7px)",
          backgroundSize: "26px 26px",
          height: 260,
          opacity: 0.5,
          position: "absolute",
          right: 72,
          top: 154,
          WebkitMaskImage:
            "linear-gradient(135deg, rgba(0,0,0,0.9), rgba(0,0,0,0))",
          width: 260,
        }}
      />
      <div
        style={{
          backgroundColor: "rgba(0,0,0,0.05)",
          bottom: 0,
          left: 64,
          position: "absolute",
          top: 128,
          width: 1,
        }}
      />
      <div
        style={{
          backgroundColor: "rgba(0,0,0,0.05)",
          bottom: 0,
          position: "absolute",
          right: 64,
          top: 128,
          width: 1,
        }}
      />
      <div
        style={{
          backgroundImage:
            "radial-gradient(rgba(0,0,0,0.035) 0.6px, transparent 0.6px)",
          backgroundSize: "5px 5px",
          inset: 0,
          opacity: 0.45,
          position: "absolute",
        }}
      />
    </AbsoluteFill>
  );
};

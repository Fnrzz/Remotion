import React from "react";
import { AbsoluteFill, useVideoConfig } from "remotion";
import { FONT_FAMILY } from "../../../fonts";

/** Preview-only schematic UI, never enabled in the delivered MP4. */
export const SafeAreaGuide: React.FC = () => {
  const { width, height } = useVideoConfig();
  return (
    <AbsoluteFill
      style={{
        pointerEvents: "none",
        fontFamily: FONT_FAMILY,
        color: "#555555",
      }}
    >
      <div
        style={{
          position: "absolute",
          left: (width * 110) / 1080,
          top: (height * 220) / 1920,
          width: (width * 740) / 1080,
          height: (height * 1180) / 1920,
          border: "2px dashed #708090",
        }}
      />
      <div
        style={{
          position: "absolute",
          right: 0,
          top: height * 0.32,
          bottom: height * 0.19,
          width: width * 0.15,
          background: "rgba(112,128,144,0.15)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-evenly",
          alignItems: "center",
          fontSize: width * 0.035,
        }}
      >
        <span>♡</span>
        <span>◯</span>
        <span>↗</span>
        <span>＋</span>
      </div>
      <div
        style={{
          position: "absolute",
          bottom: 0,
          width,
          height: (height * 350) / 1920,
          background: "rgba(112,128,144,0.18)",
          padding: width * 0.05,
          boxSizing: "border-box",
          fontSize: width * 0.025,
        }}
      >
        @akun · Area antarmuka TikTok
        <br />
        Keterangan video dan navigasi
        <br />
        Panduan perkiraan — bukan tangkapan layar aplikasi
      </div>
    </AbsoluteFill>
  );
};

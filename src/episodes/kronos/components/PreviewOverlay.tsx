import React from "react";
import { AbsoluteFill, useRemotionEnvironment, useVideoConfig } from "remotion";

// Native approximation for collision checks, not an official TikTok UI asset.
// Explicitly excluded from exported frames, including renders with Studio props.
export const PreviewOverlay: React.FC<{ enabled: boolean }> = ({ enabled }) => {
  const { isStudio, isRendering } = useRemotionEnvironment();
  const { width, height } = useVideoConfig();
  if (!enabled || !isStudio || isRendering) return null;
  return (
    <AbsoluteFill style={{ pointerEvents: "none", zIndex: 100 }}>
      <div
        data-tiktok-safe-zone="kronos-ui-approximation"
        style={{
          position: "absolute",
          width: 1080,
          height: 1920,
          transformOrigin: "top left",
          transform: `scale(${width / 1080}, ${height / 1920})`,
          color: "#FFFFFF",
          textShadow: "0 1px 4px #000000",
          fontSize: 23,
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 138,
            left: 320,
            fontWeight: 700,
            display: "flex",
            gap: 40,
          }}
        >
          <span>Mengikuti</span>
          <span>Untuk Anda</span>
        </div>
        <div
          style={{
            position: "absolute",
            left: 110,
            top: 220,
            width: 740,
            height: 1180,
            border: "1px dashed #70809055",
            boxSizing: "border-box",
          }}
        />
        <div
          style={{
            position: "absolute",
            right: 30,
            top: 890,
            width: 100,
            display: "flex",
            flexDirection: "column",
            gap: 40,
            textAlign: "center",
          }}
        >
          <svg width="90" height="90" viewBox="0 0 90 90">
            <circle
              cx="45"
              cy="45"
              r="30"
              stroke="#FFFFFF"
              strokeWidth="3"
              fill="#555555"
            />
            <path d="M30 46h30M45 31v30" stroke="#FFFFFF" strokeWidth="3" />
          </svg>
          <svg width="90" height="90" viewBox="0 0 90 90">
            <path
              d="M45 70 17 42C-3 11 38 8 45 29 55 7 91 13 73 42Z"
              fill="#FFFFFF"
            />
          </svg>
          <svg width="90" height="90" viewBox="0 0 90 90">
            <path d="M15 15h60v44H50L30 77V59H15Z" fill="#FFFFFF" />
          </svg>
          <svg width="90" height="90" viewBox="0 0 90 90">
            <path d="M23 12h44v64L45 61 23 76Z" fill="#FFFFFF" />
          </svg>
          <svg width="90" height="90" viewBox="0 0 90 90">
            <path
              d="M16 65c0-30 21-37 39-37V10l25 27-25 26V45c-20 0-29 7-39 20Z"
              fill="#FFFFFF"
            />
          </svg>
        </div>
        <div
          style={{
            position: "absolute",
            top: 1510,
            left: 65,
            right: 150,
            backgroundColor: "#00000055",
            padding: 24,
            borderRadius: 16,
            lineHeight: 1.7,
          }}
        >
          <strong>@akun_pratinjau</strong>
          <br />
          Keterangan video dan tagar berada di sini.
          <br />
          Area ini sengaja tidak memuat informasi penting.
          <br />♫ Audio asli · narasi Indonesia
        </div>
        <div
          style={{
            position: "absolute",
            top: 1845,
            width: 1080,
            textAlign: "center",
            fontSize: 22,
            backgroundColor: "#00000055",
            padding: 14,
            display: "flex",
            justifyContent: "space-around",
          }}
        >
          <span>Beranda</span>
          <span>Teman</span>
          <span>＋</span>
          <span>Kotak masuk</span>
          <span>Profil</span>
        </div>
        <div
          style={{
            position: "absolute",
            top: 1430,
            left: 110,
            color: "#708090",
            fontSize: 16,
            textShadow: "none",
          }}
        >
          SIMULASI UI · HANYA PRATINJAU · BUKAN ANTARMUKA RESMI
        </div>
      </div>
    </AbsoluteFill>
  );
};

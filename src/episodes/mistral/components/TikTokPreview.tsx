import React from "react";
import { useRemotionEnvironment } from "remotion";

/** Approximate TikTok UI, not a screenshot. Preview only, never exported. */
export const TikTokPreview: React.FC<{ enabled: boolean }> = ({ enabled }) => {
  const { isStudio, isRendering } = useRemotionEnvironment();
  if (!enabled || !isStudio || isRendering) return null;
  return (
    <div
      data-mistral-ui
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 100,
        pointerEvents: "none",
        color: "#FFFFFF",
        textShadow: "0 1px 5px #000000",
        fontWeight: 600,
      }}
    >
      <div
        style={{
          position: "absolute",
          left: 200,
          top: 100,
          width: 680,
          display: "flex",
          justifyContent: "space-between",
          fontSize: 28,
        }}
      >
        <span>Mengikuti</span>
        <span>Untuk Anda</span>
        <span>⌕</span>
      </div>
      <div
        style={{
          position: "absolute",
          top: 190,
          left: 132,
          fontSize: 17,
          opacity: 0.65,
        }}
      >
        SIMULASI UI · HANYA PRATINJAU
      </div>
      <div
        data-mistral-ui-rail
        style={{
          position: "absolute",
          right: 30,
          top: 950,
          width: 110,
          display: "flex",
          flexDirection: "column",
          gap: 50,
          alignItems: "center",
        }}
      >
        <div
          style={{
            width: 72,
            height: 72,
            border: "3px solid white",
            borderRadius: 40,
            backgroundColor: "#555555",
            fontSize: 26,
            display: "grid",
            placeItems: "center",
          }}
        >
          K
        </div>
        <div style={{ textAlign: "center" }}>
          <svg width="64" height="64" viewBox="0 0 64 64" fill="white">
            <path d="M32 55 8 31C-6 11 18-1 32 17 46-1 70 11 56 31Z" />
          </svg>
          <div style={{ fontSize: 20 }}>12,4 rb</div>
        </div>
        <div style={{ textAlign: "center" }}>
          <svg width="64" height="64" viewBox="0 0 64 64" fill="white">
            <path d="M8 8h48v36H31L13 57V44H8Z" />
          </svg>
          <div style={{ fontSize: 20 }}>248</div>
        </div>
        <div style={{ textAlign: "center" }}>
          <svg width="64" height="64" viewBox="0 0 64 64" fill="white">
            <path d="M16 5h32v53L32 47 16 58Z" />
          </svg>
          <div style={{ fontSize: 20 }}>Simpan</div>
        </div>
        <div style={{ textAlign: "center" }}>
          <svg width="64" height="64" viewBox="0 0 64 64" fill="white">
            <path d="M38 4 61 25 38 45V32C20 32 10 41 4 56 4 30 14 18 38 18Z" />
          </svg>
          <div style={{ fontSize: 20 }}>Bagikan</div>
        </div>
      </div>
      <div
        data-mistral-ui-bottom
        style={{
          position: "absolute",
          left: 0,
          top: 1460,
          width: 1080,
          height: 460,
          backgroundColor: "#000000BB",
          padding: "42px 54px",
          boxSizing: "border-box",
        }}
      >
        <div style={{ fontSize: 30, marginBottom: 22 }}>KAVDRA STUDIO</div>
        <div style={{ fontSize: 26, lineHeight: 1.6 }}>
          Mistral Large 4: lewat API atau server sendiri?
          <br />
          #BeritaAI #Teknologi #Mistral
        </div>
        <div style={{ fontSize: 23, marginTop: 30 }}>
          ♫ Suara asli — KAVDRA STUDIO
        </div>
        <div
          style={{
            borderTop: "1px solid #708090",
            display: "flex",
            justifyContent: "space-between",
            marginTop: 45,
            paddingTop: 26,
            fontSize: 23,
          }}
        >
          <span>Beranda</span>
          <span>Teman</span>
          <span>＋</span>
          <span>Kotak masuk</span>
          <span>Profil</span>
        </div>
      </div>
    </div>
  );
};

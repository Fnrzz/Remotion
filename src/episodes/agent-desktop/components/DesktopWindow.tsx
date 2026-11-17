import React from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { MOTION } from "../design";
import { TypingEffect } from "./TypingEffect";

// Original fictional notes UI. Never a recording, a test, or branded software.
export const DesktopWindow: React.FC<{
  width?: number;
  typing?: number;
  focus?: number;
  click?: number;
  secondaryClick?: number;
  dark?: boolean;
  compact?: boolean;
  highlightButton?: number;
}> = ({
  width = 636,
  typing = 999,
  focus = 999,
  click = 999,
  secondaryClick,
  dark = false,
  compact = false,
  highlightButton = 999,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const resultAt = (secondaryClick ?? click) + 0.2;
  const pressAt =
    secondaryClick !== undefined && t > click + 0.3 ? secondaryClick : click;
  return (
    <div
      data-ad-ui
      style={{
        width,
        position: "relative",
        color: dark ? "#FFFFFF" : "#000000",
        borderTop: "2px solid #708090",
        borderBottom: "1px solid #70809070",
        padding: compact ? "18px 0" : "22px 0",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          paddingBottom: 18,
          borderBottom: "1px solid #70809060",
        }}
      >
        <strong style={{ fontSize: compact ? 21 : 27 }}>Catatan contoh</strong>
        <span style={{ fontSize: 16, color: "#708090" }}>
          Daftar / Hari ini
        </span>
      </div>
      <div
        style={{
          padding: "17px 0",
          fontSize: compact ? 18 : 22,
          lineHeight: 1.9,
        }}
      >
        <div>○ &nbsp; Baca dokumen</div>
        <div>○ &nbsp; Susun ide</div>
        {!compact ? (
          <div
            style={{
              height: 36,
              opacity: interpolate(
                t,
                [resultAt, resultAt + 0.3],
                [0, 1],
                MOTION,
              ),
            }}
          >
            ○ &nbsp; Catatan baru
          </div>
        ) : null}
      </div>
      <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
        <div
          style={{
            flex: 1,
            height: compact ? 47 : 56,
            border: `2px solid ${t >= focus ? (dark ? "#FFFFFF" : "#000000") : "#70809070"}`,
            borderRadius: 6,
            display: "flex",
            alignItems: "center",
            paddingLeft: 14,
            fontSize: compact ? 18 : 24,
          }}
        >
          <TypingEffect text="Catatan baru" start={typing} />
        </div>
        <div
          style={{
            width: compact ? 93 : 136,
            outline: t >= highlightButton ? "2px solid #708090" : "none",
            outlineOffset: 4,
            height: compact ? 47 : 56,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 6,
            fontSize: compact ? 17 : 23,
            fontWeight: 700,
            backgroundColor:
              t >= pressAt && t < pressAt + 0.22
                ? "#708090"
                : dark
                  ? "#FFFFFF"
                  : "#000000",
            color: dark ? "#000000" : "#FFFFFF",
            scale: interpolate(
              t,
              [pressAt - 0.05, pressAt + 0.08, pressAt + 0.24],
              [1, 0.95, 1],
              MOTION,
            ),
          }}
        >
          Tambah
        </div>
      </div>
    </div>
  );
};

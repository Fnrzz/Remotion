import React from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { SCENES } from "../data/scenes";
import { FONT_FAMILY } from "../fonts";
import { COLORS } from "../theme";

type FrameChromeProps = {
  startFrame?: number;
};

export const FrameChrome: React.FC<FrameChromeProps> = ({ startFrame = 0 }) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();

  const activeIndex = SCENES.findIndex(
    (scene) =>
      frame >= scene.from && frame < scene.from + scene.durationInFrames,
  );
  const active = SCENES[Math.max(0, activeIndex)];

  const opacity = Math.min(
    interpolate(frame, [startFrame, startFrame + 8], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }),
    interpolate(frame, [durationInFrames - 24, durationInFrames - 4], [1, 0], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    }),
  );

  return (
    <div
      style={{
        color: COLORS.black,
        fontFamily: FONT_FAMILY,
        inset: 0,
        opacity,
        pointerEvents: "none",
        position: "absolute",
      }}
    >
      <div
        style={{
          alignItems: "center",
          display: "flex",
          justifyContent: "space-between",
          left: 72,
          position: "absolute",
          right: 72,
          top: 58,
        }}
      >
        <div style={{ alignItems: "center", display: "flex", gap: 12 }}>
          <div
            style={{
              backgroundColor: COLORS.black,
              borderRadius: 2,
              height: 12,
              width: 12,
            }}
          />
          <div
            style={{
              fontSize: 19,
              fontWeight: 800,
              letterSpacing: "0.15em",
            }}
          >
            GENIE 4
          </div>
          <div
            style={{
              backgroundColor: "rgba(0,0,0,0.24)",
              height: 14,
              width: 1,
            }}
          />
          <div
            style={{
              color: COLORS.slate,
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.16em",
            }}
          >
            MODEL DUNIA
          </div>
        </div>
        <div style={{ alignItems: "center", display: "flex", gap: 12 }}>
          <div
            style={{
              color: COLORS.gray,
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: "0.13em",
            }}
          >
            BERITA AI
          </div>
          <div
            style={{
              backgroundColor: "rgba(0,0,0,0.2)",
              borderRadius: 99,
              height: 3,
              width: 3,
            }}
          />
          <div
            style={{
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: "0.1em",
            }}
          >
            {active?.index ?? "01"} / 07
          </div>
        </div>
      </div>

      <div
        style={{
          backgroundColor: "rgba(0,0,0,0.1)",
          height: 1,
          left: 72,
          position: "absolute",
          right: 72,
          top: 126,
        }}
      />

      <div
        style={{
          left: 72,
          position: "absolute",
          right: 72,
          top: 1434,
        }}
      >
        <div style={{ display: "flex", gap: 6 }}>
          {SCENES.map((scene, index) => {
            const isActive = index === activeIndex;
            const isPast = index < activeIndex;
            return (
              <div
                key={scene.id}
                style={{
                  backgroundColor: isActive
                    ? COLORS.black
                    : isPast
                      ? COLORS.slate
                      : "rgba(0,0,0,0.12)",
                  borderRadius: 99,
                  flex: 1,
                  height: 2,
                }}
              />
            );
          })}
        </div>
        <div
          style={{
            alignItems: "center",
            display: "flex",
            justifyContent: "space-between",
            marginTop: 12,
          }}
        >
          <div
            style={{
              color: "rgba(85,85,85,0.85)",
              fontSize: 10,
              fontWeight: 600,
              letterSpacing: "0.11em",
            }}
          >
            SUMBER VISUAL: GOOGLE DEEPMIND
          </div>
          <div
            style={{
              color: COLORS.gray,
              fontSize: 10,
              fontWeight: 600,
              letterSpacing: "0.11em",
            }}
          >
            {active?.meta ?? "SIMULASI DUNIA"}
          </div>
        </div>
      </div>

      <div
        style={{
          bottom: 48,
          color: "rgba(85,85,85,0.5)",
          fontSize: 10,
          fontWeight: 600,
          left: 0,
          letterSpacing: "0.16em",
          position: "absolute",
          right: 0,
          textAlign: "center",
        }}
      >
        GENIE 4 — PRATINJAU RISET · 2026
      </div>
    </div>
  );
};

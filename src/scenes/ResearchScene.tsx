import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { AnimatedText } from "../components/AnimatedText";
import { SceneShell } from "../components/SceneShell";
import { useSceneFade } from "../components/useSceneFade";
import { FONT_FAMILY } from "../fonts";
import { TIKTOK_VERTICAL_BALANCE } from "../layout/tiktokSafeArea";
import { COLORS } from "../theme";

type SceneProps = {
  durationInFrames: number;
};

const statusRows = [
  ["Rilis publik", "BELUM"],
  ["Akses penguji", "TERBATAS"],
  ["Tahap model", "RISET"],
];

export const ResearchScene: React.FC<SceneProps> = ({ durationInFrames }) => {
  const opacity = useSceneFade(durationInFrames);
  const frame = useCurrentFrame();
  const ringScale = interpolate(frame, [0, durationInFrames], [1, 1.025], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <SceneShell
      index="06"
      label="STATUS"
      meta="PRATINJAU RISET"
      opacity={opacity}
    >
      <AbsoluteFill>
        <div
          style={{
            left: 72,
            position: "absolute",
            top: 222,
            width: 680,
          }}
        >
          <AnimatedText
            delay={2}
            style={{
              color: COLORS.black,
              fontSize: 146,
              fontWeight: 800,
              letterSpacing: "-0.065em",
              lineHeight: 0.91,
            }}
          >
            MASIH
          </AnimatedText>
          <AnimatedText
            delay={7}
            style={{
              color: COLORS.black,
              fontSize: 146,
              fontWeight: 800,
              letterSpacing: "-0.065em",
              lineHeight: 0.91,
            }}
          >
            TAHAP
          </AnimatedText>
          <AnimatedText
            delay={12}
            style={{
              color: COLORS.slate,
              fontSize: 146,
              fontWeight: 800,
              letterSpacing: "-0.065em",
              lineHeight: 0.91,
            }}
          >
            RISET
          </AnimatedText>
        </div>

        <AnimatedText
          delay={20}
          style={{
            color: COLORS.gray,
            fontSize: 29,
            fontWeight: 500,
            left: 76,
            letterSpacing: "-0.012em",
            lineHeight: 1.48,
            maxWidth: 590,
            position: "absolute",
            top: 666,
          }}
        >
          Genie 4 masih berupa pratinjau riset. Aksesnya belum terbuka untuk
          semua orang.
        </AnimatedText>

        <div
          style={{
            left: 752,
            position: "absolute",
            top: 286,
          }}
        >
          <AnimatedText
            delay={16}
            style={{
              color: COLORS.slate,
              fontFamily: FONT_FAMILY,
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: "0.14em",
            }}
          >
            STATUS MODEL
          </AnimatedText>
          <div
            style={{
              alignItems: "center",
              border: "1px solid rgba(112,128,144,0.42)",
              borderRadius: "50%",
              display: "flex",
              height: 300,
              justifyContent: "center",
              marginTop: 14,
              transform: `scale(${ringScale})`,
              width: 300,
            }}
          >
            <div
              style={{
                alignItems: "center",
                border: "1px solid rgba(112,128,144,0.2)",
                borderRadius: "50%",
                display: "flex",
                height: 220,
                justifyContent: "center",
                position: "relative",
                width: 220,
              }}
            >
              <div
                style={{
                  color: "rgba(112,128,144,0.5)",
                  fontFamily: FONT_FAMILY,
                  fontSize: 54,
                  fontWeight: 800,
                  letterSpacing: "-0.05em",
                }}
              >
                06
              </div>
              <div
                style={{
                  backgroundColor: COLORS.slate,
                  border: `5px solid ${COLORS.offWhite}`,
                  borderRadius: "50%",
                  bottom: 26,
                  height: 16,
                  position: "absolute",
                  right: 32,
                  width: 16,
                }}
              />
            </div>
          </div>
        </div>

        <div
          style={{
            left: 72,
            position: "absolute",
            top: 858 + TIKTOK_VERTICAL_BALANCE.sceneOffsetY,
            width: 936,
          }}
        >
          {statusRows.map(([label, value], index) => (
            <AnimatedText
              delay={24 + index * 3}
              key={label}
              style={{
                alignItems: "center",
                borderTop: "1px solid rgba(0,0,0,0.12)",
                display: "flex",
                justifyContent: "space-between",
                padding: "20px 0",
              }}
            >
              <span
                style={{
                  color: COLORS.black,
                  fontFamily: FONT_FAMILY,
                  fontSize: 26,
                  fontWeight: 500,
                  letterSpacing: "-0.015em",
                }}
              >
                {label}
              </span>
              <span
                style={{
                  color: COLORS.gray,
                  fontFamily: FONT_FAMILY,
                  fontSize: 14,
                  fontWeight: 700,
                  letterSpacing: "0.14em",
                }}
              >
                {value}
              </span>
            </AnimatedText>
          ))}
          <div style={{ backgroundColor: "rgba(0,0,0,0.12)", height: 1 }} />
        </div>

        <AnimatedText
          delay={34}
          style={{
            background: COLORS.black,
            borderRadius: 22,
            color: COLORS.offWhite,
            height: 138,
            left: 72,
            padding: "0 30px",
            position: "absolute",
            top: 1078 + TIKTOK_VERTICAL_BALANCE.sceneOffsetY,
            width: 936,
          }}
        >
          <div
            style={{
              alignItems: "center",
              display: "flex",
              height: "100%",
              justifyContent: "space-between",
            }}
          >
            <div style={{ alignItems: "center", display: "flex", gap: 16 }}>
              <span
                style={{
                  backgroundColor: COLORS.slate,
                  borderRadius: 99,
                  height: 8,
                  width: 8,
                }}
              />
              <span
                style={{
                  fontFamily: FONT_FAMILY,
                  fontSize: 31,
                  fontWeight: 700,
                  letterSpacing: "0.03em",
                }}
              >
                AKSES MASIH TERBATAS
              </span>
            </div>
            <span
              style={{
                color: "rgba(250,249,246,0.55)",
                fontFamily: FONT_FAMILY,
                fontSize: 12,
                fontWeight: 600,
                letterSpacing: "0.12em",
              }}
            >
              2026
            </span>
          </div>
        </AnimatedText>
      </AbsoluteFill>
    </SceneShell>
  );
};

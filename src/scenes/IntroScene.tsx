import React from "react";
import { AbsoluteFill } from "remotion";
import { AnimatedImageCard } from "../components/AnimatedImageCard";
import { AnimatedText } from "../components/AnimatedText";
import { SceneShell } from "../components/SceneShell";
import { useSceneFade } from "../components/useSceneFade";
import { TIKTOK_VERTICAL_BALANCE } from "../layout/tiktokSafeArea";
import { COLORS } from "../theme";

type SceneProps = {
  durationInFrames: number;
};

const metaRows = [
  ["STATUS", "PRATINJAU RISET"],
  ["TAHUN", "2026"],
  ["MEDIA", "DUNIA + AUDIO"],
];

export const IntroScene: React.FC<SceneProps> = ({ durationInFrames }) => {
  const opacity = useSceneFade(durationInFrames);

  return (
    <SceneShell
      index="02"
      label="PERKENALAN"
      meta="GOOGLE DEEPMIND"
      opacity={opacity}
    >
      <AbsoluteFill>
        <AnimatedText
          delay={1}
          style={{
            color: COLORS.slate,
            fontSize: 21,
            fontWeight: 700,
            left: 76,
            letterSpacing: "0.17em",
            position: "absolute",
            top: 228,
          }}
        >
          TEKNOLOGI AI TERBARU
        </AnimatedText>

        <AnimatedText
          delay={4}
          style={{
            color: COLORS.black,
            fontSize: 44,
            fontWeight: 700,
            left: 74,
            letterSpacing: "0.055em",
            lineHeight: 1,
            position: "absolute",
            top: 274,
          }}
        >
          GOOGLE
        </AnimatedText>

        <AnimatedText
          delay={8}
          style={{
            color: COLORS.black,
            fontSize: 190,
            fontWeight: 800,
            left: 66,
            letterSpacing: "-0.065em",
            lineHeight: 0.9,
            position: "absolute",
            top: 330,
          }}
        >
          GENIE <span style={{ color: COLORS.slate }}>4</span>
        </AnimatedText>

        <div
          style={{
            backgroundColor: "rgba(0,0,0,0.11)",
            height: 1,
            left: 72,
            position: "absolute",
            top: 568,
            width: 936,
          }}
        />

        <AnimatedImageCard
          alt="Dunia kaca berwarna yang dihasilkan Genie 4"
          credit="GOOGLE DEEPMIND"
          delay={4}
          height={540}
          imagePosition="50% 50%"
          revealDuration={16}
          src="assets/images/genie4-glass.jpg"
          style={{ left: 72, position: "absolute", top: 634 }}
          visualScale={1.22}
          visualOrigin="right top"
          width={556}
        />

        <div
          style={{
            left: 664,
            position: "absolute",
            top: 654 + TIKTOK_VERTICAL_BALANCE.sceneOffsetY,
            width: 344,
          }}
        >
          <AnimatedText
            delay={6}
            style={{
              color: COLORS.slate,
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: "0.16em",
            }}
          >
            MODEL DUNIA
          </AnimatedText>
          <AnimatedText
            delay={8}
            style={{
              color: COLORS.black,
              fontSize: 37,
              fontWeight: 600,
              letterSpacing: "-0.03em",
              lineHeight: 1.25,
              marginTop: 14,
            }}
          >
            Model dunia generatif dari Google DeepMind.
          </AnimatedText>
          <div
            style={{
              backgroundColor: "rgba(0,0,0,0.1)",
              height: 1,
              marginBottom: 20,
              marginTop: 30,
              width: "100%",
            }}
          />
          {metaRows.map(([label, value], index) => (
            <AnimatedText
              delay={11 + index * 2}
              key={label}
              style={{
                alignItems: "baseline",
                borderBottom:
                  index === metaRows.length - 1
                    ? "none"
                    : "1px solid rgba(0,0,0,0.08)",
                display: "flex",
                justifyContent: "space-between",
                paddingBottom: 12,
                paddingTop: index === 0 ? 0 : 12,
              }}
            >
              <span
                style={{
                  color: COLORS.gray,
                  fontSize: 11,
                  fontWeight: 600,
                  letterSpacing: "0.11em",
                }}
              >
                {label}
              </span>
              <span
                style={{
                  color: COLORS.black,
                  fontSize: 13,
                  fontWeight: 700,
                  letterSpacing: "0.07em",
                }}
              >
                {value}
              </span>
            </AnimatedText>
          ))}
        </div>
      </AbsoluteFill>
    </SceneShell>
  );
};

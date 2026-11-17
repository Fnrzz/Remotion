import React from "react";
import { AbsoluteFill } from "remotion";
import { AnimatedImageCard } from "../components/AnimatedImageCard";
import { AnimatedText } from "../components/AnimatedText";
import { SceneShell } from "../components/SceneShell";
import { useSceneFade } from "../components/useSceneFade";
import { COLORS } from "../theme";

type SceneProps = {
  durationInFrames: number;
};

export const ClosingScene: React.FC<SceneProps> = ({ durationInFrames }) => {
  const opacity = useSceneFade(durationInFrames, 8);

  return (
    <SceneShell index="07" label="PENUTUP" meta="MASA DEPAN" opacity={opacity}>
      <AbsoluteFill>
        <div
          style={{
            left: 72,
            position: "absolute",
            top: 226,
            width: 936,
          }}
        >
          <AnimatedText
            delay={2}
            style={{
              color: COLORS.black,
              fontSize: 100,
              fontWeight: 800,
              letterSpacing: "-0.06em",
              lineHeight: 0.96,
            }}
          >
            MASA DEPAN
          </AnimatedText>
          <AnimatedText
            delay={7}
            style={{
              color: COLORS.black,
              fontSize: 100,
              fontWeight: 800,
              letterSpacing: "-0.06em",
              lineHeight: 0.96,
            }}
          >
            INDUSTRI
          </AnimatedText>
          <AnimatedText
            delay={12}
            style={{
              color: COLORS.slate,
              fontSize: 120,
              fontWeight: 800,
              letterSpacing: "-0.06em",
              lineHeight: 0.96,
            }}
          >
            GAME?
          </AnimatedText>
        </div>

        <AnimatedText
          delay={22}
          style={{
            alignItems: "center",
            background: COLORS.white,
            border: "1px solid rgba(0,0,0,0.09)",
            borderRadius: 999,
            display: "flex",
            gap: 12,
            height: 68,
            left: 72,
            padding: "0 22px",
            position: "absolute",
            top: 576,
            width: "fit-content",
          }}
        >
          <span
            style={{
              backgroundColor: COLORS.black,
              borderRadius: 99,
              height: 7,
              width: 7,
            }}
          />
          <span
            style={{
              color: COLORS.black,
              fontFamily: "inherit",
              fontSize: 22,
              fontWeight: 700,
              letterSpacing: "0.08em",
            }}
          >
            MENURUT KAMU GIMANA?
          </span>
        </AnimatedText>

        <AnimatedImageCard
          alt="Dunia kaca berwarna yang dihasilkan Genie 4"
          caption="Dunia generatif untuk game dan film"
          credit="GOOGLE DEEPMIND"
          delay={8}
          height={480}
          imagePosition="50% 52%"
          revealDuration={16}
          src="assets/images/genie4-glass.jpg"
          style={{ left: 72, position: "absolute", top: 700 }}
          visualScale={1.25}
          width={936}
        />
      </AbsoluteFill>
    </SceneShell>
  );
};

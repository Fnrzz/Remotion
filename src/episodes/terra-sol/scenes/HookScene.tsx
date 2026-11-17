import React from "react";
import {
  interpolate,
  Sequence,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { AnimatedText } from "../../../components/AnimatedText";
import { COLORS } from "../../../theme";
import { CUES } from "../data/sceneTimings";
import { Headline, Label } from "../components/EditorialPrimitives";

const RateHook: React.FC = () => {
  const frame = useCurrentFrame();
  return (
    <>
      <Headline dark>TARIF API</Headline>
      <div style={{ left: 60, top: 370, position: "absolute", width: 1020 }}>
        <AnimatedText
          durationInFrames={9}
          delay={-2}
          distance={35}
          style={{
            fontSize: 248,
            fontWeight: 800,
            letterSpacing: "-0.07em",
            lineHeight: 1,
            color: COLORS.white,
          }}
        >
          <span
            style={{
              display: "inline-block",
              transformOrigin: "left bottom",
              scale: interpolate(frame, [0, 10], [0.96, 1], {
                extrapolateRight: "clamp",
              }),
            }}
          >
            2×
          </span>
          <br />
          <span style={{ fontSize: 155 }}>LIPAT.</span>
        </AnimatedText>
      </div>
      <Label
        style={{
          position: "absolute",
          left: 72,
          top: 1020,
          width: 980,
          color: COLORS.white,
          fontSize: 30,
        }}
      >
        Tarif token input & output API standar
        <br />
        Sol dibanding Terra • per 1 juta token
      </Label>
    </>
  );
};

const ScoreHook: React.FC = () => (
  <>
    <Headline dark size={96}>
      SELISIH CUMA
    </Headline>
    <div style={{ left: 60, top: 370, position: "absolute", width: 1020 }}>
      <AnimatedText
        durationInFrames={9}
        distance={45}
        style={{
          fontSize: 330,
          fontWeight: 800,
          letterSpacing: "-0.08em",
          lineHeight: 1,
          color: COLORS.white,
        }}
      >
        3
      </AnimatedText>
      <AnimatedText
        delay={2}
        durationInFrames={10}
        style={{
          fontSize: 124,
          fontWeight: 800,
          letterSpacing: "-0.065em",
          lineHeight: 1.1,
          color: COLORS.white,
        }}
      >
        JAWABAN?!
      </AnimatedText>
    </div>
    <Label
      style={{
        position: "absolute",
        left: 72,
        top: 1020,
        width: 980,
        color: COLORS.white,
        fontSize: 31,
      }}
    >
      DALAM SATU TES PLOTLY
      <br />
      <span style={{ color: COLORS.slate }}>43 SOAL ANALISIS DATA</span>
    </Label>
  </>
);

export const HookScene: React.FC = () => {
  const { fps } = useVideoConfig();
  return (
    <>
      <Sequence
        name="Tarif API dua kali"
        durationInFrames={Math.round(CUES.hookSecond * fps)}
      >
        <RateHook />
      </Sequence>
      <Sequence
        name="Tiga jawaban dalam satu tes Plotly"
        from={Math.round(CUES.hookSecond * fps)}
      >
        <ScoreHook />
      </Sequence>
    </>
  );
};

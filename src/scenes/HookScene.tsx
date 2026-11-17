import React from "react";
import {
  AbsoluteFill,
  Easing,
  interpolate,
  Sequence,
  useCurrentFrame,
} from "remotion";
import { AnimatedImageCard } from "../components/AnimatedImageCard";
import { SceneShell } from "../components/SceneShell";
import { HOOK_BLACK_END } from "../data/scenes";
import { FONT_FAMILY } from "../fonts";
import { COLORS } from "../theme";

type SceneProps = {
  durationInFrames: number;
};

const easeOut = (frame: number, start: number, length: number) =>
  interpolate(frame, [start, start + length], [0, 1], {
    easing: Easing.out(Easing.cubic),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

const fadeIn = (frame: number, start: number, length = 4) =>
  interpolate(frame, [start, start + length], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

const BlackHook: React.FC<{ frame: number }> = ({ frame }) => {
  const firstLine = easeOut(frame, 0, 9);
  const firstOpacity = fadeIn(frame, 0, 3);
  const secondLine = easeOut(frame, 5, 9);
  const secondOpacity = fadeIn(frame, 5, 3);
  const rule = easeOut(frame, 18, 12);
  const labelOpacity = fadeIn(frame, 2, 8);

  return (
    <AbsoluteFill
      style={{
        backgroundColor: COLORS.black,
        color: COLORS.white,
        fontFamily: FONT_FAMILY,
        overflow: "hidden",
      }}
    >
      <div
        style={{
          color: COLORS.slate,
          fontSize: 12,
          fontWeight: 700,
          left: 72,
          letterSpacing: "0.18em",
          opacity: labelOpacity,
          position: "absolute",
          top: 536,
        }}
      >
        AI GENERATIF · 2026
      </div>

      <div
        style={{
          fontSize: 150,
          fontWeight: 800,
          left: 68,
          letterSpacing: "-0.06em",
          lineHeight: 0.92,
          opacity: firstOpacity,
          position: "absolute",
          top: 592,
          transform: `translateY(${interpolate(firstLine, [0, 1], [110, 0])}px)`,
          whiteSpace: "nowrap",
        }}
      >
        GAMBAR AI?
      </div>

      <div
        style={{
          fontSize: 150,
          fontWeight: 800,
          left: 68,
          letterSpacing: "-0.06em",
          lineHeight: 0.92,
          opacity: secondOpacity,
          position: "absolute",
          top: 736,
          transform: `translateY(${interpolate(secondLine, [0, 1], [132, 0])}px)`,
          whiteSpace: "nowrap",
        }}
      >
        UDAH BIASA.
      </div>

      <div
        style={{
          backgroundColor: "rgba(255,255,255,0.18)",
          height: 1,
          left: 72,
          position: "absolute",
          top: 972,
          width: 936 * rule,
        }}
      />
    </AbsoluteFill>
  );
};

const OffWhiteHook: React.FC = () => {
  const frame = useCurrentFrame();

  const firstLine = easeOut(frame, 0, 8);
  const firstOpacity = fadeIn(frame, 0, 3);
  const secondScale = interpolate(frame, [11, 25], [0, 1], {
    easing: Easing.out(Easing.back(1.35)),
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });
  const secondOpacity = fadeIn(frame, 11, 4);
  const micro = easeOut(frame, 85, 9);
  const microOpacity = fadeIn(frame, 85, 6);

  return (
    <SceneShell index="01" label="PEMBUKA" meta="SIMULASI DUNIA" opacity={1}>
      <AbsoluteFill style={{ fontFamily: FONT_FAMILY }}>
        <div
          style={{
            left: 72,
            position: "absolute",
            top: 244,
            width: 936,
          }}
        >
          <div
            style={{
              color: COLORS.black,
              fontSize: 92,
              fontWeight: 800,
              letterSpacing: "-0.055em",
              lineHeight: 0.98,
              opacity: firstOpacity,
              transform: `translateY(${interpolate(firstLine, [0, 1], [48, 0])}px)`,
            }}
          >
            TAPI AI BISA
          </div>
          <div
            style={{
              color: COLORS.black,
              fontSize: 146,
              fontWeight: 800,
              letterSpacing: "-0.06em",
              lineHeight: 0.94,
              marginTop: 8,
              opacity: secondOpacity,
              transform: `scale(${interpolate(secondScale, [0, 1], [0.74, 1])})`,
              transformOrigin: "left center",
              whiteSpace: "nowrap",
            }}
          >
            BIKIN <span style={{ color: COLORS.slate }}>DUNIA?!</span>
          </div>
        </div>

        <div
          style={{
            alignItems: "center",
            display: "flex",
            gap: 10,
            left: 74,
            opacity: microOpacity,
            position: "absolute",
            top: 526,
            transform: `translateY(${interpolate(micro, [0, 1], [8, 0])}px)`,
          }}
        >
          <div
            style={{
              backgroundColor: COLORS.slate,
              height: 6,
              width: 6,
            }}
          />
          <div
            style={{
              color: COLORS.slate,
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: "0.16em",
            }}
          >
            DUNIA YANG BISA KAMU JELAJAHI
          </div>
        </div>

        <AnimatedImageCard
          alt="Perahu di tengah danau yang dihasilkan Genie 4"
          caption="Dunia yang bisa dimainkan"
          credit="GOOGLE DEEPMIND"
          delay={0}
          height={560}
          imagePosition="50% 50%"
          revealDuration={16}
          src="assets/images/genie4-pond.jpg"
          style={{ left: 72, position: "absolute", top: 586 }}
          visualScale={1.25}
          width={936}
        />
      </AbsoluteFill>
    </SceneShell>
  );
};

const OFF_WHITE_PREROLL = 10;

export const HookScene: React.FC<SceneProps> = ({ durationInFrames }) => {
  const frame = useCurrentFrame();
  const offWhiteStart = HOOK_BLACK_END - OFF_WHITE_PREROLL;

  return (
    <AbsoluteFill>
      <Sequence
        durationInFrames={durationInFrames - offWhiteStart}
        from={offWhiteStart}
        name="Hook — dunia"
      >
        <OffWhiteHook />
      </Sequence>
      {frame < HOOK_BLACK_END ? <BlackHook frame={frame} /> : null}
    </AbsoluteFill>
  );
};

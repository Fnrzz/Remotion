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

export const WhatScene: React.FC<SceneProps> = ({ durationInFrames }) => {
  const opacity = useSceneFade(durationInFrames);

  return (
    <SceneShell index="03" label="APA INI" meta="WAKTU NYATA" opacity={opacity}>
      <AbsoluteFill>
        <div
          style={{
            left: 72,
            position: "absolute",
            top: 230,
            width: 936,
          }}
        >
          <AnimatedText
            delay={2}
            style={{
              color: COLORS.black,
              fontSize: 95,
              fontWeight: 800,
              letterSpacing: "-0.055em",
              lineHeight: 0.98,
            }}
          >
            DUNIA VIRTUAL
          </AnimatedText>
          <AnimatedText
            delay={8}
            style={{
              color: COLORS.slate,
              fontSize: 106,
              fontWeight: 800,
              letterSpacing: "-0.055em",
              lineHeight: 0.98,
            }}
          >
            INTERAKTIF
          </AnimatedText>
        </div>

        <AnimatedText
          delay={18}
          style={{
            color: COLORS.gray,
            fontSize: 29,
            fontWeight: 500,
            left: 76,
            letterSpacing: "-0.012em",
            lineHeight: 1.48,
            maxWidth: 660,
            position: "absolute",
            top: 486,
          }}
        >
          Satu model AI yang membangun dan menjalankan dunia secara langsung.
        </AnimatedText>

        <AnimatedImageCard
          alt="Perahu di tengah danau yang dihasilkan Genie 4"
          caption="Dunia yang bisa dimainkan"
          credit="GOOGLE DEEPMIND"
          delay={8}
          height={540}
          imagePosition="50% 50%"
          src="assets/images/genie4-pond.jpg"
          style={{ left: 72, position: "absolute", top: 628 }}
          visualScale={1.24}
          visualOrigin="right top"
          width={620}
        />

        <AnimatedImageCard
          alt="Pemandangan ski orang pertama dari Genie 4"
          delay={16}
          height={300}
          imagePosition="50% 62%"
          src="assets/images/genie4-slope.jpg"
          style={{ left: 716, position: "absolute", top: 628 }}
          visualScale={1.08}
          visualOrigin="left top"
          width={292}
        />

        <div
          style={{
            background: COLORS.white,
            border: "1px solid rgba(0,0,0,0.07)",
            borderRadius: 24,
            boxShadow: "0 18px 46px rgba(0,0,0,0.08)",
            height: 280,
            left: 716,
            overflow: "hidden",
            padding: 24,
            position: "absolute",
            top: 954 + TIKTOK_VERTICAL_BALANCE.sceneOffsetY,
            width: 292,
          }}
        >
          <AnimatedText
            delay={24}
            style={{
              color: COLORS.slate,
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.14em",
            }}
          >
            MODE SIMULASI
          </AnimatedText>
          <AnimatedText
            delay={26}
            style={{
              color: COLORS.black,
              fontSize: 34,
              fontWeight: 800,
              letterSpacing: "-0.045em",
              lineHeight: 1,
              marginTop: 14,
            }}
          >
            REAL-TIME
          </AnimatedText>
          <AnimatedText
            delay={30}
            style={{
              color: COLORS.gray,
              fontSize: 19,
              fontWeight: 500,
              letterSpacing: "-0.01em",
              lineHeight: 1.4,
              marginTop: 16,
            }}
          >
            Dunia berjalan selama kamu berinteraksi.
          </AnimatedText>
          <div
            style={{
              alignItems: "center",
              borderTop: "1px solid rgba(0,0,0,0.09)",
              bottom: 22,
              display: "flex",
              justifyContent: "space-between",
              left: 24,
              paddingTop: 14,
              position: "absolute",
              right: 24,
            }}
          >
            <span
              style={{
                color: COLORS.slate,
                fontFamily: "inherit",
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: "0.09em",
              }}
            >
              TEKS
            </span>
            <span
              style={{
                backgroundColor: "rgba(0,0,0,0.14)",
                flex: 1,
                height: 1,
                marginLeft: 10,
                marginRight: 10,
              }}
            />
            <span
              style={{
                color: COLORS.black,
                fontFamily: "inherit",
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: "0.09em",
              }}
            >
              DUNIA
            </span>
          </div>
        </div>
      </AbsoluteFill>
    </SceneShell>
  );
};

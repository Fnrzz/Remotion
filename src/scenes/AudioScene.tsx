import React from "react";
import { AbsoluteFill } from "remotion";
import { AnimatedImageCard } from "../components/AnimatedImageCard";
import { AnimatedText } from "../components/AnimatedText";
import { SceneShell } from "../components/SceneShell";
import { useSceneFade } from "../components/useSceneFade";
import { WaveformGraphic } from "../components/WaveformGraphic";
import { FONT_FAMILY } from "../fonts";
import { TIKTOK_VERTICAL_BALANCE } from "../layout/tiktokSafeArea";
import { COLORS } from "../theme";

type SceneProps = {
  durationInFrames: number;
};

const audioLayers = [
  ["01", "SUASANA"],
  ["02", "MUSIK"],
  ["03", "DIALOG"],
];

export const AudioScene: React.FC<SceneProps> = ({ durationInFrames }) => {
  const opacity = useSceneFade(durationInFrames);

  return (
    <SceneShell index="05" label="SUARA" meta="AUDIO NATIF" opacity={opacity}>
      <AbsoluteFill>
        <div
          style={{
            left: 72,
            position: "absolute",
            top: 230,
            width: 650,
          }}
        >
          <AnimatedText
            delay={2}
            style={{
              color: COLORS.black,
              fontSize: 94,
              fontWeight: 800,
              letterSpacing: "-0.055em",
              lineHeight: 0.97,
            }}
          >
            SUARA DAN
          </AnimatedText>
          <AnimatedText
            delay={7}
            style={{
              color: COLORS.black,
              fontSize: 112,
              fontWeight: 800,
              letterSpacing: "-0.055em",
              lineHeight: 0.97,
            }}
          >
            DIALOG
          </AnimatedText>
          <AnimatedText
            delay={12}
            style={{
              color: COLORS.slate,
              fontSize: 112,
              fontWeight: 800,
              letterSpacing: "-0.055em",
              lineHeight: 0.97,
            }}
          >
            DARI AI
          </AnimatedText>
        </div>

        <AnimatedImageCard
          alt="Karakter memainkan saksofon di dunia Genie 4"
          caption="Suara di dalam dunia"
          delay={5}
          height={330}
          imagePosition="47% 38%"
          revealDuration={16}
          src="assets/images/genie4-character.jpg"
          style={{ left: 740, position: "absolute", top: 232 }}
          visualScale={1.2}
          visualOrigin="left top"
          width={268}
        />

        <AnimatedText
          delay={18}
          style={{
            color: COLORS.gray,
            fontSize: 28,
            fontWeight: 500,
            left: 76,
            letterSpacing: "-0.012em",
            lineHeight: 1.45,
            maxWidth: 620,
            position: "absolute",
            top: 594,
          }}
        >
          Suasana, musik, sampai dialog hadir langsung di dalam dunia yang
          dihasilkan AI.
        </AnimatedText>

        <AnimatedText
          delay={22}
          style={{
            background: COLORS.white,
            border: "1px solid rgba(0,0,0,0.07)",
            borderRadius: 24,
            boxShadow: "0 18px 52px rgba(0,0,0,0.08)",
            height: 250,
            left: 72,
            padding: 26,
            position: "absolute",
            top: 760 + TIKTOK_VERTICAL_BALANCE.sceneOffsetY,
            width: 936,
          }}
        >
          <div
            style={{
              alignItems: "center",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <div
              style={{
                color: COLORS.black,
                fontFamily: FONT_FAMILY,
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "0.14em",
              }}
            >
              GELOMBANG AUDIO
            </div>
            <div
              style={{
                alignItems: "center",
                color: COLORS.slate,
                display: "flex",
                fontFamily: FONT_FAMILY,
                fontSize: 10,
                fontWeight: 700,
                gap: 7,
                letterSpacing: "0.12em",
              }}
            >
              <span
                style={{
                  backgroundColor: COLORS.slate,
                  borderRadius: 99,
                  height: 4,
                  width: 4,
                }}
              />
              DIBUAT AI
            </div>
          </div>
          <div style={{ marginTop: 18 }}>
            <WaveformGraphic delay={26} height={120} width={884} />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: 4,
            }}
          >
            {["SUASANA", "MUSIK", "DIALOG"].map((label) => (
              <div
                key={label}
                style={{
                  color: COLORS.gray,
                  fontFamily: FONT_FAMILY,
                  fontSize: 9,
                  fontWeight: 600,
                  letterSpacing: "0.12em",
                }}
              >
                {label}
              </div>
            ))}
          </div>
        </AnimatedText>

        <AnimatedText
          delay={34}
          style={{
            background: COLORS.white,
            border: "1px solid rgba(0,0,0,0.07)",
            borderRadius: 20,
            height: 190,
            left: 72,
            padding: "22px 24px",
            position: "absolute",
            top: 1050 + TIKTOK_VERTICAL_BALANCE.sceneOffsetY,
            width: 560,
          }}
        >
          <div
            style={{
              color: COLORS.slate,
              fontFamily: FONT_FAMILY,
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: "0.14em",
            }}
          >
            CONTOH DIALOG
          </div>
          <div
            style={{
              color: COLORS.black,
              fontFamily: FONT_FAMILY,
              fontSize: 35,
              fontWeight: 600,
              letterSpacing: "-0.035em",
              lineHeight: 1.2,
              marginTop: 12,
            }}
          >
            “Halo, dunia baru.”
          </div>
          <div
            style={{
              color: COLORS.gray,
              fontFamily: FONT_FAMILY,
              fontSize: 16,
              fontWeight: 500,
              marginTop: 8,
            }}
          >
            Dihasilkan langsung oleh model.
          </div>
        </AnimatedText>

        <AnimatedText
          delay={38}
          style={{
            border: "1px solid rgba(0,0,0,0.08)",
            borderRadius: 20,
            height: 190,
            left: 660,
            padding: "22px 24px",
            position: "absolute",
            top: 1050 + TIKTOK_VERTICAL_BALANCE.sceneOffsetY,
            width: 348,
          }}
        >
          <div
            style={{
              color: COLORS.black,
              fontFamily: FONT_FAMILY,
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: "0.14em",
            }}
          >
            LAPISAN AUDIO
          </div>
          <div style={{ marginTop: 10 }}>
            {audioLayers.map(([index, label]) => (
              <div
                key={label}
                style={{
                  alignItems: "center",
                  borderTop: "1px solid rgba(0,0,0,0.08)",
                  display: "flex",
                  gap: 12,
                  padding: "9px 0",
                }}
              >
                <span
                  style={{
                    color: COLORS.slate,
                    fontFamily: FONT_FAMILY,
                    fontSize: 9,
                    fontWeight: 600,
                  }}
                >
                  {index}
                </span>
                <span
                  style={{
                    color: COLORS.gray,
                    fontFamily: FONT_FAMILY,
                    fontSize: 12,
                    fontWeight: 600,
                    letterSpacing: "0.08em",
                  }}
                >
                  {label}
                </span>
              </div>
            ))}
          </div>
        </AnimatedText>
      </AbsoluteFill>
    </SceneShell>
  );
};

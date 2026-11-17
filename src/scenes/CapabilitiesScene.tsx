import React from "react";
import { AbsoluteFill, Sequence } from "remotion";
import { AnimatedImageCard } from "../components/AnimatedImageCard";
import { AnimatedText } from "../components/AnimatedText";
import { SceneShell } from "../components/SceneShell";
import { useSceneFade } from "../components/useSceneFade";
import { CAPABILITIES, type Capability } from "../data/scenes";
import { FONT_FAMILY } from "../fonts";
import { TIKTOK_VERTICAL_BALANCE } from "../layout/tiktokSafeArea";
import { COLORS } from "../theme";

type SceneProps = {
  durationInFrames: number;
};

const CapabilityShot: React.FC<{
  cap: Capability;
  durationInFrames: number;
  index: number;
}> = ({ cap, durationInFrames, index }) => {
  const opacity = useSceneFade(durationInFrames, 4);
  const fast = durationInFrames < 60;

  return (
    <AbsoluteFill style={{ opacity }}>
      <div
        style={{
          left: 72,
          position: "absolute",
          top: 246,
          width: 424,
        }}
      >
        <AnimatedText
          delay={fast ? 0 : 1}
          durationInFrames={fast ? 12 : 26}
          style={{
            color: COLORS.slate,
            fontSize: 13,
            fontWeight: 700,
            letterSpacing: "0.16em",
          }}
        >
          {cap.index} — KEMAMPUAN
        </AnimatedText>

        <div style={{ marginTop: 22 }}>
          {cap.title.map((line, lineIndex) => (
            <AnimatedText
              delay={fast ? 1 + lineIndex * 2 : 3 + lineIndex * 4}
              durationInFrames={fast ? 12 : 26}
              key={line}
              style={{
                color: lineIndex === 0 ? COLORS.black : COLORS.slate,
                fontSize: cap.titleSizes[lineIndex],
                fontWeight: 800,
                letterSpacing: "-0.055em",
                lineHeight: 0.97,
              }}
            >
              {line}
            </AnimatedText>
          ))}
        </div>

        <AnimatedText
          delay={fast ? 2 : 6}
          durationInFrames={fast ? 12 : 26}
          style={{
            color: COLORS.gray,
            fontSize: 28,
            fontWeight: 500,
            letterSpacing: "-0.012em",
            lineHeight: 1.45,
            marginTop: 34,
            maxWidth: 408,
          }}
        >
          {cap.body}
        </AnimatedText>

        <div
          style={{
            background: COLORS.white,
            border: "1px solid rgba(0,0,0,0.07)",
            borderRadius: 18,
            boxShadow: "0 14px 34px rgba(0,0,0,0.07)",
            marginTop: 32,
            padding: "18px 20px 20px",
            width: 420,
          }}
        >
          <AnimatedText
            delay={fast ? 3 : 7}
            durationInFrames={fast ? 12 : 26}
            style={{
              alignItems: "center",
              color: COLORS.slate,
              display: "flex",
              fontFamily: FONT_FAMILY,
              fontSize: 11,
              fontWeight: 700,
              gap: 8,
              letterSpacing: "0.13em",
            }}
          >
            <span
              style={{
                backgroundColor: COLORS.slate,
                borderRadius: 99,
                height: 5,
                width: 5,
              }}
            />
            PERINTAH TEKS
          </AnimatedText>
          <AnimatedText
            delay={fast ? 4 : 9}
            durationInFrames={fast ? 12 : 26}
            style={{
              color: COLORS.black,
              fontFamily: FONT_FAMILY,
              fontSize: 23,
              fontWeight: 600,
              letterSpacing: "-0.02em",
              lineHeight: 1.35,
              marginTop: 11,
            }}
          >
            “{cap.prompt}”
          </AnimatedText>
        </div>

        <div
          style={{
            left: 0,
            position: "absolute",
            top: 800 + TIKTOK_VERTICAL_BALANCE.sceneOffsetY,
            width: 420,
          }}
        >
          <div
            style={{
              backgroundColor: "rgba(0,0,0,0.1)",
              height: 1,
              marginBottom: 18,
              width: "100%",
            }}
          />
          {CAPABILITIES.map((item) => {
            const isActive = item.id === cap.id;
            return (
              <div
                key={item.id}
                style={{
                  alignItems: "center",
                  display: "flex",
                  gap: 10,
                  marginBottom: 12,
                  opacity: isActive ? 1 : 0.38,
                }}
              >
                <div
                  style={{
                    backgroundColor: isActive ? COLORS.black : COLORS.slate,
                    borderRadius: 99,
                    height: 5,
                    width: 5,
                  }}
                />
                <div
                  style={{
                    color: isActive ? COLORS.black : COLORS.gray,
                    fontFamily: FONT_FAMILY,
                    fontSize: 12,
                    fontWeight: isActive ? 700 : 500,
                    letterSpacing: "0.1em",
                  }}
                >
                  {item.index} · {item.title[1]}
                </div>
                {isActive ? (
                  <div
                    style={{
                      backgroundColor: "rgba(0,0,0,0.14)",
                      flex: 1,
                      height: 1,
                      marginLeft: 4,
                    }}
                  />
                ) : null}
              </div>
            );
          })}
        </div>
      </div>

      <AnimatedImageCard
        alt={`Contoh kemampuan Genie 4: ${cap.title.join(" ")}`}
        credit="GOOGLE DEEPMIND"
        delay={fast ? 0 : 3}
        height={840}
        imagePosition={cap.imagePosition}
        revealDuration={fast ? 10 : 18}
        src={cap.image}
        style={{ left: 552, position: "absolute", top: 244 }}
        visualScale={1.25}
        visualOrigin="left top"
        width={456}
      >
        <div
          style={{
            alignItems: "center",
            background: "rgba(0,0,0,0.3)",
            border: "1px solid rgba(255,255,255,0.28)",
            borderRadius: "50%",
            color: COLORS.white,
            display: "flex",
            fontFamily: FONT_FAMILY,
            fontSize: 11,
            fontWeight: 700,
            height: 34,
            justifyContent: "center",
            letterSpacing: "0.06em",
            position: "absolute",
            right: 16,
            top: 16,
            width: 34,
          }}
        >
          {index + 1}
        </div>
        <div
          style={{
            background: "rgba(255,255,255,0.94)",
            border: "1px solid rgba(255,255,255,0.4)",
            borderRadius: 11,
            bottom: 52,
            left: 18,
            padding: "10px 13px",
            position: "absolute",
          }}
        >
          <div
            style={{
              color: COLORS.gray,
              fontFamily: FONT_FAMILY,
              fontSize: 9,
              fontWeight: 700,
              letterSpacing: "0.13em",
            }}
          >
            {cap.overlayLabel}
          </div>
          <div
            style={{
              color: COLORS.black,
              fontFamily: FONT_FAMILY,
              fontSize: 24,
              fontWeight: 800,
              letterSpacing: "-0.03em",
              lineHeight: 1.1,
              marginTop: 3,
            }}
          >
            {cap.overlayValue}
          </div>
        </div>
      </AnimatedImageCard>
    </AbsoluteFill>
  );
};

export const CapabilitiesScene: React.FC<SceneProps> = ({
  durationInFrames,
}) => {
  const opacity = useSceneFade(durationInFrames);

  return (
    <SceneShell
      index="04"
      label="KEMAMPUAN"
      meta="PERINTAH TEKS"
      opacity={opacity}
    >
      {CAPABILITIES.map((cap, index) => (
        <Sequence
          durationInFrames={cap.durationInFrames}
          from={cap.from - 424}
          key={cap.id}
          name={`Kemampuan — ${cap.title.join(" ")}`}
        >
          <CapabilityShot
            cap={cap}
            durationInFrames={cap.durationInFrames}
            index={index}
          />
        </Sequence>
      ))}
    </SceneShell>
  );
};

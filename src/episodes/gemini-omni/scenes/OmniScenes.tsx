import React from "react";
import {
  AbsoluteFill,
  Easing,
  Img,
  Interactive,
  interpolate,
  Sequence,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { OMNI, smooth } from "../config";
import { AnimatedPriceBars } from "../components/AnimatedPriceBars";
import { ChatInstructionBubble } from "../components/ChatInstructionBubble";
import { ClosingQuestionMotion } from "../components/ClosingQuestionMotion";
import { ProceduralLandscape } from "../components/ProceduralLandscape";
import { VideoTimeline } from "../components/VideoTimeline";

const Canvas: React.FC<{ dark?: boolean; children: React.ReactNode }> = ({
  dark,
  children,
}) => (
  <AbsoluteFill
    style={{
      backgroundColor: dark ? OMNI.colors.black : OMNI.colors.paper,
      color: dark ? OMNI.colors.white : OMNI.colors.black,
    }}
  >
    {children}
  </AbsoluteFill>
);

const Disclosure: React.FC<{ children?: React.ReactNode }> = ({
  children = "ILUSTRASI FITUR · BUKAN OUTPUT GEMINI",
}) => (
  <div
    style={{
      position: "absolute",
      left: 84,
      top: 1318,
      fontSize: 23,
      fontWeight: 500,
      color: "#708090",
      letterSpacing: "0.015em",
    }}
  >
    {children}
  </div>
);

export const HookScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const extension = interpolate(t, [1.25, 2.25], [0, 1], smooth);
  return (
    <Canvas dark>
      <Interactive.Div
        name="Durasi bertambah, bukan judul paragraf"
        style={{
          position: "absolute",
          left: 84,
          top: 250,
          fontSize: 206,
          fontWeight: 800,
          letterSpacing: "-0.075em",
          lineHeight: 1,
          opacity: interpolate(frame, [0, 0.25 * fps], [0, 1], smooth),
        }}
      >
        {t < 1.68 ? "10s" : "15s"}
      </Interactive.Div>
      <div
        style={{
          position: "absolute",
          left: 84,
          top: 720,
          transformOrigin: "center",
          scale: interpolate(frame, [0, 0.7 * fps], [0.94, 1], smooth),
          transform: `perspective(1400px) rotateX(${interpolate(t, [0, 0.8], [26, 0], smooth)}deg)`,
        }}
      >
        <VideoTimeline
          dark
          extension={extension}
          playhead={interpolate(
            t,
            [0, 1.25, 2.3, 3.88],
            [0, 0.98, 0.68, 0.99],
            { extrapolateRight: "clamp", easing: Easing.inOut(Easing.cubic) },
          )}
        />
      </div>
      <div
        style={{
          position: "absolute",
          left: 84,
          top: 1240,
          fontSize: 25,
          color: "#708090",
        }}
      >
        PADA MODE YANG MENDUKUNG
      </div>
    </Canvas>
  );
};

export const ProductRevealScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const collapse = interpolate(t, [0, 0.85], [0, 1], smooth);
  return (
    <Canvas>
      <Interactive.Div
        name="Product reveal singkat"
        style={{
          position: "absolute",
          left: 84,
          top: 240,
          fontSize: 98,
          lineHeight: 1.07,
          fontWeight: 800,
          letterSpacing: "-0.055em",
          opacity: interpolate(
            frame,
            [0.3 * fps, 0.7 * fps, 3.4 * fps, 4.04 * fps],
            [0, 1, 1, 0],
            smooth,
          ),
        }}
      >
        GEMINI OMNI
        <br />
        <span style={{ color: "#708090" }}>1.2 FLASH</span>
      </Interactive.Div>
      <div
        style={{
          position: "absolute",
          left: 84,
          top: 720,
          opacity: interpolate(t, [0.9, 1.4], [1, 0], smooth),
        }}
      >
        <VideoTimeline extension={1} playhead={0.99} collapse={collapse} />
      </div>
      <Img
        name="Gambar pengumuman resmi Gemini Omni 1.2 Flash"
        alt="Logo dan nama Gemini Omni 1.2 Flash pada gambar pengumuman resmi Google"
        src={staticFile(
          "assets/images/gemini-omni/google-gemini-omni-1.2-flash.png",
        )}
        style={{
          position: "absolute",
          left: 84,
          top: 720,
          width: 912,
          height: 513,
          objectFit: "contain",
          opacity: interpolate(frame, [0.85 * fps, 1.35 * fps], [0, 1], smooth),
          scale: interpolate(frame, [0.85 * fps, 1.7 * fps], [0.97, 1], smooth),
        }}
      />
    </Canvas>
  );
};

export const TimelineExtensionScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const extension = interpolate(t, [3.75, 5.35], [0, 1], smooth);
  return (
    <Canvas>
      <div
        style={{
          position: "absolute",
          left: 84,
          top: 250,
          fontSize: 190,
          fontWeight: 800,
          letterSpacing: "-0.075em",
          lineHeight: 1,
        }}
      >
        {t < 4.99 ? "10s" : "15s"}
      </div>
      <div
        style={{
          position: "absolute",
          left: 92,
          top: 480,
          fontSize: 28,
          fontWeight: 600,
          color: "#708090",
        }}
      >
        {t < 4.99 ? "Omni 1.1 Flash" : "Omni 1.2 Flash"}
      </div>
      <div style={{ position: "absolute", left: 84, top: 720 }}>
        <VideoTimeline
          extension={extension}
          playhead={interpolate(
            t,
            [0, 2.5, 3.7, 5.5, 6.24],
            [0.1, 1, 1, 0.68, 0.88],
            { extrapolateRight: "clamp" },
          )}
        />
      </div>
      <Disclosure>PADA MODE YANG MENDUKUNG · ILUSTRASI</Disclosure>
    </Canvas>
  );
};

export const ConversationalEditScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const night = interpolate(t, [4.4, 7.6], [0, 1], {
    ...smooth,
    easing: Easing.inOut(Easing.cubic),
  });
  const split = interpolate(
    t,
    [8.35, 9.1, 9.65, 10.4],
    [0, 0.5, 0.5, 0],
    smooth,
  );
  return (
    <Canvas>
      <Interactive.Div
        name="Label editing ringkas"
        style={{
          position: "absolute",
          left: 84,
          top: 270,
          fontSize: 56,
          fontWeight: 800,
          letterSpacing: "-0.04em",
        }}
      >
        EDIT LEWAT CHAT
      </Interactive.Div>
      <div style={{ position: "absolute", left: 544, top: 440 }}>
        <ChatInstructionBubble time={t} />
      </div>
      <div
        style={{
          position: "absolute",
          left: 84,
          top: 660,
          width: 912,
          height: 560,
          scale: 0.97 + spring({ frame, fps, config: { damping: 200 } }) * 0.03,
        }}
      >
        <ProceduralLandscape
          night={night}
          pan={interpolate(t, [0, 8], [-0.6, 0.6], smooth)}
          id="main-night"
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            clipPath: `inset(0 ${(1 - split) * 100}% 0 0)`,
          }}
        >
          <ProceduralLandscape
            night={0}
            pan={interpolate(t, [0, 8], [-0.6, 0.6], smooth)}
            id="before-day"
          />
        </div>
        <div
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            left: `${split * 100}%`,
            width: 3,
            backgroundColor: "#FAF9F6",
            opacity: split > 0 ? 1 : 0,
          }}
        />
        <svg
          width="912"
          height="560"
          style={{ position: "absolute", inset: 0, opacity: split > 0 ? 1 : 0 }}
        >
          <circle cx={912 * split} cy="280" r="23" fill="#FAF9F6" />
          <path
            d={`M${912 * split - 9} 274v12m18-12v12`}
            stroke="#000000"
            strokeWidth="3"
          />
        </svg>
      </div>
      <Disclosure />
    </Canvas>
  );
};

export const ConsistencyScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <Canvas>
      <div
        style={{
          position: "absolute",
          left: 84,
          top: 265,
          fontSize: 50,
          fontWeight: 800,
          letterSpacing: "-0.04em",
        }}
      >
        KONSISTENSI VISUAL
      </div>
      <div
        style={{
          position: "absolute",
          left: 84,
          top: 350,
          fontSize: 26,
          color: "#708090",
          fontWeight: 600,
        }}
      >
        MENURUT GOOGLE
      </div>
      <div
        style={{
          position: "absolute",
          left: 84,
          top: 660,
          width: 912,
          height: 513,
          scale: interpolate(frame, [0, 0.6 * fps], [0.985, 1], smooth),
        }}
      >
        <Img
          name="Demo resmi Google — referensi dan hasil tampak depan"
          alt="Cuplikan demo virtual try-on Google: foto referensi model, tiga pakaian, dan hasil Omni 1.2 Flash dengan mantel tampak depan"
          src={staticFile("assets/images/gemini-omni/google-tryon-front.jpg")}
          style={{
            position: "absolute",
            inset: 0,
            width: 912,
            height: 513,
            objectFit: "contain",
          }}
        />
        <Img
          name="Demo resmi Google — sudut belakang dengan referensi sama"
          alt="Cuplikan lanjutan demo Google: referensi yang sama dan hasil model dengan mantel dari sudut belakang"
          src={staticFile("assets/images/gemini-omni/google-tryon-back.jpg")}
          style={{
            position: "absolute",
            inset: 0,
            width: 912,
            height: 513,
            objectFit: "contain",
            opacity: interpolate(frame, [2.7 * fps, 3.2 * fps], [0, 1], smooth),
          }}
        />
      </div>
      <Disclosure>DEMO RESMI GOOGLE · BUKAN UJI PROF DEPS</Disclosure>
    </Canvas>
  );
};

export const PricingScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <Canvas>
      <Interactive.Div
        name="Penurunan relatif 30 persen"
        style={{
          position: "absolute",
          left: 84,
          top: 240,
          fontSize: 180,
          lineHeight: 1,
          fontWeight: 800,
          letterSpacing: "-0.075em",
          opacity: interpolate(frame, [3.65 * fps, 4.04 * fps], [0, 1], smooth),
        }}
      >
        −30%
      </Interactive.Div>
      <div style={{ position: "absolute", left: 84, top: 610 }}>
        <AnimatedPriceBars time={frame / fps} />
      </div>
    </Canvas>
  );
};

export const ClosingScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const cta = interpolate(t, [5.68, 6.15], [0, 1], smooth);
  return (
    <Canvas>
      <div
        style={{
          position: "absolute",
          left: 84,
          top: 250,
          width: 912,
          opacity: 1 - cta,
        }}
      >
        <svg width="110" height="100" viewBox="0 0 110 100">
          <path
            d="M55 7 103 89H7Z"
            fill="none"
            stroke="#708090"
            strokeWidth="4"
          />
          <path d="M55 35v24m0 10v5" stroke="#000000" strokeWidth="5" />
        </svg>
        <div
          style={{
            fontSize: 50,
            fontWeight: 800,
            letterSpacing: "-0.04em",
            marginTop: 32,
          }}
        >
          BERGANTUNG MODE
        </div>
        <div style={{ fontSize: 28, color: "#555555", marginTop: 22 }}>
          Durasi & akses fitur berbeda antarlayanan.
        </div>
      </div>
      <Interactive.Div
        name="Pertanyaan akhir"
        style={{
          position: "absolute",
          left: 84,
          top: 240,
          width: 912,
          fontSize: 88,
          fontWeight: 800,
          letterSpacing: "-0.05em",
          lineHeight: 1.12,
          opacity: cta,
        }}
      >
        15 DETIK
        <br />
        <span style={{ color: "#708090" }}>
          ATAU EDIT
          <br />
          LEWAT CHAT?
        </span>
      </Interactive.Div>
      <div
        style={{
          position: "absolute",
          left: 84,
          top: 760,
          width: 912,
          height: 540,
        }}
      >
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 86,
            width: 912,
            opacity: 1 - cta,
          }}
        >
          <VideoTimeline
            extension={1}
            playhead={interpolate(t, [0, 5.6], [0.1, 0.95], smooth)}
          />
        </div>
        <Sequence
          name="Motion pertanyaan — durasi atau edit lewat chat"
          from={Math.round(5.68 * fps)}
          layout="none"
        >
          <ClosingQuestionMotion />
        </Sequence>
      </div>
      <div
        style={{
          position: "absolute",
          left: 84,
          top: 1318,
          fontSize: 23,
          color: "#708090",
          opacity: cta,
        }}
      >
        ILUSTRASI FITUR
      </div>
    </Canvas>
  );
};

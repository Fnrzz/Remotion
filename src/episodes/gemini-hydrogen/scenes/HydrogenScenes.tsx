import React from "react";
import {
  Easing,
  Interactive,
  interpolate,
  Sequence,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { Canvas, ContentStage } from "../../kronos/components/Editorial";
import { HYDROGEN_DATA as D } from "../data/editorial";
import {
  BenchmarkComparison,
  Efficiency,
  RepositoryWorkflow,
  ScoreHook,
  TokenPriceFlow,
  VisualChoice,
} from "../components/Visuals";
import { Orchestration } from "../components/Orchestration";

const Heading: React.FC<{
  children: React.ReactNode;
  note?: string;
  size?: number;
}> = ({ children, note, size = 104 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <div style={{ position: "absolute", left: 84, top: 240, width: 912 }}>
      <Interactive.Div
        name="Judul editorial Hydrogen"
        data-hydrogen-headline
        style={{
          fontSize: size,
          fontWeight: 800,
          lineHeight: 1.04,
          letterSpacing: "-0.045em",
          translate: interpolate(
            frame,
            [0, 0.45 * fps],
            ["0px 30px", "0px 0px"],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.bezier(0.16, 1, 0.3, 1),
            },
          ),
        }}
      >
        {children}
      </Interactive.Div>
      {note ? (
        <div
          style={{
            marginTop: 32,
            fontSize: 28,
            fontWeight: 700,
            lineHeight: 1.4,
          }}
        >
          {note}
        </div>
      ) : null}
    </div>
  );
};

export const HookScene: React.FC = () => (
  <Canvas dark>
    <Heading>
      SELISIH
      <br />
      <span style={{ color: "#708090" }}>SATU POIN.</span>
    </Heading>
    <ContentStage>
      <ScoreHook />
    </ContentStage>
  </Canvas>
);

export const RevealScene: React.FC = () => (
  <Canvas>
    <Heading note={D.launchDate}>
      GEMINI 4<br />
      <span style={{ color: "#708090" }}>HYDROGEN.</span>
    </Heading>
    <ContentStage>
      <RepositoryWorkflow />
    </ContentStage>
  </Canvas>
);

export const BenchmarkScene: React.FC = () => (
  <Canvas>
    <Heading>
      51 VS 50.
      <br />
      <span style={{ color: "#708090" }}>SATU INDEKS.</span>
    </Heading>
    <ContentStage>
      <BenchmarkComparison />
    </ContentStage>
  </Canvas>
);

const AudioDrivenOrchestration: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  // Nonuniform phases follow ASR anchors: name → switch → Carbon → Hydrogen → verification.
  const phase = interpolate(
    frame / fps,
    [0, 2.87, 4.73, 6.37, 8.11, 9.43, 10.24, 11.1],
    [0, 1, 1.65, 2, 3, 4, 5, 6],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  return <Orchestration phase={phase} />;
};

export const OrchestratorScene: React.FC = () => (
  <Canvas>
    <Heading note="GOOGLE ANTIGRAVITY" size={92}>
      ORCHESTRATOR.
      <br />
      <span style={{ color: "#708090" }}>SATU ALUR.</span>
    </Heading>
    <ContentStage>
      <AudioDrivenOrchestration />
    </ContentStage>
  </Canvas>
);

export const EfficiencyPricingScene: React.FC = () => {
  const { fps } = useVideoConfig();
  return (
    <Canvas>
      <Sequence
        name="05A — Evaluasi Orchestrator: waktu dan kuota, bukan biaya"
        durationInFrames={Math.round(48.44 * fps) - Math.round(39.68 * fps)}
      >
        <Heading size={92}>
          EFISIENSI
          <br />
          <span style={{ color: "#708090" }}>ORCHESTRATOR.</span>
        </Heading>
        <ContentStage>
          <Efficiency />
        </ContentStage>
      </Sequence>
      <Sequence
        name="05B — Standard API: dua aliran token"
        from={Math.round(48.44 * fps) - Math.round(39.68 * fps)}
      >
        <Heading>
          ALIRAN TOKEN.
          <br />
          <span style={{ color: "#708090" }}>TARIF API.</span>
        </Heading>
        <ContentStage>
          <TokenPriceFlow />
        </ContentStage>
      </Sequence>
    </Canvas>
  );
};

export const ClosingScene: React.FC = () => (
  <Canvas>
    <Heading size={112}>
      SATU AI
      <br />
      <span style={{ color: "#708090" }}>ATAU TIM AI?</span>
    </Heading>
    <ContentStage>
      <VisualChoice />
    </ContentStage>
  </Canvas>
);

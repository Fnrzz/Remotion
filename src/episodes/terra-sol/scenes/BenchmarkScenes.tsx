import React from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import {
  BenchmarkCard,
  EditorialCard,
  Headline,
  Label,
  BODY_TOP,
} from "../components/EditorialPrimitives";
import { CUES } from "../data/sceneTimings";
import { COLORS } from "../../../theme";

const BenchmarkHeader: React.FC<{ settled?: boolean }> = ({
  settled = false,
}) => (
  <>
    <Headline settled={settled}>
      TES ANALISIS
      <br />
      <span style={{ color: COLORS.slate }}>DATA</span>
    </Headline>
    <Label
      style={{
        position: "absolute",
        left: 72,
        top: 480,
        fontWeight: 700,
        fontSize: 35,
        color: COLORS.black,
      }}
    >
      SUMBER: PLOTLY
    </Label>
    <Label style={{ position: "absolute", left: 72, top: 539, fontSize: 28 }}>
      Satu evaluasi DataAnalyticsBench
    </Label>
  </>
);

export const TerraBenchmarkScene: React.FC = () => {
  const { fps } = useVideoConfig();
  return (
    <>
      <BenchmarkHeader />
      <BenchmarkCard
        model="TERRA"
        score={40}
        revealAt={(CUES.terraScore - CUES.terraBenchmark) * fps}
      />
    </>
  );
};

const ComparisonResult: React.FC = () => (
  <EditorialCard height={660}>
    <div style={{ padding: "45px 45px" }}>
      <div style={{ display: "flex", gap: 38 }}>
        <div style={{ flex: 1 }}>
          <Label style={{ fontSize: 32, fontWeight: 700, color: COLORS.black }}>
            TERRA
          </Label>
          <div
            style={{
              fontSize: 118,
              fontWeight: 800,
              letterSpacing: "-0.07em",
              marginTop: 26,
            }}
          >
            40<span style={{ color: COLORS.slate }}>/43</span>
          </div>
        </div>
        <div style={{ width: 1, background: "rgba(112,128,144,0.22)" }} />
        <div style={{ flex: 1 }}>
          <Label style={{ fontSize: 32, fontWeight: 700, color: COLORS.black }}>
            SOL
          </Label>
          <div
            style={{
              fontSize: 118,
              fontWeight: 800,
              letterSpacing: "-0.07em",
              marginTop: 26,
            }}
          >
            43<span style={{ color: COLORS.slate }}>/43</span>
          </div>
        </div>
      </div>
      <div
        style={{
          marginTop: 50,
          borderTop: "1px solid rgba(112,128,144,0.22)",
          paddingTop: 38,
        }}
      >
        <div
          style={{ fontSize: 61, fontWeight: 800, letterSpacing: "-0.05em" }}
        >
          SELISIH 3 JAWABAN
        </div>
        <Label style={{ fontSize: 26, marginTop: 23 }}>
          PLOTLY • 43 SOAL ANALISIS DATA
        </Label>
      </div>
    </div>
  </EditorialCard>
);

export const SolBenchmarkScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const compareAt = (CUES.comparison - CUES.solBenchmark) * fps;
  return (
    <>
      <BenchmarkHeader settled />
      {frame < 8 ? (
        <div
          style={{
            opacity: interpolate(frame, [0, 8], [1, 0], {
              extrapolateRight: "clamp",
            }),
          }}
        >
          <BenchmarkCard model="TERRA" score={40} revealAt={-30} settled />
        </div>
      ) : null}
      <div
        style={{
          opacity:
            interpolate(frame, [0, 8], [0, 1], { extrapolateRight: "clamp" }) *
            interpolate(frame, [compareAt, compareAt + 8], [1, 0], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
        }}
      >
        <BenchmarkCard
          model="SOL"
          settled
          score={43}
          revealAt={(CUES.solScore - CUES.solBenchmark) * fps}
        />
      </div>
      {frame >= compareAt ? (
        <div
          style={{
            opacity: interpolate(frame, [compareAt, compareAt + 8], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          <ComparisonResult />
        </div>
      ) : null}
      <Label
        style={{
          position: "absolute",
          top: BODY_TOP + 694,
          left: 72,
          width: 990,
          fontSize: 26,
        }}
      >
        Soal privat • data energi angin sintetis
      </Label>
    </>
  );
};

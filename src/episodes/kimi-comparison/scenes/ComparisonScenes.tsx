import React from "react";
import {
  Interactive,
  interpolate,
  Sequence,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { BENCHMARKS } from "../data/editorial";
import timing from "../data/timing.json";
import {
  AnimatedHeadline,
  Canvas,
  ContentStage,
  RatioReveal,
} from "../components/Editorial";
import {
  BenchmarkTransition,
  ModelComparisonCard,
  PricingComparison,
  SourceLabel,
} from "../components/ComparisonGraphics";
import { ComparisonLinks, DecisionDiagram } from "../components/MotionDiagrams";

export const HookScene: React.FC = () => {
  const { fps } = useVideoConfig();
  return (
    <Canvas dark>
      <Sequence
        name="Harga AI coding"
        durationInFrames={Math.round(timing.question * fps)}
      >
        <AnimatedHeadline supporting="KAVDRA STUDIO" size={112}>
          HARGA AI
          <br />
          CODING
        </AnimatedHeadline>
      </Sequence>
      <Sequence
        name="Pertanyaan performa"
        from={Math.round(timing.question * fps)}
      >
        <AnimatedHeadline
          supporting="TARIF TOKEN ≠ HASIL SETIAP TES"
          size={100}
        >
          PERFORMANYA
          <br />
          GIMANA?
        </AnimatedHeadline>
      </Sequence>
      <ContentStage>
        <Sequence
          name="Tarif beda lima kali"
          layout="none"
          from={Math.round(timing.fiveTimes * fps)}
        >
          <RatioReveal />
        </Sequence>
      </ContentStage>
    </Canvas>
  );
};

export const ModelRevealScene: React.FC = () => {
  const { fps } = useVideoConfig();
  return (
    <Canvas>
      <AnimatedHeadline supporting="HARGA TOKEN / HASIL BENCHMARK" size={102}>
        TIGA MODEL.
        <br />
        <span style={{ color: "#708090" }}>DUA SUDUT</span>
        <br />
        PANDANG.
      </AnimatedHeadline>
      <ContentStage>
        <ModelComparisonCard
          index={0}
          delay={timing.kimiName - timing.models}
        />
        <ModelComparisonCard
          index={1}
          delay={timing.opusName - timing.models}
        />
        <ModelComparisonCard
          index={2}
          delay={timing.astraName - timing.models}
        />
        <Sequence
          name="Logo terhubung ke harga dan benchmark"
          layout="none"
          from={Math.round((timing.astraName - timing.models + 0.45) * fps)}
        >
          <div style={{ position: "absolute", left: 0, top: 310 }}>
            <ComparisonLinks />
          </div>
        </Sequence>
        <Interactive.Div
          name="Tidak ada peringkat universal"
          data-kimi-focus
          style={{
            position: "absolute",
            top: 397,
            width: 636,
            fontSize: 19,
            lineHeight: 1.5,
            fontWeight: 700,
          }}
        >
          BUKAN SATU PERINGKAT UNTUK SEMUA TUGAS.
        </Interactive.Div>
      </ContentStage>
    </Canvas>
  );
};

export const PricingScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const bridge =
    frame >= Math.round((timing.benchmarkBridge - timing.pricing) * fps);
  return (
    <Canvas>
      <AnimatedHeadline
        supporting="TARIF STANDAR / 1 JUTA TOKEN · USD"
        size={100}
      >
        {bridge ? (
          <>
            HARGA ≠<br />
            <span style={{ color: "#708090" }}>PERFORMA.</span>
          </>
        ) : (
          <>
            BERAPA HARGA
            <br />
            API-NYA?
          </>
        )}
      </AnimatedHeadline>
      <ContentStage>
        <PricingComparison
          inputAt={[
            timing.kimiInput - timing.pricing,
            timing.opusInput - timing.pricing,
            timing.astraInput - timing.pricing,
          ]}
          outputAt={[
            timing.kimiOutput - timing.pricing,
            timing.opusOutput - timing.pricing,
            timing.astraOutput - timing.pricing,
          ]}
          barsAt={timing.astraOutput - timing.pricing + 0.3}
        />
      </ContentStage>
    </Canvas>
  );
};

const BenchmarkHeader: React.FC<{ terminal?: boolean }> = ({
  terminal = false,
}) => (
  <>
    <AnimatedHeadline
      supporting={
        terminal
          ? "SKALA TETAP 0–100 · URUTAN MODEL TETAP"
          : "LONG-HORIZON · SKALA 0–100"
      }
      size={100}
    >
      {terminal ? (
        <>
          TERMINAL-
          <br />
          BENCH 4.0
        </>
      ) : (
        <>
          KIMI CODE
          <br />
          BENCH 3.0
        </>
      )}
    </AnimatedHeadline>
    <div style={{ position: "absolute", left: 84, top: 568, width: 912 }}>
      <SourceLabel>
        {terminal ? BENCHMARKS.terminal.source : BENCHMARKS.code.source}
      </SourceLabel>
    </div>
  </>
);

export const BenchmarksScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const changeAt = timing.terminal - timing.code;
  const terminal = frame >= Math.round(changeAt * fps);
  const caution =
    frame >= Math.round((timing.configuration - timing.code) * fps);
  const transitioning = terminal && frame < (changeAt + 0.65) * fps;
  return (
    <Canvas>
      <Sequence
        name="04 — Kimi Code Bench 3.0 — tes internal"
        durationInFrames={Math.round(changeAt * fps)}
      >
        <BenchmarkHeader />
      </Sequence>
      <Sequence
        name="05 — Terminal-Bench 4.0 — angka dihimpun Moonshot"
        from={Math.round(changeAt * fps)}
      >
        <BenchmarkHeader terminal />
      </Sequence>
      <ContentStage>
        <BenchmarkTransition
          revealAt={timing.codeAstra - timing.code - 0.7}
          changeAt={changeAt}
          codeLabelsAt={[
            timing.codeKimi - timing.code,
            timing.codeOpus - timing.code,
            timing.codeAstra - timing.code,
          ]}
          terminalLabelsAt={[
            timing.terminalKimi - timing.code,
            timing.terminalOpus - timing.code,
            timing.terminalAstra - timing.code,
          ]}
        />
        <div
          style={{
            position: "absolute",
            top: 353,
            right: 0,
            textAlign: "right",
            fontSize: 16,
            fontWeight: 700,
            color: "#555555",
          }}
        >
          {transitioning
            ? "TRANSISI ANTAR TES"
            : terminal && frame >= (timing.terminalKimi - timing.code) * fps
              ? "KIMI–OPUS: SELISIH 0,7 POIN"
              : "BUKAN AKURASI CODING UMUM"}
        </div>
        <Interactive.Div
          name="Kualifikasi metodologi benchmark"
          data-kimi-focus
          data-methodology
          style={{
            position: "absolute",
            top: 398,
            width: 636,
            fontSize: 17,
            fontWeight: caution ? 800 : 600,
            lineHeight: 1.45,
            color: caution ? "#000000" : "#555555",
          }}
        >
          {terminal ? (
            <>
              SUMBER & KONFIGURASI TES
              <br />
              TIDAK SELURUHNYA IDENTIK
            </>
          ) : (
            <>
              TES INTERNAL MOONSHOT.
              <br />
              BUKAN PENGUJIAN INDEPENDEN KAVDRA.
            </>
          )}
        </Interactive.Div>
      </ContentStage>
    </Canvas>
  );
};

export const ClosingScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const choice = frame >= Math.round((timing.choice - timing.closing) * fps);
  const cost = frame >= Math.round((timing.cost - timing.closing) * fps);
  return (
    <Canvas dark>
      <Sequence
        name="Lebih mahal belum tentu unggul"
        durationInFrames={Math.round((timing.choice - timing.closing) * fps)}
      >
        <AnimatedHeadline supporting="DI SETIAP TES." size={96}>
          LEBIH MAHAL
          <br />
          BELUM TENTU
          <br />
          <span style={{ color: "#708090" }}>UNGGUL.</span>
        </AnimatedHeadline>
      </Sequence>
      <Sequence
        name="Pertanyaan penutup"
        from={Math.round((timing.choice - timing.closing) * fps)}
      >
        <AnimatedHeadline supporting="SESUAI TUGAS & KEBUTUHANMU." size={108}>
          MODEL MANA
          <br />
          <span style={{ color: "#708090" }}>PILIHANMU?</span>
        </AnimatedHeadline>
      </Sequence>
      <ContentStage>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            borderBottom: "1px solid #708090",
            paddingBottom: 28,
          }}
        >
          <Interactive.Div
            name="Pertimbangan harga"
            data-kimi-focus
            style={{ fontSize: 23, fontWeight: 700 }}
          >
            HARGA TOKEN
          </Interactive.Div>
          <Interactive.Div
            name="Pertimbangan hasil"
            data-kimi-focus
            style={{ fontSize: 23, fontWeight: 700 }}
          >
            HASIL BENCHMARK
          </Interactive.Div>
        </div>
        <Interactive.Div
          name="Biaya dan pilihan penggunaan"
          data-kimi-focus
          style={{
            marginTop: 35,
            fontSize: choice ? 50 : 44,
            fontWeight: 800,
            lineHeight: 1.15,
            letterSpacing: "-0.035em",
            opacity: interpolate(frame, [0, 0.25 * fps], [0, 1], {
              extrapolateRight: "clamp",
            }),
          }}
        >
          {choice ? (
            <>
              TARIF HEMAT?
              <br />
              <span style={{ color: "#708090" }}>PERFORMA COCOK?</span>
            </>
          ) : cost ? (
            <>
              BIAYA NYATA
              <br />
              TERGANTUNG
              <br />
              PEMAKAIAN.
            </>
          ) : (
            <>
              HARGA TOKEN
              <br />≠ BIAYA PROYEK
            </>
          )}
        </Interactive.Div>
        <div
          data-kimi-focus
          style={{
            marginTop: 30,
            fontSize: 18,
            lineHeight: 1.6,
            color: "#FAF9F6",
          }}
        >
          Jumlah token input/output · cache · tools · mode
          <br />
          Alur kerja · pengaturan model · kebutuhan tugas
        </div>
        <div style={{ position: "absolute", left: 0, top: 350 }}>
          <DecisionDiagram choiceAt={timing.choice - timing.closing} />
        </div>
      </ContentStage>
    </Canvas>
  );
};

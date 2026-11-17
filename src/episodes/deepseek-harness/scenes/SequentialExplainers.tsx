import React from "react";
import {
  Easing,
  Interactive,
  interpolate,
  Sequence,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import {
  Canvas,
  ContentStage,
  Disclosure,
  Headline,
} from "../components/Editorial";
import { IntegratedCodingAgent, ModularRuntime } from "../components/Systems";

// One subject per spoken explanation. The original narration and global cues stay put.
const ClaudeExplanation: React.FC<{
  extensions?: boolean;
  continuation?: boolean;
}> = ({ extensions = false, continuation = false }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const seconds = frame / fps;
  const step = extensions
    ? continuation
      ? "PERLUAS WORKFLOW YANG TERSEDIA"
      : seconds < 1.39
        ? "EKSTENSI PADA AGEN TERINTEGRASI"
        : seconds < 2.32
          ? "PLUGIN"
          : seconds < 2.64
            ? "SKILLS"
            : seconds < 3.64
              ? "HOOKS"
              : "MCP"
    : seconds < 2.84
      ? "AGEN SIAP PAKAI"
      : seconds < 3.76
        ? "MEMBACA PROYEK"
        : seconds < 4.82
          ? "MENGEDIT FILE"
          : "MENGGUNAKAN TOOLS";
  return (
    <Canvas>
      <Headline size={extensions ? 88 : 100}>
        CLAUDE CODE.
        <br />
        <span style={{ color: "#708090" }}>
          {extensions ? "PERLUAS ALUR." : "LANGSUNG PAKAI."}
        </span>
      </Headline>
      <Disclosure />
      <ContentStage>
        <div data-single-system="claude" data-explanation-step={step}>
          <div
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              fontSize: 21,
              fontWeight: 800,
            }}
          >
            AGEN TERINTEGRASI
          </div>
          <Interactive.Div
            name="Claude Code — fokus tunggal"
            style={{
              position: "absolute",
              left: 151,
              top: 44,
              width: 290,
              height: 280,
              transformOrigin: "top left",
              scale: 1.15,
              translate: interpolate(
                frame,
                [0, 0.45 * fps],
                ["16px 0px", "0px 0px"],
                {
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                  easing: Easing.bezier(0.22, 1, 0.36, 1),
                },
              ),
            }}
          >
            <IntegratedCodingAgent
              seconds={seconds + (continuation ? 8.25 : 0)}
              workflow={!extensions}
              extensions={extensions}
            />
          </Interactive.Div>
          <div
            style={{
              position: "absolute",
              left: 0,
              top: 381,
              width: 636,
              textAlign: "center",
              fontSize: 17,
              fontWeight: 700,
              color: "#555555",
            }}
          >
            {step}
          </div>
        </div>
      </ContentStage>
    </Canvas>
  );
};

const HarnessExplanation: React.FC<{ core?: boolean }> = ({ core = false }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const seconds = frame / fps;
  return (
    <Canvas>
      <Headline size={88}>
        DEEPSEEK HARNESS.
        <br />
        <span style={{ color: "#708090" }}>
          {core ? "GANTI INTI AGEN." : "RAKIT AGEN SENDIRI."}
        </span>
      </Headline>
      <Disclosure />
      <ContentStage>
        <div
          data-single-system="harness"
          data-explanation-step={core ? "core" : "assembly"}
        >
          <div
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              fontSize: 21,
              fontWeight: 800,
            }}
          >
            RUNTIME MODULAR
          </div>
          <Interactive.Div
            name="DeepSeek Harness — fokus tunggal"
            style={{
              position: "absolute",
              left: 151,
              top: 44,
              width: 290,
              height: 280,
              transformOrigin: "top left",
              scale: 1.15,
              translate: interpolate(
                frame,
                [0, 0.45 * fps],
                ["-16px 0px", "0px 0px"],
                {
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                  easing: Easing.bezier(0.22, 1, 0.36, 1),
                },
              ),
            }}
          >
            <ModularRuntime
              seconds={core ? (seconds - 2.45) * 3 : (seconds - 4.68) * 2.7}
              replace
              replaceCore={core}
              detailed
              revealSeconds={core ? undefined : seconds}
              assembly={interpolate(seconds, [0, 3.17], [core ? 1 : 0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              })}
            />
          </Interactive.Div>
          <div
            style={{
              position: "absolute",
              left: 0,
              top: 381,
              width: 636,
              textAlign: "center",
              fontSize: 17,
              fontWeight: 700,
              color: "#555555",
            }}
          >
            {core || seconds >= 4.5
              ? "LEPAS → KONFIGURASI → PASANG"
              : "KOMPONEN DIRAKIT SATU PER SATU"}
          </div>
        </div>
      </ContentStage>
    </Canvas>
  );
};

export const ArchitectureScene: React.FC = () => {
  const { fps } = useVideoConfig();
  return (
    <>
      <Sequence
        name="Claude Code — baca proyek, edit file, tools"
        durationInFrames={Math.round(10.91 * fps) - Math.round(4.88 * fps)}
      >
        <ClaudeExplanation />
      </Sequence>
      <Sequence
        name="DeepSeek Harness — rakit lalu ganti modul"
        from={Math.round(10.91 * fps) - Math.round(4.88 * fps)}
      >
        <HarnessExplanation />
      </Sequence>
    </>
  );
};

export const ExtensionsScene: React.FC = () => {
  const { fps } = useVideoConfig();
  return (
    <>
      <Sequence
        name="Claude Code — Plugin, Skills, Hooks, MCP"
        durationInFrames={Math.round(27.99 * fps) - Math.round(23.84 * fps)}
      >
        <ClaudeExplanation extensions />
      </Sequence>
      <Sequence
        name="DeepSeek Harness — penggantian inti agen"
        from={Math.round(27.99 * fps) - Math.round(23.84 * fps)}
        durationInFrames={Math.round(32.09 * fps) - Math.round(27.99 * fps)}
      >
        <HarnessExplanation core />
      </Sequence>
      <Sequence
        name="Claude Code — perluasan workflow"
        from={Math.round(32.09 * fps) - Math.round(23.84 * fps)}
      >
        <ClaudeExplanation extensions continuation />
      </Sequence>
    </>
  );
};

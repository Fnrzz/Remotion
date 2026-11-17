import React from "react";
import {
  Easing,
  Interactive,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import {
  Canvas,
  ContentStage,
  Disclosure,
  Headline,
} from "../components/Editorial";
import { ModularRuntime, IntegratedCodingAgent } from "../components/Systems";
import { PluginAssembly } from "../components/Creator";
import { CostFlow } from "../components/CostFlow";
export { ArchitectureScene, ExtensionsScene } from "./SequentialExplainers";

const clamp = {
  extrapolateLeft: "clamp" as const,
  extrapolateRight: "clamp" as const,
  easing: Easing.bezier(0.22, 1, 0.36, 1),
};

const ComparisonLayout: React.FC<{
  dark?: boolean;
  mode: "hook" | "architecture" | "extensions" | "closing";
}> = ({ dark = false, mode }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const isHook = mode === "hook";
  const architecture = mode === "architecture";
  const extensions = mode === "extensions";
  const closing = mode === "closing";
  const harnessFocus = architecture
    ? interpolate(t, [5.8, 6.3], [0, 1], clamp)
    : extensions
      ? interpolate(t, [3.9, 4.4, 8.1, 8.6], [0, 1, 1, 0], clamp)
      : 0.5;
  // The same two spatial anchors recur across cuts. No side is crowned a winner.
  return (
    <>
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          fontSize: 19,
          lineHeight: 1.25,
          fontWeight: 800,
          opacity: isHook ? interpolate(t, [0.15, 0.65], [0, 1], clamp) : 1,
        }}
      >
        DEEPSEEK
        <br />
        HARNESS
      </div>
      <div
        style={{
          position: "absolute",
          left: 355,
          top: 0,
          fontSize: 19,
          lineHeight: 1.25,
          fontWeight: 800,
          opacity: isHook ? interpolate(t, [0.4, 0.85], [0, 1], clamp) : 1,
        }}
      >
        CLAUDE
        <br />
        CODE
      </div>
      <Interactive.Div
        name="Sistem modular DeepSeek Harness"
        style={{
          position: "absolute",
          left: 0,
          top: 62,
          width: 290,
          height: 280,
          opacity: isHook
            ? interpolate(frame, [0, 0.5 * fps], [0.45, 1], clamp)
            : 0.45 + harnessFocus * 0.55,
          translate: isHook
            ? interpolate(
                frame,
                [0, 0.75 * fps],
                ["-35px 0px", "0px 0px"],
                clamp,
              )
            : "0px 0px",
        }}
      >
        <ModularRuntime
          dark={dark}
          seconds={
            architecture
              ? (t - 10.72) * 2.7
              : extensions
                ? (t - 6.6) * 3
                : closing
                  ? Math.min(t + 1.5, 4)
                  : t
          }
          detailed={architecture || extensions}
          replace={architecture || extensions}
          replaceCore={extensions}
          assembly={
            architecture
              ? interpolate(t, [8.9, 10], [0, 1], clamp)
              : interpolate(t, [0, 0.8], [0, 1], clamp)
          }
        />
      </Interactive.Div>
      <Interactive.Div
        name="Agen terintegrasi Claude Code"
        style={{
          position: "absolute",
          left: 346,
          top: 62,
          width: 290,
          height: 280,
          opacity: isHook
            ? interpolate(frame, [0.1 * fps, 0.65 * fps], [0.45, 1], clamp)
            : 1 - harnessFocus * 0.55,
          translate: isHook
            ? interpolate(
                frame,
                [0, 0.85 * fps],
                ["35px 0px", "0px 0px"],
                clamp,
              )
            : "0px 0px",
        }}
      >
        <IntegratedCodingAgent
          dark={dark}
          seconds={closing ? Math.min(t + 1, 5) : t}
          extensions={extensions || closing}
          workflow={architecture}
        />
      </Interactive.Div>
      {isHook ? (
        <div
          style={{
            position: "absolute",
            left: 293,
            top: 174,
            width: 50,
            textAlign: "center",
            fontSize: 24,
            fontWeight: 800,
            opacity: interpolate(t, [1.1, 1.55], [0, 1], clamp),
          }}
        >
          VS
        </div>
      ) : (
        <svg
          style={{ position: "absolute", left: 317, top: 60 }}
          width="2"
          height="255"
        >
          <path d="M1 0V255" stroke="#708090" strokeWidth="1" opacity="0.25" />
        </svg>
      )}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 365,
          width: 290,
          fontSize: 17,
          fontWeight: 700,
          color: dark ? "#FFFFFF" : "#555555",
        }}
      >
        RUNTIME MODULAR
      </div>
      <div
        style={{
          position: "absolute",
          left: 355,
          top: 365,
          width: 281,
          fontSize: 17,
          fontWeight: 700,
          color: dark ? "#FFFFFF" : "#555555",
        }}
      >
        AGEN TERINTEGRASI
      </div>
    </>
  );
};

export const HookScene: React.FC = () => (
  <Canvas dark>
    <Headline size={112}>
      BUKAN
      <br />
      <span style={{ color: "#708090" }}>ADU MODEL.</span>
    </Headline>
    <Disclosure />
    <ContentStage>
      <ComparisonLayout dark mode="hook" />
    </ContentStage>
  </Canvas>
);

export const CreatorScene: React.FC = () => (
  <Canvas>
    <Headline size={104}>
      DARI CHAT
      <br />
      <span style={{ color: "#708090" }}>JADI PLUGIN.</span>
    </Headline>
    <Disclosure />
    <ContentStage>
      <PluginAssembly />
    </ContentStage>
  </Canvas>
);

export const CostScene: React.FC = () => (
  <Canvas>
    <Headline size={100}>
      LISENSI BUKAN
      <br />
      <span style={{ color: "#708090" }}>SELURUH BIAYA.</span>
    </Headline>
    <Disclosure />
    <ContentStage>
      <CostFlow />
    </ContentStage>
  </Canvas>
);

export const ClosingScene: React.FC = () => (
  <Canvas>
    <Headline size={112}>
      RAKIT
      <br />
      <span style={{ color: "#708090" }}>ATAU PAKAI?</span>
    </Headline>
    <Disclosure />
    <ContentStage>
      <ComparisonLayout mode="closing" />
    </ContentStage>
  </Canvas>
);

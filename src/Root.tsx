import React from "react";
import { Composition } from "remotion";
import {
  calculateHydrogenMetadata,
  GeminiHydrogen012,
} from "./GeminiHydrogen012";
import {
  calculateHarnessMetadata,
  DeepSeekHarness011,
} from "./DeepSeekHarness011";
import { calculateClaudeFableMetadata, ClaudeFable010 } from "./ClaudeFable010";
import { calculateOmniMetadata, GeminiOmni009 } from "./GeminiOmni009";
import {
  calculateOpenAIImagesMetadata,
  OpenAIImages008,
} from "./OpenAIImages008";
import {
  calculateKimiComparisonMetadata,
  KimiComparison007,
} from "./KimiComparison007";
import {
  AgentDesktop006,
  calculateAgentDesktopMetadata,
} from "./AgentDesktop006";
import {
  calculateGenie4Metadata,
  Genie4News,
  GENIE4_FALLBACK_DURATION,
} from "./Genie4News";
import { FPS, HEIGHT, WIDTH } from "./theme";
import { calculateTerraSolMetadata, TerraVsSolNews } from "./TerraVsSolNews";
import {
  calculateCarbonMetadata,
  Gemini4CarbonNews,
} from "./Gemini4CarbonNews";
import {
  calculateMistralMetadata,
  MistralLarge4News,
} from "./MistralLarge4News";
import {
  calculateKronosMetadata,
  KronosDocumentary,
} from "./KronosDocumentary";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="GeminiHydrogen012"
        component={GeminiHydrogen012}
        calculateMetadata={calculateHydrogenMetadata}
        defaultProps={{ audioSrc: "assets/audio/vo_gemini hydrogen.mp3" }}
        durationInFrames={1842}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="DeepSeekHarness011"
        component={DeepSeekHarness011}
        calculateMetadata={calculateHarnessMetadata}
        defaultProps={{ audioSrc: "assets/audio/vo_deepseek herness.mp3" }}
        durationInFrames={1679}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="ClaudeFable010"
        component={ClaudeFable010}
        calculateMetadata={calculateClaudeFableMetadata}
        defaultProps={{ audioSrc: "assets/audio/vo_test claude fable 5.2.mp3" }}
        durationInFrames={1494}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="GeminiOmni009"
        component={GeminiOmni009}
        calculateMetadata={calculateOmniMetadata}
        defaultProps={{ audioSrc: "assets/audio/vo-gemini 1.2 flash.mp3" }}
        durationInFrames={1460}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="OpenAIImages008"
        component={OpenAIImages008}
        calculateMetadata={calculateOpenAIImagesMetadata}
        defaultProps={{
          audioSrc: "assets/audio/vo_openai images 2.6.mp3",
          showSafeArea: false,
        }}
        durationInFrames={1857}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="KimiComparison007"
        component={KimiComparison007}
        calculateMetadata={calculateKimiComparisonMetadata}
        defaultProps={{ audioSrc: "assets/audio/vo_kimi k3.1 pro.mp3" }}
        durationInFrames={1744}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="AgentDesktop006"
        component={AgentDesktop006}
        calculateMetadata={calculateAgentDesktopMetadata}
        defaultProps={{ audioSrc: "assets/audio/vo-agent-dekstop.mp3" }}
        durationInFrames={1428}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="KronosDocumentary"
        component={KronosDocumentary}
        calculateMetadata={calculateKronosMetadata}
        defaultProps={{
          audioSrc: "assets/audio/vo-kronos.mp3",
        }}
        durationInFrames={1425}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="MistralLarge4News"
        component={MistralLarge4News}
        calculateMetadata={calculateMistralMetadata}
        defaultProps={{
          audioSrc: "assets/audio/vo-mistral.mp3",
          showTikTokOverlay: true,
        }}
        durationInFrames={1384}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        id="Gemini4CarbonNews"
        component={Gemini4CarbonNews}
        calculateMetadata={calculateCarbonMetadata}
        defaultProps={{
          audioSrc: "assets/audio/vo-gemini4carbon.mp3",
          showTikTokOverlay: true,
        }}
        durationInFrames={1268}
        fps={30}
        width={1080}
        height={1920}
      />
      <Composition
        component={Genie4News}
        calculateMetadata={calculateGenie4Metadata}
        defaultProps={{
          audioSrc: "assets/audio/voiceover2.mp3",
          showTikTokOverlay: true,
        }}
        durationInFrames={Math.ceil(GENIE4_FALLBACK_DURATION * FPS)}
        fps={FPS}
        height={HEIGHT}
        id="Genie4News"
        width={WIDTH}
      />
      <Composition
        id="TerraVsSolNews"
        component={TerraVsSolNews}
        calculateMetadata={calculateTerraSolMetadata}
        defaultProps={{
          audioSrc: "assets/audio/voiceover-gpt-6.1-terra-vs-sol.mp3",
          audioDurationInSeconds: 41.325688,
          showSafeArea: false,
          showTikTokOverlay: true,
        }}
        durationInFrames={1264}
        fps={30}
        width={1080}
        height={1920}
      />
    </>
  );
};

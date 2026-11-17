import React from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { MOTION } from "../design";
import { AnimatedHeadline } from "../components/AnimatedHeadline";
import { AgentActionFlow } from "../components/AgentActionFlow";
import {
  ContentStage,
  MechanismLabel,
  SceneFrame,
} from "../components/SceneFrame";

export const ProductRevealScene: React.FC<{
  reveal: number;
  clarify: number;
  notAgent: number;
  architecture: number;
}> = ({ reveal, clarify, notAgent, architecture }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <SceneFrame>
      <AnimatedHeadline
        lines={["KENALIN,", "AGENT-DESKTOP!"]}
        lineStarts={[0, reveal]}
        supporting="PROYEK DI VERCEL LABS"
        size={96}
      />
      <ContentStage>
        <MechanismLabel />
        <AgentActionFlow action={architecture} />
        <div style={{ overflow: "hidden", marginTop: 12 }}>
          <div
            data-ad-text
            style={{
              fontSize: 39,
              lineHeight: 1.2,
              fontWeight: 800,
              letterSpacing: "-0.04em",
              translate: interpolate(
                frame / fps,
                [clarify, clarify + 0.35],
                ["0px 110px", "0px 0px"],
                MOTION,
              ),
            }}
          >
            TOOL, BUKAN MODEL AI.
            <br />
            <span
              style={{
                color: "#708090",
                display: "inline-block",
                opacity: interpolate(
                  frame / fps,
                  [notAgent, notAgent + 0.3],
                  [0, 1],
                  MOTION,
                ),
                translate: interpolate(
                  frame / fps,
                  [notAgent, notAgent + 0.3],
                  ["0px 20px", "0px 0px"],
                  MOTION,
                ),
              }}
            >
              Bukan agent mandiri.
            </span>
          </div>
        </div>
        <div
          data-ad-text
          style={{
            marginTop: 26,
            paddingTop: 18,
            borderTop: "1px solid #70809070",
            fontSize: 20,
            color: "#555555",
            opacity: interpolate(
              frame / fps,
              [architecture, architecture + 0.4],
              [0, 1],
              MOTION,
            ),
          }}
        >
          Rust CLI + C library
          <br />
          Agent atau program pemanggil yang mengatur aksi.
        </div>
      </ContentStage>
    </SceneFrame>
  );
};

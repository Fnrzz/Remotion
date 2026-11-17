import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { MOTION } from "../design";
import { AnimatedHeadline } from "../components/AnimatedHeadline";
import { AnimatedCursor } from "../components/AnimatedCursor";
import { DesktopWindow } from "../components/DesktopWindow";
import { AgentActionFlow } from "../components/AgentActionFlow";
import {
  ContentStage,
  MechanismLabel,
  SceneFrame,
} from "../components/SceneFrame";

export const HookScene: React.FC<{
  click: number;
  typing: number;
  connect: number;
}> = ({ click, typing, connect }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <SceneFrame dark>
      <AnimatedHeadline
        lines={["AI BISA KLIK", "& KETIK", "SENDIRI?!"]}
        supporting="DARI JAWABAN → KE TINDAKAN"
        size={108}
        delay={-0.12}
      />
      <ContentStage>
        <MechanismLabel />
        <div
          style={{
            position: "relative",
            scale: interpolate(
              frame / fps,
              [connect, connect + 0.4],
              [1, 0.9],
              MOTION,
            ),
            transformOrigin: "center top",
            opacity: spring({
              frame,
              fps,
              config: { damping: 200 },
              durationInFrames: Math.round(0.4 * fps),
            }),
          }}
        >
          <DesktopWindow
            dark
            typing={typing}
            focus={typing - 0.1}
            click={click}
            secondaryClick={typing + 0.9}
          />
          <AnimatedCursor
            dark
            times={[
              0.05,
              0.65,
              click - 0.6,
              click - 0.02,
              typing - 0.1,
              typing + 0.5,
              typing + 0.9,
            ]}
            xs={[610, 450, 450, 560, 190, 190, 560]}
            ys={[310, 294, 294, 244, 244, 244, 244]}
            click={click}
          />
        </div>
        <div
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: 330,
            opacity: interpolate(
              frame / fps,
              [connect, connect + 0.3],
              [0, 1],
              MOTION,
            ),
          }}
        >
          <AgentActionFlow dark start={connect} action={connect + 0.4} />
        </div>
      </ContentStage>
    </SceneFrame>
  );
};

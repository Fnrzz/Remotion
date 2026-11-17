import React from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { MOTION } from "../design";
import { AnimatedHeadline } from "../components/AnimatedHeadline";
import { PrivacySnapshot } from "../components/PrivacySnapshot";
import {
  ContentStage,
  MechanismLabel,
  SceneFrame,
} from "../components/SceneFrame";

export const PrivacyScene: React.FC<{ redact: number; boundary: number }> = ({
  redact,
  boundary,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <SceneFrame>
      <AnimatedHeadline
        lines={["AKSES DESKTOP.", "DATA PRIBADI."]}
        supporting="SNAPSHOT & LOG BISA MEMUAT INFORMASI PRIVAT"
        size={96}
      />
      <ContentStage>
        <MechanismLabel />
        <PrivacySnapshot redact={redact} boundary={boundary} />
        <div
          data-ad-text
          style={{
            fontSize: 34,
            fontWeight: 800,
            letterSpacing: "-0.035em",
            marginTop: 24,
            opacity: interpolate(
              frame / fps,
              [boundary, boundary + 0.35],
              [0, 1],
              MOTION,
            ),
          }}
        >
          BATASI AKSES. <span style={{ color: "#708090" }}>JAGA DATA.</span>
        </div>
      </ContentStage>
    </SceneFrame>
  );
};

export const ClosingScene: React.FC<{ question: number }> = ({ question }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  return (
    <SceneFrame dark>
      <AnimatedHeadline
        lines={["KALAU AI BISA", "AKSES", "KOMPUTERMU..."]}
        size={102}
      />
      <ContentStage>
        <div style={{ overflow: "hidden" }}>
          <div
            data-ad-text
            style={{
              fontSize: 70,
              fontWeight: 800,
              lineHeight: 1.1,
              letterSpacing: "-0.045em",
              translate: interpolate(
                t,
                [question, question + 0.35],
                ["0px 190px", "0px 0px"],
                MOTION,
              ),
            }}
          >
            APA YANG WAJIB
            <br />
            <span style={{ color: "#708090" }}>DIBATASI?</span>
          </div>
        </div>
        <svg
          width="636"
          height="130"
          viewBox="0 0 636 130"
          style={{ marginTop: 36 }}
        >
          <path
            d="M1 1H635"
            fill="none"
            stroke="#708090"
            strokeWidth="2"
            pathLength="1"
            strokeDasharray="1"
            strokeDashoffset={interpolate(
              t,
              [question + 0.15, question + 0.7],
              [1, 0],
              MOTION,
            )}
          />
        </svg>
      </ContentStage>
    </SceneFrame>
  );
};

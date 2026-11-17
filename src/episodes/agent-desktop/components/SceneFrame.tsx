import React from "react";
import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { MOTION } from "../design";

export const SceneFrame: React.FC<{
  dark?: boolean;
  children: React.ReactNode;
}> = ({ dark = false, children }) => (
  <AbsoluteFill
    style={{
      backgroundColor: dark ? "#000000" : "#FAF9F6",
      color: dark ? "#FFFFFF" : "#000000",
    }}
  >
    {children}
  </AbsoluteFill>
);

export const ContentStage: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <div
      data-ad-stage
      style={{
        position: "absolute",
        left: 84,
        top: 720,
        width: 912,
        height: 660,
        opacity: interpolate(frame, [0, 0.25 * fps], [0, 1], MOTION),
      }}
    >
      <div
        style={{
          position: "relative",
          width: 636,
          height: 400,
          transformOrigin: "top left",
          scale: 912 / 636,
        }}
      >
        {children}
      </div>
    </div>
  );
};

export const MechanismLabel: React.FC = () => (
  <div
    data-ad-text
    style={{
      fontSize: 17,
      fontWeight: 700,
      letterSpacing: "0.035em",
      color: "#708090",
      marginBottom: 24,
    }}
  >
    ILUSTRASI MEKANISME
  </div>
);

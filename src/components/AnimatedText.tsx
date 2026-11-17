import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { FONT_FAMILY } from "../fonts";

type AnimatedTextProps = {
  children: React.ReactNode;
  delay?: number;
  distance?: number;
  durationInFrames?: number;
  style?: React.CSSProperties;
  mask?: boolean;
  className?: string;
};

export const AnimatedText: React.FC<AnimatedTextProps> = ({
  children,
  delay = 0,
  distance = 34,
  durationInFrames = 26,
  style,
  mask = true,
  className,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({
    frame: frame - delay,
    fps,
    config: {
      damping: 200,
      mass: 0.7,
      stiffness: 120,
    },
    durationInFrames,
  });

  const opacity = interpolate(frame - delay, [0, 12], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const translateY = interpolate(progress, [0, 1], [distance, 0]);

  return (
    <div
      className={className}
      style={{
        overflow: mask ? "hidden" : "visible",
        paddingBottom: mask ? "0.1em" : 0,
        marginBottom: mask ? "-0.1em" : 0,
      }}
    >
      <div
        style={{
          fontFamily: FONT_FAMILY,
          opacity,
          transform: `translateY(${translateY}px)`,
          ...style,
        }}
      >
        {children}
      </div>
    </div>
  );
};

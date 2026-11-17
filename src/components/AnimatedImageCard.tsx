import React from "react";
import {
  Img,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { FONT_FAMILY } from "../fonts";
import { TIKTOK_VERTICAL_BALANCE } from "../layout/tiktokSafeArea";
import { COLORS } from "../theme";
import { ImageSourceText } from "./ImageSourceText";

type AnimatedImageCardProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
  delay?: number;
  radius?: number;
  imagePosition?: string;
  sourceUrl?: string;
  illustration?: boolean;
  credit?: string;
  caption?: string;
  matte?: boolean;
  zoomTo?: number;
  revealDuration?: number;
  visualScale?: number;
  visualOrigin?: React.CSSProperties["transformOrigin"];
  style?: React.CSSProperties;
  children?: React.ReactNode;
  tone?: "light" | "dark";
};

export const AnimatedImageCard: React.FC<AnimatedImageCardProps> = ({
  src,
  alt,
  width,
  height,
  delay = 0,
  radius = 26,
  imagePosition = "50% 50%",
  sourceUrl,
  illustration = false,
  credit,
  caption,
  matte = true,
  zoomTo = 1.06,
  revealDuration = 20,
  visualScale = 1,
  visualOrigin = "center top",
  style,
  children,
  tone = "light",
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const local = frame - delay;

  const reveal = spring({
    frame: local,
    fps,
    config: {
      damping: 200,
      mass: 0.85,
      stiffness: 95,
    },
    durationInFrames: revealDuration,
  });

  const opacity = interpolate(
    local,
    [0, Math.min(12, revealDuration)],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );

  const translateY = interpolate(reveal, [0, 1], [24, 0]);
  const clipInset = interpolate(reveal, [0, 1], [100, 0]);
  const imageScale = interpolate(frame, [0, 260], [1.015, zoomTo], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const matteInset = matte ? 8 : 0;

  return (
    <div
      style={{
        height: height + matteInset * 2 + 2,
        position: "relative",
        translate: `0px ${TIKTOK_VERTICAL_BALANCE.sceneOffsetY}px`,
        width: width + matteInset * 2 + 2,
        ...style,
      }}
    >
      <div
        style={{
          background: tone === "dark" ? COLORS.black : COLORS.white,
          border:
            tone === "dark"
              ? "1px solid rgba(255,255,255,0.12)"
              : "1px solid rgba(0,0,0,0.07)",
          borderRadius: radius + matteInset,
          boxShadow: "0 28px 70px rgba(0,0,0,0.14), 0 2px 6px rgba(0,0,0,0.04)",
          height,
          opacity,
          overflow: "hidden",
          padding: matteInset,
          position: "relative",
          // Only supporting artwork grows; source text remains independent.
          scale: visualScale,
          transformOrigin: visualOrigin,
          transform: `translateY(${translateY}px)`,
          width,
        }}
      >
        <div
          style={{
            borderRadius: radius,
            height: "100%",
            overflow: "hidden",
            position: "relative",
            width: "100%",
            clipPath: `inset(${clipInset}% 0 0 0 round ${radius}px)`,
          }}
        >
          <Img
            alt={alt}
            src={staticFile(src)}
            style={{
              height: "100%",
              objectFit: "cover",
              objectPosition: imagePosition,
              transform: `scale(${imageScale})`,
              width: "100%",
            }}
          />
          <div
            style={{
              background:
                "linear-gradient(180deg, rgba(0,0,0,0.12) 0%, rgba(0,0,0,0) 24%, rgba(0,0,0,0) 58%, rgba(0,0,0,0.52) 100%)",
              inset: 0,
              pointerEvents: "none",
              position: "absolute",
            }}
          />
          {children}
          {illustration ? (
            <div
              style={{
                backdropFilter: "blur(10px)",
                background: "rgba(0,0,0,0.62)",
                border: "1px solid rgba(255,255,255,0.18)",
                borderRadius: 6,
                color: COLORS.white,
                fontFamily: FONT_FAMILY,
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: "0.14em",
                padding: "7px 9px",
                position: "absolute",
                right: 16,
                top: 16,
              }}
            >
              ILUSTRASI
            </div>
          ) : null}
          {caption ? (
            <div
              style={{
                bottom: 18,
                color: COLORS.white,
                fontFamily: FONT_FAMILY,
                fontSize: 15,
                fontWeight: 600,
                left: 18,
                letterSpacing: "-0.01em",
                maxWidth: "65%",
                position: "absolute",
              }}
            >
              {caption}
            </div>
          ) : null}
          {credit ? (
            <div
              style={{
                bottom: 17,
                color: "rgba(255,255,255,0.78)",
                fontFamily: FONT_FAMILY,
                fontSize: 10,
                fontWeight: 600,
                letterSpacing: "0.1em",
                position: "absolute",
                right: 18,
                textShadow: "0 1px 2px rgba(0,0,0,0.35)",
              }}
            >
              {credit}
            </div>
          ) : null}
        </div>
      </div>
      {sourceUrl ? (
        <ImageSourceText
          sourceUrl={sourceUrl}
          style={{ left: 0, top: height * visualScale + 40, width }}
        />
      ) : null}
    </div>
  );
};

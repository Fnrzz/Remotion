import React from "react";
import type { Caption } from "@remotion/captions";
import { AbsoluteFill, useCurrentFrame, useVideoConfig } from "remotion";
import { CAPTIONS } from "../data/scenes";
import { FONT_FAMILY } from "../fonts";
import {
  getTikTokSafeArea,
  TIKTOK_CONTENT,
  TIKTOK_VERTICAL_BALANCE,
} from "../layout/tiktokSafeArea";
import { COLORS, HEIGHT, WIDTH } from "../theme";

type SubtitlesProps = {
  variant?: "light" | "onDark";
  captions?: readonly Caption[];
  persistent?: boolean;
};

export const Subtitles: React.FC<SubtitlesProps> = ({
  variant = "light",
  captions = CAPTIONS,
  persistent = false,
}) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const safe = getTikTokSafeArea(width, height);
  const currentMs = (frame / fps) * 1000;

  const caption = captions.find(
    (item) => currentMs >= item.startMs && currentMs < item.endMs,
  );

  if (!caption && !persistent) {
    return null;
  }

  const onDark = variant === "onDark";

  return (
    <AbsoluteFill
      style={{
        alignItems: "flex-start",
        justifyContent: "flex-end",
        // Lower only this overlay; keep the fixed box and caption identity.
        paddingBottom: Math.max(
          safe.bottom +
            safe.insetY +
            ((25 -
              TIKTOK_VERTICAL_BALANCE.screenOffsetY -
              TIKTOK_VERTICAL_BALANCE.overlayExtraOffsetY) /
              HEIGHT) *
              height,
          ((HEIGHT - TIKTOK_VERTICAL_BALANCE.subtitleLimitY + 7) / HEIGHT) *
            height,
        ),
        paddingLeft: safe.left + safe.insetX,
        pointerEvents: "none",
      }}
    >
      <div
        data-subtitle="stable"
        style={{
          alignItems: "center",
          boxSizing: "border-box",
          background: onDark ? "rgba(0,0,0,0.58)" : "rgba(255,255,255,0.88)",
          border: onDark
            ? "1px solid rgba(255,255,255,0.14)"
            : "1px solid rgba(0,0,0,0.06)",
          borderRadius: 18,
          boxShadow: onDark
            ? "0 10px 32px rgba(0,0,0,0.28)"
            : "0 10px 32px rgba(0,0,0,0.08)",
          color: onDark ? COLORS.white : COLORS.black,
          display: "flex",
          fontFamily: FONT_FAMILY,
          fontSize: (TIKTOK_CONTENT.subtitleFontSize / WIDTH) * width,
          fontWeight: 600,
          letterSpacing: "-0.015em",
          lineHeight: 1.3,
          // Reserve the same two-line box for every cue; only text changes.
          height:
            ((TIKTOK_CONTENT.subtitleFontSize * 1.3 * 2 + 2) / WIDTH) * width +
            (34 / HEIGHT) * height,
          justifyContent: "center",
          padding: `${(17 / HEIGHT) * height}px ${(24 / WIDTH) * width}px`,
          textAlign: "center",
          width: (TIKTOK_CONTENT.subtitleWidth / WIDTH) * width,
        }}
      >
        {caption?.text ?? ""}
      </div>
    </AbsoluteFill>
  );
};

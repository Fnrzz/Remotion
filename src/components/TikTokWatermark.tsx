import React from "react";
import { useVideoConfig } from "remotion";
import { FONT_FAMILY } from "../fonts";
import { getTikTokSafeArea } from "../layout/tiktokSafeArea";
import { COLORS, HEIGHT, WIDTH } from "../theme";

export const TikTokWatermark: React.FC<{
  username: string;
  onDark: boolean;
}> = ({ username, onDark }) => {
  const { width, height } = useVideoConfig();
  const safe = getTikTokSafeArea(width, height);

  return (
    <div
      style={{
        alignItems: "center",
        color: onDark ? COLORS.white : COLORS.black,
        display: "flex",
        fontFamily: FONT_FAMILY,
        fontSize: (30 / WIDTH) * width,
        fontWeight: 700,
        letterSpacing: "-0.02em",
        lineHeight: 1,
        opacity: 0.58,
        pointerEvents: "none",
        position: "absolute",
        right: safe.headerRight + safe.insetX + (80 / WIDTH) * width,
        top: safe.top + safe.insetY + (30 / HEIGHT) * height,
        whiteSpace: "nowrap",
      }}
    >
      <span>{username}</span>
    </div>
  );
};

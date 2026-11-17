import React from "react";
import { useVideoConfig } from "remotion";
import { getTikTokSafeArea, TIKTOK_CONTENT } from "../layout/tiktokSafeArea";
import { HEIGHT, WIDTH } from "../theme";

type DesignBounds = {
  left: number;
  top: number;
  right: number;
  bottom: number;
};

// Fit only the message/focus bounds, not the full extent of supporting artwork.
// Overflow stays visible: image edges and decoration may extend under TikTok UI.
// Branding, captions, and the character face have their own safe positioning.
export const TikTokSafeStage: React.FC<{
  focusBounds: DesignBounds;
  children: React.ReactNode;
}> = ({ focusBounds: bounds, children }) => {
  const { width, height } = useVideoConfig();
  const safe = getTikTokSafeArea(width, height);
  const slotTop = safe.top + (TIKTOK_CONTENT.headerGap / HEIGHT) * height;
  const characterHeight =
    (TIKTOK_CONTENT.characterWidth / WIDTH) * width * (272 / 307);
  const slotBottom =
    height -
    safe.bottom -
    safe.insetY -
    characterHeight -
    (TIKTOK_CONTENT.overlayGap / HEIGHT) * height;
  const slotWidth = safe.width - safe.insetX * 2;
  const scale = Math.min(
    slotWidth / (bounds.right - bounds.left),
    (slotBottom - slotTop) / (bounds.bottom - bounds.top),
  );

  return (
    <div
      style={{
        height: HEIGHT,
        left:
          safe.left +
          safe.insetX +
          (slotWidth - (bounds.right - bounds.left) * scale) / 2 -
          bounds.left * scale,
        position: "absolute",
        overflow: "visible",
        scale,
        top: slotTop - bounds.top * scale,
        transformOrigin: "top left",
        width: WIDTH,
      }}
    >
      {children}
    </div>
  );
};

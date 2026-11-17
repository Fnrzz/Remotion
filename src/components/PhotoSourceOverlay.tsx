import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { HOOK_BLACK_END, SCENES, type SceneId } from "../data/scenes";
import {
  getTikTokSafeArea,
  TIKTOK_CONTENT,
  TIKTOK_VERTICAL_BALANCE,
} from "../layout/tiktokSafeArea";
import { HEIGHT, WIDTH } from "../theme";
import { ImageSourceText } from "./ImageSourceText";

// Photo top is in authored scene coordinates; the text uses screen-space sizing.
// Horizontal anchors keep even overflowing supporting photos' credits safe.
const PHOTO_SOURCE_PLACEMENTS: Partial<
  Record<SceneId, { photoTop: number; left: number; width: number }>
> = {
  hook: { photoTop: 586, left: 132, width: 696 },
  intro: { photoTop: 634, left: 132, width: 416 },
  what: { photoTop: 628, left: 132, width: 416 },
  capabilities: { photoTop: 244, left: 470, width: 358 },
  audio: { photoTop: 232, left: 584, width: 256 },
  closing: { photoTop: 700, left: 132, width: 696 },
};

// One persistent source outside image transforms/reveals. Its anchor changes
// only at scene cuts; capability shot changes keep the exact same source node.
export const PhotoSourceOverlay: React.FC<{ sourceUrl: string }> = ({
  sourceUrl,
}) => {
  const { width, height } = useVideoConfig();
  const frame = useCurrentFrame();
  const safe = getTikTokSafeArea(width, height);
  const scene = SCENES.find(
    (item) => frame >= item.from && frame < item.from + item.durationInFrames,
  );
  const placement = scene ? PHOTO_SOURCE_PLACEMENTS[scene.id] : undefined;

  if (frame < HOOK_BLACK_END || !placement) {
    return null;
  }

  // Match the existing focus stage without scaling the attribution typography.
  const slotTop = safe.top + (TIKTOK_CONTENT.headerGap / HEIGHT) * height;
  const slotBottom =
    height -
    safe.bottom -
    safe.insetY -
    (TIKTOK_CONTENT.characterWidth / WIDTH) * width * (272 / 307) -
    (TIKTOK_CONTENT.overlayGap / HEIGHT) * height;
  const stageScale = Math.min(
    (safe.width - safe.insetX * 2) / 1020,
    (slotBottom - slotTop) / 830,
  );
  const photoTop =
    slotTop +
    (placement.photoTop + TIKTOK_VERTICAL_BALANCE.sceneOffsetY - 210) *
      stageScale;

  return (
    <ImageSourceText
      inline
      sourceUrl={sourceUrl}
      style={{
        bottom: height - photoTop + (14 / HEIGHT) * height,
        fontSize: (16 / WIDTH) * width,
        left: (placement.left / WIDTH) * width,
        width: (placement.width / WIDTH) * width,
      }}
    />
  );
};

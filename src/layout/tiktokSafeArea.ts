import { HEIGHT, WIDTH } from "../theme";

// User's illustrated 540 × 960 template, doubled for 1080 × 1920.
// The upper strip extends farther right; the body clears the action-button rail.
export const TIKTOK_SAFE_AREA = {
  top: 126 * 2,
  right: 120 * 2,
  bottom: 320 * 2,
  left: 60 * 2,
  headerRight: 60 * 2,
  headerBottom: 180 * 2,
  inset: 12,
} as const;

export const TIKTOK_CONTENT = {
  characterWidth: 280,
  subtitleWidth: 392,
  subtitleFontSize: 32,
  headerGap: 60,
  overlayGap: 24,
} as const;

// Lower the visual/overlay group without changing the headline stage fitting.
// The authored 1020px-wide focus stage fits 696px at 1080 × 1920; convert the
// same 100px screen-space shift to scene coordinates for cards and their peers.
const LOWER_CONTENT_SHIFT = 100;
export const TIKTOK_VERTICAL_BALANCE = {
  screenOffsetY: LOWER_CONTENT_SHIFT,
  // Overlay-only adjustment against the downloaded TikTok guide. Keep the
  // headline stage, photos, source text and companion panels where they are.
  overlayExtraOffsetY: 48,
  sceneOffsetY:
    (LOWER_CONTENT_SHIFT * 1020) /
    (WIDTH -
      TIKTOK_SAFE_AREA.left -
      TIKTOK_SAFE_AREA.right -
      TIKTOK_SAFE_AREA.inset * 2),
  subtitleLimitY: 1400,
} as const;

export const getTikTokSafeArea = (width: number, height: number) => ({
  left: (TIKTOK_SAFE_AREA.left / WIDTH) * width,
  top: (TIKTOK_SAFE_AREA.top / HEIGHT) * height,
  right: (TIKTOK_SAFE_AREA.right / WIDTH) * width,
  bottom: (TIKTOK_SAFE_AREA.bottom / HEIGHT) * height,
  headerRight: (TIKTOK_SAFE_AREA.headerRight / WIDTH) * width,
  headerBottom: (TIKTOK_SAFE_AREA.headerBottom / HEIGHT) * height,
  width:
    ((WIDTH - TIKTOK_SAFE_AREA.left - TIKTOK_SAFE_AREA.right) / WIDTH) * width,
  height:
    ((HEIGHT - TIKTOK_SAFE_AREA.top - TIKTOK_SAFE_AREA.bottom) / HEIGHT) *
    height,
  insetX: (TIKTOK_SAFE_AREA.inset / WIDTH) * width,
  insetY: (TIKTOK_SAFE_AREA.inset / HEIGHT) * height,
});

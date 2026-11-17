import React from "react";
import { TikTokSafeZoneOverlay } from "./TikTokSafeZoneOverlay";

export type TikTokSafeAreaOverlayProps = {
  enabled?: boolean;
  opacity?: number;
};

/**
 * Shared editorial preview guide for every episode.
 * The underlying component uses the original Orson Lord PNG and excludes
 * itself from renders. Keep this outside scaled scene stages, as the last layer.
 */
export const TikTokSafeAreaOverlay: React.FC<TikTokSafeAreaOverlayProps> = ({
  enabled = true,
  opacity = 0.65,
}) => {
  if (!enabled) return null;

  return (
    <TikTokSafeZoneOverlay
      name="Overlay TikTok — Orson Lord (preview saja)"
      style={{ opacity, pointerEvents: "none", zIndex: 100 }}
    />
  );
};

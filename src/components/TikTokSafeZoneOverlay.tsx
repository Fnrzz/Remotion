import React from "react";
import { Img, Interactive, staticFile, useRemotionEnvironment } from "remotion";

const TikTokSafeZoneOverlayInner: React.FC = () => {
  const { isStudio, isRendering } = useRemotionEnvironment();

  // An editing guide only: never include the downloaded template in exports.
  if (!isStudio || isRendering) return null;

  return (
    <Img
      alt="Panduan safe zone TikTok dari Orson Lord — bukan UI resmi TikTok"
      data-tiktok-safe-zone="orson-lord"
      src={staticFile("assets/overlays/tiktok-safe-zone-orson-lord.png")}
      style={{
        display: "block",
        width: "100%",
        height: "100%",
        objectFit: "fill",
        pointerEvents: "none",
      }}
    />
  );
};

export const TikTokSafeZoneOverlay = Interactive.create({
  Component: TikTokSafeZoneOverlayInner,
  layout: "absolute-fill",
});

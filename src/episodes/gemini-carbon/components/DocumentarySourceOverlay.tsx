import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS } from "../../../theme";
import { getDocumentaryCredits } from "../data/documentaryAssets";
import { CUES } from "../data/sceneTimings";

/** Global-time credit layer: plain, steady 16px source text outside all photos. */
export const DocumentarySourceOverlay: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const dark =
    frame < Math.round(CUES.reveal * fps) ||
    (frame >= Math.round(CUES.access * fps) &&
      frame < Math.round(CUES.closing * fps));
  const credits = getDocumentaryCredits(frame, fps);
  if (!credits.length) return null;
  return (
    <div
      data-editorial-source="documentary"
      data-source-frame={frame}
      style={{
        position: "absolute",
        left: (132 * width) / 1080,
        bottom: ((1920 - 629) * height) / 1920,
        width: (696 * width) / 1080,
        fontSize: (16 * width) / 1080,
        lineHeight: 1.25,
        fontWeight: 500,
        color: dark ? COLORS.offWhite : COLORS.gray,
        overflowWrap: "anywhere",
        pointerEvents: "none",
      }}
    >
      {credits.map((asset) => (
        <React.Fragment key={asset.src}>
          <div data-source-url={asset.sourceUrl} data-photo-credit={asset.src}>
            <strong>Sumber foto: </strong>
            {asset.creator} ·{" "}
            {asset.sourceUrl.replace("https://", "").replace(/\/$/, "")}
          </div>
          {asset.license.startsWith("CC BY") ? (
            <div>
              {asset.license} · {asset.licenseUrl.replace("https://", "")} ·
              crop/zoom
            </div>
          ) : null}
        </React.Fragment>
      ))}
    </div>
  );
};

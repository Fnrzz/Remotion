import React from "react";
import {
  Img,
  interpolate,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import {
  CHARACTER_CUES,
  CHARACTER_POSES,
  type CharacterEmotion,
} from "../data/character";
import {
  getTikTokSafeArea,
  TIKTOK_CONTENT,
  TIKTOK_VERTICAL_BALANCE,
} from "../layout/tiktokSafeArea";
import { HEIGHT, WIDTH } from "../theme";

// Transparent, unaltered poses extracted from the original sheet using its guide.
export const CharacterOverlay: React.FC<{
  cues?: readonly {
    fromMs: number;
    emotion: CharacterEmotion;
    voiceover: string;
  }[];
}> = ({ cues = CHARACTER_CUES }) => {
  const frame = useCurrentFrame();
  const { fps, width, height } = useVideoConfig();
  const safe = getTikTokSafeArea(width, height);
  const currentMs = (frame / fps) * 1000;
  const cueIndex = Math.max(
    0,
    cues.findIndex(
      (item, index) =>
        currentMs >= item.fromMs &&
        currentMs < (cues[index + 1]?.fromMs ?? Infinity),
    ),
  );
  const cue = cues[cueIndex];
  const pose = CHARACTER_POSES[cue.emotion];

  return (
    <div
      data-character-guide={staticFile(
        "assets/images/charactersheet/karaktersheet.md",
      )}
      data-character-sheet={staticFile(
        "assets/images/charactersheet/karaktersheet.png",
      )}
      data-character-pose={pose.id}
      data-voiceover-cue={cue.voiceover}
      style={{
        aspectRatio: "307 / 272",
        bottom:
          safe.bottom +
          safe.insetY -
          ((TIKTOK_VERTICAL_BALANCE.screenOffsetY +
            TIKTOK_VERTICAL_BALANCE.overlayExtraOffsetY) /
            HEIGHT) *
            height,
        filter:
          "drop-shadow(0 0 1px rgba(255,255,255,0.65)) drop-shadow(0 6px 12px rgba(0,0,0,0.16))",
        opacity: interpolate(frame, [0, 0.2 * fps], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        }),
        pointerEvents: "none",
        position: "absolute",
        right: safe.right + safe.insetX,
        width: (TIKTOK_CONTENT.characterWidth / WIDTH) * width,
      }}
    >
      <Img
        alt={`Karakter berkacamata — ${pose.description} (${pose.id})`}
        src={staticFile(
          `assets/images/charactersheet/karaktersheet-${pose.asset}.png`,
        )}
        style={{
          display: "block",
          height: "100%",
          objectFit: "cover",
          objectPosition: "center bottom",
          width: "100%",
        }}
      />
    </div>
  );
};

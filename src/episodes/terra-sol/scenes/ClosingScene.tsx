import React from "react";
import {
  Sequence,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import {
  ComparisonCard,
  Headline,
  Label,
  BODY_TOP,
} from "../components/EditorialPrimitives";
import { CUES } from "../data/sceneTimings";
import { COLORS } from "../../../theme";

export const ClosingScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();
  return (
    <div
      style={{
        position: "absolute",
        width: 1080,
        height: 1920,
        scale: interpolate(frame, [0, durationInFrames], [1.008, 1], {
          extrapolateRight: "clamp",
        }),
        transformOrigin: "570px 750px",
      }}
    >
      <Sequence
        name="Pertanyaan tarif"
        durationInFrames={Math.round((CUES.closingChoice - CUES.closing) * fps)}
      >
        <Headline>
          PILIH YANG
          <br />
          <span style={{ color: COLORS.slate }}>HEMAT?</span>
        </Headline>
      </Sequence>
      <Sequence
        name="Pertanyaan uji kebutuhan"
        from={Math.round((CUES.closingChoice - CUES.closing) * fps)}
      >
        <Headline>
          ATAU
          <br />
          <span style={{ color: COLORS.slate }}>UJI DULU?</span>
        </Headline>
      </Sequence>
      <ComparisonCard model="TERRA" left={60} />
      <ComparisonCard model="SOL" left={582} delay={3} />
      <Label
        style={{
          position: "absolute",
          left: 72,
          top: BODY_TOP + 470,
          fontWeight: 700,
          fontSize: 33,
        }}
      >
        SESUAI KEBUTUHANMU
      </Label>
    </div>
  );
};

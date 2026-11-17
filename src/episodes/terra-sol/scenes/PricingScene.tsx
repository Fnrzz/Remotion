import React from "react";
import { useVideoConfig } from "remotion";
import {
  Headline,
  Label,
  PriceCard,
  BODY_TOP,
} from "../components/EditorialPrimitives";
import { CUES } from "../data/sceneTimings";
import { COLORS } from "../../../theme";

export const PricingScene: React.FC = () => {
  const { fps } = useVideoConfig();
  return (
    <>
      <Headline size={94}>
        PERBANDINGAN
        <br />
        <span style={{ color: COLORS.slate }}>HARGA API</span>
      </Headline>
      <Label
        style={{
          position: "absolute",
          left: 72,
          top: 475,
          fontSize: 29,
          color: COLORS.black,
          fontWeight: 700,
        }}
      >
        TARIF STANDAR • PER 1 JUTA TOKEN
      </Label>
      <Label style={{ position: "absolute", left: 72, top: 525, fontSize: 26 }}>
        USD • konteks ≤272K token input
      </Label>
      <PriceCard
        model="TERRA"
        left={60}
        input="$1"
        output="$5"
        inputAt={(CUES.terraInput - CUES.pricing) * fps}
        outputAt={(CUES.terraOutput - CUES.pricing) * fps}
        activeFrom={(CUES.terraInput - CUES.pricing) * fps}
        activeUntil={(CUES.solInput - CUES.pricing - 0.4) * fps}
      />
      <PriceCard
        model="SOL"
        left={582}
        input="$2"
        output="$10"
        inputAt={(CUES.solInput - CUES.pricing) * fps}
        outputAt={(CUES.solOutput - CUES.pricing) * fps}
        activeFrom={(CUES.solInput - CUES.pricing) * fps}
        activeUntil={(CUES.terraBenchmark - CUES.pricing - 0.4) * fps}
      />
      <Label
        style={{
          position: "absolute",
          left: 72,
          top: BODY_TOP + 674,
          fontSize: 29,
          letterSpacing: "-0.01em",
          width: 990,
        }}
      >
        Tagihan mengikuti pemakaian, cache,
        <br />
        pengaturan, dan biaya lain.
      </Label>
    </>
  );
};

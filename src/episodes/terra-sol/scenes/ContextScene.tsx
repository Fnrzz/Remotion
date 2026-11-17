import React from "react";
import { Sequence, useVideoConfig } from "remotion";
import { Headline, Label } from "../components/EditorialPrimitives";
import { CUES } from "../data/sceneTimings";
import { COLORS } from "../../../theme";

const ContextStatement: React.FC<{
  children: React.ReactNode;
  detail: React.ReactNode;
}> = ({ children, detail }) => (
  <>
    <Headline dark>{children}</Headline>
    <div
      style={{
        left: 72,
        top: 710,
        position: "absolute",
        width: 990,
        borderTop: "1px solid rgba(255,255,255,0.24)",
        paddingTop: 45,
      }}
    >
      <Label
        style={{
          color: COLORS.white,
          fontSize: 40,
          lineHeight: 1.5,
          letterSpacing: "-0.025em",
        }}
      >
        {detail}
      </Label>
    </div>
  </>
);

export const ContextScene: React.FC = () => {
  const { fps } = useVideoConfig();
  return (
    <>
      <Sequence
        name="Satu tes bukan kesimpulan umum"
        durationInFrames={Math.round(
          (CUES.generalization - CUES.context) * fps,
        )}
      >
        <ContextStatement
          detail={
            <>
              Plotly • 43 soal analisis data.
              <br />
              Bukan seluruh kemampuan AI.
            </>
          }
        >
          INI CUMA
          <br />
          <span style={{ color: COLORS.slate }}>SATU TES.</span>
        </ContextStatement>
      </Sequence>
      <Sequence
        name="Performa bergantung pada tugas"
        from={Math.round((CUES.generalization - CUES.context) * fps)}
        durationInFrames={Math.round(
          (CUES.subscription - CUES.generalization) * fps,
        )}
      >
        <ContextStatement
          detail={
            <>
              Uji dengan pekerjaanmu sendiri.
              <br />
              Jangan samakan hasil semua tugas.
            </>
          }
        >
          BUKAN JAMINAN
          <br />
          UNTUK SEMUA
          <br />
          <span style={{ color: COLORS.slate }}>TUGAS.</span>
        </ContextStatement>
      </Sequence>
      <Sequence
        name="Harga API bukan langganan"
        from={Math.round((CUES.subscription - CUES.context) * fps)}
      >
        <ContextStatement
          detail={
            <>
              Tarif API berbasis pemakaian token.
              <br />
              Bukan harga langganan ChatGPT.
            </>
          }
        >
          HARGA API
          <br />
          <span style={{ color: COLORS.slate }}>BUKAN</span>
          <br />
          LANGGANAN
        </ContextStatement>
      </Sequence>
    </>
  );
};

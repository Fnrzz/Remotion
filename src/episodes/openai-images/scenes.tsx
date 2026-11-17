import React from "react";
import {
  Interactive,
  interpolate,
  Sequence,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { BRAND, FEATURES } from "./design";
import {
  AnimatedHeadline,
  FeatureChip,
  Note,
  SceneCanvas,
  Stage,
} from "./components/Editorial";
import {
  TimerComparison,
  VariantComparisonCard,
} from "./components/Comparisons";
import {
  GifConceptPanel,
  MarkupEditDemo,
  OriginalFlower,
  SvgExportCard,
} from "./components/CreativeDemos";
import {
  ClosingChoicesMotion,
  RevisionMotion,
} from "./components/ClosingMotion";

export const HookScene: React.FC = () => (
  <SceneCanvas dark>
    <AnimatedHeadline
      lines={["AI GAMBAR", "SEKARANG", "BISA GERAK?!"]}
      size={98}
      dark
      emphasis={2}
    />
    <Stage top={740}>
      <GifConceptPanel mode="hook" />
    </Stage>
  </SceneCanvas>
);

export const RevealScene: React.FC = () => (
  <SceneCanvas>
    <AnimatedHeadline lines={["OPENAI", "IMAGES 2.6"]} size={109} accent={1} />
    <Stage top={650}>
      <Interactive.Div
        name="Tanggal pengumuman resmi"
        data-text-unit
        style={{ fontSize: 29, fontWeight: 700, marginBottom: 36 }}
      >
        4 NOVEMBER 2026
      </Interactive.Div>
      <div style={{ display: "grid", gap: 18 }}>
        <FeatureChip delay={0.3}>
          LEBIH CEPAT{" "}
          <span style={{ float: "right", color: BRAND.slate }}>↗</span>
        </FeatureChip>
        <FeatureChip delay={0.6}>
          LEBIH PRESISI{" "}
          <span style={{ float: "right", color: BRAND.slate }}>⌖</span>
        </FeatureChip>
        <FeatureChip delay={0.9}>
          BISA GIF <span style={{ float: "right", color: BRAND.slate }}>↻</span>
        </FeatureChip>
      </div>
      <Interactive.Div
        name="Ketersediaan produk"
        data-text-unit
        style={{ marginTop: 35, fontSize: 28, fontWeight: 700 }}
      >
        ChatGPT · Codex · API
      </Interactive.Div>
    </Stage>
  </SceneCanvas>
);

export const SpeedScene: React.FC = () => (
  <SceneCanvas>
    <AnimatedHeadline lines={["50%", "LEBIH CEPAT"]} size={106} accent={0} />
    <Stage top={590}>
      <Interactive.Div
        name="Atribusi klaim kecepatan"
        data-text-unit
        style={{ marginBottom: 44, fontSize: 28, fontWeight: 800 }}
      >
        MENURUT OPENAI
      </Interactive.Div>
      <TimerComparison />
    </Stage>
  </SceneCanvas>
);

export const VariantsScene: React.FC<{ sunburstAt: number }> = ({
  sunburstAt,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <SceneCanvas>
      <AnimatedHeadline
        lines={["FLARE vs", "SUNBURST"]}
        size={100}
        accent={1}
      />
      <Stage top={650}>
        <div
          data-text-unit
          style={{ fontSize: 26, fontWeight: 700, marginBottom: 28 }}
        >
          API · GPT-Image-2.6
        </div>
        <div style={{ display: "flex", gap: 24 }}>
          <VariantComparisonCard
            variant="Flare"
            focus="FOKUS: CEPAT"
            active={frame / fps < sunburstAt}
            detail={
              <>
                Bisa secepat 6 detik
                <br />
                <span style={{ fontSize: 23, fontWeight: 600 }}>
                  Kualitas rendah
                </span>
              </>
            }
          />
          <VariantComparisonCard
            variant="Sunburst"
            focus="FOKUS: DETAIL"
            active={frame / fps >= sunburstAt}
            delay={0.2}
            detail={
              <>
                Konsistensi edit
                <br />
                lebih tinggi
              </>
            }
          />
        </div>
        <div style={{ marginTop: 25 }}>
          <Note>
            Pilih sesuai alur kerja.
            <br />
            Detail & konsistensi Sunburst: kualitas sedang/tinggi.
          </Note>
        </div>
      </Stage>
    </SceneCanvas>
  );
};

export const MarkupScene: React.FC = () => (
  <SceneCanvas>
    <AnimatedHeadline lines={["EDIT DENGAN", "MARKUP"]} size={98} accent={1} />
    <Stage top={670}>
      <MarkupEditDemo />
    </Stage>
  </SceneCanvas>
);

export const WorkflowScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <SceneCanvas>
      <AnimatedHeadline
        lines={["BUKAN CUMA", "SEKALI JADI"]}
        size={98}
        accent={1}
      />
      <Stage top={650}>
        <div
          data-text-unit
          style={{ fontSize: 25, fontWeight: 700, marginBottom: 25 }}
        >
          ILUSTRASI ALUR REVISI
        </div>
        <div style={{ display: "flex", gap: 20, alignItems: "center" }}>
          <div
            style={{
              width: 342,
              background: BRAND.white,
              border: "1px solid #70809055",
              borderRadius: 24,
              height: 300,
            }}
          >
            <div
              data-text-unit
              style={{ padding: "24px 24px 0", fontSize: 26, fontWeight: 800 }}
            >
              BUAT
            </div>
            <div style={{ height: 220 }}>
              <OriginalFlower />
            </div>
          </div>
          <svg width="36" height="60" viewBox="0 0 36 60">
            <path
              d="M1 30h30m-12-12 12 12-12 12"
              fill="none"
              stroke="#708090"
              strokeWidth="3"
              pathLength="1"
              strokeDasharray="1"
              strokeDashoffset={interpolate(
                frame,
                [2.7 * fps, 3.3 * fps],
                [1, 0],
                { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
              )}
            />
          </svg>
          <div
            style={{
              width: 342,
              background: BRAND.white,
              border: "1px solid #70809055",
              borderRadius: 24,
              height: 300,
              opacity: interpolate(frame, [2.9 * fps, 3.5 * fps], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              }),
            }}
          >
            <div
              data-text-unit
              style={{ padding: "24px 24px 0", fontSize: 26, fontWeight: 800 }}
            >
              REVISI
            </div>
            <div style={{ height: 220 }}>
              <OriginalFlower edited detail />
            </div>
          </div>
        </div>
        <Interactive.Div
          name="Siklus revisi gambar"
          data-text-unit
          style={{
            marginTop: 30,
            fontSize: 31,
            fontWeight: 800,
            opacity: interpolate(frame, [4.8 * fps, 5.3 * fps], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          BUAT → PILIH AREA → REVISI → ULANGI
        </Interactive.Div>
        <Interactive.Div
          name="Informasi tambahan kontrol API"
          data-text-unit
          style={{
            marginTop: 35,
            paddingTop: 23,
            borderTop: "1px solid #70809055",
            opacity: interpolate(frame, [7.5 * fps, 8 * fps], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          <div style={{ fontSize: 25, fontWeight: 800 }}>
            KONTROL API BARU: complexity
          </div>
          <div
            style={{
              fontSize: 24,
              marginTop: 8,
              color: BRAND.gray,
              lineHeight: 1.4,
            }}
          >
            Atur porsi perencanaan model,
            <br />
            terpisah dari kualitas gambar.
          </div>
        </Interactive.Div>
      </Stage>
    </SceneCanvas>
  );
};

export const NewCapabilitiesScene: React.FC<{
  markupAt: number;
  svgAt: number;
}> = ({ markupAt, svgAt }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const active = frame / fps < markupAt ? 0 : frame / fps < svgAt ? 1 : 2;
  return (
    <SceneCanvas>
      <AnimatedHeadline lines={["FITUR BARU"]} size={101} />
      <div style={{ position: "absolute", left: 110, top: 435, width: 740 }}>
        <div
          data-text-unit
          style={{
            fontSize: 78,
            letterSpacing: "-0.05em",
            fontWeight: 800,
            color: BRAND.slate,
          }}
        >
          {FEATURES[active].title}
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 16,
            marginTop: 46,
          }}
        >
          {FEATURES.map(({ label }, i) => (
            <div
              key={label}
              data-text-unit
              style={{
                borderTop: `4px solid ${i === active ? BRAND.black : "#70809040"}`,
                paddingTop: 18,
                fontSize: 25,
                fontWeight: 800,
              }}
            >
              {label}
            </div>
          ))}
        </div>
      </div>
      <Sequence
        name="GIF — enam pose menjadi loop"
        durationInFrames={Math.round(markupAt * fps)}
      >
        <Stage top={720}>
          <GifConceptPanel mode="feature" pace={1.8} />
          <div style={{ marginTop: 24 }}>
            <Note>GIF berulang, bukan video penuh.</Note>
          </div>
        </Stage>
      </Sequence>
      <Sequence
        name="Markup — pilih area dan revisi"
        from={Math.round(markupAt * fps)}
        durationInFrames={Math.round(svgAt * fps) - Math.round(markupAt * fps)}
      >
        <Stage top={720}>
          <MarkupEditDemo pace={2.4} />
        </Stage>
      </Sequence>
      <Sequence
        name="SVG — desain menjadi jalur vektor"
        from={Math.round(svgAt * fps)}
      >
        <Stage top={720}>
          <SvgExportCard />
        </Stage>
      </Sequence>
    </SceneCanvas>
  );
};

export const ClosingScene: React.FC<{ ctaAt: number; promptAt: number }> = ({
  ctaAt,
  promptAt,
}) => {
  const { fps } = useVideoConfig();
  return (
    <SceneCanvas dark>
      <Sequence
        name="Catatan realistis"
        durationInFrames={Math.round(ctaAt * fps)}
      >
        <AnimatedHeadline
          lines={["LEBIH CEPAT", "BELUM BERARTI", "OTOMATIS", "SEMPURNA"]}
          size={88}
          dark
          accent={3}
        />
        <Stage top={735}>
          <RevisionMotion promptAt={promptAt} />
        </Stage>
      </Sequence>
      <Sequence name="Pertanyaan penutup" from={Math.round(ctaAt * fps)}>
        <AnimatedHeadline
          lines={["PALING MENARIK", "YANG MANA?"]}
          size={88}
          dark
          accent={1}
        />
        <Stage top={650}>
          <ClosingChoicesMotion />
        </Stage>
      </Sequence>
    </SceneCanvas>
  );
};

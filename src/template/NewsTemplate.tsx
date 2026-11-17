import type { Caption } from "@remotion/captions";
import {
  AbsoluteFill,
  Sequence,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { FONT_FAMILY } from "../fonts";
import { Canvas, ContentStage, Headline } from "./Editorial";
import { FullCanvasOverlays } from "./FullCanvasOverlays";

// Demonstration copy only: replace with narration-aligned cues for each episode.
const captions: readonly Caption[] = [
  {
    text: "Ganti dengan hook topikmu.",
    startMs: 0,
    endMs: 4000,
    timestampMs: null,
    confidence: null,
  },
  {
    text: "Jelaskan satu ide utama.",
    startMs: 4000,
    endMs: 8000,
    timestampMs: null,
    confidence: null,
  },
  {
    text: "Tutup dengan pertanyaan.",
    startMs: 8000,
    endMs: 12000,
    timestampMs: null,
    confidence: null,
  },
];

const StableOverlays = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <FullCanvasOverlays
      captions={captions}
      cues={[
        {
          fromMs: 0,
          src: "assets/images/charactersheet/karaktersheet-r1c4.png",
          description: "Terkejut",
        },
        {
          fromMs: 4000,
          src: "assets/images/charactersheet/karaktersheet-r1c3.png",
          description: "Ramah",
        },
        {
          fromMs: 8000,
          src: "assets/images/charactersheet/karaktersheet-r1c5.png",
          description: "Berpikir",
        },
      ]}
      dark={frame < 4 * fps}
    />
  );
};

export const NewsTemplate = () => {
  const { fps, durationInFrames } = useVideoConfig();
  return (
    <AbsoluteFill
      style={{ backgroundColor: "#FAF9F6", fontFamily: FONT_FAMILY }}
    >
      <Sequence name="01 — Hook" durationInFrames={4 * fps}>
        <Canvas dark>
          <Headline
            supporting="TEMPLATE BERITA · GANTI DENGAN TOPIKMU"
            size={104}
          >
            APA YANG
            <br />
            BERUBAH?
          </Headline>
          <ContentStage>
            <div style={{ fontSize: 46, fontWeight: 700, lineHeight: 1.3 }}>
              Mulai dari satu
              <br />
              pertanyaan kuat.
            </div>
          </ContentStage>
        </Canvas>
      </Sequence>
      <Sequence
        name="02 — Penjelasan"
        from={4 * fps}
        durationInFrames={4 * fps}
      >
        <Canvas>
          <Headline
            supporting="ISI DENGAN FAKTA YANG SUDAH DIVERIFIKASI"
            size={104}
          >
            SATU IDE.
            <br />
            <span style={{ color: "#708090" }}>JELASIN DULU.</span>
          </Headline>
          <ContentStage>
            <div style={{ fontSize: 46, fontWeight: 700, lineHeight: 1.3 }}>
              Konteks → Penjelasan
              <br />→ Dampak
            </div>
            <div
              style={{
                borderTop: "1px solid #70809040",
                marginTop: 32,
                paddingTop: 20,
                fontSize: 24,
                lineHeight: 1.5,
              }}
            >
              Tempatkan diagram atau gambar tanpa bingkai.
              <br />
              Kredit sumber disimpan di dokumentasi episode.
            </div>
          </ContentStage>
        </Canvas>
      </Sequence>
      <Sequence
        name="03 — Penutup"
        from={8 * fps}
        durationInFrames={durationInFrames - 8 * fps}
      >
        <Canvas>
          <Headline supporting="TUTUP DENGAN SATU PERTANYAAN" size={104}>
            MENURUT
            <br />
            <span style={{ color: "#708090" }}>KAMU GIMANA?</span>
          </Headline>
          <ContentStage>
            <div style={{ fontSize: 46, fontWeight: 700, lineHeight: 1.3 }}>
              Ganti topik dan narasi.
              <br />
              Pertahankan layout.
            </div>
          </ContentStage>
        </Canvas>
      </Sequence>
      <Sequence name="Overlay persisten — karakter, subtitle, watermark">
        <StableOverlays />
      </Sequence>
    </AbsoluteFill>
  );
};

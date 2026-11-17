import React from "react";
import {
  Img,
  Interactive,
  interpolate,
  Sequence,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import {
  Canvas,
  ContentStage,
  Headline,
  SmallLabel,
} from "../components/Editorial";
import {
  CandleToData,
  Candles,
  ScenarioPaths,
  TokenPipeline,
} from "../components/Diagrams";

export const HookScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <Canvas dark>
      <Headline supporting="TAPI BUKAN DARI GAMBAR!" size={100}>
        AI BISA BACA
        <br />
        CANDLESTICK?!
      </Headline>
      <ContentStage>
        <SmallLabel>ILUSTRASI</SmallLabel>
        <div
          style={{
            opacity: interpolate(frame, [2.52 * fps, 3.2 * fps], [1, 0], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          <Candles dark />
        </div>
        <div
          data-kronos-focus
          style={{
            position: "absolute",
            left: 36,
            top: 110,
            right: 36,
            opacity: interpolate(frame, [2.52 * fps, 3.2 * fps], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          <div style={{ fontSize: 22, color: "#708090", fontWeight: 700 }}>
            BUKA / TERTINGGI / TERENDAH / TUTUP
          </div>
          <div
            style={{
              fontSize: 47,
              marginTop: 22,
              fontWeight: 600,
              letterSpacing: "-0.035em",
            }}
          >
            100 / 108 / 97 / 104
          </div>
          <div style={{ fontSize: 20, marginTop: 24 }}>
            Data fiktif untuk penjelasan.
          </div>
        </div>
      </ContentStage>
    </Canvas>
  );
};

export const RevealScene: React.FC = () => (
  <Canvas>
    <Headline supporting="MODEL FONDASI K-LINE FINANSIAL" size={112}>
      KENALIN,
      <br />
      <span style={{ color: "#708090" }}>KRONOS!</span>
    </Headline>
    <ContentStage>
      <SmallLabel>RISET 2025 · AGUSTUS 2025</SmallLabel>
      <div
        data-kronos-focus
        style={{
          fontSize: 61,
          fontWeight: 800,
          letterSpacing: "-0.05em",
          marginTop: 20,
        }}
      >
        Kronos
      </div>
      <div
        data-kronos-focus
        style={{
          fontSize: 25,
          fontWeight: 600,
          lineHeight: 1.5,
          marginTop: 16,
        }}
      >
        Model fondasi untuk memodelkan
        <br />
        rangkaian data pasar finansial.
      </div>
      <div
        data-kronos-focus
        style={{
          borderTop: "1px solid #70809040",
          marginTop: 26,
          paddingTop: 18,
          fontSize: 18,
          color: "#555555",
          lineHeight: 1.5,
        }}
      >
        Ringkasan redaksi dari kartu model resmi.
        <br />
        Bukan pengumuman rilis baru pada 2026.
      </div>
    </ContentStage>
  </Canvas>
);

export const NumericalScene: React.FC = () => (
  <Canvas>
    <Headline supporting="DATA DI BALIK SETIAP CANDLE" size={88}>
      BUKAN SCREENSHOT
      <br />
      <span style={{ color: "#708090" }}>TAPI DATA ANGKA</span>
    </Headline>
    <ContentStage>
      <SmallLabel>DATA ILUSTRATIF · NILAI DAN WAKTU FIKTIF</SmallLabel>
      <CandleToData />
      <div
        data-kronos-focus
        style={{
          fontSize: 16,
          marginTop: 6,
          color: "#555555",
          lineHeight: 1.25,
        }}
      >
        Alur resmi juga memuat volume dan nilai transaksi.
        <br />
        Waktu adalah konteks terpisah dari fitur harga.
      </div>
    </ContentStage>
  </Canvas>
);

export const TokenizationScene: React.FC = () => (
  <Canvas>
    <Headline supporting="TOKENISASI DAN PREDIKSI AUTOREGRESIF" size={104}>
      ANGKA → TOKEN
      <br />
      <span style={{ color: "#708090" }}>→ PROYEKSI</span>
    </Headline>
    <ContentStage>
      <SmallLabel>DIAGRAM PENJELAS · BUKAN EKSEKUSI MODEL</SmallLabel>
      <TokenPipeline />
      <div
        data-kronos-focus
        style={{ fontSize: 16, color: "#555555", marginTop: 16 }}
      >
        Angka fiktif; bentuk simbolis, bukan ID tokenizer Kronos.
      </div>
    </ContentStage>
  </Canvas>
);

export const ScenariosScene: React.FC = () => (
  <Canvas>
    <Headline supporting="SAMPLING MEMBUKA BEBERAPA KEMUNGKINAN" size={100}>
      BUKAN CUMA
      <br />
      <span style={{ color: "#708090" }}>SATU SKENARIO</span>
    </Headline>
    <ContentStage>
      <SmallLabel>ILUSTRASI — BUKAN OUTPUT MODEL</SmallLabel>
      <ScenarioPaths />
    </ContentStage>
  </Canvas>
);

export const ClosingScene: React.FC = () => {
  const { fps } = useVideoConfig();
  return (
    <Canvas>
      <Sequence name="Batasan riset" durationInFrames={Math.round(7.6 * fps)}>
        <Headline supporting="HASIL RISET BUKAN JAMINAN KEUNTUNGAN" size={104}>
          PROYEKSI
          <br />
          <span style={{ color: "#708090" }}>≠ KEPASTIAN</span>
        </Headline>
        <ContentStage>
          <SmallLabel>CATATAN RISET · BUKAN SARAN INVESTASI</SmallLabel>
          <div
            data-kronos-focus
            style={{
              fontSize: 31,
              fontWeight: 700,
              lineHeight: 1.35,
              letterSpacing: "-0.03em",
              marginTop: 26,
            }}
          >
            Hasil riset dan uji historis
            <br />
            tidak menjamin untung
            <br />
            di perdagangan nyata.
          </div>
          <div
            data-kronos-focus
            style={{
              marginTop: 26,
              borderTop: "1px solid #70809040",
              paddingTop: 22,
              fontSize: 21,
              lineHeight: 1.5,
              color: "#555555",
            }}
          >
            Demo historis bukan ramalan terkini.
            <br />
            Tidak ada rekomendasi transaksi.
          </div>
        </ContentStage>
      </Sequence>
      <Sequence
        name="Pertanyaan penutup dan GitHub Kronos"
        from={Math.round(7.6 * fps)}
      >
        <Headline supporting="MENURUT KAMU, LEBIH MENARIK YANG MANA?" size={96}>
          RISET AI ATAU
          <br />
          <span style={{ color: "#708090" }}>ANALISIS PASAR?</span>
        </Headline>
        <ContentStage>
          <SmallLabel>KUNJUNGI REPOSITORINYA</SmallLabel>
          <Img
            name="Screenshot halaman GitHub Kronos"
            alt="Halaman repositori GitHub shiyu-coder/Kronos, tangkapan 2 November 2026"
            data-kronos-github-screenshot
            src={staticFile("assets/images/kronos/github-kronos.png")}
            style={{
              display: "block",
              width: "100%",
              height: 260,
              objectFit: "contain",
              marginTop: 14,
            }}
          />
          <Interactive.Div
            name="Alamat GitHub untuk dikunjungi"
            data-kronos-focus
            data-kronos-github-url
            style={{
              fontSize: 27,
              fontWeight: 700,
              lineHeight: 1.35,
              letterSpacing: "-0.025em",
              marginTop: 16,
            }}
          >
            github.com/shiyu-coder/Kronos
          </Interactive.Div>
        </ContentStage>
      </Sequence>
    </Canvas>
  );
};

import React from "react";
import {
  Interactive,
  Img,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import {
  Canvas,
  Credit,
  Headline,
  Panel,
  Photo,
} from "../components/Editorial";
import {
  ApiAvailability,
  ClosingChoice,
  LimitsFlow,
  ManagementFlow,
  MistralLogoLockup,
} from "../components/MotionGraphics";
import { MISTRAL_SOURCES } from "../data/timing";

export const HookScene: React.FC = () => (
  <Canvas dark>
    <Headline supporting="TANPA HARUS LEWAT API MISTRAL" size={76}>
      AI BISA
      <br />
      JALAN SENDIRI?!
    </Headline>
    <MistralLogoLockup />
  </Canvas>
);

const ReleaseCard: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const released = frame >= Math.round(3.7 * fps);
  return (
    <Panel style={{ width: 366, height: 400, padding: 28 }}>
      <div
        style={{
          fontSize: 17,
          fontWeight: 700,
          lineHeight: 1.5,
          color: "#555555",
        }}
      >
        RINGKASAN REDAKSI
        <br />
        PENGUMUMAN RESMI
      </div>
      <Interactive.Div
        name="Rilis bobot Mistral"
        data-mistral-focus
        style={{
          marginTop: 42,
          fontSize: 43,
          fontWeight: 800,
          lineHeight: 1.08,
          letterSpacing: "-0.045em",
        }}
      >
        BOBOT
        <br />
        MODEL
        <br />
        <span style={{ color: "#708090" }}>DIRILIS.</span>
      </Interactive.Div>
      <div
        data-mistral-focus
        style={{
          marginTop: 26,
          fontSize: 20,
          lineHeight: 1.4,
          fontWeight: 600,
        }}
      >
        {released
          ? "Mistral Large 4"
          : "Bisa diakses dan disesuaikan sesuai lisensi."}
      </div>
    </Panel>
  );
};

export const ProductScene: React.FC = () => (
  <Canvas>
    <Headline supporting="MODEL AI OPEN-WEIGHT" size={86}>
      MISTRAL
      <br />
      LARGE 4
    </Headline>
    <Credit url={MISTRAL_SOURCES.programmer} photo top={716} />
    <div
      style={{
        position: "absolute",
        left: 132,
        top: 750,
        width: 696,
        display: "flex",
        gap: 22,
      }}
    >
      <div style={{ width: 308, flexShrink: 0 }}>
        <Photo
          src="assets/documentary/laptop-coding.jpg"
          alt="Ilustrasi pengembangan perangkat lunak, bukan tim Mistral"
          height={400}
          position="62% 50%"
        />
      </div>
      <ReleaseCard />
    </div>
  </Canvas>
);

export const WeightsScene: React.FC = () => (
  <Canvas>
    <Headline supporting="REPOSITORI RESMI HUGGING FACE" size={77}>
      BOBOT AI
      <br />
      TERSEDIA
    </Headline>
    <Credit url={MISTRAL_SOURCES.repository} top={716} />
    <div style={{ position: "absolute", left: 132, top: 750, width: 696 }}>
      <Panel style={{ height: 400, padding: 16, overflow: "hidden" }}>
        <Img
          name="Screenshot asli — model card Mistral di Hugging Face"
          data-mistral-screenshot="huggingface"
          alt="Cuplikan asli model card resmi Mistral Large 4 di Hugging Face"
          src={staticFile("assets/mistral/huggingface-mistral-model-card.png")}
          style={{
            display: "block",
            width: "100%",
            height: "100%",
            objectFit: "contain",
          }}
        />
      </Panel>
    </div>
  </Canvas>
);

export const ChoiceScene: React.FC<{ reminder?: boolean }> = ({
  reminder = false,
}) => (
  <Canvas>
    <Headline
      supporting={
        reminder
          ? "TANPA HARUS MENJALANKAN BOBOT SENDIRI"
          : "SESUAI KEBUTUHAN DAN INFRASTRUKTUR"
      }
      size={78}
    >
      {reminder ? (
        <>
          PILIHAN API
          <br />
          TETAP ADA
        </>
      ) : (
        <>
          KENDALI ADA
          <br />
          DI TANGANMU
        </>
      )}
    </Headline>
    {reminder ? <ApiAvailability /> : <ManagementFlow />}
  </Canvas>
);

export const LimitationsScene: React.FC = () => (
  <Canvas dark>
    <Headline supporting="OPEN-WEIGHT BUKAN BEBAS SYARAT" size={77}>
      TETAP ADA
      <br />
      BATASNYA
    </Headline>
    <Credit url={MISTRAL_SOURCES.license} dark top={642} />
    <LimitsFlow />
  </Canvas>
);

export const ClosingScene: React.FC = () => (
  <Canvas>
    <Headline supporting="SESUAI KEBUTUHAN PROYEK" size={84}>
      KAMU PILIH
      <br />
      YANG MANA?
    </Headline>
    <ClosingChoice />
  </Canvas>
);

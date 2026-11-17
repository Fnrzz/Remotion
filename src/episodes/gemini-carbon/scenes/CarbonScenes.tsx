import React from "react";
import {
  Img,
  Interactive,
  Sequence,
  interpolate,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { TikTokSafeStage } from "../../../components/TikTokSafeStage";
import { COLORS } from "../../../theme";
import { DOCUMENTARY } from "../data/documentaryAssets";
import {
  DocumentaryImageCard,
  PhotoDissolve,
  PhotoCaption,
} from "../components/DocumentaryImageCard";
import {
  BODY_TOP,
  EditorialCard,
  Headline,
  Label,
  SceneTransition,
} from "../components/EditorialPrimitives";
import { WorkflowDiagram } from "../components/CarbonGraphics";
import { AgentLaptopIllustration } from "../components/AgentLaptopIllustration";
import { AgentCodeMotion } from "../components/AgentCodeMotion";
import { AiEvolutionMotion } from "../components/AiEvolutionMotion";

const SceneLayout: React.FC<{
  children: React.ReactNode;
  dark?: boolean;
  immediate?: boolean;
}> = ({ children, dark, immediate }) => (
  <SceneTransition dark={dark} immediate={immediate}>
    <TikTokSafeStage
      focusBounds={{ left: 60, top: 210, right: 1080, bottom: 1040 }}
    >
      {children}
    </TikTokSafeStage>
  </SceneTransition>
);

export const HookScene: React.FC = () => (
  <SceneLayout dark immediate>
    <Headline dark immediate size={98}>
      AI NGODING
      <br />
      BERHARI-HARI?!
    </Headline>
    <div
      data-hook-laptop-shell="true"
      style={{
        position: "absolute",
        left: 108,
        top: BODY_TOP + 98,
        width: 924,
      }}
    >
      <AgentLaptopIllustration />
    </div>
  </SceneLayout>
);

export const ProductScene: React.FC = () => (
  <SceneLayout>
    <Headline size={98}>
      GOOGLE
      <br />
      <div data-product-branding="true" style={{ marginTop: 8 }}>
        <Img
          name="Wordmark Gemini — pengenalan model"
          data-product-logo="true"
          alt="Logo Gemini milik Google"
          src={staticFile("assets/branding/google-gemini-wordmark.svg")}
          style={{
            display: "block",
            width: 500,
            height: 175,
            objectFit: "contain",
            objectPosition: "left center",
          }}
        />
        <Interactive.Div
          name="Nama model — 4 Carbon"
          style={{
            marginTop: 8,
            fontSize: 56,
            lineHeight: 1.1,
            fontWeight: 700,
            letterSpacing: "0.08em",
            color: COLORS.slate,
          }}
        >
          4 CARBON
        </Interactive.Div>
      </div>
    </Headline>
    <EditorialCard>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 34,
          height: "100%",
        }}
      >
        <div style={{ width: 350, flexShrink: 0 }}>
          <DocumentaryImageCard
            src={DOCUMENTARY.office.src}
            alt={DOCUMENTARY.office.description}
            height={460}
            duration={6.68}
          />
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <Interactive.Div
            name="Ringkasan pengumuman Google"
            style={{
              marginTop: 28,
              fontSize: 44,
              fontWeight: 800,
              lineHeight: 1.12,
              letterSpacing: "-0.045em",
            }}
          >
            REKAYASA KODE
            <br />
            <span style={{ color: COLORS.slate }}>& KEAMANAN SIBER</span>
          </Interactive.Div>
          <Label
            style={{ marginTop: 24, fontSize: 28, letterSpacing: "-0.015em" }}
          >
            Gemini 4 Carbon diperkenalkan sebagai model frontier baru.
          </Label>
          <Label
            style={{ marginTop: 26, fontSize: 23, letterSpacing: "-0.015em" }}
          >
            Ringkasan redaksi, bukan screenshot.
            <br />
            Foto kantor bukan dokumentasi tim Carbon.
          </Label>
        </div>
      </div>
    </EditorialCard>
  </SceneLayout>
);

export const WorkflowPhotoSequence: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <>
      <div style={{ position: "relative", height: 355 }}>
        <Sequence
          name="Coding kompleks — foto workspace"
          layout="none"
          durationInFrames={Math.round(3.68 * fps)}
        >
          <div style={{ position: "absolute", inset: 0 }}>
            <DocumentaryImageCard
              src={DOCUMENTARY.workspace.src}
              alt={DOCUMENTARY.workspace.description}
              height={355}
              duration={3.4}
            />
          </div>
        </Sequence>
        <Sequence
          name="Proses bertahap — foto pemrograman"
          layout="none"
          from={Math.round(3.4 * fps)}
          durationInFrames={Math.round(2.7 * fps)}
        >
          <div style={{ position: "absolute", inset: 0 }}>
            <DocumentaryImageCard
              src={DOCUMENTARY.debugging.src}
              alt={DOCUMENTARY.debugging.description}
              height={355}
              duration={2.5}
              position="50% 45%"
            />
          </div>
        </Sequence>
        <div
          data-original-workflow="true"
          style={{
            position: "absolute",
            inset: 0,
            paddingTop: 20,
            backgroundColor: COLORS.white,
            opacity: interpolate(frame, [5.85 * fps, 6.1 * fps], [0, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          <WorkflowDiagram />
        </div>
      </div>
      <Interactive.Div
        name="Tahapan pekerjaan kode"
        style={{
          marginTop: 18,
          fontSize: 36,
          fontWeight: 700,
          letterSpacing: "-0.025em",
        }}
      >
        {frame < Math.round(3.4 * fps)
          ? "CODING KOMPLEKS"
          : frame < Math.round(5.9 * fps)
            ? "PROSES BERTAHAP"
            : "CARI & PERBAIKI BUG"}
      </Interactive.Div>
    </>
  );
};

export const WorkflowScene: React.FC = () => (
  <SceneLayout>
    <Headline>
      CARI BUG
      <br />
      <span style={{ color: COLORS.slate }}>PERBAIKI KODE</span>
    </Headline>
    <EditorialCard>
      <Label style={{ fontSize: 23, marginBottom: 14 }}>
        AI AGENT · ILUSTRASI ALUR KERJA
      </Label>
      <AgentCodeMotion mode="bug" />
      <Label style={{ marginTop: 10, fontSize: 23, letterSpacing: "-0.015em" }}>
        Pengamatan internal Google, bukan jaminan performa.
      </Label>
    </EditorialCard>
  </SceneLayout>
);

export const CyberPhotoSequence: React.FC = () => {
  const { fps } = useVideoConfig();
  return (
    <div style={{ position: "relative", height: 398 }}>
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "grid",
          gridTemplateColumns: "1.65fr 1fr",
          gap: 24,
        }}
      >
        <div>
          <DocumentaryImageCard
            src={DOCUMENTARY.security.src}
            alt={DOCUMENTARY.security.description}
            height={345}
            duration={4}
          />
          <PhotoCaption>CARI CELAH</PhotoCaption>
        </div>
        <div style={{ paddingTop: 62 }}>
          <DocumentaryImageCard
            src={DOCUMENTARY.inspection.src}
            alt={DOCUMENTARY.inspection.description}
            height={242}
            duration={4}
            revealAt={0.12}
          />
          <PhotoCaption>INFRASTRUKTUR</PhotoCaption>
        </div>
      </div>
      <Sequence
        name="Perbaiki kode — foto review"
        layout="none"
        from={Math.round(3.7 * fps)}
      >
        <PhotoDissolve>
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "grid",
              gridTemplateColumns: "1.65fr 1fr",
              gap: 24,
              backgroundColor: COLORS.white,
            }}
          >
            <div>
              <DocumentaryImageCard
                src={DOCUMENTARY.review.src}
                alt={DOCUMENTARY.review.description}
                height={345}
                duration={3.7}
              />
              <PhotoCaption>PERBAIKI KODE</PhotoCaption>
            </div>
            <div style={{ paddingTop: 62 }}>
              <DocumentaryImageCard
                src={DOCUMENTARY.hardware.src}
                alt={DOCUMENTARY.hardware.description}
                height={242}
                duration={3.7}
                revealAt={0.12}
              />
              <PhotoCaption>LINGKUNGAN TEKNIS</PhotoCaption>
            </div>
          </div>
        </PhotoDissolve>
      </Sequence>
    </div>
  );
};

export const CyberScene: React.FC = () => (
  <SceneLayout>
    <Headline>
      KEAMANAN
      <br />
      <span style={{ color: COLORS.slate }}>SIBER</span>
    </Headline>
    <EditorialCard>
      <Label style={{ fontSize: 23, marginBottom: 18 }}>
        ILUSTRASI · KAPABILITAS MENURUT GOOGLE
      </Label>
      <AgentCodeMotion mode="security" />
      <Label style={{ marginTop: 18, fontSize: 23, letterSpacing: "-0.015em" }}>
        Skema edukasi, bukan demo atau jaminan keamanan.
      </Label>
    </EditorialCard>
  </SceneLayout>
);

export const AccessScene: React.FC = () => (
  <SceneLayout dark>
    <Headline dark>
      AKSES MASIH
      <br />
      TERBATAS
    </Headline>
    <Label
      style={{
        position: "absolute",
        left: 72,
        top: 480,
        color: COLORS.white,
        fontSize: 39,
        fontWeight: 700,
        letterSpacing: "-0.025em",
      }}
    >
      RILIS PUBLIK BELUM DIUMUMKAN
    </Label>
    <div
      data-access-content="true"
      style={{
        position: "absolute",
        left: 108,
        top: BODY_TOP + 42,
        width: 924,
        color: COLORS.white,
      }}
    >
      <div
        style={{
          marginTop: 34,
          display: "flex",
          gap: 24,
          alignItems: "baseline",
        }}
      >
        <span
          style={{
            fontSize: 100,
            fontWeight: 800,
            color: COLORS.slate,
            lineHeight: 1,
          }}
        >
          01
        </span>
        <div style={{ fontSize: 42, lineHeight: 1.15, fontWeight: 700 }}>
          PEMBELA SIBER
          <br />
          TERPILIH
        </div>
      </div>
      <div
        style={{ height: 1, backgroundColor: COLORS.slate, margin: "30px 0" }}
      />
      <div style={{ display: "flex", gap: 24, alignItems: "baseline" }}>
        <span
          style={{
            fontSize: 100,
            fontWeight: 800,
            color: COLORS.slate,
            lineHeight: 1,
          }}
        >
          02
        </span>
        <div style={{ fontSize: 42, lineHeight: 1.15, fontWeight: 700 }}>
          MITRA TEPERCAYA
          <br />
          SECARA BERTAHAP
        </div>
      </div>
      <Label
        style={{
          fontSize: 25,
          color: COLORS.offWhite,
          fontWeight: 700,
          lineHeight: 1.3,
          marginTop: 34,
          letterSpacing: "-0.01em",
        }}
      >
        Rencana perluasan akses ≠ tersedia untuk umum.
      </Label>
    </div>
  </SceneLayout>
);

export const ClosingScene: React.FC = () => (
  <SceneLayout>
    <Headline size={94}>
      BANTU
      <br />
      DEVELOPER?
      <br />
      <span style={{ color: COLORS.slate }}>
        ATAU PERLU
        <br />
        DIAWASI?
      </span>
    </Headline>
    <div
      data-closing-content="true"
      style={{
        position: "absolute",
        left: 108,
        top: BODY_TOP + 114,
        width: 924,
      }}
    >
      <AiEvolutionMotion />
    </div>
  </SceneLayout>
);

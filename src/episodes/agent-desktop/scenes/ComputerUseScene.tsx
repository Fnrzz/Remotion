import React from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { MOTION } from "../design";
import { AnimatedHeadline } from "../components/AnimatedHeadline";
import { DesktopWindow } from "../components/DesktopWindow";
import { AnimatedCursor } from "../components/AnimatedCursor";
import { AccessibilityTree } from "../components/AccessibilityTree";
import { AnimatedConnector } from "../components/AnimatedConnector";
import { BeforeAfterState } from "../components/BeforeAfterState";
import { AgentActionFlow } from "../components/AgentActionFlow";
import {
  ContentStage,
  MechanismLabel,
  SceneFrame,
} from "../components/SceneFrame";

export const ComputerUseScene: React.FC<{
  read: number;
  reread: number;
  action: number;
  check: number;
  summary: number;
}> = ({ read, reread, action, check, summary }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  return (
    <SceneFrame>
      <AnimatedHeadline
        lines={["BACA → TINDAKAN", "→ CEK LAGI."]}
        supporting={
          t < action
            ? "BACA STRUKTUR UI YANG DIEKSPOS"
            : t < check
              ? "PILIH ELEMEN → KIRIM TINDAKAN"
              : "OBSERVASI BARU, BARU LANJUT."
        }
        size={90}
      />
      <ContentStage>
        <MechanismLabel />
        <div
          style={{
            position: "relative",
            opacity: interpolate(t, [check - 0.12, check], [1, 0], MOTION),
          }}
        >
          <div style={{ position: "absolute", left: 0, top: 9 }}>
            <DesktopWindow
              width={335}
              compact
              typing={action - 0.6}
              focus={action - 1}
              click={action + 0.75}
              highlightButton={read + 0.39}
            />
            <AnimatedCursor
              times={[action - 0.5, action + 0.2, action + 0.7]}
              xs={[150, 260, 260]}
              ys={[180, 180, 180]}
              click={action + 0.75}
            />
          </div>
          <AnimatedConnector
            d="M335 185H364V180H390"
            start={read}
            height={260}
            packet={action}
          />
          <div
            style={{
              position: "absolute",
              left: 391,
              top: 0,
              scale: interpolate(
                t,
                [reread - 0.08, reread + 0.12, reread + 0.4],
                [1, 1.035, 1],
                MOTION,
              ),
            }}
          >
            <AccessibilityTree start={read} select={read + 0.39} />
          </div>
          <div style={{ position: "absolute", top: 285, width: 636 }}>
            <AgentActionFlow start={Math.max(0, action - 1)} action={action} />
          </div>
        </div>
        <div
          style={{
            position: "absolute",
            top: 60,
            width: 636,
            opacity: interpolate(t, [summary - 0.3, summary], [1, 0], MOTION),
          }}
        >
          <BeforeAfterState start={check} />
          <div
            data-ad-text
            style={{
              fontSize: 19,
              color: "#555555",
              marginTop: 30,
              opacity: interpolate(
                t,
                [check + 0.3, check + 0.7],
                [0, 1],
                MOTION,
              ),
            }}
          >
            Perubahan contoh perlu dibaca ulang oleh pemanggil.
            <br />
            Ilustrasi, bukan bukti eksekusi produk.
          </div>
        </div>
        <div
          style={{
            position: "absolute",
            top: 90,
            width: 636,
            opacity: interpolate(t, [summary, summary + 0.3], [0, 1], MOTION),
          }}
        >
          <div
            data-ad-text
            style={{
              fontSize: 44,
              fontWeight: 800,
              letterSpacing: "-0.04em",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <span>BACA</span>
            <span style={{ color: "#708090", fontSize: 28 }}>→</span>
            <span>TINDAKAN</span>
            <span style={{ color: "#708090", fontSize: 28 }}>→</span>
            <span>CEK</span>
          </div>
          <AnimatedConnector
            d="M600 84V125H40V84"
            start={summary + 0.15}
            height={160}
          />
          <div
            data-ad-text
            style={{
              fontSize: 22,
              marginTop: 104,
              fontWeight: 600,
              color: "#555555",
            }}
          >
            Siklus diatur agent / program pemanggil.
          </div>
        </div>
      </ContentStage>
    </SceneFrame>
  );
};

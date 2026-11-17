import React from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { MOTION } from "../design";
import { AnimatedHeadline } from "../components/AnimatedHeadline";
import { PermissionCards } from "../components/PermissionCards";
import {
  ContentStage,
  MechanismLabel,
  SceneFrame,
} from "../components/SceneFrame";

const ApplicationGrid: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        gap: 22,
      }}
    >
      {Array.from({ length: 8 }, (_, i) => (
        <div
          key={i}
          style={{
            borderBottom: "1px solid #708090",
            padding: "15px 0 22px",
            textAlign: "center",
            opacity: interpolate(
              frame / fps,
              [i * 0.07, i * 0.07 + 0.3],
              [0, [0, 2, 5].includes(i) ? 1 : 0.23],
              MOTION,
            ),
            translate: interpolate(
              frame / fps,
              [i * 0.07, i * 0.07 + 0.3],
              ["0px 20px", "0px 0px"],
              MOTION,
            ),
          }}
        >
          <svg width="68" height="59" viewBox="0 0 68 59">
            <rect
              x="5"
              y="4"
              width="58"
              height="46"
              rx="4"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            />
            <path
              d={
                i % 2
                  ? "M17 17H50M17 26H42M17 35H34"
                  : "M18 37V27H27V37M32 37V20H41V37M46 37V12H53V37"
              }
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            />
          </svg>
          <div style={{ fontSize: 16, marginTop: 8 }}>
            Aplikasi {String.fromCharCode(65 + i)}
          </div>
        </div>
      ))}
    </div>
  );
};

export const LimitationsScene: React.FC<{
  permissions: number;
  sent: number;
}> = ({ permissions, sent }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  return (
    <SceneFrame dark>
      <AnimatedHeadline
        lines={
          t < sent ? ["TIDAK SEMUA", "APLIKASI."] : ["TERKIRIM", "≠ SELESAI."]
        }
        supporting={
          t < sent ? "DUKUNGAN & IZIN BISA BERBEDA" : "CEK HASIL, JANGAN ASUMSI"
        }
        size={108}
      />
      <ContentStage>
        <MechanismLabel />
        <div
          style={{
            opacity: interpolate(
              t,
              [permissions - 0.3, permissions],
              [1, 0],
              MOTION,
            ),
          }}
        >
          <ApplicationGrid />
          <div style={{ fontSize: 17, color: "#708090", marginTop: 18 }}>
            Simbol konseptual, bukan daftar dukungan teruji.
          </div>
        </div>
        <div
          style={{
            position: "absolute",
            top: 45,
            width: 636,
            opacity: interpolate(t, [sent - 0.3, sent], [1, 0], MOTION),
          }}
        >
          <PermissionCards start={permissions} />
        </div>
        <div
          style={{
            position: "absolute",
            top: 58,
            width: 636,
            opacity: interpolate(t, [sent, sent + 0.35], [0, 1], MOTION),
          }}
        >
          <div data-ad-text style={{ fontSize: 35, fontWeight: 700 }}>
            TINDAKAN TERKIRIM
          </div>
          <div
            style={{
              fontSize: 104,
              color: "#708090",
              fontWeight: 800,
              lineHeight: 1.3,
              translate: interpolate(
                t,
                [sent, sent + 0.3],
                ["0px 18px", "0px 0px"],
                MOTION,
              ),
            }}
          >
            ≠
          </div>
          <div data-ad-text style={{ fontSize: 35, fontWeight: 700 }}>
            TUGAS SELESAI
          </div>
          <div
            data-ad-text
            style={{ fontSize: 21, marginTop: 26, color: "#708090" }}
          >
            Tindakan terkirim belum berarti tujuan tercapai.
          </div>
        </div>
      </ContentStage>
    </SceneFrame>
  );
};

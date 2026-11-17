import React from "react";
import {
  Interactive,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { COLORS } from "../../../theme";
import { CUES, EXPLANATION_MOTION } from "../data/sceneTimings";

/** Original illustrative pseudocode, not a captured Google interface or live test. */
export const AgentCodeMotion: React.FC<{ mode: "bug" | "security" }> = ({
  mode,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const security = mode === "security";
  const start = security ? CUES.cyber : CUES.workflow;
  const local = (seconds: number) =>
    Math.round(seconds * fps) - Math.round(start * fps);
  const scan = local(
    security ? EXPLANATION_MOTION.cyber.scan : EXPLANATION_MOTION.workflow.bug,
  );
  const found = local(
    security
      ? EXPLANATION_MOTION.cyber.detected
      : EXPLANATION_MOTION.workflow.firstLink,
  );
  const patch = local(
    security
      ? EXPLANATION_MOTION.cyber.repair
      : EXPLANATION_MOTION.workflow.patch,
  );
  const phase = frame < found ? "search" : frame < patch ? "found" : "repair";
  const target = security ? 1 : 3;
  const oldLine = security
    ? "  const input = data;"
    : "    total = item.harga;";
  const fixedLine = security
    ? "  const input = validasi(data);"
    : "    total += item.harga;";
  const lines = security
    ? [
        "function prosesInput(data) {",
        oldLine,
        "  return jalankan(input);",
        "}",
        "",
        "// periksa alur input",
        "// review sebelum digunakan",
      ]
    : [
        "function hitungTotal(items) {",
        "  let total = 0;",
        "  for (const item of items) {",
        oldLine,
        "  }",
        "  return total;",
        "}",
      ];
  const status = security
    ? phase === "search"
      ? "CARI CELAH"
      : phase === "found"
        ? "CELAH TERDETEKSI"
        : "PERBAIKI KODE"
    : phase === "search"
      ? "TELUSURI BUG"
      : phase === "found"
        ? "BUG DITEMUKAN"
        : "PERBAIKI KODE";
  return (
    <Interactive.Div
      name="AI agent — inspeksi kode dan perbaikan"
      data-code-agent={mode}
      data-agent-local-frame={frame}
      data-agent-global-frame={frame + Math.round(start * fps)}
      data-agent-phase={phase}
      style={{ position: "relative", height: 400 }}
    >
      <div
        style={{
          backgroundColor: COLORS.black,
          color: COLORS.offWhite,
          border: `2px solid ${COLORS.slate}`,
          borderRadius: 22,
          height: 350,
          padding: "22px 24px",
          boxSizing: "border-box",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            paddingBottom: 14,
            borderBottom: "1px solid rgba(112,128,144,0.5)",
          }}
        >
          <span style={{ fontSize: 22, fontWeight: 700 }}>
            GEMINI 4 CARBON · AI AGENT
          </span>
          <span style={{ fontSize: 18, fontWeight: 600, color: COLORS.slate }}>
            PSEUDOCODE
          </span>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.85fr 1fr",
            gap: 24,
            marginTop: 18,
          }}
        >
          <div
            data-agent-code="true"
            style={{ position: "relative", height: 210, overflow: "hidden" }}
          >
            <div
              aria-hidden
              style={{
                position: "absolute",
                left: 0,
                right: 0,
                height: 30,
                borderRadius: 6,
                backgroundColor: COLORS.slate,
                opacity: interpolate(
                  frame,
                  [scan - 1, scan, patch, patch + 0.35 * fps],
                  [0, 0.24, 0.24, 0],
                  { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
                ),
                top: interpolate(
                  frame,
                  [scan, scan + 1.1 * fps, scan + 2.2 * fps, found],
                  [0, 150, 30, target * 30],
                  { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
                ),
              }}
            />
            {lines.map((line, index) => (
              <div
                key={index}
                data-code-row={index + 1}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                  height: 30,
                  position: "relative",
                  backgroundColor:
                    index === target && frame >= found
                      ? "rgba(112,128,144,0.22)"
                      : "transparent",
                  borderLeft:
                    index === target && frame >= found
                      ? `3px solid ${COLORS.offWhite}`
                      : "3px solid transparent",
                  paddingLeft: 8,
                }}
              >
                <span
                  style={{
                    width: 20,
                    fontSize: 16,
                    color: COLORS.slate,
                    fontVariantNumeric: "tabular-nums",
                    flexShrink: 0,
                  }}
                >
                  {index + 1}
                </span>
                <span
                  data-code-text="true"
                  style={{
                    fontSize: 22,
                    fontWeight: index === target ? 600 : 500,
                    whiteSpace: "pre",
                    letterSpacing: "-0.025em",
                  }}
                >
                  {index === target && frame >= patch
                    ? fixedLine.slice(
                        0,
                        Math.floor(
                          interpolate(
                            frame,
                            [patch, patch + 0.35 * fps],
                            [0, fixedLine.length],
                            {
                              extrapolateLeft: "clamp",
                              extrapolateRight: "clamp",
                            },
                          ),
                        ),
                      )
                    : line}
                </span>
              </div>
            ))}
            <svg
              aria-hidden
              width={24}
              height={24}
              viewBox="0 0 24 24"
              style={{
                position: "absolute",
                right: 6,
                top: interpolate(
                  frame,
                  [scan, scan + 1.1 * fps, scan + 2.2 * fps, found],
                  [3, 153, 33, target * 30 + 3],
                  { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
                ),
                opacity: interpolate(
                  frame,
                  [scan - 1, scan, patch, patch + 0.15 * fps],
                  [0, 1, 1, 0],
                  { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
                ),
              }}
            >
              <circle
                cx={9}
                cy={9}
                r={6}
                fill={COLORS.black}
                stroke={COLORS.offWhite}
                strokeWidth={2}
              />
              <path
                d="m14 14 6 6"
                stroke={COLORS.offWhite}
                strokeWidth={2.5}
                strokeLinecap="round"
              />
            </svg>
          </div>
          <div
            style={{
              borderLeft: "1px solid rgba(112,128,144,0.5)",
              paddingLeft: 22,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 13 }}>
              <svg width={52} height={52} viewBox="0 0 52 52" aria-hidden>
                {security ? (
                  <path
                    d="m26 4 18 7v15c0 10-9 17-18 22C17 43 8 36 8 26V11Z"
                    fill="none"
                    stroke={COLORS.slate}
                    strokeWidth={2}
                  />
                ) : (
                  <circle
                    cx={26}
                    cy={26}
                    r={22}
                    fill="none"
                    stroke={COLORS.slate}
                    strokeWidth={2}
                  />
                )}
                <path
                  d="m15 26 8 8 15-17"
                  fill="none"
                  stroke={COLORS.white}
                  strokeWidth={3}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  pathLength={1}
                  strokeDasharray="1"
                  strokeDashoffset={interpolate(
                    frame,
                    [patch + 0.3 * fps, patch + 0.55 * fps],
                    [1, 0],
                    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
                  )}
                />
                <text
                  x={26}
                  y={32}
                  textAnchor="middle"
                  fontSize={19}
                  fontWeight={700}
                  fill={COLORS.offWhite}
                  opacity={interpolate(
                    frame,
                    [patch, patch + 0.25 * fps],
                    [1, 0],
                    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
                  )}
                >
                  AI
                </text>
              </svg>
              <span style={{ fontSize: 21, fontWeight: 700 }}>
                AGENT
                <br />
                BEKERJA
              </span>
            </div>
            <div
              data-agent-status="true"
              style={{
                fontSize: 24,
                lineHeight: 1.2,
                fontWeight: 700,
                marginTop: 20,
                minHeight: 58,
              }}
            >
              {status}
            </div>
            <div
              style={{
                marginTop: 8,
                color: COLORS.slate,
                fontSize: 19,
                lineHeight: 1.25,
              }}
            >
              {security
                ? phase === "repair"
                  ? "Validasi input ditambahkan"
                  : "Telusuri alur input"
                : phase === "repair"
                  ? "Akumulasi diperbaiki"
                  : "Periksa perhitungan total"}
            </div>
            <div
              style={{
                height: 3,
                backgroundColor: "rgba(112,128,144,0.4)",
                marginTop: 15,
                overflow: "hidden",
                borderRadius: 3,
              }}
            >
              <div
                style={{
                  height: "100%",
                  backgroundColor: COLORS.offWhite,
                  width: `${interpolate(frame, [scan, patch + 0.35 * fps], [0, 100], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}%`,
                }}
              />
            </div>
          </div>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: 14,
          fontSize: 22,
          fontWeight: 700,
          color: COLORS.gray,
        }}
      >
        <span style={{ opacity: phase === "search" ? 1 : 0.4 }}>
          01 · TELUSURI
        </span>
        <span style={{ opacity: phase === "found" ? 1 : 0.4 }}>
          02 · TEMUKAN
        </span>
        <span style={{ opacity: phase === "repair" ? 1 : 0.4 }}>
          03 · PERBAIKI
        </span>
      </div>
    </Interactive.Div>
  );
};

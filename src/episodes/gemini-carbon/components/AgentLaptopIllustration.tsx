import React from "react";
import {
  Interactive,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { COLORS } from "../../../theme";

const AgentStep: React.FC<{ label: string; at: number; next: number }> = ({
  label,
  at,
  next,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <div
      data-agent-step={label}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 16,
        height: 48,
        opacity: interpolate(frame, [at * fps, (at + 0.25) * fps], [0.32, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        }),
      }}
    >
      <svg width={26} height={26} viewBox="0 0 26 26" aria-hidden>
        <circle
          cx={13}
          cy={13}
          r={11}
          fill="none"
          stroke={COLORS.slate}
          strokeWidth={2}
        />
        <path
          d="m7 13 4 4 8-8"
          fill="none"
          stroke={COLORS.white}
          strokeWidth={2.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          pathLength={1}
          strokeDasharray="1"
          strokeDashoffset={interpolate(
            frame,
            [next * fps, (next + 0.25) * fps],
            [1, 0],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
          )}
        />
      </svg>
      <span style={{ fontSize: 25, fontWeight: 600 }}>{label}</span>
    </div>
  );
};

/** Original conceptual diagram inside a laptop, NOT a Google product interface. */
export const AgentLaptopIllustration: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <Interactive.Div
      name="Laptop — ilustrasi alur AI agent Gemini 4 Carbon"
      data-agent-laptop="conceptual"
      data-agent-frame={frame}
      style={{
        position: "relative",
        height: 380,
        color: COLORS.offWhite,
      }}
    >
      <div
        style={{
          position: "absolute",
          left: 46,
          right: 46,
          top: 0,
          height: 336,
          borderRadius: "22px 22px 9px 9px",
          border: `9px solid ${COLORS.slate}`,
          backgroundColor: COLORS.black,
          boxSizing: "border-box",
          padding: "22px 28px",
        }}
      >
        <div
          aria-hidden
          style={{
            position: "absolute",
            width: 5,
            height: 5,
            borderRadius: "50%",
            backgroundColor: COLORS.slate,
            top: 5,
            left: "50%",
          }}
        />
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            justifyContent: "space-between",
            borderBottom: "1px solid rgba(112,128,144,0.65)",
            paddingBottom: 15,
          }}
        >
          <span
            style={{ fontSize: 29, fontWeight: 800, letterSpacing: "-0.035em" }}
          >
            GEMINI 4 CARBON
          </span>
          <span style={{ fontSize: 18, fontWeight: 600, color: COLORS.slate }}>
            AI AGENT
          </span>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "0.9fr 1.25fr",
            gap: 30,
            marginTop: 19,
          }}
        >
          <div
            style={{
              borderRight: "1px solid rgba(112,128,144,0.4)",
              paddingRight: 26,
            }}
          >
            <div style={{ fontSize: 18, color: COLORS.slate, fontWeight: 600 }}>
              TUGAS
            </div>
            <div
              style={{
                marginTop: 12,
                fontSize: 31,
                lineHeight: 1.2,
                fontWeight: 700,
                letterSpacing: "-0.025em",
              }}
            >
              Tinjau kode
              <br />& cari bug
            </div>
          </div>
          <div>
            <AgentStep label="Memahami tugas" at={1} next={1.95} />
            <AgentStep label="Menganalisis kode" at={1.95} next={3.05} />
            <AgentStep label="Menyusun perbaikan" at={3.05} next={4.5} />
            <div
              style={{
                height: 4,
                marginTop: 18,
                backgroundColor: "rgba(112,128,144,0.3)",
                borderRadius: 4,
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  height: "100%",
                  backgroundColor: COLORS.offWhite,
                  width: `${interpolate(frame, [1 * fps, 4.5 * fps], [0, 85], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}%`,
                }}
              />
            </div>
            <div style={{ marginTop: 10, fontSize: 17, color: COLORS.slate }}>
              AGENT BEKERJA...
            </div>
          </div>
        </div>
      </div>
      <div
        aria-hidden
        style={{
          position: "absolute",
          left: 10,
          right: 10,
          top: 335,
          height: 24,
          backgroundColor: COLORS.offWhite,
          border: `2px solid ${COLORS.slate}`,
          borderRadius: "3px 3px 34px 34px",
          boxSizing: "border-box",
        }}
      >
        <div
          style={{
            width: 146,
            height: 7,
            backgroundColor: COLORS.slate,
            borderRadius: "0 0 9px 9px",
            margin: "0 auto",
          }}
        />
      </div>
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: 359,
          left: 46,
          right: 46,
          height: 4,
          backgroundColor: COLORS.slate,
          opacity: 0.5,
          borderRadius: "0 0 50% 50%",
        }}
      />
    </Interactive.Div>
  );
};

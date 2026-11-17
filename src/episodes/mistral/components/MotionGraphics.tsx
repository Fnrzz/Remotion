import React from "react";
import {
  Easing,
  Img,
  interpolate,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { COLORS } from "../../../theme";

// Restrained, frame-driven diagrams for the editorial middle and closing beats.
// The headline, character, subtitles and watermark stay on their approved anchors.
const CLAMP = {
  extrapolateLeft: "clamp",
  extrapolateRight: "clamp",
} as const;

const EASE = Easing.bezier(0.16, 1, 0.3, 1);

const reveal = (t: number, start: number, duration = 0.55) =>
  interpolate(t, [start, start + duration], [0, 1], {
    ...CLAMP,
    easing: EASE,
  });

const useSeconds = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return frame / fps;
};

type IconKind = "api" | "server" | "monitor" | "license";

const Icon: React.FC<{
  kind: IconKind;
  size?: number;
  color?: string;
}> = ({ kind, size = 46, color = "currentColor" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 58 58"
    fill="none"
    stroke={color}
    strokeWidth="2.4"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    {kind === "api" ? (
      <>
        <path d="M17 41h25a9.5 9.5 0 0 0 1-18.9A14 14 0 0 0 15.6 25 9 9 0 0 0 17 41Z" />
        <path d="M23 31h12M30 26l5 5-5 5" />
      </>
    ) : kind === "monitor" ? (
      <>
        <rect x="7" y="10" width="44" height="30" rx="5" />
        <path d="M18 49h22M29 40v9M21 20l-6 5 6 5M37 20l6 5-6 5" />
      </>
    ) : kind === "server" ? (
      <>
        <rect x="11" y="5" width="36" height="48" rx="5" />
        <path d="M11 21h36M11 37h36M19 13h3M19 29h3M19 45h3M30 13h10M30 29h10M30 45h10" />
      </>
    ) : (
      <>
        <path d="M14 5h23l10 11v37H14zM37 5v13h10M21 28h19M21 36h19M21 44h11" />
      </>
    )}
  </svg>
);

const CheckMark: React.FC<{ progress: number }> = ({ progress }) => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="#FFFFFF"
    strokeWidth="3"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path
      d="M5 12.5 10 17.5 19 6.5"
      pathLength={1}
      strokeDasharray={1}
      strokeDashoffset={1 - progress}
      opacity={progress}
    />
  </svg>
);

// ---------------------------------------------------------------------------
// 01 — official Mistral lockup, used instead of the documentary server photo
// ---------------------------------------------------------------------------
export const MistralLogoLockup: React.FC = () => {
  const t = useSeconds();
  const appear = reveal(t, 0.18, 0.7);
  const settle = interpolate(t, [0, 7], [1.035, 1], CLAMP);
  return (
    <div
      data-mistral-logo-frame
      style={{
        position: "absolute",
        left: 88,
        top: 700,
        width: 784,
        height: 430,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          width: 560,
          opacity: appear,
          translate: `0px ${(1 - appear) * 18}px`,
        }}
      >
        <div style={{ overflow: "hidden", paddingBottom: 4 }}>
          <Img
            data-mistral-logo
            name="Logo resmi Mistral — lockup dari mistral.ai"
            alt="Logo resmi Mistral"
            src={staticFile("assets/mistral/mistral-lockup-white.svg")}
            style={{
              display: "block",
              width: 560,
              height: "auto",
              scale: settle,
              transformOrigin: "left center",
            }}
          />
        </div>
        <div
          style={{
            height: 2,
            width: 560,
            marginTop: 34,
            backgroundColor: COLORS.slate,
            transformOrigin: "left center",
            scale: `${appear} 1`,
            opacity: 0.85,
          }}
        />
      </div>
    </div>
  );
};

// ---------------------------------------------------------------------------
// 04 — where the model runs: provider-managed API vs self-managed server
// ---------------------------------------------------------------------------
const FlowCard: React.FC<{
  title: string;
  detail: string;
  kind: "api" | "server";
  progress: number;
  active: boolean;
  left: number;
}> = ({ title, detail, kind, progress, active, left }) => (
  <div
    style={{
      position: "absolute",
      left,
      top: 172,
      width: 338,
      height: 238,
      boxSizing: "border-box",
      padding: 24,
      borderRadius: 24,
      border: `2px solid ${active ? COLORS.slate : "#70809045"}`,
      backgroundColor: COLORS.white,
      opacity: progress,
      translate: `0px ${(1 - progress) * 18}px`,
      boxShadow: active
        ? "0 18px 46px rgba(112,128,144,0.18)"
        : "0 10px 28px rgba(112,128,144,0.08)",
    }}
  >
    <div style={{ color: COLORS.slate }}>
      <Icon kind={kind} size={48} />
    </div>
    <div
      data-mistral-focus
      style={{
        marginTop: 20,
        fontSize: 25,
        fontWeight: 800,
        letterSpacing: "-0.04em",
        lineHeight: 1.1,
      }}
    >
      {title}
    </div>
    <div
      data-mistral-focus
      style={{
        marginTop: 10,
        fontSize: 18,
        fontWeight: 500,
        lineHeight: 1.4,
        color: COLORS.gray,
      }}
    >
      {detail}
    </div>
  </div>
);

export const ManagementFlow: React.FC = () => {
  const t = useSeconds();
  const chip = reveal(t, 0.25, 0.5);
  const leftIn = reveal(t, 1.0, 0.55);
  const rightIn = reveal(t, 2.2, 0.55);
  const line = reveal(t, 1.35, 0.75);
  const line2 = reveal(t, 2.55, 0.75);
  const leftPulse = reveal(t, 3.0, 0.85);
  const rightPulse = reveal(t, 4.2, 0.85);
  const leftPulseOpacity = interpolate(
    t,
    [2.95, 3.08, 3.75, 3.95],
    [0, 1, 1, 0],
    CLAMP,
  );
  const rightPulseOpacity = interpolate(
    t,
    [4.15, 4.28, 4.95, 5.15],
    [0, 1, 1, 0],
    CLAMP,
  );
  const leftX = interpolate(leftPulse, [0, 1], [348, 169]);
  const leftY = interpolate(leftPulse, [0, 1], [72, 172]);
  const rightX = interpolate(rightPulse, [0, 1], [348, 527]);
  const rightY = interpolate(rightPulse, [0, 1], [72, 172]);

  return (
    <div
      data-mistral-motion="management"
      style={{
        position: "absolute",
        left: 132,
        top: 690,
        width: 696,
        height: 410,
      }}
    >
      <div
        style={{
          position: "absolute",
          left: 168,
          top: 0,
          width: 360,
          height: 48,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 10,
          borderRadius: 24,
          border: `1px solid ${COLORS.slate}`,
          backgroundColor: COLORS.white,
          opacity: chip,
          scale: 0.96 + chip * 0.04,
          fontSize: 17,
          fontWeight: 800,
          letterSpacing: "0.08em",
        }}
      >
        <span
          style={{
            width: 8,
            height: 8,
            borderRadius: 4,
            backgroundColor: COLORS.slate,
          }}
        />
        MODEL MISTRAL LARGE 4
      </div>

      <svg
        width={696}
        height={110}
        style={{ position: "absolute", left: 0, top: 62 }}
        aria-hidden="true"
      >
        <path
          d="M348 4 C348 50 169 38 169 110"
          fill="none"
          stroke={COLORS.slate}
          strokeWidth="2"
          strokeLinecap="round"
          pathLength={1}
          strokeDasharray={1}
          strokeDashoffset={1 - line}
          opacity={0.55}
        />
        <path
          d="M348 4 C348 50 527 38 527 110"
          fill="none"
          stroke={COLORS.slate}
          strokeWidth="2"
          strokeLinecap="round"
          pathLength={1}
          strokeDasharray={1}
          strokeDashoffset={1 - line2}
          opacity={0.55}
        />
        <circle
          cx={leftX}
          cy={leftY}
          r={5}
          fill={COLORS.slate}
          opacity={leftPulseOpacity}
        />
        <circle
          cx={rightX}
          cy={rightY}
          r={5}
          fill={COLORS.slate}
          opacity={rightPulseOpacity}
        />
      </svg>

      <FlowCard
        title="API MISTRAL"
        detail="Dikelola penyedia layanan"
        kind="api"
        progress={leftIn}
        active={t >= 3.75}
        left={0}
      />
      <FlowCard
        title="SERVER SENDIRI"
        detail="Dikelola kamu atau organisasi"
        kind="server"
        progress={rightIn}
        active={t >= 4.95}
        left={358}
      />
    </div>
  );
};

// ---------------------------------------------------------------------------
// 05 — what running it yourself actually requires, then the service caveat
// ---------------------------------------------------------------------------
const LIMIT_ROWS = [
  {
    title: "LISENSI",
    detail: "Pahami ketentuan penggunaan",
    start: 1.0,
  },
  {
    title: "INFRASTRUKTUR",
    detail: "Siapkan lingkungan teknis",
    start: 5.6,
  },
  {
    title: "KEAHLIAN",
    detail: "Kelola dan rawat operasional",
    start: 7.46,
  },
] as const;

export const LimitsFlow: React.FC = () => {
  const t = useSeconds();
  const rail = interpolate(t, [1.0, 5.6, 7.46], [0, 0.5, 1], CLAMP);
  const banner = reveal(t, 10.1, 0.6);
  const activeRow = t >= 7.46 ? 2 : t >= 5.6 ? 1 : t >= 1.0 ? 0 : -1;
  const nodePulse = (Math.sin((t * Math.PI * 2) / 1.6) + 1) / 2;
  return (
    <div
      data-mistral-motion="limits"
      style={{
        position: "absolute",
        left: 132,
        top: 690,
        width: 696,
        height: 402,
      }}
    >
      <div
        style={{
          fontSize: 16,
          fontWeight: 700,
          letterSpacing: "0.1em",
          color: COLORS.slate,
          opacity: 0.95,
        }}
      >
        YANG PERLU DISIAPKAN
      </div>

      <div
        style={{
          position: "absolute",
          left: 19,
          top: 93,
          width: 2,
          height: 188,
          backgroundColor: "rgba(255,255,255,0.16)",
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 19,
          top: 93,
          width: 2,
          height: 188 * rail,
          backgroundColor: COLORS.slate,
        }}
      />
      <div
        style={{
          position: "absolute",
          left: 15,
          top: 93 + 188 * rail - 4,
          width: 8,
          height: 8,
          borderRadius: 4,
          backgroundColor: COLORS.slate,
          boxShadow: "0 0 12px rgba(112,128,144,0.9)",
          opacity: t >= 1.0 && t < 7.6 ? 1 : 0,
        }}
      />

      {LIMIT_ROWS.map((row, index) => {
        const progress = reveal(t, row.start, 0.5);
        const active = t >= row.start;
        const top = 50 + index * 94;
        return (
          <div
            key={row.title}
            style={{
              position: "absolute",
              left: 0,
              top,
              width: 696,
              height: 86,
              display: "flex",
              alignItems: "center",
              gap: 22,
              opacity: 0.2 + progress * 0.8,
              translate: `${(1 - progress) * -10}px 0px`,
            }}
          >
            <div
              style={{
                position: "relative",
                width: 40,
                height: 40,
                flexShrink: 0,
                borderRadius: 20,
                boxSizing: "border-box",
                border: `2px solid ${active ? COLORS.slate : "rgba(255,255,255,0.35)"}`,
                backgroundColor: active ? COLORS.slate : "transparent",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                scale: 0.9 + progress * 0.1,
              }}
            >
              {index === activeRow ? (
                <div
                  style={{
                    position: "absolute",
                    inset: -7,
                    borderRadius: 27,
                    border: `2px solid ${COLORS.slate}`,
                    opacity: (1 - nodePulse) * 0.55,
                    scale: 1 + nodePulse * 0.22,
                  }}
                />
              ) : null}
              {active ? (
                <CheckMark progress={progress} />
              ) : (
                <div
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: 4,
                    backgroundColor: "rgba(255,255,255,0.5)",
                  }}
                />
              )}
            </div>
            <div style={{ minWidth: 0 }}>
              <div
                data-mistral-focus
                style={{
                  fontSize: 23,
                  fontWeight: 800,
                  letterSpacing: "-0.03em",
                  lineHeight: 1.15,
                }}
              >
                {row.title}
              </div>
              <div
                data-mistral-focus
                style={{
                  marginTop: 6,
                  fontSize: 17.5,
                  fontWeight: 500,
                  lineHeight: 1.35,
                  color: "rgba(255,255,255,0.68)",
                }}
              >
                {row.detail}
              </div>
            </div>
          </div>
        );
      })}

      <div
        style={{
          position: "absolute",
          left: 0,
          top: 330,
          width: 696,
          height: 72,
          boxSizing: "border-box",
          padding: "14px 20px",
          borderRadius: 18,
          border: "1px solid rgba(112,128,144,0.75)",
          backgroundColor: "rgba(112,128,144,0.16)",
          display: "flex",
          alignItems: "center",
          gap: 16,
          opacity: banner,
          translate: `0px ${(1 - banner) * 12}px`,
        }}
      >
        <div style={{ color: COLORS.slate, flexShrink: 0 }}>
          <Icon kind="license" size={34} />
        </div>
        <div style={{ minWidth: 0 }}>
          <div
            style={{
              fontSize: 13,
              fontWeight: 700,
              letterSpacing: "0.09em",
              color: "rgba(255,255,255,0.62)",
            }}
          >
            MODEL SEBAGAI LAYANAN
          </div>
          <div
            data-mistral-focus
            style={{
              marginTop: 4,
              fontSize: 19,
              fontWeight: 800,
              letterSpacing: "-0.025em",
              lineHeight: 1.2,
            }}
          >
            PERLU LISENSI KOMERSIAL TERPISAH
          </div>
        </div>
      </div>
    </div>
  );
};

// ---------------------------------------------------------------------------
// 04b — the hosted API remains available even after the limitations
// ---------------------------------------------------------------------------
const ApiCard: React.FC<{
  title: string;
  detail: string;
  kind: "monitor" | "api";
  progress: number;
  delay: number;
  pulse: number;
}> = ({ title, detail, kind, progress, delay, pulse }) => (
  <div
    style={{
      position: "absolute",
      left: delay,
      top: 58,
      width: 250,
      height: 184,
      boxSizing: "border-box",
      padding: 20,
      borderRadius: 22,
      border: `2px solid ${kind === "api" ? COLORS.slate : "#70809045"}`,
      backgroundColor: COLORS.white,
      opacity: progress,
      translate: `0px ${(1 - progress) * 14}px`,
    }}
  >
    {kind === "api" ? (
      <div
        style={{
          position: "absolute",
          left: 14,
          top: 12,
          width: 54,
          height: 54,
          borderRadius: 27,
          border: `2px solid ${COLORS.slate}`,
          opacity: 0.25 * (1 - pulse),
          scale: 1 + pulse * 0.9,
        }}
      />
    ) : null}
    <div style={{ color: COLORS.slate, position: "relative" }}>
      <Icon kind={kind} size={42} />
    </div>
    <div
      data-mistral-focus
      style={{
        marginTop: 16,
        fontSize: 21,
        fontWeight: 800,
        letterSpacing: "-0.035em",
        lineHeight: 1.1,
      }}
    >
      {title}
    </div>
    <div
      data-mistral-focus
      style={{
        marginTop: 8,
        fontSize: 15.5,
        fontWeight: 500,
        lineHeight: 1.35,
        color: COLORS.gray,
      }}
    >
      {detail}
    </div>
  </div>
);

export const ApiAvailability: React.FC = () => {
  const t = useSeconds();
  const leftIn = reveal(t, 0.2, 0.5);
  const rightIn = reveal(t, 0.55, 0.5);
  const line = reveal(t, 0.8, 0.6);
  const status = reveal(t, 1.25, 0.5);
  const pulse = ((((t - 1.25) % 1.5) + 1.5) % 1.5) / 1.5;
  const packetProgress = (index: number) => {
    const p = (t - 1.15 - index * 0.42) / 1.35;
    return p < 0 ? -1 : p > 1 ? -1 : p;
  };
  return (
    <div
      data-mistral-motion="api-available"
      style={{
        position: "absolute",
        left: 132,
        top: 710,
        width: 696,
        height: 380,
      }}
    >
      <div
        style={{
          fontSize: 16,
          fontWeight: 700,
          letterSpacing: "0.1em",
          color: COLORS.slate,
        }}
      >
        AKSES TERKELOLA
      </div>

      <ApiCard
        title="APLIKASIMU"
        detail="Tanpa mengelola bobot"
        kind="monitor"
        progress={leftIn}
        delay={0}
        pulse={0}
      />
      <ApiCard
        title="API MISTRAL"
        detail="Dikelola penyedia"
        kind="api"
        progress={rightIn}
        delay={446}
        pulse={pulse}
      />

      <svg
        width={196}
        height={30}
        style={{ position: "absolute", left: 250, top: 135 }}
        aria-hidden="true"
      >
        <line
          x1={2}
          y1={15}
          x2={194}
          y2={15}
          stroke={COLORS.slate}
          strokeWidth="2"
          strokeDasharray="7 9"
          strokeLinecap="round"
          pathLength={1}
          strokeDashoffset={1 - line}
          opacity={0.6}
        />
        {[0, 1, 2].map((index) => {
          const p = packetProgress(index);
          if (p < 0) return null;
          return (
            <circle
              key={index}
              cx={8 + p * 180}
              cy={15}
              r={5}
              fill={COLORS.slate}
              opacity={Math.sin(Math.PI * p)}
            />
          );
        })}
      </svg>

      <div
        style={{
          position: "absolute",
          left: 168,
          top: 280,
          width: 360,
          height: 52,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 12,
          borderRadius: 26,
          backgroundColor: COLORS.black,
          color: COLORS.offWhite,
          opacity: status,
          scale: 0.96 + status * 0.04,
        }}
      >
        <span
          style={{
            width: 9,
            height: 9,
            borderRadius: 5,
            backgroundColor: COLORS.slate,
            opacity: 0.55 + pulse * 0.45,
          }}
        />
        <span
          data-mistral-focus
          style={{
            fontSize: 18,
            fontWeight: 800,
            letterSpacing: "0.06em",
          }}
        >
          TETAP TERSEDIA
        </span>
      </div>
    </div>
  );
};

// ---------------------------------------------------------------------------
// 06 — the closing question: managed API or your own server
// ---------------------------------------------------------------------------
const ClosingCard: React.FC<{
  title: string;
  detail: string;
  kind: "api" | "server";
  side: "left" | "right";
  progress: number;
  focus: number;
  dim: number;
}> = ({ title, detail, kind, side, progress, focus, dim }) => (
  <div
    style={{
      position: "absolute",
      left: side === "left" ? 0 : 368,
      top: 20,
      width: 328,
      height: 320,
      boxSizing: "border-box",
      padding: 26,
      borderRadius: 26,
      border: `2px solid ${focus > 0.5 ? COLORS.black : "#70809045"}`,
      backgroundColor: COLORS.white,
      opacity: progress * (1 - dim * 0.4),
      translate: `0px ${(1 - progress) * 16 - focus * 10}px`,
      boxShadow:
        focus > 0.5
          ? "0 22px 50px rgba(112,128,144,0.22)"
          : "0 10px 26px rgba(112,128,144,0.07)",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
    }}
  >
    <div style={{ color: COLORS.slate }}>
      <Icon kind={kind} size={50} />
    </div>
    <div
      data-mistral-focus
      style={{
        marginTop: 22,
        fontSize: 27,
        fontWeight: 800,
        letterSpacing: "-0.04em",
        lineHeight: 1.08,
      }}
    >
      {title}
    </div>
    <div
      data-mistral-focus
      style={{
        marginTop: 12,
        fontSize: 17,
        fontWeight: 500,
        lineHeight: 1.4,
        color: COLORS.gray,
      }}
    >
      {detail}
    </div>
  </div>
);

export const ClosingChoice: React.FC = () => {
  const t = useSeconds();
  const cards = reveal(t, 0.1, 0.6);
  const leftFocus = interpolate(
    t,
    [2.0, 2.35, 4.25, 4.55],
    [0, 1, 1, 0],
    CLAMP,
  );
  const rightFocus = interpolate(t, [4.35, 4.7, 6.2, 6.5], [0, 1, 1, 0], CLAMP);
  const badgeScale = 1 + Math.sin(t * Math.PI * 1.6) * 0.05;
  return (
    <div
      data-mistral-motion="closing-choice"
      style={{
        position: "absolute",
        left: 132,
        top: 700,
        width: 696,
        height: 360,
      }}
    >
      <ClosingCard
        title="LEWAT API"
        detail="Praktis, dikelola penyedia layanan"
        kind="api"
        side="left"
        progress={cards}
        focus={leftFocus}
        dim={rightFocus}
      />

      <ClosingCard
        title="SERVER SENDIRI"
        detail="Kendali penuh, dikelola sendiri"
        kind="server"
        side="right"
        progress={cards}
        focus={rightFocus}
        dim={leftFocus}
      />
      <div
        style={{
          position: "absolute",
          left: 320,
          top: 152,
          width: 56,
          height: 56,
          boxSizing: "border-box",
          borderRadius: 28,
          border: `2px solid ${COLORS.black}`,
          backgroundColor: COLORS.offWhite,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 27,
          fontWeight: 800,
          opacity: cards,
          scale: badgeScale,
          boxShadow: "0 8px 20px rgba(0,0,0,0.12)",
        }}
      >
        ?
      </div>
    </div>
  );
};

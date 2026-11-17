import React from "react";
import {
  Easing,
  Interactive,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { FONT_FAMILY } from "../../../fonts";
import { BRAND } from "../design";

const SLATE = BRAND.slate;
const PAPER = BRAND.paper;
const INK = BRAND.black;
const clamp = {
  extrapolateLeft: "clamp",
  extrapolateRight: "clamp",
} as const;
const ease = Easing.bezier(0.22, 1, 0.36, 1);
const poses = [0, 1, 2, 3, 4, 5] as const;

const panelStyle: React.CSSProperties = {
  position: "relative",
  width: 740,
  height: 400,
  boxSizing: "border-box",
  overflow: "hidden",
  border: "1px solid #70809040",
  borderRadius: 24,
  backgroundColor: "#FFFFFF",
  color: INK,
  fontFamily: FONT_FAMILY,
};

const labelStyle: React.CSSProperties = {
  position: "absolute",
  fontSize: 20,
  fontWeight: 700,
  lineHeight: 1.3,
  letterSpacing: "0.015em",
};

const ConceptLabel: React.FC = () => (
  <Interactive.Div
    name="Mention illustration — not a model result"
    style={{ ...labelStyle, left: 24, top: 20, color: "#555555" }}
  >
    ILUSTRASI KONSEP · BUKAN HASIL MODEL
  </Interactive.Div>
);

type FlowerProps = {
  phase?: number;
  edited?: boolean;
  dark?: boolean;
  detail?: boolean;
};

// Original authored paths. No image assets, generated outputs, or product UI.
// The pot is fixed: only the flower above it receives the loop's motion.
const FlowerArtwork: React.FC<
  FlowerProps & { wire?: boolean; draw?: number; nodePulse?: number }
> = ({
  phase = 0,
  edited = false,
  dark = false,
  detail = false,
  wire = false,
  draw = 1,
  nodePulse = 0,
}) => {
  const cycle = Math.max(0, Math.min(1, phase)) * Math.PI * 2;
  const outline = dark ? PAPER : INK;
  const stroke = wire ? SLATE : outline;
  const pathProps = wire
    ? { pathLength: 1, strokeDasharray: 1, strokeDashoffset: 1 - draw }
    : {};

  return (
    <>
      {!wire ? (
        <ellipse
          cx="300"
          cy="334"
          rx="103"
          ry="6"
          fill={outline}
          opacity="0.07"
        />
      ) : null}
      <g transform={`rotate(${Math.sin(cycle) * 4} 300 248)`}>
        <path
          d="M300 255 C294 218 310 170 300 126"
          fill="none"
          stroke={stroke}
          strokeWidth={wire ? 1.7 : 6}
          strokeLinecap="round"
          {...pathProps}
        />
        <path
          d="M300 224 C252 225 207 206 188 166 C236 162 283 177 300 224Z"
          fill={wire ? "none" : SLATE}
          stroke={stroke}
          strokeWidth="1.7"
          {...pathProps}
        />
        <path
          d="M301 204 C321 162 366 155 411 166 C392 202 347 221 301 204Z"
          fill={wire ? "none" : PAPER}
          stroke={stroke}
          strokeWidth="1.7"
          {...pathProps}
        />
        {detail || wire ? (
          <g fill="none" stroke={stroke} strokeWidth="1.1" opacity="0.65">
            <path d="M300 224 203 175 M301 204 397 170" {...pathProps} />
            <path d="M263 204 249 182 M350 188 366 188" {...pathProps} />
          </g>
        ) : null}
        {wire ? (
          <g fill="#FFFFFF" stroke={SLATE} strokeWidth="1.4" opacity={draw}>
            {[
              [188, 166],
              [411, 166],
              [300, 224],
            ].map(([x, y]) => (
              <rect
                key={`${x}-${y}`}
                x={x - 3.5}
                y={y - 3.5}
                width="7"
                height="7"
              />
            ))}
          </g>
        ) : null}
        <g transform={`rotate(${Math.sin(cycle) * 10} 300 126)`}>
          {Array.from({ length: 8 }, (_, index) => (
            <g key={index} transform={`rotate(${index * 45} 300 126)`}>
              <path
                d="M300 130 C263 109 260 55 300 23 C340 55 337 109 300 130Z"
                fill={wire ? "none" : index % 3 === 1 ? PAPER : SLATE}
                stroke={stroke}
                strokeWidth="1.6"
                strokeLinejoin="round"
                {...pathProps}
              />
              {!wire ? (
                <path
                  d="M300 27 300 126 C317 103 322 64 300 27Z"
                  fill={index % 3 === 1 ? "#000000" : "#FFFFFF"}
                  opacity={index % 3 === 1 ? 0.055 : 0.23}
                />
              ) : null}
              {detail || wire ? (
                <path
                  d="M300 35 V116 M300 83 281 66 M300 99 320 78"
                  fill="none"
                  stroke={stroke}
                  strokeWidth="0.9"
                  opacity="0.65"
                  {...pathProps}
                />
              ) : null}
              {wire ? (
                <g opacity={draw} stroke={SLATE} strokeWidth="1.1">
                  <path
                    d="M263 55 H300 H337 M263 55 300 23 337 55"
                    fill="none"
                    opacity="0.4"
                  />
                  <circle cx="263" cy="55" r="2.6" fill="#FFFFFF" />
                  <circle cx="337" cy="55" r="2.6" fill="#FFFFFF" />
                  <rect
                    x="296.5"
                    y="19.5"
                    width="7"
                    height="7"
                    fill="#FFFFFF"
                  />
                </g>
              ) : null}
            </g>
          ))}
          <circle
            cx="300"
            cy="126"
            r="23"
            fill={wire ? "#FFFFFF" : INK}
            stroke={stroke}
            strokeWidth="1.6"
          />
          <circle
            cx="300"
            cy="126"
            r="12"
            fill="none"
            stroke={wire ? SLATE : PAPER}
            strokeWidth="1.2"
          />
          {wire ? (
            <circle cx="300" cy="126" r={3 + nodePulse} fill={SLATE} />
          ) : null}
        </g>
      </g>
      <path
        d="M237 250 H363 L348 317 Q300 337 252 317Z"
        fill={wire ? "none" : PAPER}
        stroke={stroke}
        strokeWidth="2"
        strokeLinejoin="round"
        {...pathProps}
      />
      {edited && !wire
        ? Array.from({ length: 8 }, (_, index) => {
            const top = 243 + index * 15;
            const bottom = 255 + index * 11.5;
            return (
              <path
                key={index}
                d={`M${top} 256 H${top + 5} L${bottom + 4} 317 L${bottom} 317Z`}
                fill={SLATE}
              />
            );
          })
        : null}
      <path
        d="M232 243 Q300 232 368 243 L363 254 Q300 263 237 254Z"
        fill={wire ? "none" : PAPER}
        stroke={stroke}
        strokeWidth="2"
        {...pathProps}
      />
      <path
        d="M247 244 Q300 237 353 244"
        fill="none"
        stroke={wire ? SLATE : "#555555"}
        strokeWidth="1.3"
        {...pathProps}
      />
      {wire ? (
        <g fill="#FFFFFF" stroke={SLATE} strokeWidth="1.4" opacity={draw}>
          {[
            [237, 250],
            [363, 250],
            [348, 317],
            [252, 317],
          ].map(([x, y]) => (
            <rect
              key={`${x}-${y}`}
              x={x - 3.5}
              y={y - 3.5}
              width="7"
              height="7"
            />
          ))}
        </g>
      ) : null}
    </>
  );
};

export const OriginalFlower: React.FC<
  FlowerProps & {
    wire?: boolean;
    draw?: number;
    nodePulse?: number;
  }
> = (props) => (
  <svg
    width="100%"
    height="100%"
    viewBox="0 0 600 360"
    role="img"
    aria-label={`Ilustrasi orisinal bunga kertas dua dimensi${props.edited ? ", pot bermotif garis" : ", pot polos"}`}
    style={{ display: "block" }}
  >
    <FlowerArtwork {...props} />
  </svg>
);

export const GifConceptPanel: React.FC<{
  mode?: "hook" | "feature";
  pace?: number;
}> = ({ mode = "hook", pace = 1 }) => {
  const frame = useCurrentFrame() * pace;
  const { fps } = useVideoConfig();
  const feature = mode === "feature";
  const start = feature ? 1.8 : 0.75;
  const active = frame >= start * fps;
  const phase = active
    ? ((frame - start * fps) / (1.8 * fps) + (feature ? 2 / 6 : 0)) % 1
    : 0;
  const poseIndex = Math.floor(phase * 6);
  const morph = Math.min(
    1,
    spring({
      frame: frame - 1.8 * fps,
      fps,
      config: { damping: 200 },
      durationInFrames: Math.round(0.65 * fps),
    }),
  );

  return (
    <div style={panelStyle} data-creative-demo={`gif-${mode}`}>
      <ConceptLabel />
      <Interactive.Div
        name="Still illustration becomes a looping GIF concept"
        style={{
          ...labelStyle,
          right: 24,
          top: 62,
          color: active ? SLATE : "#555555",
          zIndex: 2,
        }}
      >
        {active ? "GIF BERULANG" : feature ? "6 POSE" : "DIAM"}
      </Interactive.Div>
      {feature ? (
        poses.map((pose) => {
          const selected = pose === 2;
          return (
            <Interactive.Div
              key={pose}
              name={`Pose ${pose + 1}${selected ? " — becomes the animated illustration" : ""}`}
              style={{
                position: "absolute",
                left: interpolate(morph, [0, 1], [42 + (pose % 3) * 222, 60]),
                top: interpolate(
                  morph,
                  [0, 1],
                  [70 + Math.floor(pose / 3) * 133, 52],
                ),
                width: interpolate(morph, [0, 1], [210, 620]),
                height: interpolate(morph, [0, 1], [126, 270]),
                opacity: selected ? 1 : 1 - morph,
                border: `1px solid rgba(112,128,144,${0.24 * (1 - morph)})`,
                borderRadius: 12,
                boxSizing: "border-box",
              }}
            >
              <OriginalFlower phase={selected && active ? phase : pose / 6} />
              <span
                style={{
                  ...labelStyle,
                  left: 10,
                  top: 7,
                  opacity: 1 - morph,
                  color: "#555555",
                }}
              >
                {String(pose + 1).padStart(2, "0")}
              </span>
            </Interactive.Div>
          );
        })
      ) : (
        <Interactive.Div
          name="Original flower — six-pose motion loop"
          style={{
            position: "absolute",
            left: 60,
            top: 52,
            width: 620,
            height: 270,
          }}
        >
          <OriginalFlower phase={phase} />
        </Interactive.Div>
      )}
      <Interactive.Div
        name="Six-frame loop strip"
        style={{
          position: "absolute",
          left: 130,
          top: 326,
          width: 480,
          height: 52,
          display: "flex",
          gap: 8,
          opacity: feature
            ? morph
            : interpolate(frame, [0.75 * fps, 1.05 * fps], [0.25, 1], clamp),
        }}
      >
        {poses.map((pose) => (
          <div
            key={pose}
            style={{
              position: "relative",
              flex: 1,
              border: `1px solid ${active && poseIndex === pose ? SLATE : "#70809030"}`,
              borderRadius: 8,
              backgroundColor: active && poseIndex === pose ? PAPER : "#FFFFFF",
            }}
          >
            <OriginalFlower phase={pose / 6} />
            <div
              style={{
                position: "absolute",
                bottom: -1,
                left: 9,
                right: 9,
                height: 3,
                backgroundColor:
                  active && poseIndex === pose ? SLATE : "transparent",
              }}
            />
          </div>
        ))}
      </Interactive.Div>
    </div>
  );
};

export const MarkupEditDemo: React.FC<{ pace?: number }> = ({ pace = 1 }) => {
  const frame = useCurrentFrame() * pace;
  const { fps } = useVideoConfig();
  const phase = (frame / (4 * fps)) % 1;
  const wipe = interpolate(frame, [1.8 * fps, 2.55 * fps], [0, 100], {
    ...clamp,
    easing: ease,
  });

  return (
    <div style={panelStyle} data-creative-demo="markup-edit">
      <ConceptLabel />
      <Interactive.Div
        name="Selection edit instruction"
        style={{ ...labelStyle, left: 24, top: 60, color: SLATE }}
      >
        PILIH AREA → UBAH DETAIL
      </Interactive.Div>
      <Interactive.Div
        name="Before and after edit state"
        style={{ ...labelStyle, right: 24, top: 60 }}
      >
        {wipe >= 99 ? "SESUDAH" : "SEBELUM"}
      </Interactive.Div>
      <Interactive.Div
        name="Original illustration before editing"
        style={{
          position: "absolute",
          left: 60,
          top: 66,
          width: 620,
          height: 270,
        }}
      >
        <OriginalFlower phase={phase} detail />
      </Interactive.Div>
      <Interactive.Div
        name="Striped pot — directional edit reveal"
        style={{
          position: "absolute",
          left: 60,
          top: 66,
          width: 620,
          height: 270,
          clipPath: `inset(0 ${100 - wipe}% 0 0)`,
        }}
      >
        <OriginalFlower phase={phase} edited detail />
      </Interactive.Div>
      <svg
        width="620"
        height="270"
        viewBox="0 0 600 360"
        style={{ position: "absolute", left: 60, top: 66, overflow: "visible" }}
        aria-label="Seleksi ilustratif di sekeliling pot"
      >
        <rect
          x="222"
          y="230"
          width="156"
          height="108"
          rx="16"
          fill="none"
          stroke={SLATE}
          strokeWidth="2.4"
          strokeDasharray="8 6"
          strokeDashoffset={-frame * 0.65}
          opacity={interpolate(frame, [0.35 * fps, 0.8 * fps], [0, 1], clamp)}
        />
        <g
          transform={`translate(${interpolate(frame, [0.3 * fps, 1.15 * fps], [462, 363], { ...clamp, easing: ease })} ${interpolate(frame, [0.3 * fps, 1.15 * fps], [167, 262], { ...clamp, easing: ease })})`}
          opacity={interpolate(
            frame,
            [0.15 * fps, 0.35 * fps, 2.4 * fps, 2.8 * fps],
            [0, 1, 1, 0],
            clamp,
          )}
        >
          <circle
            r={interpolate(frame, [1.1 * fps, 1.5 * fps], [4, 23], clamp)}
            fill="none"
            stroke={SLATE}
            strokeWidth="2"
            opacity={interpolate(
              frame,
              [1.1 * fps, 1.55 * fps],
              [0.8, 0],
              clamp,
            )}
          />
          <path
            d="M0 0 3 32 12 23 21 37 28 33 20 19 33 17Z"
            fill={INK}
            stroke="#FFFFFF"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
        </g>
      </svg>
      <Interactive.Div
        name="Selection is guidance, not a strict edit boundary"
        style={{
          ...labelStyle,
          left: 24,
          bottom: 19,
          right: 24,
          fontWeight: 500,
          color: "#555555",
        }}
      >
        Edit bisa meluas di luar area seleksi.
      </Interactive.Div>
    </div>
  );
};

export const SvgExportCard: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const phase = (frame / (5 * fps)) % 1;
  const wire = interpolate(frame, [0.8 * fps, 2.2 * fps], [0, 1], {
    ...clamp,
    easing: ease,
  });

  return (
    <div style={panelStyle} data-creative-demo="svg-export">
      <ConceptLabel />
      <Interactive.Div
        name="Filled illustration becomes editable vector paths"
        style={{
          position: "absolute",
          left: 4,
          top: 62,
          width: 480,
          height: 280,
        }}
      >
        <div style={{ position: "absolute", inset: 0, opacity: 1 - wire }}>
          <OriginalFlower phase={phase} detail />
        </div>
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 600 360"
          style={{ position: "absolute", inset: 0, opacity: wire }}
          aria-label="Jalur vektor bunga dengan node kontrol yang terlihat"
        >
          <FlowerArtwork
            phase={phase}
            wire
            draw={interpolate(frame, [0.85 * fps, 2 * fps], [0, 1], clamp)}
            nodePulse={0.6 + Math.sin((frame / fps) * Math.PI * 2) * 0.6}
          />
        </svg>
      </Interactive.Div>
      <Interactive.Div
        name="SVG export format"
        style={{
          position: "absolute",
          right: 52,
          top: 94,
          width: 180,
          opacity: interpolate(frame, [0.45 * fps, 1.1 * fps], [0, 1], clamp),
          translate: interpolate(
            frame,
            [0.45 * fps, 1.1 * fps],
            ["12px 0px", "0px 0px"],
            { ...clamp, easing: ease },
          ),
        }}
      >
        <div
          style={{
            display: "inline-flex",
            padding: "9px 18px",
            border: `1px solid ${SLATE}`,
            borderRadius: 12,
            fontSize: 34,
            fontWeight: 800,
            letterSpacing: "-0.03em",
            color: SLATE,
          }}
        >
          SVG
        </div>
        <div
          style={{
            fontSize: 23,
            fontWeight: 700,
            marginTop: 19,
            lineHeight: 1.4,
          }}
        >
          Jalur vektor,
          <br />
          bukan piksel.
        </div>
        <svg
          width="170"
          height="52"
          viewBox="0 0 170 52"
          style={{ display: "block", marginTop: 23 }}
          aria-label="Ikon web, aplikasi, dan cetak"
        >
          <g
            fill="none"
            stroke={SLATE}
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="2" y="9" width="40" height="31" rx="4" />
            <path d="M2 17 H42 M10 13 H11 M16 13 H17" />
            <rect x="66" y="5" width="25" height="40" rx="5" />
            <path d="M75 38 H82" />
            <path d="M126 17 V6 H151 V17 M126 35 H119 V18 H158 V35 H151 M126 28 H151 V46 H126Z M148 22 H151" />
          </g>
        </svg>
      </Interactive.Div>
      <Interactive.Div
        name="Vector export destinations"
        style={{
          ...labelStyle,
          left: 24,
          bottom: 20,
          right: 24,
          textAlign: "center",
          color: SLATE,
        }}
      >
        WEB · APLIKASI · CETAK
      </Interactive.Div>
    </div>
  );
};

import React from "react";
import {
  Easing,
  Interactive,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { OriginalFlower } from "./CreativeDemos";
import timing from "../data/timing.json";

const clamp = {
  extrapolateLeft: "clamp",
  extrapolateRight: "clamp",
} as const;

export const RevisionMotion: React.FC<{ promptAt: number }> = ({
  promptAt,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const seconds = frame / fps;
  const wipe = interpolate(
    frame,
    [(promptAt + 0.15) * fps, (promptAt + 1.5) * fps],
    [0, 100],
    {
      ...clamp,
      easing: Easing.bezier(0.22, 1, 0.36, 1),
    },
  );
  const inspectionX = 370 + Math.sin(seconds * 1.8) * 70;
  const inspectionY = 175 + Math.sin(seconds * 1.3) * 80;
  return (
    <Interactive.Div
      name="Ilustrasi meninjau dan merevisi gambar"
      data-closing-motion="revision"
      style={{ position: "relative", width: 740, height: 465 }}
    >
      <div
        data-text-unit
        style={{ fontSize: 22, fontWeight: 700, color: "#708090" }}
      >
        ILUSTRASI REVISI · BUKAN HASIL MODEL
      </div>
      <div
        style={{
          position: "absolute",
          left: 60,
          top: 38,
          width: 620,
          height: 350,
        }}
      >
        <OriginalFlower dark detail />
      </div>
      <div
        data-revision-wipe={wipe.toFixed(3)}
        style={{
          position: "absolute",
          left: 60,
          top: 38,
          width: 620,
          height: 350,
          clipPath: `inset(0 ${100 - wipe}% 0 0)`,
        }}
      >
        <OriginalFlower dark edited detail />
      </div>
      <svg
        width="740"
        height="400"
        viewBox="0 0 740 400"
        style={{ position: "absolute", top: 0, left: 0 }}
      >
        <g
          opacity={interpolate(
            frame,
            [0, 0.4 * fps, (promptAt - 0.35) * fps, promptAt * fps],
            [0, 0.9, 0.9, 0],
            clamp,
          )}
          transform={`translate(${inspectionX} ${inspectionY})`}
          data-inspection-position={`${inspectionX.toFixed(3)},${inspectionY.toFixed(3)}`}
        >
          <circle
            r="59"
            fill="#000000"
            fillOpacity="0.1"
            stroke="#FFFFFF"
            strokeWidth="2.5"
          />
          <circle
            r="49"
            fill="none"
            stroke="#708090"
            strokeWidth="1"
            strokeDasharray="5 7"
            strokeDashoffset={-frame * 0.65}
          />
          <path
            d="m43 43 30 30"
            stroke="#FFFFFF"
            strokeWidth="8"
            strokeLinecap="round"
          />
          <path d="M-15 0h30M0-15v30" stroke="#FFFFFF" strokeWidth="1.5" />
        </g>
        <g
          opacity={interpolate(
            frame,
            [(promptAt - 0.15) * fps, (promptAt + 0.2) * fps],
            [0, 1],
            clamp,
          )}
        >
          <rect
            x="292"
            y="258"
            width="156"
            height="116"
            rx="15"
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="2"
            strokeDasharray="8 7"
            strokeDashoffset={-frame * 0.5}
          />
          <g
            transform={`translate(${interpolate(frame, [promptAt * fps, (promptAt + 0.6) * fps], [560, 435], clamp)} ${interpolate(frame, [promptAt * fps, (promptAt + 0.6) * fps], [200, 320], clamp)})`}
          >
            <path
              d="M0 0 3 31 12 22 22 36 28 32 20 19 32 17Z"
              fill="#FFFFFF"
              stroke="#000000"
              strokeWidth="2"
            />
          </g>
        </g>
      </svg>
      <div
        data-text-unit
        style={{
          position: "absolute",
          left: 0,
          top: 415,
          fontSize: 29,
          fontWeight: 700,
        }}
      >
        {seconds < promptAt
          ? "CEPAT ≠ OTOMATIS SEMPURNA"
          : "TENTUKAN AREA → REVISI → TINJAU"}
      </div>
    </Interactive.Div>
  );
};

const ChoiceMotion: React.FC<{
  kind: "gif" | "edit" | "svg";
  label: string;
  delay: number;
}> = ({ kind, label, delay }) => {
  const currentFrame = useCurrentFrame();
  const { fps } = useVideoConfig();
  // A quiet final hold is derived from the unchanged narration's actual end.
  const holdAt = timing.audioSeconds - timing.cta - 0.65;
  const frame = Math.min(currentFrame, holdAt * fps);
  const seconds = frame / fps;
  const loop = seconds % 2.6;
  const cycleWipe = interpolate(
    loop,
    [0.35, 1.35, 2.1, 2.6],
    [0, 100, 100, 0],
    clamp,
  );
  const wipe = interpolate(
    seconds,
    [holdAt - 0.35, holdAt],
    [cycleWipe, 100],
    clamp,
  );
  const phase = (seconds / 1.6) % 1;
  const focus =
    kind === "svg"
      ? seconds < 2
      : kind === "gif"
        ? seconds >= 2 && seconds < 4.8
        : seconds >= 4.8;
  return (
    <Interactive.Div
      name="Pilihan fitur bergerak"
      data-closing-choice={kind}
      data-motion-state={`${phase.toFixed(3)}:${wipe.toFixed(3)}`}
      style={{
        position: "relative",
        width: 232,
        height: 386,
        opacity: interpolate(
          frame,
          [delay * fps, (delay + 0.3) * fps],
          [0, 1],
          clamp,
        ),
        translate: `0px ${(1 - spring({ frame: frame - delay * fps, fps, config: { damping: 24, stiffness: 150 } })) * 45}px`,
      }}
    >
      <svg
        width="232"
        height="330"
        viewBox="0 0 232 330"
        style={{ position: "absolute", inset: 0 }}
      >
        <rect
          x="1"
          y="1"
          width="230"
          height="328"
          rx="22"
          fill="#000000"
          stroke="#FFFFFF"
          strokeOpacity={focus ? 0.88 : 0.24}
          strokeWidth={focus ? 2 : 1}
        />
      </svg>
      <div
        style={{
          position: "absolute",
          left: 1,
          right: 1,
          top: 1,
          height: 328,
          overflow: "hidden",
          borderRadius: 22,
        }}
      >
        <div
          style={{
            position: "absolute",
            left: -94,
            top: 15,
            width: 420,
            height: 260,
          }}
        >
          <OriginalFlower
            phase={kind === "gif" ? phase : 0}
            dark
            detail={kind !== "gif"}
            wire={kind === "svg"}
            draw={interpolate(frame, [0.5 * fps, 1.7 * fps], [0, 1], clamp)}
            nodePulse={0.6 + Math.sin(seconds * 3) * 0.6}
          />
        </div>
        {kind === "edit" ? (
          <>
            <div
              style={{
                position: "absolute",
                left: -94,
                top: 15,
                width: 420,
                height: 260,
                clipPath: `inset(0 ${100 - wipe}% 0 0)`,
              }}
            >
              <OriginalFlower dark edited detail />
            </div>
            <svg
              width="230"
              height="300"
              viewBox="0 0 230 300"
              style={{ position: "absolute", inset: 0 }}
            >
              <rect
                x="61"
                y="180"
                width="110"
                height="86"
                rx="10"
                fill="none"
                stroke="#FFFFFF"
                strokeWidth="1.5"
                strokeDasharray="5 5"
                strokeDashoffset={-frame * 0.5}
              />
              <g
                transform={`translate(${interpolate(loop, [0, 0.65, 2.6], [200, 158, 158], clamp)} ${interpolate(loop, [0, 0.65, 2.6], [145, 224, 224], clamp)})`}
              >
                <path
                  d="M0 0 2 24 9 17 16 27 21 24 15 14 24 13Z"
                  fill="#FFFFFF"
                  stroke="#000000"
                  strokeWidth="1.5"
                />
              </g>
            </svg>
          </>
        ) : null}
        {kind === "gif" ? (
          <svg
            width="230"
            height="40"
            viewBox="0 0 230 40"
            style={{ position: "absolute", left: 0, top: 282 }}
          >
            <g
              transform={`translate(115 19) rotate(${seconds * 110})`}
              stroke="#FFFFFF"
              strokeWidth="2"
              fill="none"
            >
              <path d="M-15 0a15 15 0 0 1 26-10m4 10a15 15 0 0 1-26 10" />
              <path d="m3-12 9 3-1-9m-14 30-9-3 1 9" />
            </g>
          </svg>
        ) : null}
        {kind === "svg" ? (
          <svg
            width="230"
            height="40"
            viewBox="0 0 230 40"
            style={{ position: "absolute", left: 0, top: 282 }}
          >
            <g fill="none" stroke="#708090" strokeWidth="1.5">
              <path
                d="M65 30C90 6 140 6 165 30"
                pathLength="1"
                strokeDasharray="1"
                strokeDashoffset={interpolate(
                  frame,
                  [0.5 * fps, 1.8 * fps],
                  [1, 0],
                  clamp,
                )}
              />
              <path d="M65 30 90 6M165 30 140 6" strokeOpacity="0.4" />
              <rect x="61" y="26" width="8" height="8" fill="#FFFFFF" />
              <rect x="161" y="26" width="8" height="8" fill="#FFFFFF" />
              <circle cx="90" cy="6" r="3" fill="#708090" />
              <circle cx="140" cy="6" r="3" fill="#708090" />
            </g>
          </svg>
        ) : null}
      </div>
      <div
        data-text-unit
        style={{
          position: "absolute",
          top: 350,
          width: 232,
          textAlign: "center",
          fontSize: 27,
          fontWeight: 800,
          letterSpacing: "-0.03em",
          color: focus ? "#FFFFFF" : "#708090",
        }}
      >
        {label}
      </div>
    </Interactive.Div>
  );
};

export const ClosingChoicesMotion: React.FC = () => (
  <div
    data-closing-motion="choices"
    style={{ position: "relative", width: 740, height: 510 }}
  >
    <div
      data-text-unit
      style={{ fontSize: 22, fontWeight: 700, color: "#708090" }}
    >
      ILUSTRASI KONSEP · BUKAN HASIL MODEL
    </div>
    <div
      style={{
        position: "absolute",
        top: 65,
        left: 0,
        display: "flex",
        gap: 22,
      }}
    >
      <ChoiceMotion kind="gif" label="GIF" delay={0.1} />
      <ChoiceMotion kind="edit" label="EDIT PRESISI" delay={0.25} />
      <ChoiceMotion kind="svg" label="SVG" delay={0.4} />
    </div>
  </div>
);

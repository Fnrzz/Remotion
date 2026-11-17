import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS } from "../../../theme";

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

/** One-off line drawing; seeking backwards always restores the same SVG. */
export const DrawPath: React.FC<{
  d: string;
  at: number;
  duration?: number;
  stroke?: string;
  strokeWidth?: number;
}> = ({ d, at, duration = 0.4, stroke = COLORS.black, strokeWidth = 4 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <path
      d={d}
      fill="none"
      stroke={stroke}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      pathLength={1}
      strokeDasharray="1"
      strokeDashoffset={interpolate(
        frame,
        [at, at + duration * fps],
        [1, 0],
        clamp,
      )}
    />
  );
};

export const FlowLink: React.FC<{ x1: number; x2: number; at: number }> = ({
  x1,
  x2,
  at,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <g data-flow-link="true">
      <path
        d={`M${x1} 150H${x2}`}
        stroke={COLORS.slate}
        strokeWidth={3}
        opacity={0.22}
      />
      <DrawPath d={`M${x1} 150H${x2}`} at={at} duration={0.55} />
      <path
        d={`m${x2 - 10} 141 10 9-10 9`}
        fill="none"
        stroke={COLORS.slate}
        strokeWidth={3}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle
        data-motion-signal="true"
        cy={150}
        cx={interpolate(frame, [at, at + 0.55 * fps], [x1, x2], clamp)}
        r={6}
        fill={COLORS.black}
        opacity={interpolate(
          frame,
          [at - 1, at, at + 0.45 * fps, at + 0.55 * fps],
          [0, 1, 1, 0],
          clamp,
        )}
      />
    </g>
  );
};

/** Bounded internal card motion, without moving the enclosing editorial card. */
export const WorkflowStep: React.FC<{
  x: number;
  label: string;
  entrance: number;
  at: number;
  until: number;
  children: React.ReactNode;
}> = ({ x, label, entrance, at, until, children }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const emphasis = interpolate(
    frame,
    [at, at + 0.22 * fps, until, until + 0.22 * fps],
    [0, 1, 1, 0],
    clamp,
  );
  return (
    <g
      transform={`translate(${x} 0)`}
      data-workflow-step={label}
      data-active={frame >= at && frame < until}
    >
      <g
        style={{
          transformOrigin: "115px 150px",
          scale: 1 + emphasis * 0.025,
          opacity: interpolate(
            frame,
            [entrance, entrance + 0.25 * fps],
            [0.3, 1],
            clamp,
          ),
          translate: `0 ${interpolate(spring({ frame: frame - entrance, fps, config: { damping: 200 } }), [0, 1], [12, 0])}px`,
        }}
      >
        <rect
          x={0}
          y={38}
          width={230}
          height={224}
          rx={24}
          fill={COLORS.white}
          stroke={COLORS.slate}
          strokeWidth={2.5}
          strokeOpacity={0.5}
        />
        <rect
          x={0}
          y={38}
          width={230}
          height={224}
          rx={24}
          fill={COLORS.slate}
          opacity={emphasis * 0.13}
        />
        <rect
          x={0}
          y={38}
          width={230}
          height={224}
          rx={24}
          fill="none"
          stroke={COLORS.black}
          strokeWidth={3}
          opacity={emphasis}
        />
        {children}
        <text
          x={115}
          y={229}
          fill={COLORS.black}
          fontSize={34}
          fontWeight={700}
          textAnchor="middle"
          letterSpacing="-0.025em"
        >
          {label}
        </text>
        <path
          d="M34 246H196"
          stroke={COLORS.slate}
          strokeWidth={3}
          opacity={0.18}
          strokeLinecap="round"
        />
        <DrawPath
          d="M34 246H196"
          at={at}
          duration={0.65}
          stroke={COLORS.slate}
          strokeWidth={3}
        />
      </g>
    </g>
  );
};

export const CyberCodePanel: React.FC<{
  x: number;
  repair?: boolean;
  scanAt: number;
  actionAt: number;
}> = ({ x, repair = false, scanAt, actionAt }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <g
      transform={`translate(${x} 0)`}
      data-cyber-panel={repair ? "repair" : "detect"}
    >
      <g
        style={{
          opacity: interpolate(
            frame,
            [repair ? 0.25 * fps : 0.1 * fps, 0.65 * fps],
            [0.2, 1],
            clamp,
          ),
          translate: interpolate(
            frame,
            [0, 0.65 * fps],
            ["0px 10px", "0px 0px"],
            clamp,
          ),
        }}
      >
        <rect
          x={0}
          y={72}
          width={235}
          height={156}
          rx={20}
          fill={COLORS.white}
          stroke={COLORS.slate}
          strokeWidth={2.5}
          strokeOpacity={0.6}
        />
        <g
          stroke={COLORS.slate}
          strokeWidth={4}
          strokeLinecap="round"
          fill="none"
        >
          <DrawPath
            d="M35 108h65m14 0h29"
            at={0.3 * fps}
            stroke={COLORS.slate}
          />
          <DrawPath
            d="M53 137h98m-116 29h51m14 0h72"
            at={0.55 * fps}
            stroke={COLORS.slate}
          />
          <DrawPath d="M53 195h72" at={0.8 * fps} />
        </g>
        <rect
          x={20}
          y={interpolate(frame, [scanAt, scanAt + 1.4 * fps], [94, 180], clamp)}
          width={195}
          height={28}
          rx={8}
          fill={COLORS.slate}
          opacity={interpolate(
            frame,
            [
              scanAt - 1,
              scanAt + 0.15 * fps,
              scanAt + 1.25 * fps,
              scanAt + 1.4 * fps,
            ],
            [0, 0.16, 0.16, 0],
            clamp,
          )}
        />
        <rect
          x={20}
          y={121}
          width={195}
          height={30}
          rx={7}
          fill={COLORS.slate}
          opacity={interpolate(
            frame,
            [actionAt, actionAt + 0.3 * fps],
            [0, 0.16],
            clamp,
          )}
        />
        {repair ? (
          <DrawPath d="m177 193 10 10 24-28" at={actionAt} strokeWidth={5} />
        ) : (
          <g
            stroke={COLORS.black}
            fill="none"
            strokeLinecap="round"
            opacity={interpolate(
              frame,
              [actionAt, actionAt + 0.2 * fps],
              [0, 1],
              clamp,
            )}
          >
            <circle cx={186} cy={190} r={13} strokeWidth={3} />
            <path d="m196 200 11 11" strokeWidth={4} />
          </g>
        )}
        <text
          x={117.5}
          y={269}
          fill={COLORS.gray}
          fontSize={28}
          fontWeight={700}
          textAnchor="middle"
        >
          {repair ? "PERBAIKAN" : "CELAH"}
        </text>
      </g>
    </g>
  );
};

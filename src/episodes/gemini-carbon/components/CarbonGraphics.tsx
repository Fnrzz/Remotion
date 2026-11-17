import React from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { FONT_FAMILY } from "../../../fonts";
import { COLORS } from "../../../theme";
import { CUES, EXPLANATION_MOTION } from "../data/sceneTimings";
import {
  CyberCodePanel,
  DrawPath,
  FlowLink,
  WorkflowStep,
} from "./ExplanationMotion";

const diagramStyle: React.CSSProperties = {
  display: "block",
  width: "100%",
  height: 280,
  fontFamily: FONT_FAMILY,
};

const outline = {
  fill: "none",
  strokeWidth: 4,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

export const WorkflowDiagram: React.FC = () => {
  const { fps } = useVideoConfig();
  const local = (seconds: number) =>
    Math.round(seconds * fps) - Math.round(CUES.workflow * fps);
  const cues = EXPLANATION_MOTION.workflow;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 900 300"
      width="100%"
      height={280}
      style={diagramStyle}
      role="img"
      aria-label="Skema alur perbaikan kode: bug, analisis, lalu patch."
      data-motion-diagram="workflow"
    >
      <FlowLink x1={258} x2={327} at={local(cues.firstLink)} />
      <FlowLink x1={573} x2={642} at={local(cues.secondLink)} />
      <WorkflowStep
        x={20}
        label="BUG"
        entrance={0}
        at={local(cues.bug)}
        until={local(cues.analysis)}
      >
        <g {...outline} stroke={COLORS.black}>
          <path d="m100 91-10-13m40 13 10-13M87 119H72m71 0h15m-71 23-15 8m71-8 15 8m-66 13-11 13m57-13 11 13" />
          <rect x={88} y={97} width={54} height={74} rx={26} />
          <DrawPath d="M115 111v45M90 121h50" at={local(cues.bug)} />
        </g>
      </WorkflowStep>
      <WorkflowStep
        x={335}
        label="ANALISIS"
        entrance={0.12 * fps}
        at={local(cues.analysis)}
        until={local(cues.patch)}
      >
        <path
          d="m97 105-27 25 27 25m36-50 27 25-27 25m-9-62-18 74"
          {...outline}
          stroke={COLORS.slate}
          opacity={0.45}
        />
        <DrawPath
          d="m97 105-27 25 27 25m36-50 27 25-27 25m-9-62-18 74"
          at={local(cues.analysis)}
          duration={0.65}
        />
      </WorkflowStep>
      <WorkflowStep
        x={650}
        label="PATCH"
        entrance={0.24 * fps}
        at={local(cues.patch)}
        until={local(CUES.cyber + 1)}
      >
        <rect
          x={66}
          y={83}
          width={98}
          height={98}
          rx={23}
          {...outline}
          stroke={COLORS.slate}
        />
        <DrawPath
          d="m90 132 17 17 33-36"
          at={local(cues.patch)}
          strokeWidth={5}
        />
      </WorkflowStep>
    </svg>
  );
};

export const CyberDiagram: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const local = (seconds: number) =>
    Math.round(seconds * fps) - Math.round(CUES.cyber * fps);
  const cues = EXPLANATION_MOTION.cyber;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 900 300"
      width="100%"
      height={280}
      style={diagramStyle}
      role="img"
      aria-label="Diagram keamanan kode: perisai pelindung di antara dua kartu kode abstrak."
      data-motion-diagram="cyber"
    >
      <g
        style={{
          opacity: interpolate(frame, [0, 0.4 * fps], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
          translate: interpolate(
            frame,
            [0, 0.4 * fps],
            ["0px 8px", "0px 0px"],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            },
          ),
        }}
      >
        <FlowLink x1={280} x2={350} at={local(cues.detected)} />
        <FlowLink x1={550} x2={620} at={local(cues.repair) - 0.2 * fps} />
        <CyberCodePanel
          x={36}
          scanAt={local(cues.scan)}
          actionAt={local(cues.detected)}
        />
        <CyberCodePanel
          x={629}
          repair
          scanAt={local(cues.detected)}
          actionAt={local(cues.repair)}
        />
        <path
          d="M450 33 540 68v77c0 43-39 76-90 98-51-22-90-55-90-98V68Z"
          fill={COLORS.offWhite}
          stroke={COLORS.slate}
          strokeWidth={2}
          strokeLinejoin="round"
        />
        <DrawPath
          d="M450 33 540 68v77c0 43-39 76-90 98-51-22-90-55-90-98V68Z"
          at={local(cues.shield)}
          duration={0.7}
        />
        <path
          d="M450 55 520 82v62c0 32-30 59-70 79-40-20-70-47-70-79V82Z"
          {...outline}
          stroke={COLORS.slate}
          strokeWidth={2}
          opacity={0.5}
        />
        <DrawPath
          d="m418 136 23 23 43-49"
          at={local(cues.repair)}
          strokeWidth={6}
        />
        <text
          x={450}
          y={289}
          fill={COLORS.black}
          fontSize={34}
          fontWeight={700}
          letterSpacing="-0.025em"
          textAnchor="middle"
        >
          KEAMANAN KODE
        </text>
      </g>
    </svg>
  );
};

export const LockedAccessDiagram: React.FC = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 900 300"
    width="100%"
    height={280}
    style={diagramStyle}
    role="img"
    aria-label="Akses terbatas, digambarkan dengan gembok tertutup dan kartu akses abstrak."
  >
    <rect x={4} y={12} width={892} height={276} rx={26} fill={COLORS.black} />
    <path
      d="M280 165h100"
      stroke={COLORS.slate}
      strokeWidth={3}
      strokeDasharray="5 10"
      opacity={0.6}
    />
    <g {...outline} stroke={COLORS.slate}>
      <path d="M165 130V99a45 45 0 0 1 90 0v31" strokeWidth={6} />
      <rect x={140} y={130} width={140} height={112} rx={21} />
      <circle cx={210} cy={174} r={10} />
      <path d="M210 184v22" />
    </g>
    <rect
      x={380}
      y={58}
      width={460}
      height={184}
      rx={22}
      fill={COLORS.black}
      stroke={COLORS.slate}
      strokeOpacity={0.65}
      strokeWidth={2.5}
    />
    <g {...outline} stroke={COLORS.slate}>
      <rect x={416} y={89} width={46} height={46} rx={10} />
      <path d="M490 99h139m-139 24h99" opacity={0.8} />
      <path d="M416 160h387" strokeWidth={2} opacity={0.35} />
    </g>
    <text
      x={416}
      y={213}
      fill={COLORS.white}
      fontSize={34}
      fontWeight={700}
      letterSpacing="-0.025em"
    >
      AKSES TERBATAS
    </text>
  </svg>
);

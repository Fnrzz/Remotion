import React from "react";
import { FONT_FAMILY } from "../../../fonts";

// Original editorial geometry, not a product interface or a model execution.
// All coordinates belong to the parent's 636 × 400 SVG. No local clock, IDs,
// external assets, or ambient motion: identical props always produce one frame.
type Point = { x: number; y: number };
export type WorkstreamKind =
  | "core"
  | "drivers"
  | "storage"
  | "interface"
  | "testing"
  | "review";

const CENTER: Point = { x: 318, y: 190 };
const INK = "#000";
const PAPER = "#FAF9F6";
const SLATE = "#708090";
const clamp = (value: number) =>
  Number.isFinite(value) ? Math.max(0, Math.min(1, value)) : 0;
const phase = (value: number, start = 0, end = 1) =>
  clamp((value - start) / (end - start));
const ease = (value: number) => {
  const p = clamp(value);
  return p * p * (3 - 2 * p);
};
const mix = (a: number, b: number, progress: number) => a + (b - a) * progress;
const toward = (a: Point, b: Point, progress: number): Point => ({
  x: mix(a.x, b.x, progress),
  y: mix(a.y, b.y, progress),
});

const WORKSTREAMS: Record<
  WorkstreamKind,
  { x: number; y: number; label: string; index: number }
> = {
  core: { x: 111, y: 91, label: "Inti sistem", index: 0 },
  drivers: { x: 318, y: 67, label: "Driver", index: 1 },
  storage: { x: 525, y: 91, label: "Penyimpanan", index: 2 },
  interface: { x: 111, y: 281, label: "Antarmuka", index: 3 },
  testing: { x: 318, y: 307, label: "Pengujian", index: 4 },
  review: { x: 525, y: 281, label: "Review", index: 5 },
};
const KINDS: readonly WorkstreamKind[] = [
  "core",
  "drivers",
  "storage",
  "interface",
  "testing",
  "review",
];

const Draw: React.FC<{
  d: string;
  progress: number;
  color?: string;
  width?: number;
  opacity?: number;
}> = ({ d, progress, color = SLATE, width = 2, opacity = 1 }) => (
  <path
    d={d}
    fill="none"
    stroke={color}
    strokeWidth={width}
    strokeLinecap="round"
    strokeLinejoin="round"
    pathLength={1}
    strokeDasharray="1 1"
    strokeDashoffset={1 - clamp(progress)}
    opacity={clamp(progress) === 0 ? 0 : opacity}
  />
);

/** A geometric agent at (318, 190); folder=1 replaces it with an empty folder. */
export const CentralModelNode: React.FC<{
  dark?: boolean;
  folder?: number;
  labelOpacity?: number;
  opacity?: number;
}> = ({ dark = false, folder = 0, labelOpacity = 1, opacity = 1 }) => {
  const foreground = dark ? "#fff" : INK;
  const background = dark ? INK : PAPER;
  const f = clamp(folder);
  return (
    <g
      data-central-model
      transform="translate(318 190)"
      opacity={clamp(opacity)}
      fontFamily={FONT_FAMILY}
      textAnchor="middle"
    >
      <g opacity={1 - f}>
        <path
          d="M-30-51H30L56-25V25L30 51H-30L-56 25V-25Z"
          fill={background}
          stroke={foreground}
          strokeWidth={2.3}
          strokeLinejoin="round"
        />
        <g fill="none" stroke={SLATE} strokeWidth={1.8}>
          <path d="M-15-26 0-35 15-26V-10L0-1-15-10Z" />
          <path d="M-15-26 0-17 15-26M0-17V-1M-24-18H-33M24-18H33" />
        </g>
        <g opacity={clamp(labelOpacity)} fill={foreground}>
          <text y={15} fontSize={15} fontWeight={800} letterSpacing="1.2">
            FABLE
          </text>
          <text y={38} fontSize={22} fontWeight={800}>
            5.2
          </text>
        </g>
        <g opacity={1 - clamp(labelOpacity)} stroke={foreground} fill="none">
          <path d="M-20 12H20M-12 23H12M-5 34H5" strokeWidth={2} />
        </g>
      </g>
      <g opacity={f}>
        <path
          d="M-49-25V-35H-14L-3-24H49V34H-49Z"
          fill={background}
          stroke={foreground}
          strokeWidth={2.8}
          strokeLinejoin="round"
        />
        <path d="M-49-17H49" fill="none" stroke={SLATE} strokeWidth={1.8} />
      </g>
    </g>
  );
};

const CLUSTERS: readonly Point[] = [
  { x: 106, y: 102 },
  { x: 318, y: 76 },
  { x: 530, y: 102 },
  { x: 106, y: 278 },
  { x: 318, y: 302 },
  { x: 530, y: 278 },
];
// Eight fixed representative agents per cluster = 48 surrounding nodes.
const OFFSETS: readonly Point[] = [
  { x: 0, y: 0 },
  { x: -46, y: -17 },
  { x: -23, y: -42 },
  { x: 17, y: -38 },
  { x: 48, y: -12 },
  { x: -43, y: 25 },
  { x: -9, y: 40 },
  { x: 33, y: 30 },
];
const BRANCHES: readonly (readonly [number, number])[] = [
  [0, 1],
  [1, 2],
  [0, 3],
  [3, 4],
  [0, 5],
  [5, 6],
  [0, 7],
  [2, 3],
  [6, 7],
];

const AgentGlyph: React.FC<{ variant: number; dark: boolean }> = ({
  variant,
  dark,
}) => (
  <g
    fill={dark ? INK : PAPER}
    stroke={dark ? "#fff" : INK}
    strokeWidth={1.6}
    strokeLinejoin="round"
  >
    {variant === 0 ? (
      <path d="M-8-4 0-8 8-4V4L0 8-8 4ZM-8-4 0 0 8-4M0 0V8" />
    ) : variant === 1 ? (
      <>
        <rect x={-7} y={-7} width={14} height={14} />
        <path d="M-3 0H3M0-3V3" stroke={SLATE} />
      </>
    ) : variant === 2 ? (
      <>
        <path d="M0-9 9 0 0 9-9 0Z" />
        <path d="M-3 0H3" stroke={SLATE} />
      </>
    ) : (
      <>
        <circle r={7.5} />
        <path d="M-3 2 0-3 3 2Z" stroke={SLATE} />
      </>
    )}
  </g>
);

export type AgentNetworkProps = {
  /** 0: central agent only; 1: all 48 representative nodes and their links. */
  expansion: number;
  /** 0: distributed network; 1: only the central FABLE 5.2 agent remains. */
  convergence?: number;
  dark?: boolean;
  /** Crossfade from central model (0) to an empty folder (1). */
  folder?: number;
};

export const AgentNetwork: React.FC<AgentNetworkProps> = ({
  expansion,
  convergence = 0,
  dark = false,
  folder = 0,
}) => {
  const e = clamp(expansion);
  const c = ease(convergence);
  const spread = ease(e) * (1 - c);
  return (
    <g
      data-agent-network
      data-network-expansion={e}
      data-network-convergence={c}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {CLUSTERS.map((cluster, clusterIndex) => {
        const clusterProgress = phase(e, clusterIndex * 0.035, 0.48);
        const points = OFFSETS.map((offset) =>
          toward(
            CENTER,
            { x: cluster.x + offset.x, y: cluster.y + offset.y },
            spread,
          ),
        );
        const hub = points[0];
        return (
          <g key={clusterIndex} opacity={1 - phase(c, 0.35, 0.96)}>
            <Draw
              d={`M318 190Q${mix(318, hub.x, 0.55)} ${hub.y} ${hub.x} ${hub.y}`}
              progress={clusterProgress}
              width={1.7}
              opacity={0.7}
            />
            {BRANCHES.map(([from, to], branchIndex) => (
              <Draw
                key={`${from}-${to}`}
                d={`M${points[from].x} ${points[from].y}L${points[to].x} ${points[to].y}`}
                progress={phase(
                  e,
                  0.15 + clusterIndex * 0.035 + branchIndex * 0.025,
                  0.62 + clusterIndex * 0.035 + branchIndex * 0.02,
                )}
                width={1.2}
                opacity={0.55}
              />
            ))}
            {points.map((point, nodeIndex) => {
              const reveal = ease(
                phase(
                  e,
                  0.1 + clusterIndex * 0.035 + nodeIndex * 0.035,
                  0.35 + clusterIndex * 0.035 + nodeIndex * 0.04,
                ),
              );
              return (
                <g
                  key={nodeIndex}
                  data-representative-agent={`${clusterIndex}-${nodeIndex}`}
                  transform={`translate(${point.x} ${point.y}) scale(${0.7 + 0.3 * reveal})`}
                  opacity={reveal}
                >
                  <AgentGlyph
                    variant={(clusterIndex + nodeIndex) % 4}
                    dark={dark}
                  />
                </g>
              );
            })}
          </g>
        );
      })}
      <CentralModelNode
        dark={dark}
        folder={folder}
        labelOpacity={Math.max(ease(phase(e, 0.1, 0.65)), c)}
      />
    </g>
  );
};

type Route = { start: Point; control: Point; end: Point };
const delegationRoute = (kind: WorkstreamKind, returning = false): Route => {
  const module = WORKSTREAMS[kind];
  const dx = module.x - CENTER.x;
  const dy = module.y - CENTER.y;
  const length = Math.hypot(dx, dy);
  const ux = dx / length;
  const uy = dy / length;
  const start = { x: CENTER.x + ux * 59, y: CENTER.y + uy * 59 };
  const end = { x: module.x - ux * 47, y: module.y - uy * 32 };
  const bend = returning ? -19 : 15;
  const control = {
    x: (start.x + end.x) / 2 - uy * bend,
    y: (start.y + end.y) / 2 + ux * bend,
  };
  return returning
    ? { start: end, control, end: start }
    : { start, control, end };
};
const routePath = ({ start, control, end }: Route) =>
  `M${start.x} ${start.y}Q${control.x} ${control.y} ${end.x} ${end.y}`;
const onRoute = ({ start, control, end }: Route, progress: number): Point => {
  const t = clamp(progress);
  const u = 1 - t;
  return {
    x: u * u * start.x + 2 * u * t * control.x + t * t * end.x,
    y: u * u * start.y + 2 * u * t * control.y + t * t * end.y,
  };
};

const ArrowTip: React.FC<{ route: Route; opacity: number }> = ({
  route,
  opacity,
}) => {
  const dx = route.end.x - route.control.x;
  const dy = route.end.y - route.control.y;
  const length = Math.hypot(dx, dy);
  const ux = dx / length;
  const uy = dy / length;
  return (
    <path
      d={`M${route.end.x - ux * 7 - uy * 3.5} ${route.end.y - uy * 7 + ux * 3.5}L${route.end.x} ${route.end.y}L${route.end.x - ux * 7 + uy * 3.5} ${route.end.y - uy * 7 - ux * 3.5}`}
      fill="none"
      stroke={SLATE}
      strokeWidth={1.7}
      opacity={clamp(opacity)}
    />
  );
};

/** Outgoing task routes; a second, opposing route shows the feedback cycle. */
export const DelegationPaths: React.FC<{
  progress: number;
  feedback?: number;
  integration?: number;
}> = ({ progress, feedback = 0, integration = 0 }) => (
  <g opacity={1 - ease(phase(integration, 0, 0.65))}>
    {KINDS.map((kind, index) => {
      const p = phase(progress, index * 0.045, 0.55 + index * 0.045);
      const route = delegationRoute(kind);
      const back = delegationRoute(kind, true);
      const backProgress = phase(feedback, index * 0.055, 0.4 + index * 0.055);
      return (
        <g key={kind}>
          <Draw d={routePath(route)} progress={p} width={1.5} opacity={0.55} />
          <ArrowTip route={route} opacity={phase(p, 0.9, 1)} />
          <Draw d={routePath(back)} progress={backProgress} width={1.7} />
          <ArrowTip route={back} opacity={phase(backProgress, 0.9, 1)} />
        </g>
      );
    })}
  </g>
);

/** A single document-shaped result, not a particle stream. Default travel is BACK. */
export const ResultPacket: React.FC<{
  kind: WorkstreamKind;
  progress: number;
  revision?: boolean;
  opacity?: number;
}> = ({ kind, progress, revision = false, opacity = 1 }) => {
  const p = clamp(progress);
  const point = onRoute(delegationRoute(kind, !revision), ease(p));
  return (
    <g
      data-result-packet={kind}
      transform={`translate(${point.x} ${point.y})`}
      opacity={clamp(opacity) * phase(p, 0, 0.12) * (1 - phase(p, 0.87, 1))}
    >
      <path
        d="M-7-8H3L8-3V8H-7Z"
        fill={PAPER}
        stroke={revision ? SLATE : INK}
        strokeWidth={1.5}
      />
      <path
        d="M3-8V-3H8M-3 1H4M-3 4H2"
        fill="none"
        stroke={SLATE}
        strokeWidth={1.2}
      />
    </g>
  );
};

/** Each branch is deliberately different geometry, not a repeated UI container. */
const WorkstreamGlyph: React.FC<{
  kind: WorkstreamKind;
  construction: number;
}> = ({ kind, construction }) => {
  const p = clamp(construction);
  const detail = phase(p, 0.3, 1);
  if (kind === "core") {
    return (
      <g>
        <Draw d="M-17-17H17V17H-17ZM-8-8H8V8H-8Z" progress={p} color={INK} />
        <Draw
          d="M-32-10H-17M-32 10H-17M17-10H32M17 10H32M-10-30V-17M10-30V-17M-10 17V30M10 17V30"
          progress={detail}
        />
        <path d="M-4-4H4V4H-4Z" fill={SLATE} opacity={detail} />
      </g>
    );
  }
  if (kind === "drivers") {
    return (
      <g>
        <Draw
          d="M-36 0H-15M-15-19V19M-15-19H13M-15 0H13M-15 19H13"
          progress={p}
        />
        <Draw
          d="M13-25H28V-13H13ZM13-6H28V6H13ZM13 13H28V25H13Z"
          progress={detail}
          color={INK}
        />
        <Draw
          d="M28-22H36M28-16H36M28-3H36M28 3H36M28 16H36M28 22H36"
          progress={detail}
          width={1.5}
        />
        <path d="M-36-5-29 0-36 5Z" fill={INK} opacity={detail} />
      </g>
    );
  }
  if (kind === "storage") {
    return (
      <g>
        <Draw
          d="M-27-16C-27-27 27-27 27-16C27-5-27-5-27-16ZM-27-16V18C-27 29 27 29 27 18V-16"
          progress={p}
          color={INK}
        />
        <Draw
          d="M-27-5C-27 6 27 6 27-5M-27 7C-27 18 27 18 27 7"
          progress={detail}
        />
        <Draw
          d="M-16-16H-4M3-16H15M-15 17H-7M4 17H13"
          progress={detail}
          width={1.7}
        />
      </g>
    );
  }
  if (kind === "interface") {
    return (
      <g>
        <Draw
          d="M-24-23-39 0-24 23M24-23 39 0 24 23"
          progress={p}
          color={INK}
        />
        <Draw d="M-14-16H14M-14 0H5M-14 16H14" progress={detail} />
        <g fill={PAPER} stroke={INK} strokeWidth={1.7} opacity={detail}>
          <circle cx={-6} cy={-16} r={4} />
          <circle cx={8} cy={0} r={4} />
          <circle cx={-2} cy={16} r={4} />
        </g>
      </g>
    );
  }
  if (kind === "testing") {
    return (
      <g>
        <Draw d="M-38 0H-24M-10 0H2M16 0H29M-17 7V23H24V7" progress={p} />
        <Draw
          d="M-17-8-9 0-17 8-25 0ZM9-8 17 0 9 8 1 0Z"
          progress={detail}
          color={INK}
        />
        <Draw
          d="M28-14H42M28-3H38M28 8H42M-20-16-17-19-14-16M6-16 9-19 12-16"
          progress={detail}
          color={INK}
        />
        <circle cx={-38} r={3} fill={SLATE} opacity={detail} />
      </g>
    );
  }
  return (
    <g>
      <Draw d="M-35-19H-9M-35-6H-15M-35 7H-10M-35 20H-15" progress={p} />
      <Draw
        d="M-30-23V-15M-34-19H-26M-34 7H-26"
        progress={detail}
        color={INK}
        width={1.7}
      />
      <Draw
        d="M28-3A15 15 0 1 1-2-3A15 15 0 1 1 28-3M24 9 39 24"
        progress={detail}
        color={INK}
      />
      <Draw
        d="M5-7H20M5-1H15M5 5H20M4 23H20M4 23 9 18M4 23 9 28"
        progress={detail}
        width={1.7}
      />
    </g>
  );
};

export const WorkstreamModule: React.FC<{
  kind: WorkstreamKind;
  construction: number;
  visibility?: number;
  integration?: number;
}> = ({ kind, construction, visibility = 1, integration = 0 }) => {
  const module = WORKSTREAMS[kind];
  const merge = ease(integration);
  const destination = { x: 318, y: 135 + module.index * 22 };
  const position = toward(module, destination, merge);
  return (
    <g
      data-workstream={kind}
      transform={`translate(${position.x} ${position.y}) scale(${1 - merge * 0.46})`}
      opacity={clamp(visibility) * (1 - phase(merge, 0.58, 0.96))}
    >
      <WorkstreamGlyph kind={kind} construction={construction} />
      <text
        y={43}
        textAnchor="middle"
        fontFamily={FONT_FAMILY}
        fontSize={14}
        fontWeight={700}
        fill="#555"
        opacity={phase(construction, 0.08, 0.3) * (1 - phase(merge, 0, 0.3))}
      >
        {module.label}
      </text>
    </g>
  );
};

/** Six open isometric software layers; no panel, card, or enclosing UI chrome. */
export const SoftwareArchitecture: React.FC<{ progress: number }> = ({
  progress,
}) => {
  const p = clamp(progress);
  return (
    <g
      data-software-architecture
      transform="translate(318 190)"
      opacity={ease(phase(p, 0, 0.25))}
    >
      <Draw d="M-82-45V65M82-45V65" progress={p} width={1.4} />
      {[5, 4, 3, 2, 1, 0].map((index) => {
        const reveal = ease(phase(p, index * 0.065, 0.65 + index * 0.065));
        const y = -55 + index * 22;
        return (
          <g
            key={index}
            transform={`translate(0 ${y + (1 - reveal) * 7})`}
            opacity={reveal}
          >
            <path
              d="M0-18 82 10 0 38-82 10Z"
              fill={index === 5 ? SLATE : PAPER}
              stroke={INK}
              strokeWidth={1.7}
              strokeLinejoin="round"
            />
            <path
              d="M-50 8-15-4 11 5-23 17ZM15 8 38 0 59 7 36 15Z"
              fill={index === 5 ? PAPER : SLATE}
              opacity={0.65}
            />
            <path
              d="M-23 17-2 24 36 11M0 28 12 24"
              fill="none"
              stroke={index === 5 ? PAPER : INK}
              strokeWidth={1.4}
            />
          </g>
        );
      })}
      <text
        y={132}
        textAnchor="middle"
        fontFamily={FONT_FAMILY}
        fontSize={14}
        fontWeight={800}
        letterSpacing="0.8"
        fill={INK}
        opacity={phase(p, 0.75, 1)}
      >
        SISTEM TERPADU
      </text>
    </g>
  );
};

export type CoordinationSystemProps = {
  /** Outgoing task paths and six workstream entrances. */
  delegation: number;
  /** Progressive construction of each distinct workstream glyph. */
  construction: number;
  /** Six results return first; then testing/review receive a revision pass. */
  feedback: number;
  /** Gather the workstreams into six central software layers; 1 is settled. */
  integration: number;
};

export const CoordinationSystem: React.FC<CoordinationSystemProps> = ({
  delegation,
  construction,
  feedback,
  integration,
}) => {
  const d = clamp(delegation);
  const build = clamp(construction);
  const f = clamp(feedback);
  const join = clamp(integration);
  const visible = phase(d, 0.04, 0.38);
  return (
    <g data-coordination-system strokeLinecap="round" strokeLinejoin="round">
      <DelegationPaths progress={d} feedback={f} integration={join} />
      {/* Explicit instances keep the six conceptual workstreams authorable. */}
      <WorkstreamModule
        kind="core"
        construction={build}
        visibility={visible}
        integration={join}
      />
      <WorkstreamModule
        kind="drivers"
        construction={build}
        visibility={visible}
        integration={join}
      />
      <WorkstreamModule
        kind="storage"
        construction={build}
        visibility={visible}
        integration={join}
      />
      <WorkstreamModule
        kind="interface"
        construction={build}
        visibility={visible}
        integration={join}
      />
      <WorkstreamModule
        kind="testing"
        construction={build}
        visibility={visible}
        integration={join}
      />
      <WorkstreamModule
        kind="review"
        construction={build}
        visibility={visible}
        integration={join}
      />
      <g opacity={visible * (1 - phase(join, 0, 0.55))}>
        {KINDS.map((kind, index) => (
          <ResultPacket
            key={kind}
            kind={kind}
            progress={phase(f, index * 0.055, 0.4 + index * 0.055)}
          />
        ))}
        {/* A single directed revision pass, rather than perpetual orbiting. */}
        <ResultPacket kind="testing" revision progress={phase(f, 0.64, 0.94)} />
        <ResultPacket kind="review" revision progress={phase(f, 0.7, 1)} />
      </g>
      <CentralModelNode opacity={1 - ease(phase(join, 0.12, 0.66))} />
      <SoftwareArchitecture progress={phase(join, 0.18, 1)} />
    </g>
  );
};

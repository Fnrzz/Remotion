import React from "react";
import { Easing, interpolate } from "remotion";
import { FONT_FAMILY } from "../../../fonts";

const SLATE = "#708090";
const PAPER = "#FAF9F6";
const clamp = {
  extrapolateLeft: "clamp",
  extrapolateRight: "clamp",
} as const;
const ease = Easing.bezier(0.22, 1, 0.36, 1);

export type ModularRuntimeProps = {
  seconds: number;
  dark?: boolean;
  detailed?: boolean;
  replace?: boolean;
  replaceCore?: boolean;
  assembly?: number;
  revealSeconds?: number;
};

export type IntegratedCodingAgentProps = {
  seconds: number;
  dark?: boolean;
  extensions?: boolean;
  workflow?: boolean;
};

/** A left-facing, two-pin compatible connector; coordinates are SVG-local. */
export const PlugGlyph: React.FC<{
  x?: number;
  y?: number;
  color?: string;
}> = ({ x = 0, y = 0, color = SLATE }) => (
  <g
    transform={`translate(${x} ${y})`}
    stroke={color}
    strokeWidth={1.7}
    fill="none"
    strokeLinejoin="miter"
  >
    <path d="M0-5H8V5H0ZM-5-3H0M-5 3H0M8 0H13" />
  </g>
);

const ToolModule: React.FC<{
  incoming?: boolean;
  ink: string;
  paper: string;
}> = ({ incoming = false, ink, paper }) => (
  <g>
    <rect
      x={234}
      y={114}
      width={40}
      height={42}
      fill={paper}
      stroke={ink}
      strokeWidth={2}
    />
    <PlugGlyph x={227} y={135} color={ink} />
    {incoming ? (
      <path
        d="M244 128H264M244 141H264M250 123V133M258 136V146"
        stroke={ink}
        strokeWidth={2}
      />
    ) : (
      <g fill="none" stroke={ink} strokeWidth={2}>
        <path d="M248 127L242 135L248 143M260 127L266 135L260 143M256 125L252 145" />
      </g>
    )}
  </g>
);

/** Five schematic modules; all timing is local seconds supplied by the caller. */
export const ModularRuntime: React.FC<ModularRuntimeProps> = ({
  seconds,
  dark = false,
  detailed = false,
  replace = false,
  replaceCore = false,
  assembly = 1,
  revealSeconds,
}) => {
  const ink = dark ? PAPER : "#000000";
  const paper = dark ? "#000000" : PAPER;
  const connection = replace
    ? interpolate(seconds, [2, 2.4, 4.25, 4.9], [1, 0, 0, 1], clamp)
    : 1;
  const reveal = (at: number) =>
    revealSeconds === undefined
      ? 1
      : interpolate(revealSeconds, [at, at + 0.35], [0, 1], clamp);

  return (
    <svg
      width={290}
      height={280}
      viewBox="0 0 290 280"
      fill="none"
      role="img"
      aria-label="Ilustrasi runtime modular: adaptasi model, loop agen, alat, penyimpanan, dan Sandbox"
      style={{ display: "block", fontFamily: FONT_FAMILY }}
    >
      <title>Arsitektur modular — ilustrasi, bukan eksekusi</title>
      <g
        stroke={SLATE}
        strokeWidth={1.7}
        opacity={replaceCore ? connection : 1}
      >
        <path
          d="M49 75V94H128V105"
          pathLength="1"
          strokeDasharray="1"
          strokeDashoffset={1 - reveal(0.75)}
        />
        <path
          d="M112 144H49V199"
          pathLength="1"
          strokeDasharray="1"
          strokeDashoffset={1 - reveal(2.05)}
        />
        <path
          d="M161 169V186H248V199"
          pathLength="1"
          strokeDasharray="1"
          strokeDashoffset={1 - reveal(2.65)}
        />
        <path d="M177 135H210" opacity={reveal(1.45)} />
        <path d="M210 135H220" opacity={connection * reveal(1.45)} />
        <path d="M220 128V142M220 131H223M220 139H223" opacity={reveal(1.45)} />
        <path
          d="M49 75V94H128V105"
          stroke={ink}
          pathLength={1}
          strokeDasharray="0.12 0.88"
          strokeDashoffset={-((Math.max(0, seconds) * 0.24) % 1)}
          opacity={reveal(0.75)}
        />
      </g>

      {/* Model adaptor: two geometries meeting at the same interface. */}
      <g data-runtime-module="model" opacity={reveal(0.15)}>
        <g
          stroke={ink}
          strokeWidth={2}
          transform={`translate(${(1 - assembly) * -15} ${(1 - assembly) * -18})`}
        >
          <rect x={28} y={33} width={42} height={42} fill={paper} />
          <path d="M36 45H45V63H36ZM54 45L63 54L54 63Z" />
          <path d="M45 54H54" stroke={SLATE} />
        </g>
        <g fill={ink} fontSize={14} fontWeight={650}>
          <text x={82} y={48}>
            Adaptor
          </text>
          <text x={82} y={67}>
            model
          </text>
        </g>

        {/* The loop stays mechanically stable while the tool is unplugged. */}
      </g>
      <g data-runtime-module="loop" opacity={reveal(0.75)}>
        <g
          opacity={
            replaceCore ? interpolate(seconds, [2.25, 3.05], [1, 0], clamp) : 1
          }
          transform={`translate(0 ${replaceCore ? interpolate(seconds, [2, 3.1], [0, -23], { ...clamp, easing: ease }) : 0})`}
        >
          <rect
            x={113}
            y={105}
            width={64}
            height={64}
            stroke={ink}
            strokeWidth={2.3}
            fill={paper}
          />
          <g stroke={ink} strokeWidth={2.3} strokeLinejoin="miter">
            <path d="M129 139V130H159M153 124L159 130L153 136M161 136V145H131M137 139L131 145L137 151" />
          </g>
          <rect
            x={141}
            y={133}
            width={7}
            height={7}
            fill={SLATE}
            opacity={interpolate(Math.sin(seconds * 2.2), [-1, 1], [0.45, 1])}
          />
        </g>
        {replaceCore ? (
          <g
            opacity={interpolate(seconds, [3.1, 3.65], [0, 1], clamp)}
            transform={`translate(0 ${interpolate(seconds, [3.15, 4.4], [25, 0], { ...clamp, easing: ease })})`}
          >
            <rect
              x="113"
              y="105"
              width="64"
              height="64"
              stroke={ink}
              strokeWidth="2.3"
              fill={paper}
            />
            <path
              d="M128 137v-12h34v24h-34v-7M155 118l7 7-7 7"
              stroke={ink}
              strokeWidth="2.3"
            />
            <path d="M135 135h18M135 140h12" stroke={SLATE} strokeWidth="2" />
          </g>
        ) : null}
        <text
          x={145}
          y={94}
          fill={ink}
          fontSize={15}
          fontWeight={750}
          textAnchor="middle"
        >
          Loop agen
        </text>
      </g>

      <g data-runtime-module="tools" opacity={reveal(1.45)}>
        <g
          opacity={
            replace && !replaceCore
              ? interpolate(seconds, [2.25, 3.05], [1, 0], clamp)
              : 1
          }
          transform={`translate(${replace && !replaceCore ? interpolate(seconds, [2, 2.8], [0, 13], { ...clamp, easing: ease }) : 0} ${replace && !replaceCore ? interpolate(seconds, [2.55, 3.1], [0, -23], { ...clamp, easing: ease }) : 0})`}
        >
          <ToolModule ink={ink} paper={paper} />
        </g>
        {replace && !replaceCore ? (
          <g
            opacity={interpolate(seconds, [3.1, 3.65], [0, 1], clamp)}
            transform={`translate(${interpolate(seconds, [3.15, 4.4], [13, 0], { ...clamp, easing: ease })} ${interpolate(seconds, [3.15, 3.9], [25, 0], { ...clamp, easing: ease })})`}
          >
            <ToolModule incoming ink={ink} paper={paper} />
          </g>
        ) : null}
        <text
          x={254}
          y={178}
          fill={ink}
          fontSize={14}
          fontWeight={650}
          textAnchor="middle"
        >
          Alat
        </text>
      </g>

      {replace ? (
        <path
          d="M193 164L198 159C197 156 199 153 202 154L200 157L203 160L206 158C207 161 204 164 201 163L196 168Z"
          stroke={ink}
          strokeWidth={1.4}
          fill={paper}
          opacity={interpolate(seconds, [2.35, 2.8], [0, 1], clamp)}
        />
      ) : null}

      {/* Storage uses stacked slots; Sandbox is a bounded working volume. */}
      <g data-runtime-module="storage" opacity={reveal(2.05)}>
        <g
          fill={paper}
          stroke={ink}
          strokeWidth={2}
          transform={`translate(0 ${(1 - assembly) * -18})`}
        >
          <rect x={28} y={199} width={42} height={42} />
          <path d="M35 210H63M35 220H63M35 230H56" />
        </g>
        <text
          x={57}
          y={260}
          fill={ink}
          fontSize={14}
          fontWeight={650}
          textAnchor="middle"
        >
          Penyimpanan
        </text>
      </g>
      <g data-runtime-module="sandbox" opacity={reveal(2.65)}>
        <g
          fill={paper}
          stroke={ink}
          strokeWidth={2}
          transform={`translate(0 ${(1 - assembly) * -18})`}
        >
          <rect x={227} y={199} width={42} height={42} />
          <path d="M235 216L248 208L261 216V231L248 236L235 231ZM235 216L248 222L261 216M248 222V236" />
        </g>
        <g fill={ink} fontSize={14} fontWeight={650} textAnchor="middle">
          <text x={248} y={260}>
            Sandbox
          </text>
        </g>
      </g>

      {detailed ? (
        <g opacity={reveal(2.65)}>
          <path
            d="M88 267L93 262C92 259 94 256 97 257L95 260L98 263L101 261C102 264 99 267 96 266L91 271Z"
            stroke={ink}
            strokeWidth={1.4}
            fill={paper}
          />
          <text x={108} y={277} fill={ink} fontSize={14} fontWeight={600}>
            Perlu konfigurasi
          </text>
        </g>
      ) : null}
    </svg>
  );
};

type ExtensionKind = "Skills" | "Hooks" | "MCP" | "Plugin";

const ExtensionGlyph: React.FC<{
  kind: ExtensionKind;
  x: number;
  y: number;
  ink: string;
}> = ({ kind, x, y, ink }) => (
  <g
    transform={`translate(${x} ${y})`}
    fill="none"
    stroke={ink}
    strokeWidth={1.8}
    strokeLinejoin="miter"
  >
    {kind === "Skills" ? (
      <>
        <path d="M-12-8L0-13L12-8L0-3ZM-12-1L0 4L12-1M-12 6L0 11L12 6" />
      </>
    ) : kind === "Hooks" ? (
      <>
        <path d="M-9-12V0H7V-9M7 0V6C7 14-5 14-5 6V3M2-4L7-9L12-4" />
        <rect x={-12} y={-14} width={6} height={6} />
      </>
    ) : kind === "MCP" ? (
      <>
        <path d="M-10-8L0 0L10-8M0 0V11" />
        <rect x={-14} y={-14} width={7} height={7} />
        <rect x={7} y={-14} width={7} height={7} />
        <rect x={-3.5} y={8} width={7} height={7} />
      </>
    ) : (
      <path d="M-12-11H-3V-7H3V-11H12V-2H8V4H12V13H3V9H-3V13H-12V4H-8V-2H-12Z" />
    )}
  </g>
);

const EXTENSIONS: readonly {
  name: ExtensionKind;
  x: number;
  y: number;
  labelY: number;
  start: number;
  connection: string;
}[] = [
  {
    name: "Skills",
    x: 46,
    y: 25,
    labelY: 60,
    start: 2.32,
    connection: "M60 25H91V73H144V85",
  },
  {
    name: "Hooks",
    x: 244,
    y: 25,
    labelY: 60,
    start: 2.64,
    connection: "M230 25H207V73H251V85",
  },
  {
    name: "MCP",
    x: 46,
    y: 248,
    labelY: 278,
    start: 3.64,
    connection: "M61 248H90V214H119",
  },
  {
    name: "Plugin",
    x: 244,
    y: 248,
    labelY: 278,
    start: 1.39,
    connection: "M229 248H203V214H221",
  },
];

/** Open editor schematic, not a product screenshot or a claimed agent run. */
export const IntegratedCodingAgent: React.FC<IntegratedCodingAgentProps> = ({
  seconds,
  dark = false,
  extensions = false,
  workflow = false,
}) => {
  const ink = dark ? PAPER : "#000000";
  const read = workflow ? interpolate(seconds, [2.7, 3.3], [0, 1], clamp) : 1;
  const edit = workflow ? interpolate(seconds, [3.76, 4.45], [0, 1], clamp) : 1;
  const tools = workflow
    ? interpolate(seconds, [4.82, 5.65], [0, 1], clamp)
    : 1;

  return (
    <svg
      width={290}
      height={280}
      viewBox="0 0 290 280"
      fill="none"
      role="img"
      aria-label="Ilustrasi editor dengan berkas contoh dan agen terintegrasi, serta ekstensi Skills, Hooks, MCP, dan Plugin"
      style={{ display: "block", fontFamily: FONT_FAMILY }}
    >
      <title>Editor dan agen terintegrasi — skema ilustratif</title>

      {extensions
        ? EXTENSIONS.map(({ name, x, y, labelY, start, connection }) => (
            <g key={name}>
              <path
                d={connection}
                stroke={SLATE}
                strokeWidth={1.6}
                pathLength={1}
                strokeDasharray={1}
                strokeDashoffset={interpolate(
                  seconds,
                  [start, start + 0.55],
                  [1, 0],
                  { ...clamp, easing: ease },
                )}
              />
              <g
                opacity={interpolate(
                  seconds,
                  [start, start + 0.35],
                  [0, 1],
                  clamp,
                )}
              >
                <ExtensionGlyph kind={name} x={x} y={y} ink={ink} />
                <text
                  x={x}
                  y={labelY}
                  fill={ink}
                  fontSize={14}
                  fontWeight={700}
                  textAnchor="middle"
                >
                  {name}
                </text>
              </g>
            </g>
          ))
        : null}

      {/* Open rules rather than a surrounding application window/card. */}
      <path d="M18 85H273M117 98V183M18 194H273" stroke={ink} strokeWidth={2} />
      <path
        d="M23 111V163H30M23 136H30"
        stroke={SLATE}
        strokeWidth={1.5}
        pathLength="1"
        strokeDasharray="1"
        strokeDashoffset={1 - read}
      />
      <g fill={ink} fontSize={14} fontWeight={600} opacity={0.35 + read * 0.65}>
        <text x={34} y={127}>
          contoh.ts
        </text>
        <text x={34} y={155}>
          data.ts
        </text>
      </g>
      <path
        d="M34 135H101"
        stroke={SLATE}
        strokeWidth={2}
        pathLength="1"
        strokeDasharray="1"
        strokeDashoffset={1 - read}
      />

      {/* Geometric code notation only: no fabricated execution or test output. */}
      <g strokeWidth={3} strokeLinecap="square">
        <path
          d="M133 107L128 112L133 117M259 107L264 112L259 117"
          stroke={ink}
        />
        <path
          d="M143 112H164M174 112H221M141 126H154M164 126H198M208 126H247"
          stroke={SLATE}
        />
        <path
          d="M152 140H184M194 140H228M152 154H171M181 154H239"
          stroke={ink}
          pathLength="1"
          strokeDasharray="1"
          strokeDashoffset={1 - edit}
        />
        <path d="M141 168H158M168 168H202M212 168H224" stroke={SLATE} />
      </g>
      <path
        d="M247 149V159"
        stroke={ink}
        strokeWidth={2}
        opacity={interpolate(Math.sin(seconds * 2.5), [-1, 1], [0.3, 1])}
      />

      <text x={20} y={219} fill={ink} fontSize={15} fontWeight={750}>
        Agen
      </text>
      <path
        d="M75 214H112M126 214H165M179 214H221M235 214H271"
        stroke={SLATE}
        strokeWidth={1.7}
        pathLength="1"
        strokeDasharray="1"
        strokeDashoffset={1 - tools}
      />
      {[119, 172, 228].map((x, index) => (
        <g key={x} opacity={0.3 + tools * 0.7}>
          <rect
            x={x - 7}
            y={207}
            width={14}
            height={14}
            stroke={ink}
            strokeWidth={1.8}
          />
          <rect
            x={x - 2}
            y={212}
            width={4}
            height={4}
            fill={SLATE}
            opacity={interpolate(
              Math.sin(seconds * 2.2 - index * 1.4),
              [-1, 1],
              [0.2, 1],
            )}
          />
        </g>
      ))}
      {workflow ? (
        <g
          data-workflow-cursor
          transform={`translate(${interpolate(seconds, [2.7, 3.3, 3.76, 4.45, 4.82, 5.65], [70, 70, 160, 210, 172, 230], { ...clamp, easing: ease })} ${interpolate(seconds, [2.7, 3.3, 3.76, 4.45, 4.82, 5.65], [121, 121, 144, 144, 214, 214], { ...clamp, easing: ease })})`}
          opacity={interpolate(
            seconds,
            [2.6, 2.7, 5.9, 6.03],
            [0, 1, 1, 0],
            clamp,
          )}
        >
          <path
            d="M0 0v18l5-4 4 7 4-2-4-7h7z"
            fill={SLATE}
            stroke={dark ? "#000000" : PAPER}
            strokeWidth="1.5"
          />
        </g>
      ) : null}
    </svg>
  );
};

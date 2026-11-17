import React from "react";
import { Interactive, interpolate } from "remotion";

type Point = readonly [number, number];
type Curve = readonly [Point, Point, Point, Point];
type Leg = readonly [number, number, Curve];
type TaskKind = "architecture" | "edit" | "test" | "verify";

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

// These control points match the independently editable paths below.
const incoming: Curve = [
  [74, 185],
  [118, 185],
  [136, 185],
  [173, 185],
];
const toCarbon: Curve = [
  [237, 177],
  [287, 177],
  [300, 95],
  [358, 95],
];
const toHydrogen: Curve = [
  [237, 193],
  [287, 193],
  [300, 274],
  [358, 274],
];
const carbonToHydrogen: Curve = [
  [404, 122],
  [441, 166],
  [441, 203],
  [404, 247],
];
const hydrogenToCarbon: Curve = [
  [374, 247],
  [332, 204],
  [332, 161],
  [374, 122],
];
const carbonReturn: Curve = [
  [358, 102],
  [306, 102],
  [289, 167],
  [237, 177],
];
const hydrogenReturn: Curve = [
  [358, 267],
  [306, 267],
  [289, 203],
  [237, 193],
];
const carbonToTool: Curve = [
  [420, 95],
  [481, 95],
  [481, 147],
  [508, 169],
];
const hydrogenToTool: Curve = [
  [420, 274],
  [481, 274],
  [481, 223],
  [508, 201],
];
const feedback: Curve = [
  [502, 185],
  [437, 185],
  [285, 185],
  [237, 185],
];
const toOutput: Curve = [
  [544, 185],
  [558, 185],
  [568, 185],
  [583, 185],
];

const onCurve = (curve: Curve, progress: number): Point => {
  const t = Math.max(0, Math.min(1, progress));
  const u = 1 - t;
  return [
    u ** 3 * curve[0][0] +
      3 * u ** 2 * t * curve[1][0] +
      3 * u * t ** 2 * curve[2][0] +
      t ** 3 * curve[3][0],
    u ** 3 * curve[0][1] +
      3 * u ** 2 * t * curve[1][1] +
      3 * u * t ** 2 * curve[2][1] +
      t ** 3 * curve[3][1],
  ];
};

// Pure phase geometry: scrubbing or rendering any frame gives the same result.
// Legs are motion coordinates, not generated JSX/timeline items.
const travel = (phase: number, legs: readonly Leg[]): Point => {
  for (let index = 0; index < legs.length; index++) {
    const [start, end, curve] = legs[index];
    if (phase <= end) {
      const previous = legs[index - 1];
      let routeStart = start;
      if (previous) {
        const from = previous[2][3];
        const to = curve[0];
        // Spend the gap, plus a short entrance beat, passing through the node.
        // In particular, tool ingress and egress are no longer disconnected.
        routeStart = start + (end - start) * 0.14;
        if (phase < routeStart) {
          const centers: readonly Point[] = [
            [205, 185],
            [389, 95],
            [389, 274],
            [523, 185],
          ];
          const center: Point = centers.find(
            (point) =>
              Math.hypot(point[0] - from[0], point[1] - from[1]) < 48 &&
              Math.hypot(point[0] - to[0], point[1] - to[1]) < 48,
          ) ?? [(from[0] + to[0]) / 2, (from[1] + to[1]) / 2];
          const t = Math.max(
            0,
            Math.min(1, (phase - previous[1]) / (routeStart - previous[1])),
          );
          return onCurve([from, center, center, to], t * t * (3 - 2 * t));
        }
      }
      const t = Math.max(
        0,
        Math.min(1, (phase - routeStart) / (end - routeStart)),
      );
      return onCurve(curve, t * t * (3 - 2 * t));
    }
  }
  return legs[legs.length - 1][2][3];
};

const TaskGlyph: React.FC<{ kind: TaskKind }> = ({ kind }) => {
  if (kind === "architecture") {
    return (
      <path
        d="M 0 -8 L 8 0 L 0 8 L -8 0 Z"
        fill="#000000"
        stroke="#FAF9F6"
        strokeWidth="1.5"
      />
    );
  }
  if (kind === "edit") {
    return (
      <rect
        x="-7"
        y="-7"
        width="14"
        height="14"
        fill="#708090"
        stroke="#FAF9F6"
        strokeWidth="1.5"
      />
    );
  }
  if (kind === "test") {
    return <circle r="6.5" fill="#FAF9F6" stroke="#000000" strokeWidth="2.5" />;
  }
  return (
    <path
      d="M 0 -8 L 8 7 L -8 7 Z"
      fill="#FAF9F6"
      stroke="#708090"
      strokeWidth="2.5"
    />
  );
};

/** Inner 636×400 artwork; the caller owns ContentStage placement and phase timing. */
export const Orchestration: React.FC<{ phase: number }> = ({ phase }) => {
  const p = Math.max(0, Math.min(6, phase));
  const architecture = travel(p, [
    [0.2, 1.05, incoming],
    [1.05, 1.95, toCarbon],
    [2.1, 2.95, carbonToHydrogen],
    [3.05, 3.85, hydrogenReturn],
    [4.05, 4.5, toCarbon],
    [4.5, 5.05, carbonToTool],
    [5.05, 5.7, toOutput],
  ]);
  const edit = travel(p, [
    [0.4, 1.25, incoming],
    [1.25, 2.15, toHydrogen],
    [2.3, 3.15, hydrogenToCarbon],
    [3.25, 4, carbonReturn],
    [4.15, 4.65, toHydrogen],
    [4.65, 5.2, hydrogenToTool],
    [5.2, 5.8, toOutput],
  ]);
  const test = travel(p, [
    [0.55, 1.4, incoming],
    [1.4, 2.3, toCarbon],
    [2.45, 3.3, carbonToHydrogen],
    [3.4, 3.95, hydrogenToTool],
    [4, 4.65, feedback],
    [4.65, 5.1, toCarbon],
    [5.1, 5.55, carbonToTool],
    [5.55, 5.95, toOutput],
  ]);
  const verify = travel(p, [
    [0.7, 1.55, incoming],
    [1.55, 2.45, toHydrogen],
    [2.6, 3.45, hydrogenToCarbon],
    [3.5, 4.05, carbonToTool],
    [4.15, 4.8, feedback],
    [4.8, 5.25, toHydrogen],
    [5.25, 5.7, hydrogenToTool],
    [5.7, 6, toOutput],
  ]);
  const toolExchange =
    p <= 3.35
      ? onCurve(
          [
            [128, 49],
            [143, 45],
            [153, 50],
            [161, 57],
          ],
          interpolate(p, [2.65, 3.35], [0, 1], clamp),
        )
      : onCurve(
          [
            [161, 57],
            [172, 75],
            [140, 82],
            [123, 65],
          ],
          interpolate(p, [3.35, 4.15], [0, 1], clamp),
        );

  return (
    <svg
      width="636"
      height="400"
      viewBox="0 0 636 400"
      role="img"
      aria-label="Ilustrasi konseptual orkestrasi proyek: tugas arsitektur, edit, pengujian, dan verifikasi berpindah dua arah antara orchestrator, Gemini 4 Carbon, Gemini 4 Hydrogen, alat verifikasi, dan satu alur hasil. Pembagian tugas tidak tetap."
      data-hydrogen-bounds="0 0 636 400"
      style={{ display: "block", fontFamily: "inherit", overflow: "visible" }}
    >
      <text
        x="0"
        y="17"
        fill="#555555"
        fontSize="16"
        fontWeight="600"
        letterSpacing="0.6"
        data-conceptual-disclosure
      >
        ILUSTRASI KONSEPTUAL
      </text>

      <g fill="none" stroke="#708090" strokeWidth="1.5" strokeLinecap="round">
        <Interactive.Path
          name="Project into orchestrator"
          d="M 74 185 C 118 185 136 185 173 185"
          opacity="0.45"
        />
        <Interactive.Path
          name="Orchestrator to Carbon route"
          d="M 237 177 C 287 177 300 95 358 95"
          opacity={interpolate(p, [0, 1, 2], [0.15, 0.4, 0.65], clamp)}
        />
        <Interactive.Path
          name="Orchestrator to Hydrogen route"
          d="M 237 193 C 287 193 300 274 358 274"
          opacity={interpolate(p, [0, 1, 2], [0.15, 0.4, 0.65], clamp)}
        />
        <Interactive.Path
          name="Carbon to Hydrogen exchange"
          d="M 404 122 C 441 166 441 203 404 247"
          opacity={interpolate(
            p,
            [0, 2, 2.6, 5.4, 6],
            [0.1, 0.1, 0.6, 0.6, 0.28],
            clamp,
          )}
        />
        <Interactive.Path
          name="Hydrogen to Carbon exchange"
          d="M 374 247 C 332 204 332 161 374 122"
          opacity={interpolate(
            p,
            [0, 2, 2.6, 5.4, 6],
            [0.1, 0.1, 0.6, 0.6, 0.28],
            clamp,
          )}
        />
        <Interactive.Path
          name="Carbon returns to orchestrator"
          d="M 358 102 C 306 102 289 167 237 177"
          strokeDasharray="3 5"
          opacity={interpolate(
            p,
            [0, 2.8, 3.4, 5, 6],
            [0.06, 0.06, 0.45, 0.45, 0.18],
            clamp,
          )}
        />
        <Interactive.Path
          name="Hydrogen returns to orchestrator"
          d="M 358 267 C 306 267 289 203 237 193"
          strokeDasharray="3 5"
          opacity={interpolate(
            p,
            [0, 2.8, 3.4, 5, 6],
            [0.06, 0.06, 0.45, 0.45, 0.18],
            clamp,
          )}
        />
        <Interactive.Path
          name="Carbon to verification tools"
          d="M 420 95 C 481 95 481 147 508 169"
          opacity={interpolate(p, [0, 2, 3.5], [0.13, 0.3, 0.65], clamp)}
        />
        <Interactive.Path
          name="Hydrogen to verification tools"
          d="M 420 274 C 481 274 481 223 508 201"
          opacity={interpolate(p, [0, 2, 3.5], [0.13, 0.3, 0.65], clamp)}
        />
        <Interactive.Path
          name="Verification feedback to orchestrator"
          d="M 502 185 C 437 185 285 185 237 185"
          strokeDasharray="3 5"
          opacity={interpolate(
            p,
            [0, 3.5, 4, 5.2, 6],
            [0.06, 0.06, 0.65, 0.65, 0.2],
            clamp,
          )}
        />
        <Interactive.Path
          name="Verified work unifies"
          d="M 544 185 C 558 185 568 185 583 185"
          opacity={interpolate(p, [0, 4.7, 5.2], [0.15, 0.15, 0.8], clamp)}
        />
      </g>

      <g
        fill="none"
        stroke="#000000"
        strokeWidth="2.5"
        strokeLinecap="round"
        pathLength="1"
      >
        <Interactive.Path
          name="Active incoming project"
          d="M 74 185 C 118 185 136 185 173 185"
          pathLength="1"
          strokeDasharray="0.22 1"
          strokeDashoffset={interpolate(p, [0, 1.6], [0.22, -1], clamp)}
          opacity={interpolate(p, [0, 0.2, 1.5, 1.8], [0, 1, 1, 0], clamp)}
        />
        <Interactive.Path
          name="Active Carbon dispatch"
          d="M 237 177 C 287 177 300 95 358 95"
          pathLength="1"
          strokeDasharray="1"
          strokeDashoffset={interpolate(p, [1, 1.95], [1, 0], clamp)}
          opacity={interpolate(
            p,
            [0, 1, 1.5, 2.3, 3, 4.05, 4.5, 5.2, 6],
            [0, 0, 1, 1, 0.15, 0.15, 0.9, 0.9, 0.5],
            clamp,
          )}
        />
        <Interactive.Path
          name="Active Hydrogen dispatch"
          d="M 237 193 C 287 193 300 274 358 274"
          pathLength="1"
          strokeDasharray="1"
          strokeDashoffset={interpolate(p, [1.2, 2.15], [1, 0], clamp)}
          stroke="#708090"
          opacity={interpolate(
            p,
            [0, 1.2, 1.7, 2.5, 3.2, 4.15, 4.65, 5.4, 6],
            [0, 0, 1, 1, 0.3, 0.3, 1, 1, 0.7],
            clamp,
          )}
        />
        <Interactive.Path
          name="Active model cooperation downward"
          d="M 404 122 C 441 166 441 203 404 247"
          pathLength="1"
          strokeDasharray="0.24 1"
          strokeDashoffset={interpolate(p, [2.1, 3.3], [0.24, -1], clamp)}
          opacity={interpolate(p, [2, 2.2, 3.25, 3.6], [0, 1, 1, 0], clamp)}
        />
        <Interactive.Path
          name="Active model cooperation upward"
          d="M 374 247 C 332 204 332 161 374 122"
          pathLength="1"
          stroke="#708090"
          strokeDasharray="0.24 1"
          strokeDashoffset={interpolate(p, [2.3, 3.45], [0.24, -1], clamp)}
          opacity={interpolate(p, [2.2, 2.4, 3.4, 3.7], [0, 1, 1, 0], clamp)}
        />
        <Interactive.Path
          name="Active verification feedback"
          d="M 502 185 C 437 185 285 185 237 185"
          pathLength="1"
          strokeDasharray="0.2 1"
          strokeDashoffset={interpolate(p, [4, 4.8], [0.2, -1], clamp)}
          opacity={interpolate(p, [3.9, 4.1, 4.75, 5], [0, 1, 1, 0], clamp)}
        />
        <Interactive.Path
          name="Unified Carbon contribution"
          d="M 420 95 C 481 95 481 147 508 169"
          pathLength="1"
          strokeDasharray="1"
          strokeDashoffset={interpolate(p, [4.5, 5.1], [1, 0], clamp)}
          opacity={interpolate(p, [4.4, 4.7, 6], [0, 0.8, 0.55], clamp)}
        />
        <Interactive.Path
          name="Unified Hydrogen contribution"
          d="M 420 274 C 481 274 481 223 508 201"
          pathLength="1"
          stroke="#708090"
          strokeDasharray="1"
          strokeDashoffset={interpolate(p, [4.65, 5.25], [1, 0], clamp)}
          opacity={interpolate(p, [4.5, 4.8, 6], [0, 1, 0.8], clamp)}
        />
        <Interactive.Path
          name="Coherent final output connection"
          d="M 544 185 C 558 185 568 185 583 185"
          pathLength="1"
          strokeDasharray="1"
          strokeDashoffset={interpolate(p, [5, 5.6], [1, 0], clamp)}
        />
      </g>

      <Interactive.Svg
        name="Original project folder"
        x="0"
        y="143"
        width="88"
        height="106"
        viewBox="0 0 88 106"
      >
        <path
          d="M 12 20 L 12 12 L 33 12 L 42 21 L 69 21 L 69 61 L 12 61 Z"
          fill="#FAF9F6"
          stroke="#000000"
          strokeWidth="2"
        />
        <path
          d="M 12 29 L 74 29 L 67 61 L 12 61 Z"
          fill="#FAF9F6"
          stroke="#000000"
          strokeWidth="2"
        />
        <path
          d="M 22 2 H 48 L 57 11 V 24 M 48 2 V 11 H 57"
          fill="#FAF9F6"
          stroke="#708090"
          strokeWidth="1.5"
        />
        <path
          d="M 24 40 H 51 M 24 47 H 42"
          fill="none"
          stroke="#708090"
          strokeWidth="1.5"
        />
        <text x="10" y="91" fontSize="15" fontWeight="700" fill="#000000">
          PROYEK
        </text>
      </Interactive.Svg>

      <Interactive.Svg
        name="Orchestrator routing hub"
        x="132"
        y="136"
        width="152"
        height="116"
        viewBox="0 0 152 116"
        style={{ opacity: interpolate(p, [0, 0.8], [0.42, 1], clamp) }}
      >
        <circle
          cx="73"
          cy="49"
          r="32"
          fill="#FAF9F6"
          stroke="#000000"
          strokeWidth="2"
        />
        <circle
          cx="73"
          cy="49"
          r="22"
          fill="none"
          stroke="#708090"
          strokeWidth="1"
          strokeDasharray="2 5"
        />
        <path
          d="M 63 39 L 83 59 M 63 59 L 83 39 M 59 49 H 87 M 73 35 V 63"
          stroke="#000000"
          strokeWidth="1.7"
        />
        <circle cx="73" cy="49" r="6" fill="#000000" />
        <circle cx="41" cy="49" r="3" fill="#000000" />
        <circle cx="105" cy="41" r="3" fill="#000000" />
        <circle cx="105" cy="57" r="3" fill="#708090" />
        <text
          x="73"
          y="105"
          textAnchor="middle"
          fontSize="16"
          fontWeight="700"
          fill="#000000"
        >
          ORCHESTRATOR
        </text>
      </Interactive.Svg>

      <Interactive.Svg
        name="Gemini 4 Carbon model"
        x="291"
        y="21"
        width="226"
        height="122"
        viewBox="0 0 226 122"
        style={{ opacity: interpolate(p, [0, 1, 1.8], [0.35, 0.5, 1], clamp) }}
      >
        <text
          x="0"
          y="17"
          fontSize="18"
          fontWeight="800"
          letterSpacing="-0.45"
          fill="#000000"
        >
          GEMINI 4 CARBON
        </text>
        <circle
          cx="98"
          cy="74"
          r="31"
          fill="#FAF9F6"
          stroke="#000000"
          strokeWidth="2"
          strokeOpacity={interpolate(p, [1.4, 2.3], [1, 0.35], clamp)}
        />
        <Interactive.Path
          name="Carbon assembles architecture dependencies"
          d="M 98 65 V 71 H 77 V 79 M 98 71 H 120 V 79"
          fill="none"
          stroke="#708090"
          strokeWidth="1.8"
          pathLength="1"
          strokeDasharray="1"
          strokeDashoffset={interpolate(p, [1.7, 2.45], [1, 0], clamp)}
        />
        <Interactive.Path
          name="Carbon architecture root block"
          d="M 88 47 L 98 41 L 108 47 V 59 L 98 65 L 88 59 Z M 88 47 L 98 53 L 108 47 M 98 53 V 65"
          fill="#FAF9F6"
          stroke="#000000"
          strokeWidth="1.8"
          style={{
            opacity: interpolate(p, [1.25, 1.8], [0.25, 1], clamp),
            translate: interpolate(
              p,
              [1.25, 1.8],
              ["0px -5px", "0px 0px"],
              clamp,
            ),
          }}
        />
        <Interactive.Path
          name="Carbon architecture left module"
          d="M 66 83 L 77 77 L 88 83 V 95 L 77 101 L 66 95 Z M 66 83 L 77 89 L 88 83 M 77 89 V 101"
          fill="#FAF9F6"
          stroke="#000000"
          strokeWidth="1.8"
          style={{
            opacity: interpolate(p, [1.65, 2.2], [0, 1], clamp),
            translate: interpolate(
              p,
              [1.65, 2.2],
              ["-7px 4px", "0px 0px"],
              clamp,
            ),
          }}
        />
        <Interactive.Path
          name="Carbon architecture right module"
          d="M 109 83 L 120 77 L 131 83 V 95 L 120 101 L 109 95 Z M 109 83 L 120 89 L 131 83 M 120 89 V 101"
          fill="#FAF9F6"
          stroke="#708090"
          strokeWidth="1.8"
          style={{
            opacity: interpolate(p, [1.95, 2.5], [0, 1], clamp),
            translate: interpolate(
              p,
              [1.95, 2.5],
              ["7px 4px", "0px 0px"],
              clamp,
            ),
          }}
        />
        <Interactive.Path
          name="Carbon revises cross-module connection"
          d="M 88 90 H 109"
          fill="none"
          stroke="#000000"
          strokeWidth="2"
          pathLength="1"
          strokeDasharray="1"
          strokeDashoffset={interpolate(p, [2.85, 3.65], [1, 0], clamp)}
        />
        <rect
          x="94"
          y="85"
          width="9"
          height="9"
          fill="#708090"
          stroke="#FAF9F6"
          strokeWidth="1"
          opacity={interpolate(p, [3.35, 4.1], [0, 1], clamp)}
        />
      </Interactive.Svg>

      <Interactive.Svg
        name="Gemini 4 Hydrogen model"
        x="281"
        y="232"
        width="247"
        height="109"
        viewBox="0 0 247 109"
        style={{ opacity: interpolate(p, [0, 1.2, 2], [0.35, 0.5, 1], clamp) }}
      >
        <circle
          cx="108"
          cy="42"
          r="31"
          fill="#FAF9F6"
          stroke="#708090"
          strokeWidth="2.3"
        />
        <g opacity={interpolate(p, [1.4, 2.05], [1, 0], clamp)}>
          <ellipse
            cx="108"
            cy="42"
            rx="22"
            ry="9"
            fill="none"
            stroke="#708090"
            strokeWidth="1.7"
            style={{ rotate: "-38deg", transformOrigin: "108px 42px" }}
          />
          <ellipse
            cx="108"
            cy="42"
            rx="22"
            ry="9"
            fill="none"
            stroke="#708090"
            strokeWidth="1.7"
            style={{ rotate: "38deg", transformOrigin: "108px 42px" }}
          />
          <circle cx="108" cy="42" r="5" fill="#708090" />
        </g>
        <g opacity={interpolate(p, [1.55, 2.15], [0, 1], clamp)}>
          <path
            d="M 84 26 H 105 V 68 H 84 Z"
            fill="#FAF9F6"
            stroke="#708090"
            strokeWidth="1.5"
          />
          <Interactive.Path
            name="Hydrogen modified source files"
            d="M 93 18 H 113 L 124 29 V 62 H 93 Z M 113 18 V 29 H 124"
            fill="#FAF9F6"
            stroke="#000000"
            strokeWidth="1.7"
          />
          <path
            d="M 99 39 H 115 M 99 47 H 111"
            fill="none"
            stroke="#708090"
            strokeWidth="1.5"
            opacity={interpolate(p, [1.8, 2.45], [0.65, 0], clamp)}
          />
          <Interactive.Path
            name="Hydrogen writes first file modification"
            d="M 99 37 H 116"
            fill="none"
            stroke="#000000"
            strokeWidth="2.2"
            pathLength="1"
            strokeDasharray="1"
            strokeDashoffset={interpolate(p, [1.9, 2.35], [1, 0], clamp)}
          />
          <Interactive.Path
            name="Hydrogen writes second file modification"
            d="M 99 45 H 109 M 112 45 H 117"
            fill="none"
            stroke="#708090"
            strokeWidth="2.2"
            pathLength="1"
            strokeDasharray="1"
            strokeDashoffset={interpolate(p, [2.2, 2.7], [1, 0], clamp)}
          />
          <Interactive.Path
            name="Hydrogen writes third file modification"
            d="M 99 53 H 113"
            fill="none"
            stroke="#000000"
            strokeWidth="2.2"
            pathLength="1"
            strokeDasharray="1"
            strokeDashoffset={interpolate(p, [2.55, 3.05], [1, 0], clamp)}
          />
        </g>
        <g
          opacity={interpolate(p, [2.3, 2.8, 4.3, 5.5], [0, 1, 1, 0.5], clamp)}
        >
          <Interactive.Path
            name="Hydrogen file modification invokes tool"
            d="M 128 49 C 143 45 153 50 161 57"
            fill="none"
            stroke="#708090"
            strokeWidth="1.5"
            pathLength="1"
            strokeDasharray="1"
            strokeDashoffset={interpolate(p, [2.5, 3.3], [1, 0], clamp)}
          />
          <Interactive.Path
            name="Hydrogen tool returns verification feedback"
            d="M 161 57 C 172 75 140 82 123 65"
            fill="none"
            stroke="#708090"
            strokeWidth="1.5"
            pathLength="1"
            strokeDasharray="1"
            strokeDashoffset={interpolate(p, [3.35, 4.15], [1, 0], clamp)}
          />
          <path
            d="M 162 49 A 8 8 0 0 0 172 60 L 179 67 L 175 71 L 168 64 A 8 8 0 0 1 158 54 L 163 59 L 168 54 Z"
            fill="#FAF9F6"
            stroke="#000000"
            strokeWidth="1.6"
          />
          <circle
            cx={toolExchange[0]}
            cy={toolExchange[1]}
            r="3.5"
            fill="#FAF9F6"
            stroke="#000000"
            strokeWidth="1.7"
            opacity={interpolate(p, [2.6, 2.8, 4, 4.2], [0, 1, 1, 0], clamp)}
          />
        </g>
        <circle
          cx="108"
          cy="42"
          r="35"
          fill="none"
          stroke="#000000"
          strokeWidth="1.7"
          pathLength="1"
          strokeDasharray="1"
          strokeDashoffset={interpolate(p, [3.5, 4.4], [1, 0], clamp)}
          opacity={interpolate(
            p,
            [3.4, 3.7, 4.5, 6],
            [0, 0.85, 0.85, 0.3],
            clamp,
          )}
          style={{ rotate: "-90deg", transformOrigin: "108px 42px" }}
        />
        <text
          x="0"
          y="101"
          fontSize="18"
          fontWeight="800"
          letterSpacing="-0.45"
          fill="#000000"
        >
          GEMINI 4 HYDROGEN
        </text>
      </Interactive.Svg>

      <Interactive.Svg
        name="Tools and verification return"
        x="469"
        y="151"
        width="107"
        height="91"
        viewBox="0 0 107 91"
        style={{
          opacity: interpolate(p, [0, 2.7, 3.6], [0.35, 0.5, 1], clamp),
        }}
      >
        <circle
          cx="54"
          cy="34"
          r="21"
          fill="#FAF9F6"
          stroke="#000000"
          strokeWidth="1.7"
        />
        <path
          d="M 42 34 L 48 24 H 60 L 66 34 L 60 44 H 48 Z M 48 24 L 60 44 M 60 24 L 48 44"
          fill="none"
          stroke="#708090"
          strokeWidth="1.4"
        />
        <circle cx="54" cy="34" r="3" fill="#000000" />
        <text
          x="54"
          y="81"
          textAnchor="middle"
          fontSize="14"
          fontWeight="700"
          fill="#555555"
        >
          VERIFIKASI
        </text>
      </Interactive.Svg>

      <Interactive.Svg
        name="Single coherent final workflow"
        x="574"
        y="147"
        width="61"
        height="119"
        viewBox="0 0 61 119"
        style={{
          opacity: interpolate(p, [0, 4.8, 5.7], [0.18, 0.18, 1], clamp),
        }}
      >
        <path
          d="M 29 16 V 59 M 14 28 H 44 M 14 49 H 44"
          fill="none"
          stroke="#708090"
          strokeWidth="1.5"
        />
        <path d="M 29 7 L 37 15 L 29 23 L 21 15 Z" fill="#000000" />
        <rect x="8" y="23" width="12" height="12" fill="#708090" />
        <circle
          cx="44"
          cy="49"
          r="6"
          fill="#FAF9F6"
          stroke="#000000"
          strokeWidth="2"
        />
        <path
          d="M 29 54 L 36 67 H 22 Z"
          fill="#FAF9F6"
          stroke="#708090"
          strokeWidth="2"
        />
        <text
          x="29"
          y="96"
          textAnchor="middle"
          fontSize="14"
          fontWeight="800"
          fill="#000000"
        >
          ALUR
        </text>
        <text
          x="29"
          y="113"
          textAnchor="middle"
          fontSize="14"
          fontWeight="800"
          fill="#000000"
        >
          UTUH
        </text>
      </Interactive.Svg>

      <Interactive.Svg
        name="Architecture diamond task"
        x={architecture[0] - 13}
        y={architecture[1] - 13}
        width="26"
        height="26"
        viewBox="-13 -13 26 26"
        style={{
          opacity: interpolate(p, [0.1, 0.35, 5.45, 5.75], [0, 1, 1, 0], clamp),
        }}
      >
        <TaskGlyph kind="architecture" />
      </Interactive.Svg>
      <Interactive.Svg
        name="Edit square task"
        x={edit[0] - 13}
        y={edit[1] - 13}
        width="26"
        height="26"
        viewBox="-13 -13 26 26"
        style={{
          opacity: interpolate(p, [0.3, 0.55, 5.55, 5.85], [0, 1, 1, 0], clamp),
        }}
      >
        <TaskGlyph kind="edit" />
      </Interactive.Svg>
      <Interactive.Svg
        name="Testing ring task"
        x={test[0] - 13}
        y={test[1] - 13}
        width="26"
        height="26"
        viewBox="-13 -13 26 26"
        style={{
          opacity: interpolate(p, [0.45, 0.7, 5.7, 6], [0, 1, 1, 0], clamp),
        }}
      >
        <TaskGlyph kind="test" />
      </Interactive.Svg>
      <Interactive.Svg
        name="Verification triangle task"
        x={verify[0] - 13}
        y={verify[1] - 13}
        width="26"
        height="26"
        viewBox="-13 -13 26 26"
        style={{
          opacity: interpolate(p, [0.6, 0.85, 5.75, 6], [0, 1, 1, 0], clamp),
        }}
      >
        <TaskGlyph kind="verify" />
      </Interactive.Svg>

      <text
        x="0"
        y="355"
        fontSize="15"
        fontWeight="600"
        fill="#555555"
        data-routing-qualifier
      >
        RUTE &amp; PERAN DAPAT BERUBAH
      </text>
      <g
        fill="#555555"
        fontSize="14"
        fontWeight="600"
        opacity={interpolate(p, [0, 0.7, 1.3], [0.25, 0.5, 0.85], clamp)}
      >
        <path d="M 9 376 L 14 381 L 9 386 L 4 381 Z" fill="#000000" />
        <text x="24" y="385">
          ARSITEKTUR
        </text>
        <rect x="153" y="376" width="10" height="10" fill="#708090" />
        <text x="174" y="385">
          EDIT
        </text>
        <circle
          cx="249"
          cy="381"
          r="4.5"
          fill="none"
          stroke="#000000"
          strokeWidth="1.7"
        />
        <text x="264" y="385">
          PENGUJIAN
        </text>
        <path
          d="M 385 375 L 391 386 H 379 Z"
          fill="none"
          stroke="#708090"
          strokeWidth="1.7"
        />
        <text x="402" y="385">
          VERIFIKASI
        </text>
      </g>
    </svg>
  );
};

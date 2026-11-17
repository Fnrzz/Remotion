import React from "react";
import {
  Interactive,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { FONT_FAMILY } from "../../../fonts";
import { COLORS } from "../../../theme";
import { DrawPath } from "./ExplanationMotion";

/** Conceptual capability growth and an open question, never a performance chart. */
export const AiEvolutionMotion: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <Interactive.Div
      name="AI berkembang — developer atau pengawasan?"
      data-ai-evolution="true"
      data-closing-phase={
        frame < 2.72 * fps
          ? "growth"
          : frame < 5.94 * fps
            ? "developer"
            : "oversight"
      }
      style={{ height: 390, marginTop: 16 }}
    >
      <svg
        width="100%"
        height={390}
        viewBox="0 0 900 380"
        style={{
          display: "block",
          overflow: "visible",
          fontFamily: FONT_FAMILY,
        }}
        role="img"
        aria-label="Jaringan AI berkembang, kemudian bercabang menuju developer dan pengawasan dengan tanda tanya di tengah."
      >
        <text x={0} y={25} fontSize={26} fontWeight={700} fill={COLORS.black}>
          AI TERUS BERKEMBANG
        </text>
        <text
          x={900}
          y={25}
          textAnchor="end"
          fontSize={18}
          fontWeight={600}
          fill={COLORS.gray}
        >
          ILUSTRASI
        </text>
        <g
          style={{
            transformOrigin: "450px 110px",
            scale: interpolate(frame, [0, 2.6 * fps], [0.82, 1], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            }),
          }}
        >
          {[
            [350, 70],
            [550, 70],
            [345, 145],
            [555, 145],
            [405, 50],
            [495, 166],
          ].map(([x, y], i) => (
            <g
              key={`${x}-${y}`}
              opacity={interpolate(
                frame,
                [i * 0.28 * fps, (i * 0.28 + 0.45) * fps],
                [0.12, 1],
                { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
              )}
            >
              <path
                d={`M450 110 ${x} ${y}`}
                stroke={COLORS.slate}
                strokeWidth={2}
                strokeOpacity={0.5}
              />
              <circle
                cx={x}
                cy={y}
                r={7}
                fill={COLORS.offWhite}
                stroke={COLORS.slate}
                strokeWidth={2}
              />
            </g>
          ))}
          <circle
            cx={450}
            cy={110}
            r={48}
            fill={COLORS.white}
            stroke={COLORS.slate}
            strokeWidth={2}
          />
          <circle
            cx={450}
            cy={110}
            r={48}
            fill="none"
            stroke={COLORS.black}
            strokeWidth={3}
            pathLength={1}
            strokeDasharray="1"
            strokeDashoffset={interpolate(frame, [0, 2.6 * fps], [1, 0], {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            })}
          />
          <text
            x={450}
            y={123}
            textAnchor="middle"
            fontSize={36}
            fontWeight={800}
            fill={COLORS.black}
          >
            AI
          </text>
        </g>
        <path
          d="M419 148Q419 185 230 205M481 148Q481 185 670 205"
          fill="none"
          stroke={COLORS.slate}
          strokeWidth={2}
          strokeOpacity={0.16}
        />
        <DrawPath
          d="M419 148Q419 185 230 205"
          at={2.92 * fps}
          duration={0.65}
          stroke={COLORS.slate}
          strokeWidth={3}
        />
        <DrawPath
          d="M481 148Q481 185 670 205"
          at={5.94 * fps}
          duration={0.65}
          stroke={COLORS.slate}
          strokeWidth={3}
        />
        <g
          data-closing-choice="developer"
          opacity={interpolate(frame, [2.92 * fps, 3.4 * fps], [0.16, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          })}
          style={{
            translate: interpolate(
              frame,
              [2.92 * fps, 3.4 * fps],
              ["0px 8px", "0px 0px"],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
            ),
          }}
        >
          <rect
            x={155}
            y={212}
            width={150}
            height={94}
            rx={12}
            fill={COLORS.white}
            stroke={COLORS.black}
            strokeWidth={3}
          />
          <path
            d="M230 307v12m-49 0h98"
            fill="none"
            stroke={COLORS.black}
            strokeWidth={3}
            strokeLinecap="round"
          />
          <DrawPath
            d="m203 242-17 15 17 15m54-30 17 15-17 15m-18-38-14 46"
            at={3.2 * fps}
            duration={0.75}
            strokeWidth={3.5}
          />
          <text
            x={230}
            y={351}
            textAnchor="middle"
            fontSize={27}
            fontWeight={700}
            fill={COLORS.black}
          >
            DEVELOPER
          </text>
        </g>
        <g
          data-closing-choice="oversight"
          opacity={interpolate(frame, [5.94 * fps, 6.42 * fps], [0.16, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          })}
          style={{
            translate: interpolate(
              frame,
              [5.94 * fps, 6.42 * fps],
              ["0px 8px", "0px 0px"],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
            ),
          }}
        >
          <path
            d="M587 260Q670 180 753 260Q670 340 587 260Z"
            fill={COLORS.white}
            stroke={COLORS.black}
            strokeWidth={3}
          />
          <circle
            cx={670}
            cy={260}
            r={25}
            fill="none"
            stroke={COLORS.slate}
            strokeWidth={3}
          />
          <circle
            cx={interpolate(
              frame,
              [5.94 * fps, 6.2 * fps, 6.65 * fps],
              [663, 677, 670],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
            )}
            cy={260}
            r={10}
            fill={COLORS.black}
          />
          <text
            x={670}
            y={351}
            textAnchor="middle"
            fontSize={27}
            fontWeight={700}
            fill={COLORS.black}
          >
            PENGAWASAN
          </text>
        </g>
        <g
          opacity={interpolate(frame, [2.72 * fps, 3.12 * fps], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          })}
        >
          <circle
            cx={450}
            cy={263}
            r={41}
            fill={COLORS.offWhite}
            stroke={COLORS.slate}
            strokeWidth={1.5}
            strokeOpacity={0.45}
          />
          <text
            x={450}
            y={284}
            textAnchor="middle"
            fontSize={62}
            fontWeight={800}
            fill={COLORS.black}
          >
            ?
          </text>
        </g>
      </svg>
    </Interactive.Div>
  );
};

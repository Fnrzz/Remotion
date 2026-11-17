import React from "react";
import { Easing, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { CentralModelNode } from "./AgentNetwork";

export const EmptyFolderWorkspace: React.FC<{
  instruction: number;
  opening: number;
  delegation: number;
}> = ({ instruction, opening, delegation }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <g>
      {/* Abstract brief, never a fabricated quotation of the engineer's prompt. */}
      <g
        transform={`translate(${interpolate(instruction, [0, 1], [60, 286])} 158)`}
        opacity={interpolate(instruction, [0, 0.1, 0.8, 1], [0, 1, 1, 0])}
        fill="none"
        stroke="#708090"
        strokeWidth="2"
      >
        <path d="M0 0H35L48 13V62H0ZM35 0V13H48" />
        <path d="M10 27H35M10 37H30M10 47H23" />
      </g>
      <g
        transform={`translate(318 190) scale(${interpolate(opening, [0, 1], [1.5, 0.64])})`}
        opacity={1 - delegation}
        fill="#FAF9F6"
        stroke="#000000"
        strokeWidth="2"
        strokeLinejoin="round"
      >
        <path d="M-47 31V-34H-13L-3-22H47V31Z" />
        <path
          d={`M-47 31L${-47 + opening * 10} ${-14 - opening * 9}H${47 + opening * 10}L47 31Z`}
        />
      </g>
      <g opacity={delegation}>
        {[-1, 1].flatMap((side) =>
          [0, 1, 2].map((row) => {
            const x = 318 + side * 220;
            const y = 74 + row * 114;
            return (
              <g key={`${side}-${row}`}>
                <path
                  d={`M318 190C${318 + side * 110} 190 ${318 + side * 110} ${y} ${x} ${y}`}
                  fill="none"
                  stroke="#708090"
                  strokeWidth="1.5"
                  pathLength="1"
                  strokeDasharray="1"
                  strokeDashoffset={
                    1 -
                    interpolate(
                      delegation,
                      [row * 0.12, 0.7 + row * 0.12],
                      [0, 1],
                      { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
                    )
                  }
                />
                <g
                  transform={`translate(${x - 15} ${y - 20})`}
                  opacity={interpolate(delegation, [0.5, 1], [0, 1], {
                    extrapolateLeft: "clamp",
                    extrapolateRight: "clamp",
                  })}
                >
                  <path
                    d="M0 0H22L31 9V40H0ZM22 0V9H31"
                    fill="#FAF9F6"
                    stroke="#000000"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M7 19H24M7 26H19M7 33H22"
                    stroke="#708090"
                    strokeWidth="1.5"
                  />
                </g>
              </g>
            );
          }),
        )}
        <g
          transform={`translate(318 190) scale(${interpolate(frame, [0, 0.5 * fps], [0.95, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.bezier(0.16, 1, 0.3, 1) })})`}
        >
          <g transform="translate(-318 -190)">
            <CentralModelNode />
          </g>
        </g>
      </g>
    </g>
  );
};

import React from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { smooth } from "../config";

// Local time begins with “Kalau kamu jadi kreator”. Each option follows its VO.
export const ClosingQuestionMotion: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <svg
      data-closing-question
      width="912"
      height="540"
      viewBox="0 0 912 540"
      role="img"
      aria-label="Pertanyaan: lebih memilih video 15 detik atau mengedit lewat chat?"
      style={{ position: "absolute", inset: 0, overflow: "visible" }}
    >
      <path
        data-question-curve
        d="M367 166C367 45 553 45 553 163C553 244 456 236 456 310"
        fill="none"
        stroke="#000000"
        strokeWidth="40"
        strokeLinecap="round"
        pathLength="1"
        strokeDasharray="1"
        strokeDashoffset={interpolate(frame, [0, 0.85 * fps], [1, 0], smooth)}
      />
      <circle
        cx="456"
        cy="390"
        r={interpolate(frame, [0.65 * fps, 1.05 * fps], [0, 24], smooth)}
        fill="#000000"
      />
      <g
        data-question-option="duration"
        opacity={interpolate(frame, [1.05 * fps, 1.6 * fps], [0, 1], smooth)}
        transform={`translate(${interpolate(frame, [1.05 * fps, 1.7 * fps], [44, 0], smooth)} 0)`}
      >
        <path
          d="M15 244H270M15 236v16m51-16v16m51-16v16m51-16v16m51-16v16m51-16v16"
          stroke="#708090"
          strokeWidth="2"
        />
        <path d="M15 266H270V354H15Z" fill="#708090" />
        <path
          d="M34 278v11m0 42v11m38-64v11m0 42v11m38-64v11m0 42v11m38-64v11m0 42v11m38-64v11m0 42v11m38-64v11m0 42v11m27-64v11m0 42v11"
          stroke="#FAF9F6"
          strokeWidth="9"
        />
        <path d="m130 294 27 16-27 16Z" fill="#FAF9F6" />
        <text
          x="142"
          y="420"
          textAnchor="middle"
          fill="#000000"
          fontSize="44"
          fontWeight="700"
          letterSpacing="-2"
        >
          15s
        </text>
        <path
          d="M15 260V362"
          stroke="#000000"
          strokeWidth="3"
          style={{
            translate: interpolate(
              frame,
              [1.6 * fps, 3.1 * fps],
              ["0px 0px", "255px 0px"],
              smooth,
            ),
          }}
        />
      </g>
      <g
        data-question-option="chat"
        opacity={interpolate(frame, [3.55 * fps, 4.1 * fps], [0, 1], smooth)}
        transform={`translate(${interpolate(frame, [3.55 * fps, 4.2 * fps], [-44, 0], smooth)} 0)`}
      >
        <path d="M647 235H897V368H779L741 403V368H647Z" fill="#708090" />
        <path
          d="M675 266H815M675 293H848M675 320H784"
          fill="none"
          stroke="#FAF9F6"
          strokeWidth="5"
          pathLength="1"
          strokeDasharray="1"
          strokeDashoffset={interpolate(
            frame,
            [3.7 * fps, 4.65 * fps],
            [1, 0],
            smooth,
          )}
        />
        <circle cx="862" cy="337" r="18" fill="#FAF9F6" />
        <path
          d="M862 346V328m-7 7 7-7 7 7"
          fill="none"
          stroke="#708090"
          strokeWidth="2.5"
        />
        <path
          d="m850 370 25 21-11 1-4 12Z"
          fill="#000000"
          stroke="#FAF9F6"
          strokeWidth="2"
          style={{
            opacity: interpolate(
              frame,
              [4.1 * fps, 4.4 * fps, 4.9 * fps, 5.1 * fps],
              [0, 1, 1, 0],
              smooth,
            ),
            translate: interpolate(
              frame,
              [4.1 * fps, 4.75 * fps],
              ["24px 30px", "0px -30px"],
              smooth,
            ),
          }}
        />
      </g>
    </svg>
  );
};

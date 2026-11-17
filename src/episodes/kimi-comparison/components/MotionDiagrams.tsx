import React from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";

const WHITE = "#FFFFFF";
const PAPER = "#FAF9F6";
const SLATE = "#708090";
const CLAMP = {
  extrapolateLeft: "clamp",
  extrapolateRight: "clamp",
} as const;

// Editorial symbols only: these small glyphs encode neither prices nor scores.
const TokenStack: React.FC<{
  x: number;
  y: number;
  progress: number;
  stroke: string;
}> = ({ x, y, progress, stroke }) => (
  <g fill="none" stroke={stroke} strokeWidth={1.8} strokeLinejoin="miter">
    {[-10, 0, 10].map((offset) => (
      <rect
        key={offset}
        x={x - 12}
        y={y + offset - 3}
        width={24}
        height={6}
        pathLength={1}
        strokeDasharray={1}
        strokeDashoffset={1 - progress}
        opacity={progress > 0 ? 1 : 0}
      />
    ))}
  </g>
);

const BenchmarkGlyph: React.FC<{
  x: number;
  y: number;
  progress: number;
  stroke: string;
}> = ({ x, y, progress, stroke }) => (
  <g fill="none" stroke={stroke} strokeWidth={1.8} strokeLinecap="square">
    <path
      d={`M${x - 16} ${y + 13} H${x + 16}`}
      pathLength={1}
      strokeDasharray={1}
      strokeDashoffset={1 - progress}
      opacity={progress > 0 ? 1 : 0}
    />
    {[-10, 0, 10].map((offset, index) => (
      <rect
        key={offset}
        x={x + offset - 2.5}
        y={y + 9 - [12, 22, 16][index] * progress}
        width={5}
        height={[12, 22, 16][index] * progress}
        opacity={progress > 0 ? 1 : 0}
      />
    ))}
  </g>
);

export const TokenRatioDiagram: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <svg
      width={152}
      height={200}
      viewBox="0 0 152 200"
      role="img"
      aria-label="Rasio tarif token standar: satu unit Kimi dibanding lima unit Astra, bukan biaya proyek"
      data-motion-diagram="token-ratio"
      style={{ display: "block" }}
    >
      {[
        { x: 31, count: 1 },
        { x: 99, count: 5 },
      ].map(({ x, count }) => (
        <g key={x} fill="none" stroke={WHITE} strokeWidth={2}>
          {Array.from({ length: count }, (_, index) => {
            const start = index * 0.2;
            return (
              <rect
                key={index}
                x={x}
                y={144 - index * 24}
                width={22}
                height={18}
                pathLength={1}
                strokeDasharray={1}
                strokeDashoffset={interpolate(
                  frame,
                  [start * fps, (start + 0.5) * fps],
                  [1, 0],
                  CLAMP,
                )}
                style={{
                  opacity: interpolate(
                    frame,
                    [start * fps, (start + 0.12) * fps],
                    [0, 1],
                    CLAMP,
                  ),
                  translate: interpolate(
                    frame,
                    [start * fps, (start + 0.5) * fps],
                    ["0px 5px", "0px 0px"],
                    CLAMP,
                  ),
                }}
              />
            );
          })}
        </g>
      ))}
      <path
        d="M23 170 H61 M91 170 H129"
        fill="none"
        stroke={SLATE}
        strokeWidth={1.5}
        pathLength={1}
        strokeDasharray={1}
        strokeDashoffset={interpolate(frame, [0, 0.4 * fps], [1, 0], CLAMP)}
      />
      <g
        fill={PAPER}
        fontFamily="Plus Jakarta Sans, sans-serif"
        fontSize={12}
        fontWeight={700}
        textAnchor="middle"
        opacity={interpolate(frame, [0, 0.3 * fps], [0, 1], CLAMP)}
      >
        <text x={42} y={190}>
          KIMI
        </text>
        <text x={110} y={190}>
          ASTRA
        </text>
      </g>
    </svg>
  );
};

export const ComparisonLinks: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <svg
      width={636}
      height={64}
      viewBox="0 0 636 64"
      role="img"
      aria-label="Tiga model dihubungkan ke dua aspek perbandingan: tarif token dan benchmark"
      data-motion-diagram="comparison-links"
      style={{ display: "block" }}
    >
      {[98, 318, 538].flatMap((fromX, modelIndex) =>
        [248, 388].map((toX, aspectIndex) => {
          const start = modelIndex * 0.07 + aspectIndex * 0.035;
          const travel = interpolate(
            frame,
            [(start + 0.12) * fps, (start + 0.92) * fps],
            [0, 1],
            CLAMP,
          );
          return (
            <g key={`${fromX}-${toX}`}>
              <path
                d={`M${fromX} 2 L${toX} 30`}
                fill="none"
                stroke={SLATE}
                strokeWidth={1.25}
                strokeOpacity={0.65}
                pathLength={1}
                strokeDasharray={1}
                strokeDashoffset={interpolate(
                  frame,
                  [start * fps, (start + 0.5) * fps],
                  [1, 0],
                  CLAMP,
                )}
              />
              <circle
                cx={interpolate(travel, [0, 1], [fromX, toX], CLAMP)}
                cy={interpolate(travel, [0, 1], [2, 30], CLAMP)}
                r={2}
                fill={SLATE}
                opacity={interpolate(
                  frame,
                  [
                    start * fps,
                    (start + 0.12) * fps,
                    (start + 0.82) * fps,
                    (start + 0.98) * fps,
                  ],
                  [0, 1, 1, 0],
                  CLAMP,
                )}
              />
            </g>
          );
        }),
      )}
      <TokenStack
        x={248}
        y={46}
        stroke={SLATE}
        progress={interpolate(frame, [0.2 * fps, 0.7 * fps], [0, 1], CLAMP)}
      />
      <BenchmarkGlyph
        x={388}
        y={46}
        stroke={SLATE}
        progress={interpolate(frame, [0.25 * fps, 0.75 * fps], [0, 1], CLAMP)}
      />
    </svg>
  );
};

// choiceAt is relative to this component's Sequence, in seconds.
export const DecisionDiagram: React.FC<{ choiceAt?: number }> = ({
  choiceAt = 3.92,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <svg
      width={636}
      height={84}
      viewBox="0 0 636 84"
      role="img"
      aria-label="Tarif token dan benchmark menjadi pertimbangan bersama untuk tiga pilihan model yang setara, tanpa pemenang otomatis"
      data-motion-diagram="decision"
      style={{ display: "block" }}
    >
      {[
        { from: 68, to: 308 },
        { from: 568, to: 328 },
      ].map(({ from, to }) => (
        <g key={from}>
          <path
            d={`M${from} 32 H${to}`}
            fill="none"
            stroke={SLATE}
            strokeWidth={1.5}
            pathLength={1}
            strokeDasharray={1}
            strokeDashoffset={interpolate(frame, [0, 0.8 * fps], [1, 0], CLAMP)}
          />
          <circle
            cx={interpolate(frame, [0.12 * fps, 1.4 * fps], [from, to], CLAMP)}
            cy={32}
            r={2.5}
            fill={PAPER}
            opacity={interpolate(
              frame,
              [0, 0.12 * fps, 1.2 * fps, 1.4 * fps],
              [0, 1, 1, 0],
              CLAMP,
            )}
          />
        </g>
      ))}
      <TokenStack
        x={48}
        y={32}
        stroke={PAPER}
        progress={interpolate(frame, [0, fps], [0, 1], CLAMP)}
      />
      <BenchmarkGlyph
        x={588}
        y={32}
        stroke={PAPER}
        progress={interpolate(frame, [1.2 * fps, 2 * fps], [0, 1], CLAMP)}
      />
      <circle
        cx={318}
        cy={32}
        r={9}
        fill="none"
        stroke={PAPER}
        strokeWidth={1.8}
        pathLength={1}
        strokeDasharray={1}
        strokeDashoffset={interpolate(
          frame,
          [0.4 * fps, 1.4 * fps],
          [1, 0],
          CLAMP,
        )}
      />
      <path
        d="M318 27 L323 32 L318 37 L313 32 Z"
        fill="none"
        stroke={SLATE}
        strokeWidth={1.25}
        pathLength={1}
        strokeDasharray={1}
        strokeDashoffset={interpolate(
          frame,
          [2.1 * fps, 3.4 * fps],
          [1, 0],
          CLAMP,
        )}
      />
      {[270, 318, 366].map((x) => (
        <g key={x} fill="none" stroke={PAPER} strokeWidth={1.5}>
          <path
            d={`M318 41 V49 H${x} V59`}
            pathLength={1}
            strokeDasharray={1}
            strokeDashoffset={interpolate(
              frame,
              [choiceAt * fps, (choiceAt + 0.5) * fps],
              [1, 0],
              CLAMP,
            )}
          />
          <circle
            cx={x}
            cy={68}
            r={8}
            pathLength={1}
            strokeDasharray={1}
            strokeDashoffset={interpolate(
              frame,
              [(choiceAt + 0.4) * fps, (choiceAt + 0.8) * fps],
              [1, 0],
              CLAMP,
            )}
          />
        </g>
      ))}
    </svg>
  );
};

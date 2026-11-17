import React from "react";
import { interpolate } from "remotion";
import { smooth } from "../config";

const Thumbnail: React.FC<{ index: number }> = ({ index }) => (
  <svg
    width="100%"
    height="100%"
    viewBox="0 0 148 132"
    preserveAspectRatio="xMidYMid slice"
  >
    <rect width="148" height="132" fill="#D9DEE2" />
    <circle cx={112 - index * 3} cy="28" r="13" fill="#FAF9F6" />
    <path
      d={`M-30 100 L${20 - index * 3} 40 90 100 120 64 180 118V140H-30Z`}
      fill="#A8B3BC"
    />
    <path d="M-20 119 Q50 65 170 116V140H-20Z" fill="#708090" />
    <path
      d={`M${80 + index * 3} 132 Q62 104 104 92`}
      fill="none"
      stroke="#FAF9F6"
      strokeWidth="13"
    />
    <rect x={40 + index * 2} y="78" width="25" height="23" fill="#FAF9F6" />
    <path d={`M${35 + index * 2} 78l17-14 18 14Z`} fill="#000000" />
  </svg>
);

export const VideoTimeline: React.FC<{
  extension: number;
  playhead: number;
  dark?: boolean;
  collapse?: number;
}> = ({ extension, playhead, dark = false, collapse = 0 }) => {
  const ink = dark ? "#FFFFFF" : "#000000";
  const length = 608 + 304 * extension;
  return (
    <div
      data-timeline-length={10 + extension * 5}
      style={{ position: "relative", width: 912, height: 420 }}
    >
      <svg
        width="912"
        height="420"
        viewBox="0 0 912 420"
        style={{ position: "absolute" }}
      >
        <g stroke={ink} opacity={1 - collapse}>
          <line x1="0" x2={length} y1="70" y2="70" opacity="0.3" />
          {Array.from({ length: 31 }, (_, i) => (
            <line
              key={i}
              x1={i * 30.4}
              x2={i * 30.4}
              y1={i % 10 ? 58 : 44}
              y2="70"
              opacity={i * 30.4 <= length ? 0.5 : 0}
            />
          ))}
        </g>
        <text x="0" y="25" fill={ink} fontSize="24" opacity={1 - collapse}>
          0
        </text>
        <text
          x={length - 5}
          y="25"
          fill={ink}
          fontSize="24"
          textAnchor="end"
          opacity={1 - collapse}
        >
          {extension > 0.95 ? "15s" : "10s"}
        </text>
      </svg>
      <div
        style={{
          position: "absolute",
          top: 96,
          left: 0,
          width: length,
          height: 186,
          overflow: "hidden",
        }}
      >
        {Array.from({ length: 9 }, (_, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              left: interpolate(collapse, [0, 1], [i * 102, 406], smooth),
              top: interpolate(collapse, [0, 1], [0, i % 2 ? 28 : -28], smooth),
              width: 100,
              height: 186,
              rotate:
                interpolate(collapse, [0, 1], [0, i * 45], smooth) + "deg",
              opacity:
                i < 6
                  ? 1
                  : interpolate(
                      extension,
                      [0.05 + (i - 6) * 0.22, 0.38 + (i - 6) * 0.22],
                      [0, 1],
                      smooth,
                    ),
            }}
          >
            <Thumbnail index={i} />
          </div>
        ))}
      </div>
      <svg
        width="912"
        height="420"
        style={{ position: "absolute", opacity: 1 - collapse }}
      >
        <path d={`M${length * playhead - 9} 78h18l-9 13Z`} fill={ink} />
        <line
          x1={length * playhead}
          x2={length * playhead}
          y1="88"
          y2="306"
          stroke={ink}
          strokeWidth="3"
        />
        <line
          x1="0"
          x2={length}
          y1="329"
          y2="329"
          stroke="#708090"
          strokeWidth="3"
        />
        <path
          d={`M0 320v18M${length} 320v18`}
          stroke="#708090"
          strokeWidth="3"
        />
      </svg>
    </div>
  );
};

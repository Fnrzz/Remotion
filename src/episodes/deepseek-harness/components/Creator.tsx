import React from "react";
import {
  Easing,
  Interactive,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

const ease = {
  easing: Easing.bezier(0.22, 1, 0.36, 1),
  extrapolateLeft: "clamp" as const,
  extrapolateRight: "clamp" as const,
};

export const PluginAssembly: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const assemble = interpolate(t, [2.89, 4.0], [0, 1], ease);
  const install = interpolate(t, [3.9, 4.55], [0, 1], ease);
  const timer = interpolate(t, [4.65, 5.55], [0, 1], ease);
  return (
    <svg
      width="636"
      height="400"
      viewBox="0 0 636 400"
      role="img"
      aria-label="Ilustrasi permintaan chat menjadi kerangka plugin, terpasang pada runtime, lalu antarmuka timer Pomodoro"
    >
      <g opacity={interpolate(t, [0, 0.4], [0.5, 1], ease)}>
        <path
          d="M0 30h14v14H0z M4 44v5l6-5"
          fill="none"
          stroke="#708090"
          strokeWidth="2"
        />
        <text x="28" y="45" fill="#000000" fontSize="24" fontWeight="700">
          BUAT TIMER POMODORO
        </text>
        <line x1="0" x2="636" y1="65" y2="65" stroke="#708090" opacity="0.3" />
      </g>
      <Interactive.Path
        name="Permintaan menuju kerangka plugin"
        d="M14 88V126Q14 150 40 150H168Q200 150 200 180"
        fill="none"
        stroke="#708090"
        strokeWidth="2"
        pathLength="1"
        strokeDasharray="1"
        strokeDashoffset={interpolate(
          frame,
          [0.9 * fps, 2.6 * fps],
          [1, 0],
          ease,
        )}
      />
      <g opacity={1 - install * 0.8}>
        <text x="0" y="112" fontSize="15" fill="#555555">
          Creator mode
        </text>
        <text x="0" y="337" fontSize="16" fontWeight="600" fill="#555555">
          KERANGKA PLUGIN
        </text>
      </g>
      <path
        d="M252 225H398M420 225H446"
        fill="none"
        stroke="#708090"
        strokeWidth="2"
        strokeDasharray="4 5"
        opacity="0.35"
      />
      <g opacity={interpolate(t, [2.8, 3.3], [0, 1], ease)}>
        <path
          d="M355 177v-30h53v30M355 273v30h53v-30"
          stroke="#708090"
          strokeWidth="2"
          fill="none"
        />
        <path
          d="M350 199h12v52h-12M412 199h-12v52h12"
          stroke="#000000"
          strokeWidth="3"
          fill="none"
        />
        <text
          x="381"
          y="337"
          textAnchor="middle"
          fontSize="16"
          fontWeight="600"
        >
          RUNTIME
        </text>
      </g>
      <g
        transform={`translate(${200 + install * 181} 225)`}
        opacity={interpolate(t, [2.5, 2.89, 4.5, 4.7], [0, 1, 1, 0], ease)}
      >
        <rect
          x="-50"
          y="-50"
          width="100"
          height="100"
          fill="#FAF9F6"
          stroke="#708090"
          strokeWidth="2"
          strokeDasharray={assemble < 0.98 ? "6 5" : "none"}
        />
        {[
          [-24, -24, -105, -30],
          [8, -24, 72, -80],
          [-24, 8, -82, 74],
          [8, 8, 92, 62],
        ].map(([x, y, dx, dy], i) => {
          const p = spring({
            frame: Math.max(0, frame - (2.89 + i * 0.12) * fps),
            fps,
            config: { damping: 200 },
            durationInFrames: Math.round(0.75 * fps),
          });
          return (
            <rect
              key={i}
              x={x + (1 - p) * dx}
              y={y + (1 - p) * dy}
              width="18"
              height="18"
              fill={i === 3 ? "#000000" : "#708090"}
              opacity={p}
            />
          );
        })}
        <path
          d="M-8-50v-9H8v9M-8 50v9H8v-9"
          fill="none"
          stroke="#000000"
          strokeWidth="2"
          opacity={assemble}
        />
      </g>
      <g
        opacity={interpolate(t, [4.5, 4.75], [0, 1], ease)}
        fill="none"
        stroke="#000000"
        strokeWidth="2"
      >
        <rect x="366" y="210" width="30" height="30" />
        <path d="M374 217h14v16h-14zM381 217v16M374 225h14" stroke="#708090" />
      </g>
      <g
        opacity={timer}
        transform={`translate(526 225) scale(${0.92 + 0.08 * timer})`}
      >
        <rect
          x="-72"
          y="-72"
          width="144"
          height="144"
          rx={72 * timer}
          fill="none"
          stroke="#000000"
          strokeWidth="3"
        />
        <circle
          r="61"
          fill="none"
          stroke="#708090"
          strokeWidth="3"
          strokeDasharray="7 4"
          opacity="0.35"
        />
        <path
          d="M-14-88H14M0-88v16"
          stroke="#708090"
          strokeWidth="3"
          fill="none"
        />
        <text
          data-pomodoro-display
          x="0"
          y="12"
          textAnchor="middle"
          fontSize="37"
          fontWeight="800"
          letterSpacing="-1.5"
        >
          25:00
        </text>
        <text x="0" y="112" textAnchor="middle" fontSize="16" fontWeight="600">
          POMODORO
        </text>
      </g>
      <text x="0" y="391" fontSize="16" fill="#555555">
        Contoh konsep · bukan rekaman eksekusi.
      </text>
    </svg>
  );
};

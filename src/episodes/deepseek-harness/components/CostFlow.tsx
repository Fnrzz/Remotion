import React from "react";
import { Easing, interpolate, useCurrentFrame, useVideoConfig } from "remotion";

const opts = {
  easing: Easing.bezier(0.22, 1, 0.36, 1),
  extrapolateLeft: "clamp" as const,
  extrapolateRight: "clamp" as const,
};

const Connector: React.FC<{
  y: number;
  start: number;
  end: number;
  seconds: number;
  from: number;
}> = ({ y, start, end, seconds, from }) => (
  <g fill="none" stroke="#708090" strokeWidth="2">
    <path
      d={`M${start} ${y}H${end}`}
      pathLength="1"
      strokeDasharray="1"
      strokeDashoffset={interpolate(seconds, [from, from + 0.65], [1, 0], opts)}
    />
    <path
      d={`M${end - 6} ${y - 5}l6 5-6 5`}
      opacity={interpolate(seconds, [from + 0.45, from + 0.65], [0, 1], opts)}
    />
    <rect
      x={interpolate(seconds, [from, from + 0.95], [start, end - 4], opts)}
      y={y - 3}
      width="6"
      height="6"
      fill="#708090"
      opacity={interpolate(
        seconds,
        [from, from + 0.1, from + 0.8, from + 1],
        [0, 1, 1, 0],
        opts,
      )}
    />
  </g>
);

export const CostFlow: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const status = interpolate(t, [10, 10.35], [0, 1], opts);
  const price = interpolate(t, [7.35, 7.75], [0, 1], opts);
  return (
    <svg
      width="636"
      height="400"
      viewBox="0 0 636 400"
      role="img"
      aria-label="Dua alur biaya berbeda, bukan perbandingan total biaya; Harness developer preview dan Claude Code produk terintegrasi"
    >
      <g opacity={interpolate(t, [9.75, 9.98], [1, 0], opts)}>
        <text x="0" y="24" fontSize="19" fontWeight="800">
          DEEPSEEK HARNESS
        </text>
        <text x="0" y="55" fontSize="16" fill="#555555">
          Kode sumber berlisensi MIT
        </text>
        <g
          transform="translate(38 116)"
          fill="none"
          stroke="#000000"
          strokeWidth="2"
        >
          <path d="M-23-15-36 0-23 15M23-15 36 0 23 15M7-22-7 22" />
        </g>
        <text x="0" y="171" fontSize="17" fontWeight="700">
          Harness
        </text>
        <Connector seconds={t} y={116} start={81} end={210} from={1.45} />
        <g opacity={interpolate(t, [2.59, 3], [0, 1], opts)}>
          <path
            d="M250 95h48v42h-48zM260 95v42M275 95v42M250 110h48M250 123h48"
            fill="none"
            stroke="#708090"
            strokeWidth="2"
          />
          <text
            x="274"
            y="171"
            textAnchor="middle"
            fontSize="17"
            fontWeight="700"
          >
            Penyedia model
          </text>
        </g>
        <Connector seconds={t} y={116} start={343} end={461} from={3.1} />
        <g opacity={interpolate(t, [3.68, 4.2], [0, 1], opts)}>
          <path
            d="M503 90h41v55l-7-5-7 5-7-5-7 5-13-5zM513 103h20M513 113h20M513 123h13"
            fill="none"
            stroke="#000000"
            strokeWidth="2"
          />
          <text
            x="523"
            y="171"
            textAnchor="middle"
            fontSize="17"
            fontWeight="700"
          >
            Tagihan pemakaian
          </text>
        </g>
        <line
          x1="0"
          x2="636"
          y1="199"
          y2="199"
          stroke="#708090"
          opacity="0.3"
        />
        <g opacity={interpolate(t, [4.85, 5.3], [0.2, 1], opts)}>
          <text x="0" y="236" fontSize="19" fontWeight="800">
            CLAUDE CODE
          </text>
          <text x="0" y="299" fontSize="23" fontWeight="700">
            Claude Pro
          </text>
          <Connector seconds={t} y={290} start={151} end={238} from={5.3} />
          <text x="259" y="299" fontSize="23" fontWeight="700">
            Claude Code
          </text>
          <text x="0" y="344" fontSize="16" fill="#555555">
            Opsi akses lain: paket lain dan API.
          </text>
        </g>
        <g opacity={price}>
          <text
            x="636"
            y="290"
            textAnchor="end"
            fontSize="41"
            fontWeight="800"
            letterSpacing="-2"
          >
            US$20
          </text>
          <text x="636" y="320" textAnchor="end" fontSize="17" fontWeight="600">
            / bulan
          </text>
          <text x="636" y="346" textAnchor="end" fontSize="14" fill="#555555">
            Ditagih bulanan · batas berlaku
          </text>
        </g>
        <text x="0" y="391" fontSize="16" fill="#555555">
          Dua skema berbeda, bukan perbandingan biaya per tugas.
        </text>
      </g>
      <g opacity={status}>
        <text x="0" y="24" fontSize="19" fontWeight="800">
          DEEPSEEK HARNESS
        </text>
        <text x="355" y="24" fontSize="19" fontWeight="800">
          CLAUDE CODE
        </text>
        <g
          transform="translate(126 153)"
          fill="none"
          stroke="#708090"
          strokeWidth="3"
        >
          <rect x="-72" y="-45" width="50" height="50" />
          <rect x="26" y="-45" width="50" height="50" strokeDasharray="5 5" />
          <rect x="-24" y="42" width="50" height="50" />
          <path d="M-22-20H5M16-20h10M-47 5v61h23M51 5v61H26" />
          <path d="M11-31v12M11-12v1" stroke="#000000" />
        </g>
        <g
          transform="translate(487 153)"
          fill="none"
          stroke="#000000"
          strokeWidth="3"
        >
          <path d="M-85-55H85V74H-85zM-85-28H85M-40-28V74M-25-6H59M-25 12H42M-25 30H64M-25 48H27" />
          <path d="M-65-10h10M-65 6h10M-65 22h10" stroke="#708090" />
        </g>
        <text
          x="126"
          y="290"
          textAnchor="middle"
          fontSize="30"
          fontWeight="800"
          fill="#708090"
        >
          PREVIEW
        </text>
        <text
          x="487"
          y="290"
          textAnchor="middle"
          fontSize="19"
          fontWeight="800"
        >
          PRODUK TERINTEGRASI
        </text>
        <text x="126" y="328" textAnchor="middle" fontSize="16" fill="#555555">
          Kompatibilitas dapat berubah.
        </text>
        <text x="487" y="328" textAnchor="middle" fontSize="16" fill="#555555">
          Bukan klaim unggul di semua tugas.
        </text>
        <text x="0" y="391" fontSize="16" fill="#555555">
          Preview ≠ seluruh fitur sudah stabil.
        </text>
      </g>
    </svg>
  );
};

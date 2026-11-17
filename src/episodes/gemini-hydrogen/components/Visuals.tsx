import React from "react";
import {
  Easing,
  Interactive,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { HYDROGEN_DATA as D } from "../data/editorial";

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" } as const;

export const ScoreMeter: React.FC<{
  value: number;
  label: string;
  x: number;
  slate?: boolean;
}> = ({ value, label, x, slate }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const progress = interpolate(frame, [0, 1.65 * fps], [0, 1], {
    ...clamp,
    easing: Easing.bezier(0.22, 1, 0.36, 1),
  });
  return (
    <g transform={`translate(${x} 153)`}>
      <circle
        r="101"
        fill="none"
        stroke="#FFFFFF"
        opacity="0.16"
        strokeWidth="3"
      />
      {[0, 25, 50, 75].map((tick) => (
        <line
          key={tick}
          x1="0"
          x2="0"
          y1="-114"
          y2="-106"
          transform={`rotate(${tick * 3.6})`}
          stroke="#708090"
          strokeWidth="2"
        />
      ))}
      <circle
        r="101"
        fill="none"
        stroke={slate ? "#708090" : "#FFFFFF"}
        strokeWidth="8"
        pathLength="100"
        strokeDasharray={`${value * progress} 100`}
        transform="rotate(-90)"
      />
      <text
        textAnchor="middle"
        y="18"
        fontSize="74"
        fontWeight="800"
        fill="#FFFFFF"
      >
        {Math.round(value * progress)}
      </text>
      <text
        textAnchor="middle"
        y="48"
        fontSize="15"
        fill="#FFFFFF"
        opacity="0.6"
      >
        / 100
      </text>
      <text
        textAnchor="middle"
        y="155"
        fontSize="22"
        fontWeight="700"
        fill="#FFFFFF"
      >
        {label}
      </text>
      <text
        textAnchor="middle"
        y="180"
        fontSize="14"
        fill="#FFFFFF"
        opacity="0.6"
      >
        {slate ? "ARGON HIGH" : D.benchmark.setting}
      </text>
    </g>
  );
};

export const ScoreHook: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <svg
      width="636"
      height="440"
      viewBox="0 0 636 440"
      role="img"
      aria-label="Hydrogen high 51 dan Argon 50; dua meter memakai skala yang sama, nol sampai seratus."
    >
      <g
        style={{
          transformOrigin: "318px 153px",
          scale: interpolate(frame, [3.12 * fps, 3.87 * fps], [1, 0.16], {
            ...clamp,
            easing: Easing.inOut(Easing.cubic),
          }),
          opacity: interpolate(
            frame,
            [3.56 * fps, 3.87 * fps],
            [1, 0.8],
            clamp,
          ),
        }}
      >
        <ScoreMeter value={D.benchmark.hydrogen} label="HYDROGEN" x={153} />
        <ScoreMeter value={D.benchmark.argon} label="ARGON" x={483} slate />
      </g>
      <text
        x="318"
        y="393"
        textAnchor="middle"
        fill="#FFFFFF"
        fontSize="15"
        letterSpacing="0.5"
        opacity={interpolate(frame, [2.8 * fps, 3.5 * fps], [1, 0], clamp)}
      >
        {D.benchmark.name}
      </text>
    </svg>
  );
};

export const Folder: React.FC<{ x: number; y: number; size?: number }> = ({
  x,
  y,
  size = 1,
}) => (
  <g
    transform={`translate(${x} ${y}) scale(${size})`}
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinejoin="round"
  >
    <path d="M-37 -22 V-34 H-10 L0 -22 H37 V28 H-37Z" />
    <path d="M-37 -17 H37" opacity="0.3" />
  </g>
);

export const FileGlyph: React.FC<{
  x: number;
  y: number;
  progress?: number;
}> = ({ x, y, progress = 1 }) => (
  <g
    transform={`translate(${x} ${y})`}
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
  >
    <path d="M-23 -36 H10 L25 -21 V36 H-23Z M10 -36 V-21 H25" />
    <path
      d="M-12 -7 H12 M-12 4 H5 M-12 15 H15"
      stroke="#708090"
      pathLength="1"
      strokeDasharray="1"
      strokeDashoffset={1 - progress}
    />
  </g>
);

export const RepositoryWorkflow: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const phase = interpolate(
    t,
    [0, 3.43, 7.68, 9.27, 9.92, 10.58, 11.89],
    [0, 0.7, 1.6, 2.6, 3.6, 4.5, 4.5],
    clamp,
  );
  const toolReturn = interpolate(t, [9.27, 9.92], [0, 1], clamp);
  const packetX = interpolate(
    phase,
    [0.7, 1.6, 2.6, 3.6, 4.5],
    [65, 218, 393, 218, 567],
    clamp,
  );
  return (
    <svg
      width="636"
      height="430"
      viewBox="0 0 636 430"
      role="img"
      aria-label="Alur konseptual: tugas masuk repositori, berkas dibaca, alat dihubungi, perubahan ditinjau. Bukan eksekusi atau pengujian nyata."
    >
      <text
        data-conceptual-disclosure
        x="0"
        y="19"
        fontSize="16"
        fontWeight="700"
      >
        {D.conceptual}
      </text>
      <g opacity={interpolate(t, [0.65, 1.1], [1, 0], clamp)}>
        <circle
          cx={interpolate(t, [0, 1.05], [291.6, 65], {
            ...clamp,
            easing: Easing.inOut(Easing.cubic),
          })}
          cy={interpolate(t, [0, 1.05], [153, 181], clamp)}
          r="16"
          fill="#000000"
        />
        <circle
          cx={interpolate(t, [0, 1.05], [344.4, 218], {
            ...clamp,
            easing: Easing.inOut(Easing.cubic),
          })}
          cy={interpolate(t, [0, 1.05], [153, 181], clamp)}
          r="16"
          fill="#708090"
        />
      </g>
      <g
        style={{
          opacity: interpolate(frame, [0, 1.1 * fps], [0.08, 1], clamp),
        }}
      >
        <path
          d="M65 181 H567"
          fill="none"
          stroke="#708090"
          strokeWidth="1.5"
          opacity="0.28"
        />
        <path
          d="M393 205 C393 296 218 296 218 223"
          fill="none"
          stroke="#708090"
          strokeWidth="2"
          pathLength="1"
          strokeDasharray="1"
          strokeDashoffset={1 - toolReturn}
        />
        <g color="#000000">
          <Folder x={65} y={181} />
          <FileGlyph
            x={218}
            y={181}
            progress={interpolate(phase, [1.1, 1.7], [0, 1], clamp)}
          />
        </g>
        <g
          transform="translate(393 181)"
          fill="none"
          stroke="#000000"
          strokeWidth="2.5"
        >
          <circle r="33" />
          <path d="M-14 -10 L-24 0 -14 10 M14 -10 24 0 14 10 M5 -16 -5 16" />
        </g>
        <g
          transform="translate(567 181)"
          fill="none"
          stroke="#000000"
          strokeWidth="2.5"
        >
          <circle r="34" />
          <path d="M-14 0 Q0 -16 14 0 Q0 16 -14 0Z" />
          <circle r="4" />
        </g>
        <text x="65" y="250" textAnchor="middle" fontSize="16" fontWeight="700">
          PROYEK
        </text>
        <text
          x="218"
          y="250"
          textAnchor="middle"
          fontSize="16"
          fontWeight="700"
        >
          BERKAS
        </text>
        <text
          x="393"
          y="250"
          textAnchor="middle"
          fontSize="16"
          fontWeight="700"
        >
          TOOL
        </text>
        <text
          x="567"
          y="250"
          textAnchor="middle"
          fontSize="16"
          fontWeight="700"
        >
          REVIEW
        </text>
        <g
          transform={`translate(${packetX} ${181 + Math.sin(toolReturn * Math.PI) * 88})`}
        >
          <rect
            x="-9"
            y="-9"
            width="18"
            height="18"
            fill="#708090"
            stroke="#FAF9F6"
            strokeWidth="3"
          />
        </g>
        <g opacity={interpolate(phase, [3, 3.8], [0, 1], clamp)}>
          <path
            d="M199 159 H237 M199 173 H227 M199 187 H233"
            stroke="#FAF9F6"
            strokeWidth="6"
          />
          <path
            d="M199 159 H237 M199 173 H227 M199 187 H233"
            stroke="#708090"
            strokeWidth="3"
          />
        </g>
      </g>
      <text x="318" y="367" textAnchor="middle" fontSize="18" fill="#555555">
        BACA → GUNAKAN TOOL → TINJAU
      </text>
    </svg>
  );
};

export const BenchmarkComparison: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const contextual = interpolate(t, [8.51, 10.24], [0, 1], clamp);
  return (
    <svg
      width="636"
      height="440"
      viewBox="0 0 636 440"
      role="img"
      aria-label="Artificial Analysis Intelligence Index: Hydrogen high thinking 51, Argon 50. Bar nol sampai seratus. Hanya selisih satu poin, bukan kemenangan pada semua tugas."
    >
      <text x="0" y="18" fontSize="15" fontWeight="700">
        {D.benchmark.name}
      </text>
      <g
        style={{
          transformOrigin: "318px 215px",
          scale: interpolate(frame, [8.51 * fps, 10.24 * fps], [1, 0.9], clamp),
        }}
      >
        {[0, 25, 50, 75, 100].map((tick) => (
          <g key={tick} opacity="0.35">
            <line
              x1={tick * 6.12 + 6}
              x2={tick * 6.12 + 6}
              y1="81"
              y2="303"
              stroke="#708090"
              strokeWidth="1"
            />
            <text
              x={tick * 6.12 + 6}
              y="325"
              textAnchor={tick === 0 ? "start" : "middle"}
              fill="#555555"
              fontSize="15"
            >
              {tick}
            </text>
          </g>
        ))}
        <text x="6" y="64" fontSize="19" fontWeight="700">
          HYDROGEN · HIGH THINKING
        </text>
        <rect
          data-score-model="hydrogen"
          data-score-max="100"
          data-score="51"
          x="6"
          y="91"
          height="54"
          width={interpolate(
            t,
            [3.43, 5.56],
            [0, D.benchmark.hydrogen * 6.12],
            { ...clamp, easing: Easing.out(Easing.cubic) },
          )}
          fill="#000000"
        />
        <text
          x="336"
          y="132"
          fontSize="44"
          fontWeight="800"
          opacity={interpolate(t, [5.1, 5.56], [0, 1], clamp)}
        >
          51
        </text>
        <text x="6" y="199" fontSize="19" fontWeight="700" fill="#555555">
          ARGON
        </text>
        <rect
          data-score-model="argon"
          data-score-max="100"
          data-score="50"
          x="6"
          y="226"
          height="54"
          width={interpolate(t, [6.84, 7.91], [0, D.benchmark.argon * 6.12], {
            ...clamp,
            easing: Easing.out(Easing.cubic),
          })}
          fill="#708090"
        />
        <text
          x="336"
          y="267"
          fontSize="44"
          fontWeight="800"
          opacity={interpolate(t, [7.51, 7.91], [0, 1], clamp)}
        >
          50
        </text>
      </g>
      <g opacity={contextual} fill="none" stroke="#708090" strokeWidth="1.5">
        <path
          d="M460 54 484 32 508 54 484 76Z M544 123 H580 V159 H544Z M471 219 H507 V255 H471Z"
          opacity="0.4"
        />
        <circle cx="561" cy="279" r="21" opacity="0.4" />
      </g>
      <text x="0" y="394" fontSize="22" fontWeight="700" opacity={contextual}>
        {D.benchmark.qualifier}
      </text>
      <text
        x="635"
        y="394"
        textAnchor="end"
        fontSize="17"
        fill="#555555"
        opacity={contextual}
      >
        SELISIH 1 POIN
      </text>
    </svg>
  );
};

export const EfficiencyMeter: React.FC<{
  y: number;
  label: string;
  end: number;
  reduction: number;
  from: number;
}> = ({ y, label, end, reduction, from }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = spring({
    frame: frame - from * fps,
    fps,
    config: { damping: 200 },
    durationInFrames: Math.round(0.9 * fps),
  });
  return (
    <g transform={`translate(0 ${y})`}>
      <text x="0" y="0" fontSize="20" fontWeight="700">
        {label}
      </text>
      <text x="636" y="0" textAnchor="end" fontSize="40" fontWeight="800">
        −{Math.round(reduction * p)}%
      </text>
      <rect
        x="0"
        y="24"
        width="540"
        height="12"
        fill="#708090"
        opacity="0.25"
      />
      <text x="560" y="36" fontSize="17" fill="#555555">
        100
      </text>
      <rect
        x="0"
        y="51"
        width={(540 * (100 - reduction * p)) / 100}
        height="22"
        fill="#000000"
      />
      <path
        d={`M${(540 * end) / 100} 23 V81`}
        stroke="#708090"
        strokeDasharray="2 3"
        opacity={p}
      />
      <text x="560" y="70" fontSize="21" fontWeight="700">
        {Math.round(100 - reduction * p)}
      </text>
    </g>
  );
};

export const Efficiency: React.FC = () => (
  <svg
    width="636"
    height="450"
    viewBox="0 0 636 450"
    role="img"
    aria-label="Evaluasi Orchestrator yang dilaporkan Google. Waktu acuan 100 menjadi 81, kuota acuan 100 menjadi 76. Unit relatif, bukan detik atau biaya. Versi benchmark berbeda antara dua artikel Google."
  >
    <text x="0" y="18" fontSize="18" fontWeight="700">
      {D.evaluation.name}
    </text>
    <text x="0" y="47" fontSize="15" fill="#555555">
      {D.evaluation.units}
    </text>
    <EfficiencyMeter
      y={112}
      label="WAKTU"
      end={D.evaluation.time}
      reduction={D.evaluation.timeReduction}
      from={2.71}
    />
    <EfficiencyMeter
      y={253}
      label="KUOTA"
      end={D.evaluation.quota}
      reduction={D.evaluation.quotaReduction}
      from={5.51}
    />
    <text x="0" y="375" fontSize="16" fontWeight="700">
      {D.evaluation.qualifier}
    </text>
    <text x="0" y="407" fontSize="13" fill="#555555">
      Versi: peluncuran 4.0; artikel Antigravity menyebut 4.1.
    </text>
    <text x="0" y="429" fontSize="13" fill="#555555">
      Bukan hasil Hydrogen saja · Kuota ≠ biaya API
    </text>
  </svg>
);

export const TokenPriceFlow: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  return (
    <svg
      width="636"
      height="440"
      viewBox="0 0 636 440"
      role="img"
      aria-label="Tarif Gemini 4 Hydrogen Standard API, satu juta token: input 1,50 dolar, output 7,50 dolar. Bukan total biaya proyek."
    >
      <text x="0" y="18" fontSize="18" fontWeight="700">
        {D.api.units} · USD · STANDARD
      </text>
      <line
        x1={interpolate(t, [0, 0.65], [0, 16], clamp)}
        x2={interpolate(t, [0, 0.65], [437.4, 258], clamp)}
        y1={interpolate(t, [0, 0.65], [174, 170], clamp)}
        y2={interpolate(t, [0, 0.65], [174, 170], clamp)}
        stroke="#708090"
        strokeWidth={interpolate(t, [0, 0.65], [22, 2], clamp)}
      />
      <line
        x1={interpolate(t, [0, 0.65], [0, 378], clamp)}
        x2={interpolate(t, [0, 0.65], [410.4, 620], clamp)}
        y1={interpolate(t, [0, 0.65], [315, 170], clamp)}
        y2={interpolate(t, [0, 0.65], [315, 170], clamp)}
        stroke="#708090"
        strokeWidth={interpolate(t, [0, 0.65], [22, 2], clamp)}
      />
      <circle
        cx="318"
        cy="170"
        r="57"
        fill="none"
        stroke="#000000"
        strokeWidth="2.5"
      />
      <circle
        cx="318"
        cy="170"
        r="42"
        fill="none"
        stroke="#708090"
        strokeWidth="1"
      />
      <text x="318" y="177" textAnchor="middle" fontSize="19" fontWeight="800">
        H
      </text>
      <text x="318" y="269" textAnchor="middle" fontSize="18" fontWeight="700">
        HYDROGEN
      </text>
      <Interactive.G
        name="Aliran token input"
        style={{ opacity: interpolate(frame, [0, 0.4 * fps], [0.2, 1], clamp) }}
      >
        {[0, 1, 2, 3].map((i) => (
          <rect
            key={i}
            x={16 + ((t * 70 + i * 57) % 227)}
            y="162"
            width="13"
            height="16"
            fill="#000000"
            stroke="#FAF9F6"
            strokeWidth="2"
          />
        ))}
        <text x="0" y="100" fontSize="20" fontWeight="700">
          INPUT
        </text>
        <text
          x="0"
          y="305"
          fontSize="55"
          fontWeight="800"
          opacity={interpolate(t, [1.44, 1.8], [0, 1], clamp)}
        >
          {D.api.input}
        </text>
      </Interactive.G>
      <Interactive.G
        name="Aliran token output"
        style={{ opacity: interpolate(frame, [0, 0.4 * fps], [0.2, 1], clamp) }}
      >
        {[0, 1, 2, 3].map((i) => (
          <rect
            key={i}
            x={383 + ((t * 70 + i * 57) % 223)}
            y="162"
            width="13"
            height="16"
            fill="#708090"
            stroke="#FAF9F6"
            strokeWidth="2"
          />
        ))}
        <text x="636" y="100" textAnchor="end" fontSize="20" fontWeight="700">
          OUTPUT
        </text>
        <text
          x="636"
          y="305"
          textAnchor="end"
          fontSize="55"
          fontWeight="800"
          opacity={interpolate(t, [3.61, 3.97], [0, 1], clamp)}
        >
          {D.api.output}
        </text>
      </Interactive.G>
      <text x="318" y="385" textAnchor="middle" fontSize="17" fill="#555555">
        {D.api.qualifier}
      </text>
    </svg>
  );
};

export const VisualChoice: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const settle = interpolate(t, [4.3, 5.8], [1, 0], clamp);
  const travel = Math.min(t, 4.8) * 65;
  return (
    <svg
      width="636"
      height="440"
      viewBox="0 0 636 440"
      role="img"
      aria-label="Dua pilihan yang seimbang: satu model besar atau orkestrasi beberapa model. Keduanya digambarkan layak tanpa pemenang."
    >
      <text
        data-conceptual-disclosure
        x="0"
        y="18"
        fontSize="16"
        fontWeight="700"
      >
        {D.conceptual}
      </text>
      <path d="M318 65 V355" stroke="#708090" strokeWidth="1" opacity="0.25" />
      <g fill="none" stroke="#000000" strokeWidth="2">
        <path
          d="M30 203 H268 M368 203 H413 M447 191 Q473 136 535 121 M447 215 Q473 267 535 282"
          stroke="#708090"
        />
        <circle cx="149" cy="203" r="60" fill="#FAF9F6" />
        <circle cx="149" cy="203" r="46" stroke="#708090" />
        <circle cx="430" cy="203" r="19" fill="#FAF9F6" />
        <circle cx="558" cy="115" r="36" />
        <circle cx="558" cy="288" r="36" />
        <path
          d="M549 105 H567 V123 H549Z M547 288 H568 M558 277 V298"
          stroke="#708090"
        />
      </g>
      <g fill="#708090">
        <rect
          x={28 + (travel % 231)}
          y="197"
          width="12"
          height="12"
          opacity={0.7 + settle * 0.3}
        />
        <rect
          x={371 + (travel % 199)}
          y={203 - Math.sin(Math.min((travel % 199) / 199, 1) * Math.PI) * 93}
          width="12"
          height="12"
          opacity={0.7 + settle * 0.3}
        />
      </g>
      <text x="149" y="209" textAnchor="middle" fontSize="16" fontWeight="800">
        MODEL
      </text>
      <text x="149" y="387" textAnchor="middle" fontSize="21" fontWeight="700">
        SATU AI
      </text>
      <text x="485" y="387" textAnchor="middle" fontSize="21" fontWeight="700">
        TIM AI
      </text>
    </svg>
  );
};

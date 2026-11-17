import React from "react";
import {
  Interactive,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

// All geometry is authored here, not a screenshot, model run, or live market feed.
export const Candles: React.FC<{ dark?: boolean }> = ({ dark }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <svg
      width="100%"
      height="240"
      viewBox="0 0 630 240"
      role="img"
      aria-label="Ilustrasi candlestick sintetis"
    >
      {[50, 110, 170, 230].map((y) => (
        <line
          key={y}
          x1="0"
          x2="630"
          y1={y}
          y2={y}
          stroke="#708090"
          opacity="0.18"
        />
      ))}
      {[
        [52, 105, 185, 135, 170],
        [126, 70, 164, 108, 137],
        [200, 92, 173, 107, 143],
        [274, 54, 139, 80, 108],
        [348, 40, 137, 80, 112],
        [422, 64, 162, 100, 133],
        [496, 52, 145, 84, 112],
        [570, 65, 155, 93, 125],
      ].map(([x, high, low, open, close], i) => (
        <g
          key={x}
          opacity={interpolate(
            frame,
            [i * 0.05 * fps, (i * 0.05 + 0.2) * fps],
            [0, 1],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
          )}
        >
          <line
            x1={x}
            x2={x}
            y1={high}
            y2={low}
            stroke={dark ? "#FFFFFF" : "#000000"}
            strokeWidth="2"
          />
          <rect
            x={x - 15}
            y={open}
            width="30"
            height={close - open}
            fill={i % 2 ? "#708090" : dark ? "#000000" : "#FFFFFF"}
            stroke={dark ? "#FFFFFF" : "#000000"}
            strokeWidth="2"
            rx="2"
          />
        </g>
      ))}
    </svg>
  );
};

export const CandleToData: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <div
      style={{ display: "flex", marginTop: 20, gap: 22, alignItems: "center" }}
    >
      <svg
        width="140"
        height="245"
        viewBox="0 0 140 265"
        aria-label="Candle dari angka contoh yang sama"
        style={{
          translate: interpolate(
            frame,
            [2.9 * fps, 3.7 * fps],
            ["210px 0px", "0px 0px"],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
          ),
        }}
      >
        <line
          x1="60"
          x2="60"
          y1="30"
          y2="210"
          stroke="#708090"
          strokeWidth="3"
        />
        <rect x="33" y="95" width="54" height="65" fill="#708090" rx="3" />
        <path
          d="M 93 30 H 130 M 93 95 H 130 M 93 160 H 130 M 93 210 H 130"
          stroke="#708090"
          strokeWidth="1.5"
        />
      </svg>
      <div
        style={{
          fontSize: 26,
          color: "#708090",
          opacity: interpolate(frame, [3.14 * fps, 3.7 * fps], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        →
      </div>
      <div
        style={{
          flex: 1,
          opacity: interpolate(frame, [3.14 * fps, 3.7 * fps], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        {[
          ["Harga buka", "100"],
          ["Harga tertinggi", "108"],
          ["Harga terendah", "97"],
          ["Harga tutup", "104"],
          ["Informasi waktu", "09:00"],
        ].map(([label, value], i) => (
          <div
            key={label}
            data-kronos-focus
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "9px 0",
              borderBottom: "1px solid #70809030",
              fontSize: 21,
              backgroundColor:
                frame / fps >= [5.85, 6.68, 7.36, 8.39, 10.26][i] &&
                frame / fps < [6.68, 7.36, 8.39, 10.26, 11.24][i]
                  ? "#70809018"
                  : "transparent",
              opacity: interpolate(
                frame,
                [(3.14 + 0.1 * i) * fps, (3.44 + 0.1 * i) * fps],
                [0, 1],
                { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
              ),
            }}
          >
            <span style={{ color: "#555555", fontWeight: 500 }}>{label}</span>
            <span
              style={{ fontWeight: 700, fontVariantNumeric: "tabular-nums" }}
            >
              {value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export const TokenPipeline: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 16,
          marginTop: 34,
        }}
      >
        <div style={{ width: 168 }}>
          <div data-kronos-focus style={{ fontSize: 19, fontWeight: 700 }}>
            REKAMAN ANGKA
          </div>
          <div
            style={{
              marginTop: 22,
              fontSize: 22,
              fontVariantNumeric: "tabular-nums",
              lineHeight: 1.8,
            }}
          >
            100 · 108
            <br />
            97 · 104
          </div>
        </div>
        <span style={{ color: "#708090", fontSize: 28 }}>→</span>
        <div style={{ width: 168 }}>
          <div data-kronos-focus style={{ fontSize: 19, fontWeight: 700 }}>
            TOKEN DISKRET
          </div>
          <svg
            width="154"
            height="90"
            viewBox="0 0 154 90"
            style={{ marginTop: 14 }}
          >
            <g
              opacity={interpolate(frame, [1.43 * fps, 2.52 * fps], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              })}
              fill="none"
              stroke="#708090"
              strokeWidth="3"
            >
              <rect x="2" y="26" width="28" height="28" rx="3" />
              <circle cx="69" cy="40" r="16" />
              <path d="M122 20 142 40 122 60 102 40Z" />
            </g>
          </svg>
        </div>
        <span style={{ color: "#708090", fontSize: 28 }}>→</span>
        <div style={{ flex: 1 }}>
          <div data-kronos-focus style={{ fontSize: 19, fontWeight: 700 }}>
            PROYEKSI
          </div>
          <svg
            width="148"
            height="90"
            viewBox="0 0 148 90"
            style={{ marginTop: 14 }}
          >
            <Interactive.Path
              name="Urutan numerik ilustratif"
              d="M5 55 28 38 51 45 74 28 97 41 120 35 143 48"
              fill="none"
              stroke="#708090"
              strokeWidth="3"
              pathLength="1"
              strokeDasharray="1"
              strokeDashoffset={interpolate(
                frame,
                [4.91 * fps, 6.6 * fps],
                [1, 0],
                {
                  extrapolateLeft: "clamp",
                  extrapolateRight: "clamp",
                },
              )}
            />
            <text
              x="4"
              y="84"
              fontSize="17"
              fill="#555555"
              opacity={interpolate(frame, [5.6 * fps, 6.6 * fps], [0, 1], {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              })}
            >
              103 · 101 · 105
            </text>
          </svg>
        </div>
      </div>
      <div
        data-kronos-focus
        style={{
          marginTop: 22,
          paddingTop: 22,
          borderTop: "1px solid #70809040",
          fontSize: 23,
          fontWeight: 600,
          lineHeight: 1.5,
        }}
      >
        Prediksi token berikutnya, berulang.
        <br />
        Lalu didekode kembali menjadi angka.
      </div>
    </>
  );
};

export const ScenarioPaths: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <svg
      width="100%"
      height="300"
      viewBox="0 0 636 300"
      aria-label="Tiga jalur ilustrasi dengan bobot visual sama, dari riwayat yang sama"
    >
      <text x="0" y="32" fill="#555555" fontSize="18" fontWeight="600">
        RIWAYAT BERSAMA
      </text>
      <text x="360" y="32" fill="#555555" fontSize="18" fontWeight="600">
        LANJUTAN ILUSTRATIF
      </text>
      <line
        x1="286"
        x2="286"
        y1="60"
        y2="274"
        stroke="#708090"
        strokeDasharray="4 7"
        opacity="0.4"
      />
      <path
        d="M8 169 43 148 78 162 113 136 148 150 183 126 218 143 253 155 286 150"
        fill="none"
        stroke="#000000"
        strokeWidth="3"
      />
      <g fill="none" stroke="#708090" strokeWidth="3" pathLength="1">
        <path
          d="M286 150 332 99 378 117 424 73 470 92 516 70 562 89 608 82"
          pathLength="1"
          strokeDasharray="1"
          strokeDashoffset={interpolate(frame, [0.3 * fps, 2.3 * fps], [1, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          })}
        />
        <path
          d="M286 150 332 166 378 138 424 154 470 139 516 156 562 143 608 150"
          pathLength="1"
          strokeDasharray="1"
          strokeDashoffset={interpolate(frame, [0.3 * fps, 2.3 * fps], [1, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          })}
        />
        <path
          d="M286 150 332 201 378 183 424 227 470 208 516 230 562 211 608 218"
          pathLength="1"
          strokeDasharray="1"
          strokeDashoffset={interpolate(frame, [0.3 * fps, 2.3 * fps], [1, 0], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          })}
        />
      </g>
      <text x="0" y="294" fill="#555555" fontSize="16">
        Tanpa skala harga, probabilitas, atau sinyal transaksi.
      </text>
    </svg>
  );
};

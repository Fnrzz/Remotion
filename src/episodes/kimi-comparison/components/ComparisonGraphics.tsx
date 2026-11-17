import React from "react";
import {
  Easing,
  Interactive,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { BENCHMARKS, MODELS, PRICING } from "../data/editorial";
import { ModelLogo } from "./ModelLogo";

// The caller supplies the current value: labels and geometry share one clock.
export const AnimatedNumber: React.FC<{
  value: number;
  decimals?: number;
  prefix?: string;
}> = ({ value, decimals = 0, prefix = "" }) => (
  <span style={{ fontVariantNumeric: "tabular-nums" }}>
    {prefix}
    {value.toLocaleString("id-ID", {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    })}
  </span>
);

export const ModelComparisonCard: React.FC<{
  index: 0 | 1 | 2;
  delay?: number;
  showPrices?: boolean;
  inputAt?: number;
  outputAt?: number;
  barsAt?: number;
}> = ({
  index,
  delay = 0,
  showPrices = false,
  inputAt = 0,
  outputAt = 0,
  barsAt = 0,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const model = MODELS[index];
  const inputValue = interpolate(
    frame,
    [inputAt * fps, (inputAt + 0.25) * fps],
    [0, PRICING.input[index]],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  const outputValue = interpolate(
    frame,
    [outputAt * fps, (outputAt + 0.25) * fps],
    [0, PRICING.output[index]],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  const entrance = spring({
    frame: frame - Math.round(delay * fps),
    fps,
    config: { damping: 200 },
    durationInFrames: Math.round(0.6 * fps),
  });
  const inputFlow = frame >= inputAt * fps && frame < (inputAt + 0.85) * fps;
  const outputFlow = frame >= outputAt * fps && frame < (outputAt + 0.85) * fps;

  return (
    // Rounded model cards are the deliberate KAVDRA episode-local override.
    <div
      data-model={model.id}
      style={{
        position: "absolute",
        left: index * 220,
        top: 0,
        width: 196,
        height: 300,
        boxSizing: "border-box",
        border: "1px solid #70809035",
        borderRadius: 18,
        backgroundColor: "#FFFFFF",
        color: "#000000",
        scale: showPrices ? 1 : 0.92 + 0.08 * entrance,
        rotate: showPrices ? "0deg" : `${(1 - entrance) * (index - 1) * 2}deg`,
        opacity: interpolate(
          frame,
          [delay * fps, (delay + 0.25) * fps],
          [0, 1],
          {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          },
        ),
        translate: interpolate(
          frame,
          [delay * fps, (delay + 0.6) * fps],
          [showPrices ? "0px 14px" : `${(index - 1) * 12}px 36px`, "0px 0px"],
          {
            easing: Easing.bezier(0.16, 1, 0.3, 1),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          },
        ),
      }}
    >
      <div
        style={{
          position: "absolute",
          left: 18,
          top: 17,
          width: interpolate(
            frame,
            [delay * fps, (delay + 0.65) * fps],
            [0, 28],
            { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
          ),
          height: 4,
          backgroundColor: model.color,
        }}
      />
      {!showPrices ? (
        <div
          style={{
            position: "absolute",
            left: 56,
            top: 52,
            width: 84,
            height: 84,
            overflow: "hidden",
            clipPath: `inset(${interpolate(frame, [(delay + 0.05) * fps, (delay + 0.5) * fps], [100, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}% 0 0 0)`,
            scale: interpolate(
              frame,
              [delay * fps, (delay + 0.6) * fps],
              [0.7, 1],
              {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
                easing: Easing.bezier(0.16, 1, 0.3, 1),
              },
            ),
          }}
        >
          <ModelLogo index={index} />
        </div>
      ) : null}
      <Interactive.Div
        name="Nama model pembanding"
        data-kimi-focus
        style={{
          position: "absolute",
          left: 18,
          top: showPrices ? 32 : 164,
          width: 160,
          fontSize: 25,
          fontWeight: 800,
          lineHeight: 1.16,
          letterSpacing: "-0.035em",
          color: model.color,
        }}
      >
        {model.lines[0]}
        <br />
        {model.lines[1]}
      </Interactive.Div>
      {showPrices ? (
        <>
          <div
            style={{
              position: "absolute",
              left: 18,
              top: 104,
              width: 160,
              height: 1,
              backgroundColor: "#70809030",
            }}
          />
          {inputFlow || outputFlow ? (
            <div
              data-token-flow
              aria-hidden
              style={{
                position: "absolute",
                left: inputFlow
                  ? interpolate(
                      frame,
                      [inputAt * fps, (inputAt + 0.85) * fps],
                      [18, 170],
                      { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
                    )
                  : interpolate(
                      frame,
                      [outputAt * fps, (outputAt + 0.85) * fps],
                      [170, 18],
                      { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
                    ),
                top: 100,
                width: 8,
                height: 8,
                backgroundColor: model.color,
              }}
            />
          ) : null}
          <Interactive.Div
            name="Harga API input"
            data-kimi-focus
            data-price-kind="input"
            data-price-value={inputValue}
            style={{
              position: "absolute",
              left: 18,
              top: 114,
              width: 160,
              opacity: frame >= inputAt * fps ? 1 : 0,
            }}
          >
            <div style={{ fontSize: 13, fontWeight: 700, color: "#555555" }}>
              INPUT
            </div>
            <div style={{ fontSize: 38, lineHeight: 1.15, fontWeight: 800 }}>
              <AnimatedNumber value={inputValue} prefix="$" />
            </div>
            <div style={{ fontSize: 11, fontWeight: 600, color: "#555555" }}>
              USD / 1 JUTA TOKEN
            </div>
          </Interactive.Div>
          <div
            data-price-scale-max={PRICING.inputMax}
            data-price-bar-kind="input"
            aria-label="Perbandingan input, skala 0 sampai 10 dolar per satu juta token"
            style={{
              position: "absolute",
              left: 18,
              top: 190,
              width: 160,
              height: 10,
              backgroundColor: "#70809018",
              opacity: frame >= barsAt * fps ? 1 : 0,
            }}
          >
            <div
              style={{
                height: 10,
                backgroundColor: model.color,
                width: interpolate(
                  frame,
                  [barsAt * fps, (barsAt + 0.55) * fps],
                  [0, (PRICING.input[index] / PRICING.inputMax) * 160],
                  {
                    easing: Easing.bezier(0.22, 1, 0.36, 1),
                    extrapolateLeft: "clamp",
                    extrapolateRight: "clamp",
                  },
                ),
              }}
            />
          </div>
          <Interactive.Div
            name="Harga API output"
            data-kimi-focus
            data-price-kind="output"
            data-price-value={outputValue}
            style={{
              position: "absolute",
              left: 18,
              top: 208,
              width: 160,
              opacity: frame >= outputAt * fps ? 1 : 0,
            }}
          >
            <div style={{ fontSize: 13, fontWeight: 700, color: "#555555" }}>
              OUTPUT
            </div>
            <div style={{ fontSize: 38, lineHeight: 1.15, fontWeight: 800 }}>
              <AnimatedNumber value={outputValue} prefix="$" />
            </div>
            <div style={{ fontSize: 11, fontWeight: 600, color: "#555555" }}>
              USD / 1 JUTA TOKEN
            </div>
          </Interactive.Div>
          <div
            data-price-scale-max={PRICING.outputMax}
            data-price-bar-kind="output"
            aria-label="Perbandingan output, skala 0 sampai 50 dolar per satu juta token"
            style={{
              position: "absolute",
              left: 18,
              top: 284,
              width: 160,
              height: 10,
              backgroundColor: "#70809018",
              opacity: frame >= barsAt * fps ? 1 : 0,
            }}
          >
            <div
              style={{
                height: 10,
                backgroundColor: model.color,
                width: interpolate(
                  frame,
                  [barsAt * fps, (barsAt + 0.55) * fps],
                  [0, (PRICING.output[index] / PRICING.outputMax) * 160],
                  {
                    easing: Easing.bezier(0.22, 1, 0.36, 1),
                    extrapolateLeft: "clamp",
                    extrapolateRight: "clamp",
                  },
                ),
              }}
            />
          </div>
        </>
      ) : null}
    </div>
  );
};

export const PricingComparison: React.FC<{
  inputAt: readonly number[];
  outputAt: readonly number[];
  barsAt: number;
}> = ({ inputAt, outputAt, barsAt }) => (
  <div style={{ position: "relative", width: 636, height: 400 }}>
    <ModelComparisonCard
      index={0}
      delay={0}
      showPrices
      inputAt={inputAt[0]}
      outputAt={outputAt[0]}
      barsAt={barsAt}
    />
    <ModelComparisonCard
      index={1}
      delay={0}
      showPrices
      inputAt={inputAt[1]}
      outputAt={outputAt[1]}
      barsAt={barsAt}
    />
    <ModelComparisonCard
      index={2}
      delay={0}
      showPrices
      inputAt={inputAt[2]}
      outputAt={outputAt[2]}
      barsAt={barsAt}
    />
    <Interactive.Div
      name="Batasan perbandingan harga token"
      data-kimi-focus
      style={{
        position: "absolute",
        left: 0,
        top: 326,
        width: 636,
        fontSize: 16,
        fontWeight: 800,
        lineHeight: 1.4,
        color: "#000000",
      }}
    >
      HARGA PER TOKEN, BUKAN BIAYA PER PROYEK
    </Interactive.Div>
    <Interactive.Div
      name="Faktor biaya proyek"
      data-kimi-focus
      style={{
        position: "absolute",
        left: 0,
        top: 358,
        width: 636,
        fontSize: 14,
        fontWeight: 500,
        lineHeight: 1.5,
        color: "#555555",
      }}
    >
      Biaya akhir: jumlah token, konteks, cache, dan pengulangan tugas.
    </Interactive.Div>
  </div>
);

export const BenchmarkBarChart: React.FC<{
  values: readonly number[];
  highlight: number;
  labelsVisible?: readonly boolean[];
  spokenFocus?: number;
  spokenProgress?: number;
}> = ({
  values,
  highlight,
  labelsVisible = [true, true, true],
  spokenFocus = -1,
  spokenProgress = 1,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <div
      data-benchmark-scale-min={BENCHMARKS.scale.min}
      data-benchmark-scale-max={BENCHMARKS.scale.max}
      style={{
        position: "relative",
        width: 636,
        height: 400,
        color: "#000000",
      }}
    >
      <svg
        aria-hidden
        data-chart-grid
        width={535}
        height={285}
        style={{ position: "absolute", left: 0, top: 18 }}
      >
        {[0, 25, 50, 75, 100].map((tick, index) => (
          <line
            key={tick}
            x1={(tick / 100) * 535}
            x2={(tick / 100) * 535}
            y1={15}
            y2={interpolate(
              frame,
              [index * 0.08 * fps, (index * 0.08 + 0.65) * fps],
              [15, 265],
              { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
            )}
            stroke="#708090"
            strokeWidth={1}
            strokeOpacity={0.17}
            strokeDasharray="3 7"
          />
        ))}
      </svg>
      {MODELS.map((model, index) => {
        const value = values[index] ?? 0;
        const barWidth =
          ((value - BENCHMARKS.scale.min) /
            (BENCHMARKS.scale.max - BENCHMARKS.scale.min)) *
          535;
        return (
          <div
            key={model.id}
            data-kimi-focus
            data-model={model.id}
            data-score={value}
            data-bar-value={value}
            data-highlight={index === highlight}
            style={{
              position: "absolute",
              left: 0,
              top: index * 102,
              width: 636,
              height: 80,
            }}
          >
            <div style={{ position: "absolute", left: 0, top: 5 }}>
              <ModelLogo index={index as 0 | 1 | 2} size={19} />
            </div>
            <Interactive.Div
              name="Nama model pada benchmark"
              data-kimi-focus
              style={{
                position: "absolute",
                left: 30,
                top: 0,
                fontSize: 23,
                lineHeight: 1.3,
                fontWeight: 700,
              }}
            >
              {model.name}
            </Interactive.Div>
            <div
              data-benchmark-track
              style={{
                position: "absolute",
                left: 0,
                top: 42,
                width: 535,
                height: 24,
                backgroundColor: "#70809014",
              }}
            >
              <div
                data-benchmark-bar
                style={{
                  width: barWidth,
                  height: 24,
                  backgroundColor: index === highlight ? "#000000" : "#708090",
                }}
              />
            </div>
            {labelsVisible[index] && barWidth > 12 ? (
              <>
                <div
                  aria-hidden
                  style={{
                    position: "absolute",
                    left: barWidth - 4,
                    top: 50,
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    backgroundColor: "#FFFFFF",
                    border: "1.5px solid #000000",
                    boxSizing: "border-box",
                  }}
                />
                {spokenFocus === index ? (
                  <div
                    aria-hidden
                    data-score-pulse
                    style={{
                      position: "absolute",
                      left: barWidth - 11,
                      top: 43,
                      width: 22,
                      height: 22,
                      borderRadius: "50%",
                      border: "1.5px solid #708090",
                      boxSizing: "border-box",
                      scale: 0.7 + spokenProgress * 0.9,
                      opacity: 1 - spokenProgress,
                    }}
                  />
                ) : null}
              </>
            ) : null}
            <Interactive.Div
              name="Skor benchmark model"
              data-kimi-focus
              style={{
                position: "absolute",
                left: barWidth + 12,
                top: 32,
                fontSize: 32,
                lineHeight: 1.35,
                fontWeight: index === highlight ? 800 : 600,
                color: index === highlight ? "#000000" : "#555555",
                whiteSpace: "nowrap",
                opacity: labelsVisible[index] ? 1 : 0,
                scale:
                  index === spokenFocus
                    ? 0.92 + 0.08 * Math.min(1, spokenProgress * 4)
                    : 1,
                transformOrigin: "left center",
              }}
            >
              <AnimatedNumber value={value} decimals={1} />
            </Interactive.Div>
          </div>
        );
      })}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 302,
          width: 535,
          height: 1,
          backgroundColor: "#70809060",
        }}
      />
      {[0, 25, 50, 75, 100].map((tick) => (
        <div
          key={tick}
          style={{
            position: "absolute",
            left: (tick / BENCHMARKS.scale.max) * 535,
            top: 302,
          }}
        >
          <div style={{ width: 1, height: 7, backgroundColor: "#70809060" }} />
          <Interactive.Div
            name="Angka skala benchmark"
            data-kimi-focus
            style={{
              position: "absolute",
              left: tick === 0 ? 0 : -18,
              top: 13,
              width: 36,
              fontSize: 15,
              textAlign: tick === 0 ? "left" : "center",
              fontWeight: 600,
              color: "#555555",
            }}
          >
            {tick}
          </Interactive.Div>
        </div>
      ))}
      <Interactive.Div
        name="Satuan sumbu benchmark"
        data-kimi-focus
        style={{
          position: "absolute",
          left: 0,
          top: 356,
          fontSize: 16,
          fontWeight: 700,
          letterSpacing: "0.025em",
          color: "#555555",
        }}
      >
        SKOR BENCHMARK
      </Interactive.Div>
    </div>
  );
};

export const BenchmarkTransition: React.FC<{
  changeAt: number;
  revealAt: number;
  codeLabelsAt?: readonly number[];
  terminalLabelsAt?: readonly number[];
}> = ({
  changeAt,
  revealAt,
  codeLabelsAt = [0, 0, 0],
  terminalLabelsAt = [0, 0, 0],
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const values = BENCHMARKS.code.values.map((value, index) =>
    frame < changeAt * fps
      ? interpolate(
          frame,
          [revealAt * fps, (revealAt + 0.7) * fps],
          [0, value],
          {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          },
        )
      : interpolate(
          frame,
          [changeAt * fps, (changeAt + 0.65) * fps],
          [value, BENCHMARKS.terminal.values[index]],
          {
            easing: Easing.bezier(0.42, 0, 0.58, 1),
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          },
        ),
  );
  const activeLabels = frame < changeAt * fps ? codeLabelsAt : terminalLabelsAt;
  const spokenFocus = activeLabels.findIndex(
    (at) =>
      frame >= Math.round(at * fps) && frame < Math.round((at + 1.25) * fps),
  );
  return (
    <BenchmarkBarChart
      values={values}
      labelsVisible={(frame < changeAt * fps
        ? codeLabelsAt
        : terminalLabelsAt
      ).map((at) => frame >= Math.round(at * fps))}
      spokenFocus={spokenFocus}
      spokenProgress={
        spokenFocus < 0
          ? 1
          : Math.min(
              1,
              Math.max(0, (frame / fps - activeLabels[spokenFocus]) / 1.25),
            )
      }
      highlight={
        frame < changeAt * fps
          ? BENCHMARKS.code.highest
          : BENCHMARKS.terminal.highest
      }
    />
  );
};

// This label is in full-design coordinates; its scene owns placement/scaling.
export const SourceLabel: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <Interactive.Div
    name="Source benchmark"
    data-kimi-focus
    data-kimi-source
    style={{
      fontSize: 28,
      fontWeight: 600,
      lineHeight: 1.4,
      color: "#555555",
    }}
  >
    {children}
  </Interactive.Div>
);

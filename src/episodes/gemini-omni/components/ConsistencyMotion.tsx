import React, { useId } from "react";
import { Easing, interpolate, useVideoConfig } from "remotion";

const INK = "#000000";
const PAPER = "#FAF9F6";
const SLATE = "#708090";
const WHITE = "#FFFFFF";
const PRECISE = Easing.bezier(0.22, 1, 0.36, 1);

/** Original portable film camera. The second pose is drawn, never rotated in 3D. */
export const ConsistentObject: React.FC<{ pose?: "front" | "side" }> = ({
  pose = "front",
}) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="240"
    height="260"
    viewBox="0 0 240 260"
    fill="none"
    role="img"
    aria-label={`Kamera film ilustratif orisinal, tampak ${pose === "front" ? "depan" : "tiga perempat"}`}
    style={{ display: "block", overflow: "visible" }}
  >
    {pose === "front" ? (
      <g stroke={INK} strokeLinejoin="round">
        {/* Raised folding handle and the small optical finder. */}
        <path d="M91 77V40Q91 32 99 32H144Q152 32 152 40V77" strokeWidth="7" />
        <path d="M104 33V19" strokeWidth="5" strokeLinecap="round" />
        <rect
          x="100"
          y="15"
          width="17"
          height="7"
          rx="3.5"
          fill={SLATE}
          strokeWidth="2"
        />
        <rect
          x="47"
          y="61"
          width="48"
          height="28"
          rx="9"
          fill={INK}
          strokeWidth="3"
        />
        <rect
          x="57"
          y="68"
          width="25"
          height="12"
          rx="3"
          fill={WHITE}
          stroke="none"
        />
        <rect
          x="167"
          y="69"
          width="22"
          height="12"
          rx="4"
          fill={SLATE}
          strokeWidth="3"
        />
        <rect
          x="29"
          y="78"
          width="182"
          height="159"
          rx="35"
          fill={PAPER}
          strokeWidth="5"
        />
        <path
          d="M37 204Q37 228 63 228H179Q201 228 203 207"
          stroke={SLATE}
          strokeWidth="2"
        />
        {/* The slate diagonal strap is a persistent identity cue in both poses. */}
        <path d="M44 213 181 82 200 98 65 230Z" fill={SLATE} strokeWidth="3" />
        <path
          d="m55 215 130-124"
          stroke={WHITE}
          strokeWidth="1.5"
          opacity="0.65"
        />
        <path d="m173 104 10 9 9-9-10-9Z" fill={PAPER} strokeWidth="2" />
        <path d="M30 120H48M195 154H210" strokeWidth="3" />
        {/* Two embossed dots, not facial features. */}
        <circle cx="61" cy="103" r="5" fill={SLATE} strokeWidth="1.5" />
        <circle cx="77" cy="103" r="5" fill={SLATE} strokeWidth="1.5" />
        <path
          d="M58 101h3M74 101h3"
          stroke={WHITE}
          strokeWidth="1.4"
          strokeLinecap="round"
        />
        <circle cx="120" cy="157" r="56" fill={INK} strokeWidth="3" />
        <circle cx="120" cy="157" r="47" stroke={PAPER} strokeWidth="3" />
        <circle cx="120" cy="157" r="38" fill={SLATE} strokeWidth="4" />
        <circle
          cx="120"
          cy="157"
          r="28"
          fill={INK}
          stroke={PAPER}
          strokeWidth="2"
        />
        <path
          d="m120 133 20 12v24l-20 12-20-12v-24Z"
          stroke={SLATE}
          strokeWidth="1.5"
        />
        <path
          d="M98 143a27 27 0 0 1 18-12"
          stroke={WHITE}
          strokeWidth="4"
          strokeLinecap="round"
        />
        <circle cx="132" cy="170" r="4" fill={WHITE} stroke="none" />
        <path
          d="M116 105h8M116 209h8M68 153v8M172 153v8"
          stroke={WHITE}
          strokeWidth="2"
        />
        <rect
          x="84"
          y="223"
          width="37"
          height="4"
          rx="2"
          fill={INK}
          stroke="none"
        />
      </g>
    ) : (
      <g stroke={INK} strokeLinejoin="round">
        {/* Independently constructed three-quarter geometry, including lens barrel. */}
        <path
          d="M106 76V42Q106 35 114 33L150 25Q158 24 160 32L164 68"
          strokeWidth="7"
        />
        <path d="m119 31-1-14" strokeWidth="5" strokeLinecap="round" />
        <path d="m114 13 15-3 2 7-16 3Z" fill={SLATE} strokeWidth="2" />
        <path
          d="m59 66 37-9 9 5v25l-44 10-8-7V75Q53 68 59 66Z"
          fill={INK}
          strokeWidth="3"
        />
        <path d="m62 73 24-5v12l-24 5Z" fill={WHITE} stroke="none" />
        <path d="m169 65 19-4 9 8-19 5Z" fill={SLATE} strokeWidth="3" />
        <path
          d="m72 89 99-21Q195 63 206 83L217 190Q220 209 201 216L158 234 70 236Z"
          fill={SLATE}
          strokeWidth="4"
        />
        <path
          d="m165 84 23-5Q196 78 198 91l10 100q1 12-11 16l-26 10Z"
          fill={INK}
          strokeWidth="2"
        />
        <path
          d="m180 109 15-4m-13 16 14-4m-12 16 13-4"
          stroke={PAPER}
          strokeWidth="2"
        />
        <path
          d="M43 120Q41 97 62 92l79-17q22-4 25 20l8 108q2 23-21 29l-81 8q-26 2-27-24Z"
          fill={PAPER}
          strokeWidth="5"
        />
        <path d="m48 215 87-133 22 12-85 142Z" fill={SLATE} strokeWidth="3" />
        <path
          d="m58 219 82-127"
          stroke={WHITE}
          strokeWidth="1.5"
          opacity="0.65"
        />
        <path d="m134 105 12 6 6-11-12-6Z" fill={PAPER} strokeWidth="2" />
        <ellipse
          cx="63"
          cy="112"
          rx="4.2"
          ry="5"
          fill={SLATE}
          strokeWidth="1.5"
        />
        <ellipse
          cx="78"
          cy="109"
          rx="4.2"
          ry="5"
          fill={SLATE}
          strokeWidth="1.5"
        />
        <path
          d="m61 110 2-1m13-2 2-1"
          stroke={WHITE}
          strokeWidth="1.4"
          strokeLinecap="round"
        />
        <ellipse cx="113" cy="162" rx="45" ry="56" fill={INK} strokeWidth="3" />
        <path
          d="m106 107-24 8q-35 9-34 53t35 47l24 2q-37-8-37-55t36-55Z"
          fill={SLATE}
          strokeWidth="3"
        />
        <path
          d="m67 130 18-5m-23 23 17-4m-16 49 16-3m-8 16 16-3"
          stroke={INK}
          strokeWidth="2"
        />
        <ellipse cx="87" cy="166" rx="41" ry="52" fill={INK} strokeWidth="3" />
        <ellipse
          cx="87"
          cy="166"
          rx="33"
          ry="43"
          stroke={PAPER}
          strokeWidth="3"
        />
        <ellipse
          cx="87"
          cy="166"
          rx="26"
          ry="34"
          fill={SLATE}
          strokeWidth="3"
        />
        <ellipse
          cx="87"
          cy="166"
          rx="19"
          ry="25"
          fill={INK}
          stroke={PAPER}
          strokeWidth="2"
        />
        <path
          d="M73 152q5-12 14-12"
          stroke={WHITE}
          strokeWidth="3.5"
          strokeLinecap="round"
        />
        <ellipse cx="94" cy="177" rx="3" ry="4" fill={WHITE} stroke="none" />
        <path d="m91 226 31-4" strokeWidth="4" strokeLinecap="round" />
        <path d="m177 222 23-9" stroke={PAPER} strokeWidth="2" />
      </g>
    )}
  </svg>
);

const CornerMarks: React.FC<{
  x: number;
  y: number;
  width: number;
  height: number;
  opacity?: number;
}> = ({ x, y, width, height, opacity = 1 }) => (
  <path
    d={`M${x + 24} ${y}H${x}V${y + 24} M${x + width - 24} ${y}H${x + width}V${y + 24} M${x} ${y + height - 24}V${y + height}H${x + 24} M${x + width - 24} ${y + height}H${x + width}V${y + height - 24}`}
    fill="none"
    stroke={SLATE}
    strokeWidth="2"
    opacity={opacity}
    strokeLinecap="square"
  />
);

/** Artwork only: the parent owns headlines, attribution and conceptual disclosure. */
export const ConsistencyMotion: React.FC<{ time: number }> = ({ time }) => {
  const { fps } = useVideoConfig();
  const frame = Math.max(0, time) * fps;
  const id = useId().replace(/:/g, "");
  const progress = (start: number, end: number) =>
    interpolate(frame, [start * fps, end * fps], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: PRECISE,
    });

  const entrance = progress(0, 0.85);
  const close = progress(1.65, 2.8);
  const side = progress(3.9, 4.42);
  const assemble = progress(5.95, 7.6);
  const leftReveal = progress(6.12, 7.25);
  const rightReveal = progress(6.42, 7.72);
  const scale = (1.36 + close * 0.64) * (1 - assemble) + 0.98 * assemble;
  const subjectX = 456 + 14 * close * (1 - assemble);
  const subjectY = 294 + 12 * (1 - entrance) - 9 * close * (1 - assemble);
  const bracketWidth = 220 * scale;
  const bracketHeight = 244 * scale;
  const mainOpacity = interpolate(frame, [0, 0.35 * fps], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="100%"
      height="100%"
      viewBox="0 0 912 660"
      role="img"
      aria-label="Ilustrasi konsistensi objek: kamera film yang sama dalam bingkai lebar, dekat, dan sudut tiga perempat"
      data-consistency-motion
      style={{ display: "block", overflow: "hidden" }}
    >
      <defs>
        {/* A flat editorial wipe exposes the separate drawing, not a fake spin. */}
        <clipPath id={`${id}-front`} clipPathUnits="userSpaceOnUse">
          <rect x={240 * side} y="0" width={240 * (1 - side)} height="260" />
        </clipPath>
        <clipPath id={`${id}-side`} clipPathUnits="userSpaceOnUse">
          <rect x="0" y="0" width={240 * side} height="260" />
        </clipPath>
      </defs>

      {/* Broken construction lines stay behind the subject, without a panel. */}
      <g
        transform={`translate(${-12 * close + 7 * side} ${-6 * close})`}
        fill="none"
        stroke={SLATE}
        strokeWidth="1.4"
        opacity={0.18 * entrance * (1 - 0.45 * assemble)}
      >
        <path d="M48 144H204M708 144H864M50 444H159M753 444H862" />
        <path d="M167 194V222M167 354V382M749 194V222M749 354V382" />
        <path d="M281 69Q456 16 631 69M281 516Q456 569 631 516" />
        <path d="m76 278 38-38m-23 53 38-38m654 76 38-38m-23 53 38-38" />
      </g>

      {/* Registration baseline: small purposeful parallax, no idle oscillation. */}
      <g
        transform={`translate(${6 * close * (1 - assemble)} 0)`}
        stroke={SLATE}
        fill="none"
        opacity={0.34 * entrance}
      >
        <path d="M74 563H838" strokeWidth="1" />
        {[180, 456, 732].map((x) => (
          <path key={x} d={`M${x} 556V570`} strokeWidth="2" />
        ))}
        <path d="M74 558V568M838 558V568" />
      </g>

      {/* The two companions arrive with the same final scale and baseline. */}
      {(
        [
          { x: 180, reveal: leftReveal, direction: 1 },
          { x: 732, reveal: rightReveal, direction: -1 },
        ] as const
      ).map(({ x, reveal, direction }) => (
        <g key={x} opacity={reveal}>
          <g
            transform={`translate(${x + direction * 34 * (1 - reveal)} ${294 + 16 * (1 - reveal)}) scale(0.98) translate(-120 -130)`}
          >
            <ConsistentObject pose="front" />
          </g>
          <CornerMarks
            x={x - 107.8}
            y={174.44}
            width={215.6}
            height={239.12}
            opacity={0.68 * reveal}
          />
        </g>
      ))}

      <g opacity={mainOpacity}>
        <g
          transform={`translate(${subjectX} ${subjectY}) scale(${scale}) translate(-120 -130)`}
        >
          <g clipPath={`url(#${id}-front)`}>
            <ConsistentObject pose="front" />
          </g>
          <g clipPath={`url(#${id}-side)`}>
            <ConsistentObject pose="side" />
          </g>
        </g>
        <CornerMarks
          x={subjectX - bracketWidth / 2}
          y={subjectY - bracketHeight / 2}
          width={bracketWidth}
          height={bracketHeight}
          opacity={0.68 * entrance}
        />
      </g>

      {/* Three equal registration strokes reinforce identity, not ranking. */}
      <g stroke={INK} strokeWidth="3" opacity={progress(7.05, 7.95)}>
        {[180, 456, 732].map((x) => (
          <path key={x} d={`M${x - 12} 474H${x + 12}`} />
        ))}
      </g>
    </svg>
  );
};

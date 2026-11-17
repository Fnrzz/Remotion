import React from "react";

const BLACK = "#000";
const WHITE = "#fff";
const PAPER = "#FAF9F6";
const SLATE = "#708090";
const GRAY = "#555";

const unit = (value: number) =>
  Number.isFinite(value) ? Math.min(1, Math.max(0, value)) : 0;

export type VectorLaptopProps = {
  opening: number;
  power: number;
  boot: number;
  login: number;
  desktop: number;
  windows: number;
  folder: number;
  features?: number;
  storage?: number;
};

/** Original symbolic progress, not a recording or a claim of successful boot. */
export const ConceptualBootSequence: React.FC<{ progress: number }> = ({
  progress,
}) => (
  <g fill="none" stroke={WHITE} strokeWidth={2}>
    <path d="M302 122 H334 V154 H302 Z M310 130 H326 V146 H310 Z" />
    <path d="M318 112 V122 M318 154 V164 M292 138 H302 M334 138 H344" />
    <path d="M250 190 H386" stroke={GRAY} />
    <path
      d="M250 190 H386"
      pathLength={1}
      strokeDasharray="1 1"
      strokeDashoffset={1 - unit(progress)}
      strokeLinecap="butt"
    />
  </g>
);

/** Local 48 × 40 glyph; opening lifts a document and the folder's front. */
export const FolderGlyph: React.FC<{ opening?: number }> = ({
  opening = 0,
}) => {
  const amount = unit(opening);
  return (
    <g stroke={BLACK} strokeWidth={1.8} strokeLinejoin="round">
      <path d="M2 12 V5 H19 L25 11 H45 V36 H2 Z" fill={PAPER} />
      <g transform={`translate(0 ${-7 * amount})`} opacity={amount}>
        <path d="M12 15 V5 H29 L35 11 V29 H12 Z" fill={WHITE} />
        <path d="M29 5 V11 H35 M17 17 H29 M17 22 H26" fill="none" />
      </g>
      <path
        d={`M2 36 L${2 + 5 * amount} 16 H${45 + 2 * amount} L45 36 Z`}
        fill={SLATE}
      />
    </g>
  );
};

/** Desktop coordinates share the laptop's screen space (113..523, 48..270). */
export const AnimatedDesktop: React.FC<{
  windows: number;
  folder: number;
}> = ({ windows, folder }) => {
  const windowAmount = unit(windows);
  const folderAmount = unit(folder);
  return (
    <g stroke={BLACK} strokeWidth={1.6} strokeLinejoin="round">
      <rect
        x={113}
        y={48}
        width={410}
        height={222}
        fill={PAPER}
        stroke="none"
      />
      {/* A sparse, original workspace: no borrowed OS chrome or brand mark. */}
      <path d="M143 64 V253" stroke={SLATE} />
      <path d="M124 76 H133 V85 H124 Z M124 102 H133 V111 H124 Z" fill="none" />
      <circle cx={128.5} cy={239} r={4} fill={SLATE} stroke="none" />
      <path d="M160 72 H219 M160 80 H194" stroke={SLATE} />
      <g transform="translate(456 90)">
        <FolderGlyph opening={folderAmount} />
      </g>
      <g
        opacity={windowAmount}
        transform={`translate(0 ${8 * (1 - windowAmount)})`}
      >
        <rect x={164} y={98} width={206} height={135} rx={3} fill={WHITE} />
        <path d="M164 121 H370" fill="none" />
        <circle cx={177} cy={110} r={2.5} fill={SLATE} stroke="none" />
        <path d="M188 110 H232 M344 108 H351 V114 H344 Z" fill="none" />
        <path d="M180 142 H248 M180 156 H224 M180 193 H260" stroke={SLATE} />
        <g
          opacity={unit(windowAmount * 2 - 0.5)}
          transform={`translate(${6 * (1 - windowAmount)} 0)`}
        >
          <rect x={230} y={137} width={210} height={114} rx={3} fill={PAPER} />
          <path d="M230 160 H440" fill="none" />
          <circle cx={243} cy={149} r={2.5} fill={SLATE} stroke="none" />
          <path d="M254 149 H298 M415 146 H422 V153 H415 Z" fill="none" />
          <path d="M249 182 H284 V229 H249 Z" fill={WHITE} />
          <path d="M302 183 H416 M302 198 H386 M302 213 H404" stroke={SLATE} />
        </g>
      </g>
      {/* Folder interaction is independent of the generic window reveal. */}
      <g
        opacity={folderAmount}
        transform={`translate(0 ${5 * (1 - folderAmount)})`}
      >
        <rect x={207} y={128} width={235} height={123} rx={3} fill={WHITE} />
        <path d="M207 152 H442 M263 152 V251" fill="none" />
        <path d="M220 140 H251 M419 137 H426 V144 H419 Z" fill="none" />
        <path d="M221 169 H249 M221 185 H244 M221 201 H249" stroke={SLATE} />
        {[168, 193, 218].map((y) => (
          <g key={y}>
            <path
              d={`M280 ${y} H291 L296 ${y + 5} V${y + 15} H280 Z`}
              fill={PAPER}
            />
            <path
              d={`M309 ${y + 7} H${y === 193 ? 386 : 416}`}
              stroke={SLATE}
            />
          </g>
        ))}
      </g>
    </g>
  );
};

const FeatureModules: React.FC<{ progress: number; storage: number }> = ({
  progress,
  storage,
}) => (
  <g
    opacity={progress}
    fill="none"
    stroke={BLACK}
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {/* Quiet connectors terminate at the smaller laptop, never enclose it. */}
    <path
      d="M100 91 H134 L162 110 M536 91 H502 L474 110 M100 266 H135 L162 250 M536 266 H501 L474 250"
      stroke={SLATE}
      opacity={0.55}
      pathLength={1}
      strokeDasharray="1 1"
      strokeDashoffset={1 - progress}
    />
    <g transform="translate(45 45)">
      <circle cx={28} cy={27} r={24} fill={PAPER} />
      <circle cx={28} cy={27} r={7} />
      <path d="M28 27 L45 12 M10 30 A18 18 0 0 0 25 45" stroke={SLATE} />
      <text
        x={28}
        y={76}
        textAnchor="middle"
        fill={BLACK}
        stroke="none"
        fontSize={17}
        fontWeight={700}
      >
        DISK
      </text>
    </g>
    <g transform="translate(535 45)">
      <circle cx={28} cy={9} r={7} fill={PAPER} />
      <path d="M28 16 V32 M8 32 H48 M8 32 V39 M48 32 V39" />
      <rect x={1} y={39} width={14} height={14} fill={PAPER} />
      <rect x={41} y={39} width={14} height={14} fill={PAPER} />
      <text
        x={28}
        y={76}
        textAnchor="middle"
        fill={BLACK}
        stroke="none"
        fontSize={17}
        fontWeight={700}
      >
        JARINGAN
      </text>
    </g>
    <g transform="translate(40 240)">
      <path d="M2 5 H65 L70 44 H-3 Z" fill={PAPER} />
      <path d="M10 15 H17 M25 15 H32 M40 15 H47 M55 15 H59 M8 25 H15 M23 25 H30 M38 25 H45 M53 25 H61 M17 35 H50" />
      <text
        x={33}
        y={76}
        textAnchor="middle"
        fill={BLACK}
        stroke="none"
        fontSize={17}
        fontWeight={700}
      >
        KEYBOARD
      </text>
    </g>
    <g transform="translate(535 238)" opacity={storage}>
      <path d="M4 12 V47 C4 59 52 59 52 47 V12" fill={PAPER} />
      <ellipse cx={28} cy={12} rx={24} ry={9} fill={PAPER} />
      <path d="M4 29 C4 41 52 41 52 29" stroke={SLATE} />
      <text
        x={28}
        y={78}
        textAnchor="middle"
        fill={BLACK}
        stroke="none"
        fontSize={17}
        fontWeight={700}
      >
        STORAGE
      </text>
    </g>
  </g>
);

/**
 * Pure SVG artwork for a parent viewBox="0 0 636 400". All phase inputs are
 * clamped to 0..1; later screen phases replace earlier ones without a timer.
 */
export const VectorLaptop: React.FC<VectorLaptopProps> = ({
  opening,
  power,
  boot,
  login,
  desktop,
  windows,
  folder,
  features = 0,
  storage = features,
}) => {
  const lid = unit(opening);
  const powered = unit(power);
  const loginAmount = unit(login);
  const desktopAmount = unit(desktop);
  const featureAmount = unit(features);
  const lightScreen = Math.max(loginAmount, desktopAmount);
  const laptopScale = 1 - featureAmount * 0.28;

  return (
    <g
      data-vector-laptop="conceptual"
      data-screen-power={powered}
      data-screen-login={loginAmount}
      data-screen-desktop={desktopAmount}
      strokeLinejoin="round"
    >
      <FeatureModules progress={featureAmount} storage={unit(storage)} />
      <g
        transform={`translate(318 190) scale(${laptopScale}) translate(-318 -190)`}
      >
        {/* Native hardware geometry only; no enclosing presentation panel. */}
        <path
          d="M100 282 H536 L581 319 H55 Z"
          fill={PAPER}
          stroke={BLACK}
          strokeWidth={2.2}
        />
        <path
          d="M55 319 H581 L565 332 H71 Z"
          fill={WHITE}
          stroke={BLACK}
          strokeWidth={2.2}
        />
        <g fill="none" stroke={GRAY} strokeWidth={1.2}>
          <path d="M130 290 H506 L523 307 H113 Z M122 298 H514" />
          {[155, 184, 213, 242, 271, 300, 329, 358, 387, 416, 445, 474].map(
            (x) => (
              <path key={x} d={`M${x} 291 L${x + (x - 318) * 0.04} 305`} />
            ),
          )}
          <path d="M280 310 H356 L363 319 H273 Z" />
          <path d="M268 325 H368" stroke={SLATE} />
        </g>
        <g
          transform={`translate(318 282) scale(${0.94 + 0.06 * lid} ${0.025 + 0.975 * lid}) translate(-318 -282)`}
        >
          <rect
            x={100}
            y={35}
            width={436}
            height={247}
            rx={8}
            fill={PAPER}
            stroke={BLACK}
            strokeWidth={2.5}
          />
          <rect x={113} y={48} width={410} height={222} rx={2} fill={BLACK} />
          <circle cx={318} cy={42} r={1.6} fill={SLATE} />
          <g opacity={powered}>
            <g opacity={1 - lightScreen}>
              <ConceptualBootSequence progress={boot} />
            </g>
            <g opacity={lightScreen}>
              <rect x={113} y={48} width={410} height={222} fill={PAPER} />
            </g>
            <g
              opacity={loginAmount * (1 - desktopAmount)}
              fill="none"
              stroke={BLACK}
              strokeWidth={2}
              strokeLinecap="round"
            >
              <circle cx={318} cy={134} r={14} />
              <path d="M289 178 C289 148 347 148 347 178 M286 193 H350" />
              <path
                d="M311 210 H325 M319 204 L325 210 319 216"
                stroke={SLATE}
              />
            </g>
            <g opacity={desktopAmount}>
              <AnimatedDesktop windows={windows} folder={folder} />
            </g>
          </g>
          <path d="M117 277 H519" stroke={SLATE} strokeWidth={1.2} />
        </g>
      </g>
    </g>
  );
};

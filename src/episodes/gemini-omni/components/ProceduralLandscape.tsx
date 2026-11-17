import React from "react";
import { interpolateColors } from "remotion";

type LandscapeProps = {
  night: number;
  pan?: number;
  id?: string;
};

const clamp = (value: number) => Math.min(1, Math.max(0, value));
const smooth = (value: number) => {
  const t = clamp(value);
  return t * t * (3 - 2 * t);
};

// Authored placement, rather than a random forest, keeps every render identical.
const distantTrees = [
  [35, 343, 0.46],
  [79, 330, 0.55],
  [118, 344, 0.38],
  [171, 326, 0.56],
  [209, 333, 0.43],
  [251, 344, 0.35],
  [301, 329, 0.49],
  [337, 337, 0.39],
  [589, 326, 0.37],
  [622, 331, 0.46],
  [855, 322, 0.61],
  [893, 338, 0.48],
] as const;

const stars = [
  [94, 55, 1.2],
  [177, 118, 1.3],
  [332, 43, 1.6],
  [439, 111, 1],
  [535, 56, 1.4],
  [652, 143, 1.1],
  [802, 45, 1.3],
  [856, 137, 1.7],
  [394, 158, 1],
] as const;

const Pine: React.FC<{
  x: number;
  y: number;
  scale: number;
  fill: string;
  light: string;
  trunk: string;
}> = ({ x, y, scale, fill, light, trunk }) => (
  <g transform={`translate(${x} ${y}) scale(${scale})`}>
    <path d="M-3 4 L-2-83 H2 L4 4Z" fill={trunk} />
    <path
      d="M0-116 19-83 11-85 28-58 18-61 37-29 24-33 42-4 5-12 0-8-39-3-25-30-35-26-17-58-26-54-9-84-17-81Z"
      fill={fill}
    />
    <path
      d="M0-116 0-88-17-81-9-84-26-54-17-58-35-26-25-30-39-3-13-10-2-23 0-51-10-48 0-68Z"
      fill={light}
    />
    <path
      d="M0-88 0-11 M0-63 15-58 M0-42-17-35 M0-26 24-18"
      fill="none"
      stroke={trunk}
      strokeWidth="1.3"
      opacity="0.46"
    />
  </g>
);

/** A deterministic, prop-driven alpine vista; no external assets or clock. */
export const ProceduralLandscape: React.FC<LandscapeProps> = ({
  night,
  pan = 0,
  id = "procedural-landscape",
}) => {
  const n = clamp(night);
  const p = Math.min(1, Math.max(-1, pan));
  const color = (day: string, dark: string) =>
    interpolateColors(n, [0, 1], [day, dark]);
  const lights = smooth((n - 0.36) / 0.55);
  const sky = color("#EEEDE8", "#18242E");
  const snow = color("#F8F7F2", "#7B8994");
  const ridge = color("#A5AFB5", "#3B4C5B");
  const ridgeShade = color("#8797A2", "#2D3D4C");
  const field = color("#B2B9B4", "#344747");
  const fieldLight = color("#C5CAC2", "#3C5150");
  const forest = color("#566E73", "#182E34");
  const forestLight = color("#708589", "#263F43");
  const bark = color("#45575C", "#14262D");
  const window = color("#9EADB0", "#E6D9B5");
  const clipId = `${id}-landscape-clip`;

  return (
    <svg
      viewBox="0 0 912 560"
      width="100%"
      height="100%"
      role="img"
      aria-label="Illustrated alpine landscape with a winding road and cabin, changing from day to night"
      style={{ display: "block" }}
    >
      <defs>
        <clipPath id={clipId}>
          <rect width="912" height="560" />
        </clipPath>
      </defs>
      <g clipPath={`url(#${clipId})`}>
        <rect width="912" height="560" fill={sky} />

        {/* Celestial bodies move behind the mountains, not over the terrain. */}
        <g transform={`translate(${-p * 3} 0)`}>
          <circle
            cx={239 + n * 40}
            cy={90 + n * 235}
            r="34"
            fill={color("#FAF9F6", "#C5C3B6")}
            opacity={1 - smooth((n - 0.38) / 0.38)}
          />
          <g opacity={smooth((n - 0.42) / 0.46)}>
            {stars.map(([x, y, r]) => (
              <circle key={x} cx={x} cy={y} r={r} fill="#DCE1DF" />
            ))}
            <path
              d="M584 92V100 M580 96H588"
              stroke="#DCE1DF"
              strokeWidth="1.2"
              strokeLinecap="round"
            />
          </g>
          <g
            transform={`translate(${741 - n * 17} ${273 - n * 191})`}
            opacity={smooth((n - 0.28) / 0.44)}
          >
            <path
              d="M8-25 A26 26 0 1 0 25 10 A27 27 0 0 1 8-25Z"
              fill="#E7E7DC"
            />
            <circle cx="-12" cy="7" r="3.5" fill="#C9D1CF" />
            <circle cx="-5" cy="17" r="2" fill="#C9D1CF" />
          </g>
        </g>

        {/* Broad, flat cloud silhouettes retain the editorial ink-like finish. */}
        <g
          transform={`translate(${-p * 6 + n * 14} 0)`}
          fill={color("#FAF9F6", "#34424D")}
        >
          <path d="M-50 113H37C45 99 67 98 79 107 86 89 107 85 124 94 135 77 164 80 171 100 192 96 207 103 214 113H264L250 121H-50Z" />
          <path d="M485 72H525C531 61 546 58 558 64 568 47 591 44 606 58 625 53 641 62 645 72H700L683 79H485Z" />
          <path d="M742 177H786C795 162 813 161 827 171 837 153 861 153 873 167 895 161 909 167 918 177H980V184H742Z" />
        </g>

        {/* Three rock strata, with deliberately asymmetric summit facets. */}
        <g transform={`translate(${-p * 8} 0)`}>
          <path
            d="M-80 313 9 246 70 258 156 169 193 202 264 127 337 222 385 201 449 263 505 229 552 269 646 183 714 235 774 171 870 267 992 221V414H-80Z"
            fill={color("#CDD1CD", "#4D5C67")}
          />
          <path
            d="M-80 341 32 293 111 226 169 253 264 127 352 280 403 247 476 321 588 252 645 183 744 302 774 171 863 311 992 267V419H-80Z"
            fill={ridge}
          />
          <path
            d="M264 127 252 205 277 224 271 259 308 278 352 280Z M645 183 627 259 654 248 690 298 744 302Z M774 171 777 244 808 264 823 302 863 311Z M111 226 112 279 146 297 169 253Z"
            fill={ridgeShade}
          />
          <path
            d="M208 201 264 127 310 198 286 189 277 204 260 177 241 203 233 194 217 207Z M613 226 645 183 680 224 658 219 648 207 636 231 626 218Z M748 212 774 171 803 216 782 203 775 213 767 200Z"
            fill={snow}
          />
          <g fill="none" stroke={color("#D8DDD9", "#62727C")} strokeWidth="1.4">
            <path d="M249 211 219 251 195 268 M237 237 231 265 210 286 M296 224 318 254 M634 251 610 279 605 302 M785 248 799 281" />
          </g>
        </g>

        <g transform={`translate(${-p * 13} 0)`}>
          <path
            d="M-70 346C49 293 131 314 214 303S365 309 430 329C493 349 555 305 630 316S783 289 982 326V560H-70Z"
            fill={color("#8F9F9C", "#31474B")}
          />
          <path
            d="M-70 357C70 328 137 354 219 334S350 326 426 349C497 372 588 322 651 339S826 318 982 342"
            fill="none"
            stroke={color("#B7C1B9", "#455B5A")}
            strokeWidth="3"
          />
          {distantTrees.map(([x, y, scale]) => (
            <Pine
              key={x}
              x={x}
              y={y}
              scale={scale}
              fill={forest}
              light={forestLight}
              trunk={bark}
            />
          ))}
        </g>

        <g transform={`translate(${-p * 19} 0)`}>
          <path
            d="M-70 395C81 330 179 359 282 368S448 323 542 321C631 319 669 363 767 347S907 334 982 362V600H-70Z"
            fill={field}
          />
          <path
            d="M-70 453C80 384 175 400 282 394S476 340 542 321C461 373 461 393 563 414S774 383 982 407V600H-70Z"
            fill={fieldLight}
          />
          <path
            d="M-70 505C124 442 202 491 343 454S584 417 693 424 863 390 982 415V600H-70Z"
            fill={color("#99A69F", "#2A403F")}
          />

          {/* A variable-width S bend: the linework follows its perspective. */}
          <path
            d="M541 313 553 314C536 336 473 345 437 357 384 374 359 387 375 405 392 425 485 442 490 464 497 494 399 517 375 560H229C256 505 402 483 412 462 422 441 346 426 331 406 298 365 436 337 492 327Z"
            fill={color("#E6E5DC", "#768381")}
          />
          <path
            d="M547 316C518 339 431 351 389 373 320 409 409 421 445 452 485 487 333 513 298 569"
            fill="none"
            stroke={color("#708090", "#C1CAC4")}
            strokeWidth="1.7"
            strokeDasharray="11 15"
            opacity="0.8"
          />
          <path
            d="M436 359C384 376 365 390 380 404 398 423 488 439 495 463 504 495 408 519 384 560 M324 410C339 432 412 443 405 461 396 480 250 506 220 560"
            fill="none"
            stroke={color("#7E9088", "#243A39")}
            strokeWidth="2"
          />

          {/* Terraced cabin site, with an angular folded standing-seam roof. */}
          <path
            d="M600 397 752 380 852 404 832 424 621 426 585 415Z"
            fill={color("#88988F", "#243B3A")}
          />
          <path
            d="M606 394 760 379 846 401 831 408 619 412Z"
            fill={color("#D2D4C9", "#50615A")}
          />
          <path
            d="M630 329 748 313 812 338V395L693 409 630 385Z"
            fill={color("#DADCD4", "#687770")}
          />
          <path
            d="M630 329 693 349V409L630 385Z"
            fill={color("#A5B0A9", "#415550")}
          />
          <path
            d="M693 349 812 338V395L693 409Z"
            fill={color("#E8E8DF", "#7D8880")}
          />
          <g stroke={color("#9DAAA3", "#566960")} strokeWidth="1">
            {[354, 366, 378, 390].map((y) => (
              <path key={y} d={`M699 ${y} 806 ${y - 11}`} />
            ))}
            <path d="M638 345 686 360 M638 357 686 372 M638 369 686 384" />
          </g>
          <path
            d="M614 327 661 289 713 316 786 295 831 334 692 353Z"
            fill={color("#536773", "#1F303B")}
          />
          <path
            d="M661 289 713 316 786 295 744 325 692 353 614 327Z"
            fill={color("#708090", "#384B58")}
          />
          <path
            d="M614 327 692 353 831 334V340L692 359 614 332Z"
            fill={color("#354D58", "#14262F")}
          />
          <g
            fill="none"
            stroke={color("#A4B0B5", "#536572")}
            strokeWidth="1"
            opacity="0.75"
          >
            <path d="M636 309 698 337 M648 299 709 328 M678 298 721 320 M761 307 803 330 M775 300 818 333" />
          </g>
          <path
            d="M748 298V272L761 269 772 274V302L760 306Z"
            fill={color("#788985", "#485A55")}
          />
          <path
            d="M746 271 760 267 775 272 761 276Z"
            fill={color("#405761", "#1C3037")}
          />

          <path
            d="M711 363 761 358V389L711 395Z M645 350 670 359V385L645 376Z"
            fill={bark}
          />
          <path
            d="M715 367 757 363V386L715 391Z M649 356 666 362V380L649 374Z"
            fill={window}
          />
          <path
            d="M736 364V389 M715 379 757 375 M657 359V377"
            fill="none"
            stroke={bark}
            strokeWidth="2.2"
          />
          <path
            d="M777 359 799 357V397L777 400Z"
            fill={color("#6C7C79", "#314943")}
          />
          <path d="M781 363 795 362V378L781 380Z" fill={window} />
          <path
            d="M795 385V388"
            stroke={color("#E7E6D9", "#D9CEAD")}
            strokeWidth="2"
          />
          <path
            d="M708 397 762 391 799 437 730 443Z M645 378 669 386 655 415 615 404Z"
            fill="#D9CDA9"
            opacity={lights * 0.16}
          />
          <path
            d="M769 404 809 400 818 406 775 412Z M775 412 818 406V411L775 417Z"
            fill={color("#86958C", "#3E544C")}
          />

          {/* Roadside posts and low, contour-following meadow detail. */}
          <g stroke={bark} strokeWidth="2" fill="none">
            <path d="M519 333V324 M460 350V340 M397 371V359 M377 431V416 M491 508V488" />
          </g>
          <g stroke={color("#E5E6DB", "#AAB8AB")} strokeWidth="2">
            <path d="M519 324V327 M460 340V344 M397 359V363 M377 416V422 M491 488V494" />
          </g>
          <g
            fill="none"
            stroke={color("#778D80", "#496157")}
            strokeWidth="1.4"
            strokeLinecap="round"
          >
            <path d="M96 407Q144 396 188 404 M183 432 217 426 M524 401Q553 390 582 398 M537 477Q586 460 631 468 M734 471Q786 452 836 460 M57 491 87 484 M151 527 194 518 M599 527Q645 510 693 519" />
            <path d="M248 388 245 380 M248 388 252 382 M556 432 552 423 M556 432 559 426 M819 430 816 420 M819 430 824 424" />
          </g>
          <Pine
            x={89}
            y={424}
            scale={0.95}
            fill={forest}
            light={forestLight}
            trunk={bark}
          />
          <Pine
            x={149}
            y={399}
            scale={0.73}
            fill={forest}
            light={forestLight}
            trunk={bark}
          />
          <Pine
            x={860}
            y={411}
            scale={1.03}
            fill={forest}
            light={forestLight}
            trunk={bark}
          />
          <Pine
            x={902}
            y={434}
            scale={0.82}
            fill={forest}
            light={forestLight}
            trunk={bark}
          />
        </g>

        {/* The nearest bank moves further than the cabin and mountain layers. */}
        <g transform={`translate(${-p * 29} 0)`}>
          <path
            d="M-80 539C45 479 142 506 242 562H-80Z M535 580C643 497 755 497 992 471V580Z"
            fill={color("#71877B", "#1E3532")}
          />
          <path
            d="M572 558C672 518 752 528 856 504"
            fill="none"
            stroke={color("#98A798", "#3B5348")}
            strokeWidth="2"
          />
          <Pine
            x={14}
            y={546}
            scale={1.77}
            fill={color("#3F5A58", "#112A2C")}
            light={forest}
            trunk={bark}
          />
          <Pine
            x={946}
            y={565}
            scale={1.95}
            fill={color("#3F5A58", "#112A2C")}
            light={forest}
            trunk={bark}
          />

          {/* A small unmanned delivery canister, intentionally not a character. */}
          <g transform="translate(702 491)">
            <path
              d="M-20 9 1 3 29 8 10 14Z"
              fill={color("#526B61", "#172E2B")}
            />
            <path
              d="M-14-46H14V0C14 9-14 9-14 0Z"
              fill={color("#708090", "#415563")}
            />
            <path
              d="M-14-46H-6V0C-6 4-3 6 1 7-7 8-14 5-14 0Z"
              fill={color("#536A79", "#293F4B")}
            />
            <ellipse
              cy="-46"
              rx="14"
              ry="5.5"
              fill={color("#CED5D4", "#8B9B9C")}
            />
            <ellipse
              cy="-46"
              rx="8"
              ry="2.2"
              fill={color("#879AA3", "#536B73")}
            />
            <path
              d="M-13-12Q0-7 13-12 M-13-39Q0-34 13-39"
              stroke={color("#D4DAD6", "#8A9C9D")}
              strokeWidth="1.3"
              fill="none"
            />
            <path d="M-3-28H5V-20H-3Z" fill={color("#DADFD8", "#ADBDB4")} />
          </g>
          <g fill={color("#5D7468", "#304A3D")}>
            <path d="M639 537 632 518 640 525 644 509 649 524 657 519 651 537Z M784 536 778 524 784 527 789 513 792 527 800 523 794 536Z" />
          </g>
          <path
            d="M111 510 124 499 146 503 153 515Z M804 496 816 488 831 491 837 500Z"
            fill={color("#A3ADA4", "#52645B")}
          />
        </g>
      </g>
    </svg>
  );
};

import React from "react";
import {
  AbsoluteFill,
  Easing,
  Img,
  Interactive,
  interpolate,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { COLORS } from "../../../theme";

// Screen-space anchors retain the approved headline / lowered photo balance.
// This episode explicitly uses a faceless, solid-canvas documentary treatment.
export const Canvas: React.FC<{
  dark?: boolean;
  children: React.ReactNode;
}> = ({ dark = false, children }) => (
  <AbsoluteFill
    style={{
      backgroundColor: dark ? COLORS.black : COLORS.offWhite,
      color: dark ? COLORS.white : COLORS.black,
    }}
  >
    {children}
  </AbsoluteFill>
);

export const Headline: React.FC<{
  children: React.ReactNode;
  supporting: string;
  size?: number;
}> = ({ children, supporting, size = 78 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <div style={{ position: "absolute", left: 132, top: 330, width: 696 }}>
      <div style={{ overflow: "hidden", paddingBottom: 12 }}>
        <Interactive.Div
          name="Judul utama"
          data-mistral-headline
          style={{
            fontSize: size,
            fontWeight: 800,
            letterSpacing: "-0.045em",
            lineHeight: 1.04,
            translate: interpolate(
              frame,
              [0, 0.4 * fps],
              ["0px 38px", "0px 0px"],
              {
                easing: Easing.bezier(0.16, 1, 0.3, 1),
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              },
            ),
          }}
        >
          {children}
        </Interactive.Div>
      </div>
      <Interactive.Div
        name="Keterangan judul"
        data-mistral-focus
        style={{
          marginTop: 24,
          fontSize: 24,
          fontWeight: 700,
          lineHeight: 1.4,
          letterSpacing: "0.015em",
          opacity: interpolate(frame, [0.12 * fps, 0.45 * fps], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      >
        {supporting}
      </Interactive.Div>
    </div>
  );
};

export const Credit: React.FC<{
  url: string;
  photo?: boolean;
  dark?: boolean;
  top?: number;
  detail?: string;
}> = ({ url, photo, dark, top = 682, detail }) => (
  <div
    data-mistral-source
    data-source-url={url}
    style={{
      position: "absolute",
      left: 132,
      top,
      width: 696,
      fontSize: 16,
      lineHeight: 1.25,
      fontWeight: 500,
      color: dark ? COLORS.offWhite : COLORS.gray,
      overflowWrap: "anywhere",
    }}
  >
    <strong>{photo ? "Sumber foto: " : "Sumber: "}</strong>
    {url.replace(/^https:\/\//, "").replace(/\/$/, "")}
    {detail ? <div>{detail}</div> : null}
  </div>
);

export const Photo: React.FC<{
  src: string;
  alt: string;
  height?: number;
  position?: string;
}> = ({ src, alt, height = 400, position = "50% 50%" }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <div
      data-mistral-photo
      style={{
        height,
        overflow: "hidden",
        borderRadius: 24,
        border: "6px solid #FFFFFF",
        boxSizing: "border-box",
        backgroundColor: COLORS.slate,
      }}
    >
      <Img
        name="Foto dokumenter — ilustrasi"
        alt={alt}
        src={staticFile(src)}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: position,
          scale: interpolate(frame, [0, 8 * fps], [1.015, 1.055], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      />
    </div>
  );
};

export const Panel: React.FC<{
  children: React.ReactNode;
  dark?: boolean;
  style?: React.CSSProperties;
}> = ({ children, dark, style }) => (
  <div
    style={{
      boxSizing: "border-box",
      padding: 28,
      backgroundColor: dark ? COLORS.black : COLORS.white,
      border: `1px solid ${dark ? COLORS.slate : "#70809055"}`,
      borderRadius: 24,
      ...style,
    }}
  >
    {children}
  </div>
);

export const ChoiceCard: React.FC<{
  title: string;
  detail: string;
  kind: "api" | "server" | "license";
  dark?: boolean;
}> = ({ title, detail, kind, dark }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <Panel dark={dark} style={{ flex: 1, minWidth: 0, height: 250 }}>
      <div
        data-mistral-choice
        style={{
          translate: interpolate(
            frame,
            [0, 0.5 * fps],
            ["0px 8px", "0px 0px"],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            },
          ),
        }}
      >
        <svg
          width="58"
          height="58"
          viewBox="0 0 58 58"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          {kind === "api" ? (
            <>
              <rect x="7" y="10" width="44" height="30" rx="5" />
              <path d="M18 49h22M29 40v9M21 20l-6 5 6 5M37 20l6 5-6 5" />
            </>
          ) : kind === "server" ? (
            <>
              <rect x="9" y="5" width="40" height="48" rx="5" />
              <path d="M9 21h40M9 37h40M18 13h3M18 29h3M18 45h3M30 13h11M30 29h11M30 45h11" />
            </>
          ) : (
            <>
              <path d="M14 5h23l10 11v37H14zM37 5v13h10M21 28h19M21 36h19M21 44h11" />
            </>
          )}
        </svg>
        <Interactive.Div
          name="Pilihan editorial"
          data-mistral-focus
          style={{
            marginTop: 20,
            fontSize: 27,
            fontWeight: 800,
            letterSpacing: "-0.04em",
            lineHeight: 1.15,
          }}
        >
          {title}
        </Interactive.Div>
        <div
          data-mistral-focus
          style={{
            marginTop: 12,
            fontSize: 21,
            lineHeight: 1.4,
            fontWeight: 500,
          }}
        >
          {detail}
        </div>
      </div>
    </Panel>
  );
};

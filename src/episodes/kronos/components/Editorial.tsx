import React from "react";
import {
  AbsoluteFill,
  Easing,
  Interactive,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

// Preserve the documentary's screen-space hierarchy without content cards.
// No image/background textures; all canvases are native solid colors.
export const Canvas: React.FC<{
  dark?: boolean;
  children: React.ReactNode;
}> = ({ dark = false, children }) => (
  <AbsoluteFill
    style={{
      backgroundColor: dark ? "#000000" : "#FAF9F6",
      color: dark ? "#FFFFFF" : "#000000",
    }}
  >
    {children}
  </AbsoluteFill>
);

export const Headline: React.FC<{
  children: React.ReactNode;
  supporting: string;
  size?: number;
}> = ({ children, supporting, size = 76 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <div
      data-kronos-heading-group
      style={{ position: "absolute", left: 84, top: 240, width: 912 }}
    >
      <div style={{ overflow: "hidden", paddingBottom: 10 }}>
        <Interactive.Div
          name="Judul dokumenter"
          data-kronos-headline
          data-kronos-focus
          style={{
            fontSize: size,
            fontWeight: 800,
            letterSpacing: "-0.045em",
            lineHeight: 1.05,
            translate: interpolate(
              frame,
              [0, 0.35 * fps],
              ["0px 45px", "0px 0px"],
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
        data-kronos-focus
        style={{
          marginTop: 32,
          fontSize: 30,
          fontWeight: 700,
          lineHeight: 1.4,
          letterSpacing: "0.015em",
          opacity: interpolate(frame, [0.1 * fps, 0.4 * fps], [0, 1], {
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

export const Source: React.FC<{
  url: string;
  dark?: boolean;
  secondaryUrl?: string;
}> = ({ url, dark, secondaryUrl }) => (
  <div
    data-kronos-focus
    data-source-url={url}
    style={{
      position: "absolute",
      left: 132,
      top: secondaryUrl ? 696 : 716,
      width: 696,
      fontSize: 16,
      lineHeight: 1.25,
      fontWeight: 500,
      color: dark ? "#FAF9F6" : "#555555",
      overflowWrap: "anywhere",
    }}
  >
    <strong>Sumber: </strong>
    {url.replace(/^https:\/\//, "").replace(/\/$/, "")}
    {secondaryUrl ? (
      <div data-source-url={secondaryUrl}>
        {secondaryUrl.replace(/^https:\/\//, "").replace(/\/$/, "")}
      </div>
    ) : null}
  </div>
);

export const ContentStage: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <div
      data-kronos-content
      style={{
        position: "absolute",
        left: 84,
        top: 720,
        width: 912,
        height: 660,
        boxSizing: "border-box",
        opacity: interpolate(frame, [0, 0.25 * fps], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        }),
        translate: interpolate(frame, [0, 0.4 * fps], ["0px 14px", "0px 0px"], {
          easing: Easing.bezier(0.16, 1, 0.3, 1),
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        }),
      }}
    >
      <div
        data-kronos-content-artwork
        style={{
          position: "relative",
          width: 636,
          height: 400,
          transformOrigin: "top left",
          scale: 912 / 636,
        }}
      >
        {children}
      </div>
    </div>
  );
};

export const SmallLabel: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <div
    data-kronos-focus
    style={{
      fontSize: 17,
      fontWeight: 700,
      letterSpacing: "0.025em",
      lineHeight: 1.4,
    }}
  >
    {children}
  </div>
);

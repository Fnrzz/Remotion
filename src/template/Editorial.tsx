import React from "react";
import {
  AbsoluteFill,
  Easing,
  Interactive,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { FONT_FAMILY } from "../fonts";

// Shared by scenes and independent overlays. Apply this fit only once per layer.
export const DesignSpace: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { width, height } = useVideoConfig();
  const fit = Math.min(width / 1080, height / 1920);
  return (
    <div
      data-template-design
      style={{
        position: "absolute",
        left: (width - 1080 * fit) / 2,
        top: (height - 1920 * fit) / 2,
        width: 1080,
        height: 1920,
        transformOrigin: "top left",
        scale: fit,
        fontFamily: FONT_FAMILY,
      }}
    >
      {children}
    </div>
  );
};

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
    <DesignSpace>{children}</DesignSpace>
  </AbsoluteFill>
);

export const Headline: React.FC<{
  children: React.ReactNode;
  supporting: string;
  /** Approved headline range: 88–112 design pixels. */
  size?: number;
}> = ({ children, supporting, size = 100 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <div
      data-template-heading-group
      style={{ position: "absolute", left: 84, top: 240, width: 912 }}
    >
      <div style={{ overflow: "hidden", paddingBottom: 10 }}>
        <Interactive.Div
          name="Judul berita"
          data-template-headline
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

export const ContentStage: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  return (
    <Interactive.Div
      name="Konten editorial"
      data-template-content
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
        data-template-content-artwork
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
    </Interactive.Div>
  );
};

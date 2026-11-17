export const WIDTH = 1080;
export const HEIGHT = 1920;
export const FPS = 30;

export const COLORS = {
  black: "#000000",
  offWhite: "#FAF9F6",
  white: "#FFFFFF",
  slate: "#708090",
  gray: "#555555",
} as const;

export const SAFE = {
  x: 72,
  top: 172,
  contentBottom: 1400,
  subtitleBottom: 238,
} as const;

export const TYPOGRAPHY = {
  display: {
    fontWeight: 800,
    letterSpacing: "-0.045em",
    lineHeight: 0.96,
  },
  headline: {
    fontWeight: 800,
    letterSpacing: "-0.04em",
    lineHeight: 1,
  },
  body: {
    fontWeight: 500,
    letterSpacing: "-0.015em",
    lineHeight: 1.45,
  },
  label: {
    fontWeight: 600,
    letterSpacing: "0.13em",
    lineHeight: 1.2,
  },
} as const;

export const EASE = {
  standard: [0.22, 1, 0.36, 1] as const,
};

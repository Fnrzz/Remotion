import { Easing } from "remotion";

export const OMNI = {
  audioSeconds: 48.666063,
  colors: {
    black: "#000000",
    paper: "#FAF9F6",
    white: "#FFFFFF",
    slate: "#708090",
    gray: "#555555",
  },
  scenes: {
    reveal: 3.88,
    extension: 7.92,
    edit: 14.16,
    consistency: 24.72,
    pricing: 30.12,
    closing: 37.12,
    cta: 42.8,
  },
  price: { previous: 0.1, current: 0.07, reduction: 0.3 },
  layout: { left: 84, width: 912, bodyBottom: 1380 },
} as const;

export const smooth = {
  extrapolateLeft: "clamp",
  extrapolateRight: "clamp",
  easing: Easing.bezier(0.22, 1, 0.36, 1),
} as const;

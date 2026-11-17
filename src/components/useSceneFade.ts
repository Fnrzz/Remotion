import { interpolate, useCurrentFrame } from "remotion";

export const useSceneFade = (
  durationInFrames: number,
  fadeIn = 4,
  fadeOut = 0,
) => {
  const frame = useCurrentFrame();

  const inOpacity =
    fadeIn <= 0
      ? 1
      : interpolate(frame, [0, fadeIn], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        });

  const outOpacity =
    fadeOut <= 0
      ? 1
      : interpolate(
          frame,
          [durationInFrames - fadeOut, durationInFrames - 1],
          [1, 0],
          {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          },
        );

  return Math.min(inOpacity, outOpacity);
};

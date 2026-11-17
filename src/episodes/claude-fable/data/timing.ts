import { Easing, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import manifest from "./timing.json";

export const FABLE_AUDIO_SECONDS = manifest.audio.durationSeconds;
export const FABLE_SCENES = manifest.scenes;
export const FABLE_CUES = Object.fromEntries(
  manifest.cues.map((cue) => [cue.id, cue.seconds]),
);

// Scene-local frames -> original, untrimmed narration seconds.
// Anchors live in timing.json, not an evenly divided scene grid.
export const useNarrationClock = (scene: string) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const boundary = FABLE_SCENES.find((item) => item.id === scene);
  if (!boundary) throw new Error(`Unknown Fable scene: ${scene}`);
  const seconds = (frame + Math.round(boundary.startSeconds * fps)) / fps;
  const progress = (start: number, end: number) =>
    interpolate(seconds, [start, end], [0, 1], {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.bezier(0.4, 0, 0.2, 1),
    });
  return { frame, fps, seconds, progress };
};

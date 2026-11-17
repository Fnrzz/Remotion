import type { CharacterGesture } from "../data/character";

type CharacterMotionInput = {
  elapsed: number;
  remaining: number;
  time: number;
  gesture: CharacterGesture;
  level: number;
  accent: number;
};

// Seconds-based, deterministic bust performance. No face warping or fake lip-sync.
export const getCharacterMotion = ({
  elapsed,
  remaining,
  time,
  gesture,
  level,
  accent,
}: CharacterMotionInput) => {
  const t = Math.max(0, elapsed);
  const release = Math.max(0, Math.min(1, remaining / 0.16));
  const hold = (1 - Math.exp(-t * 9)) * release;
  const pulse = Math.sin(Math.min(t / 0.55, 1) * Math.PI) * release;
  const nod =
    Math.sin(Math.min(t / 0.6, 1) * Math.PI * 2) * Math.exp(-t * 4) * release;
  const shake =
    Math.sin(Math.min(t / 0.65, 1) * Math.PI * 4) * Math.exp(-t * 4) * release;
  let x = 0;
  let y = 0;
  let rotation = 0;
  let zoom = 0;

  switch (gesture) {
    case "nod":
      y = -8 * nod;
      rotation = 0.65 * nod;
      break;
    case "shake":
      rotation = 1.6 * shake;
      x = 2 * shake;
      break;
    case "lean":
      x = -6 * hold;
      y = -3 * hold;
      rotation = -1.1 * hold;
      zoom = 0.014 * hold;
      break;
    case "pop":
      y = -10 * pulse;
      rotation = -0.65 * pulse;
      zoom = 0.035 * pulse;
      break;
    case "think":
      x = -2 * hold;
      y = -2 * hold;
      rotation = -1.3 * hold;
      break;
    case "glance":
      x = -6 * hold;
      rotation = -0.6 * hold;
      break;
    case "settle":
      y = 3 * pulse;
      rotation = 0.5 * pulse;
      break;
  }

  return {
    x,
    y: y - level * 1.5 - accent * 2.5 + Math.sin(time * Math.PI * 1.1) * 0.7,
    rotation: rotation + accent * 0.18,
    scale: 1 + zoom + level * 0.0025 + accent * 0.003,
  };
};

// Semantic phrase boundaries from the supplied, unmodified ElevenLabs MP3.
// The JSON transcript and audio metadata are retained in .preview/episode003.
export const AUDIO_DURATION = 42.266063;
export const CUES = {
  reveal: 4.5,
  workflow: 11.18,
  cyber: 18.5,
  access: 25.9,
  closing: 34.06,
} as const;

// Absolute VO time in seconds; diagram components compensate for Sequence starts.
// These are editorial illustrations, never simulated Google product controls.
export const EXPLANATION_MOTION = {
  workflow: {
    bug: 11.55,
    firstLink: 15.45,
    analysis: 16.18,
    secondLink: 16.7,
    patch: 17.27,
  },
  cyber: {
    scan: 20.05,
    shield: 21.2,
    detected: 23.34,
    repair: 25.07,
  },
} as const;

export const SOURCE_URL =
  "https://blog.google/innovation-and-ai/models-and-research/gemini-models/introducing-gemini-4-carbon/";

export const BRAND = {
  black: "#000000",
  paper: "#FAF9F6",
  white: "#FFFFFF",
  slate: "#708090",
  gray: "#555555",
};

// Episode 008 intentionally uses the user's requested card/safe-area revision.
// Historical full-canvas episodes and shared overlay geometry remain untouched.
export const LAYOUT = { left: 110, width: 740, headlineTop: 250, bodyTop: 700 };

export const FEATURES = [
  { label: "GIF", title: "BISA GIF" },
  { label: "MARKUP", title: "EDIT PRESISI" },
  { label: "SVG", title: "EKSPOR SVG" },
] as const;

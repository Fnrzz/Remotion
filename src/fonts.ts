import {
  cancelRender,
  continueRender,
  delayRender,
  staticFile,
} from "remotion";

export const FONT_FAMILY = "Plus Jakarta Sans";

// Exact normal variable faces from @remotion/google-fonts PlusJakartaSans v12.
// Keep the original subset order and Unicode coverage when registering them.
const FONT_FACES = [
  {
    file: "assets/fonts/plus-jakarta-sans-v12-normal-latin.woff2",
    unicodeRange:
      "U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD",
  },
  {
    file: "assets/fonts/plus-jakarta-sans-v12-normal-latin-ext.woff2",
    unicodeRange:
      "U+0100-02BA, U+02BD-02C5, U+02C7-02CC, U+02CE-02D7, U+02DD-02FF, U+0304, U+0308, U+0329, U+1D00-1DBF, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C4, U+2113, U+2C60-2C7F, U+A720-A7FF",
  },
];

if (typeof document !== "undefined") {
  const handle = delayRender("Loading local Plus Jakarta Sans fonts");

  const loadFonts = async () => {
    const fonts = await Promise.all(
      FONT_FACES.map(async ({ file, unicodeRange }) => {
        const font = new FontFace(
          FONT_FAMILY,
          `url("${staticFile(file)}") format("woff2")`,
          { style: "normal", weight: "200 800", unicodeRange },
        );
        await font.load();
        return font;
      }),
    );

    for (const font of fonts) {
      document.fonts.add(font);
    }
  };

  loadFonts()
    .then(() => continueRender(handle))
    .catch(cancelRender);
}

# KimiComparison007 — comparison logos

Retrieved and verified: **2026-11-06**.

These identify the Kimi and Claude **brands**, not individual model versions.
They are static vector paths, not invented model-specific emblems.

## Kimi: `kimi-logo.svg`

- Source repository: https://github.com/lobehub/lobe-icons
- Pinned asset: https://raw.githubusercontent.com/lobehub/lobe-icons/6235fb361a38d289dfe98007be9e2a3f6644ddca/packages/static-svg/icons/kimi.svg
- Source SVG SHA-256: `ed08131b46acf70e6e2144eceb775e74098b58ea65fa21eaee04be7b05cfe63b`.
- Vendor identity reference: https://www.kimi.com/
- Official app icon, linked by that page and visually inspected: https://www.kimi.com/pwa-192.png (192 × 192 PNG; white K, blue dot, black background).
- The official page advertised ICO/PNG icons, not an SVG. https://www.kimi.com/favicon.svg returned the app's HTML, not an SVG, and was rejected. The trusted icon repository's monochrome K-and-dot mark is used instead of recoloring/tracing the official raster.

## Claude: `claude-logo.svg`

- Source repository: https://github.com/lobehub/lobe-icons
- Pinned asset: https://raw.githubusercontent.com/lobehub/lobe-icons/f25f22c0e7295a76077fe417d23deeb56eefdf3e/packages/static-svg/icons/claude.svg
- Source SVG SHA-256: `365a70a7eb3956d9b9a96086058ebe04e1dbd8e291a756ad964e8a283fbd6d38`.
- Vendor websites attempted: https://claude.ai/ and https://www.anthropic.com/ (HTTP 403 in this environment).
- Uses the repository's standard Claude asterisk/sunburst brand mark, not an Anthropic wordmark or a model-version emblem. Official-site asset verification was unavailable; this is explicitly a third-party icon-repository source.

## Local preparation and verification

Both source responses were nonempty `image/svg+xml`, parsed as SVG XML, and contained actual path geometry. Local files retain the source path data and `viewBox="0 0 24 24"` unchanged. Only presentation attributes were adjusted: `currentColor` to explicit `#000000`, `1em` dimensions to intrinsic **24 × 24**, and removal of the flex/line-height style. Both have transparent backgrounds and a square viewport; preserve their aspect ratio when scaling. No scripts, embedded fonts, external images, or runtime network dependencies are required.

The existing `chatgpt-openai-blossom.svg` is reused unchanged; see `chatgpt-openai-SOURCES.md` for its existing provenance. No new OpenAI asset was created.

## License and trademarks

LobeHub's repository license: https://raw.githubusercontent.com/lobehub/lobe-icons/master/LICENSE (MIT, copyright 2023 LobeHub; retrieved 2026-11-06). License text follows. This covers the repository contribution; it does **not** grant trademark rights. Kimi/Moonshot AI and Claude/Anthropic names and logos remain the respective owners' marks. Use here is editorial brand identification in a comparison, without implying affiliation or endorsement. These are third-party vector reproductions, not vendor-certified brand-kit files.

```text
MIT License

Copyright (c) 2023 LobeHub

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
```

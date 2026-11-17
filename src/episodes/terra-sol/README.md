# AI News 002 — GPT-6.1 Terra vs Sol

## Preview and export

- Studio: `npm run dev -- --no-open`, then `http://localhost:3000/TerraVsSolNews`.
- Enable `showSafeArea` in Studio props to see a **schematic**, conservative TikTok UI guide. It is not an actual app screenshot; app UI can vary. Leave it `false` for export.
- Toggle `showTikTokOverlay` in the composition's **Default Props → Schema** for the downloaded Orson Lord PNG. Its top timeline layer, **Overlay TikTok — Orson Lord (preview saja)**, also has an opacity control. It starts enabled at 65% opacity and is automatically excluded from renders. Keep the older `showSafeArea` schematic off when using it. Source and controls: `public/assets/overlays/README.md`. Video layout is unchanged.
- Render: `npx remotion render TerraVsSolNews out/gpt-6-1-terra-vs-sol.mp4 --codec=h264 --audio-codec=aac --pixel-format=yuv420p --crf=18`.
- Validate code: `npm run lint`.

## Audio and synchronization

The supplied `public/assets/audio/voiceover-gpt-6.1-terra-vs-sol.mp3` is the only audio track. No replacement voice, music, sound effects, speed/pitch changes, trims, or audio fades are applied.

Measured source: **41.325688 seconds**, mono, 44.1kHz. `calculateMetadata` remeasures the actual file using `getAudioDurationInSeconds`, adds a 0.8-second reading/fade tail, and rounds upward to the next 30fps frame: **1264 frames / 42.133 seconds**. Narration is never faded or cut. Visual fade starts 0.4 seconds after audio ends.

The installed offline whisper.cpp small multilingual model transcribed this actual MP3. Original ASR segments/token offsets are in `.preview/episode002/narration.json`. `data/subtitles.json` corrects ASR spellings to the supplied transcript, uses 28 manually adjustable phrase cues, and retains spoken meaning. Numerals replace spelled-out figures for readability. These are ASR-derived phrase boundaries, **not a claim of human-verified phoneme-perfect alignment**. The final Whisper endpoint exceeded the media length and was capped at the measured audio endpoint. The last cue is held for reading after the audio.

`data/sceneTimings.ts` centralizes narration-based scene cuts and number reveals. Sol's score appears on “semua”; prices appear on the relevant spoken numbers. The short final comparison precedes the context section. Replacing the MP3 with materially different audio deliberately raises an error: re-transcribe and update cues rather than silently stretching timings.

## Editorial verification — 2026-10-31

Original sources retrieved and checked:

1. https://developers.openai.com/api/docs/models/gpt-6.1-terra
2. https://developers.openai.com/api/docs/models/gpt-6.1-sol
3. https://developers.openai.com/api/docs/pricing
4. https://plotly.com/blog/gpt-6-1-terra-plotly-data-analytics-bench/

API comparison: Standard text rates, **per 1 million tokens**, USD, **≤272K input tokens**. Terra input/output/cached input: $1/$5/$0.05. Sol: $2/$10/$0.10. Main price cards show labeled input/output rates. The source distinguishes long context, processing modes, cache writes and other charges; therefore the comparison is not a promise of double total billing. Prices are not ChatGPT subscription prices.

Plotly: 40/43 Terra versus 43/43 Sol, a difference of three in **one** named data-analysis evaluation. The exam questions are private and the wind-energy data synthetic. Terra ran through OpenRouter at default reasoning. Identical Sol settings are not independently established. No universal performance ranking, release date, unrelated Sonar Java score, or invented capability is used. Recheck sources before future publication because pricing may change.

## Assets and rights

| Asset                                                   | Source / creator                                                                | License / attribution                                                      |
| ------------------------------------------------------- | ------------------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| Narration MP3                                           | User-supplied ElevenLabs audio, existing local asset                            | User-supplied usage rights; no extra audio downloaded                      |
| Original Prof Deps expression PNGs                      | Existing `public/assets/images/charactersheet/`, user-provided original artwork | Reused without redesign; user retains rights; no external license asserted |
| Plus Jakarta Sans v12, Latin + Latin-ext variable WOFF2 | Google Fonts / Tokotype                                                         | SIL OFL 1.1; local license and exact URLs in `public/assets/fonts/`        |
| Cards, type, progress indicators, background            | Original React/CSS components                                                   | No stock images or footage used                                            |

No video, GIF, stock footage, music or SFX was downloaded. The model-introduction revision adds a local monochrome ChatGPT/OpenAI Blossom from OpenAI's official static brand SVG, with unchanged path geometry. Asset source, ownership and usage terms are recorded in `public/assets/branding/chatgpt-openai-SOURCES.md`. It is an editorial logo insert, not a background or claim of endorsement. All rendering assets are local through `staticFile()`. Localized fonts use the **same v12 font bytes** as the existing approved Google Fonts loader, keeping Genie4 typography unchanged while removing remote font requests.

## Structure and baseline

- `src/TerraVsSolNews.tsx`: metadata, seven authored scene sequences, persistent subtitle/source/branding layers.
- `scenes/`: hook, introduction, pricing, Terra/Sol benchmark, context, closing.
- `components/`: original comparison/price/benchmark primitives and preview-only UI guide.
- `data/`: editable subtitle JSON, narration cue seconds, verified editorial facts.
- Shared `Subtitles` and `CharacterOverlay` accept optional episode data; their old defaults remain unchanged.
- `Genie4News` and its editorial data are preserved. Headline stage, subtitle bottom Y1343, stationary mascot anchor and text-only @prof.deps watermark follow the approved reference.
- The mascot stays mounted across all seven scenes at the approved fixed anchor, with narration-timed expression changes and only the initial opacity fade. It never covers prices or scores.
- `data/character.ts` now directs 28 subtitle-aligned expression cues using nine original expressions. Hook reactions, neutral price explanations, matching confident expressions for both final benchmark scores, serious context, and a friendly closing follow each phrase. Timing is derived directly from `subtitles.json`; the current character position/size and user-adjusted overlays are untouched. No bobbing, zoom, shake, per-expression fade or remount is added.

Representative QA stills are saved in `.preview/episode002/`. Safe-area checks are conservative working checks, not a guarantee against all TikTok UI variants.

## Delivery checks

Preview revisions: Studio now includes the mascot in every scene, 28 subtitle-aligned expression cues, and a monochrome ChatGPT/OpenAI logo in the model introduction only. The export checks below refer to the previously delivered MP4; that file has not been re-exported for these preview revisions.

- `npm run lint`: passed.
- Export: `out/gpt-6-1-terra-vs-sol.mp4`, 3,406,030 bytes; H.264, 1080×1920, 30fps, 1264 frames, 42.133333s; AAC stereo 48kHz. Complete file decoded without errors.
- Inspected representative frames extracted from the **exported MP4**, including all scene families, both benchmark results, the comparison, three context statements, closing and final off-white fade. Contact sheet: `.preview/episode002/export-contact-sheet.jpg`.
- Price layout also rendered and inspected at 540×960; comparison inspected with the preview UI overlay.
- Automated Studio inspection of 83 frames before/at/after all 28 caption starts: same persistent subtitle DOM node, width 392, height 119.19, left X132, bottom Y1343, at most two lines, no horizontal text overflow. Results: `.preview/episode002/studio-qa.json`.
- Both exact local variable font subsets loaded. Zero remote composition font/media requests observed. Studio's separate `bugs.remotion.dev` advisory request is recorded as Studio diagnostics, not a video asset dependency.
- Decoded source/export waveform correlation at zero lag: 0.99997, including 0.99997 in the final half-second. Export peak −2.55dBFS; added tail is silent. This verifies no narration truncation, retiming or clipping introduced by export; AAC encoding/resampling is expected.

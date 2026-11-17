# Episode 008 — OpenAI Images 2.6

## Editorial sources

Checked 6 November 2026:

- https://openai.com/index/introducing-images-2-6/ — announced 4 November 2026; ChatGPT/Codex/API availability; OpenAI's 50%-faster claim; Flare as little as six seconds at low quality; Sunburst higher fidelity and edit consistency at medium/high quality; GIFs; API markup, SVG and complexity.
- https://developers.openai.com/api/docs/changelog — 4 November release entry confirms both API variants, animated GIF/SVG generation, adjustable complexity and markup-guided editing.
- https://help.openai.com/en/articles/11084440-images-in-chatgpt — GIF creation rolling out in ChatGPT; selection edits can extend beyond the selected region; actual generation can take minutes depending on complexity.

No subscription or API pricing claims. No universal latency promise. GIF generation is not described as full video generation. Complexity controls planning, not the image-quality setting.

## Assets and provenance

- Original supplied ElevenLabs file: `public/assets/audio/vo_openai images 2.6.mp3`. Played once at original speed, pitch and volume; no narration regenerated.
- Motion graphics: original React/SVG paper-flower concept, not OpenAI outputs, a benchmark, or a captured product UI. Concept illustrations are labeled on screen.
- Existing local Plus Jakarta Sans variable font files, loaded by `src/fonts.ts` with `delayRender()`.
- Existing Prof Deps expression sheets; fixed character anchors retained. No stock media or copied website visuals.

## Episode-specific design authorization

This brief explicitly requests cards and TikTok guides, overriding the cardless/full-canvas baseline **only for Episode 008**. Composition content is authored within x110..850. The subsequent requested revision places subtitles beside the character: x84..634, y1570..1705 (bottom215), with a 42px gap before the character at x676..996. This replaces the initial y1260..1400 subtitle placement. Optional editor guides remain off and refer to main content only. Character width320/right84/bottom180 and the watermark are unchanged. Forty narration-aligned expression cues (39 changes, previously 9) make the character more expressive without movement, resizing or scene-remount entrances. Shared baseline components and previous episodes are not changed.

## Preview / delivery

### Closing motion revision

Scene 06 now replaces the text-only body with original motion graphics. During the reality check, a moving inspection lens reviews the flower, then a cursor selects the pot and reveals the striped revision. The CTA presents three illustrated choices: a looping flower/GIF, a looping selection-and-edit example, and drawn SVG paths/control nodes. Labels are secondary, and the final 0.65 seconds hold cleanly on the finished artwork. Narration, scene cuts, headlines, subtitle placement and expression cues are unchanged. These remain labeled concept illustrations, not real model results or a promise of perfect edits.

Studio composition: `OpenAIImages008` at `http://localhost:3000/OpenAIImages008`.
Duration is read from the actual MP3 using `calculateMetadata`; audio changes trigger a resynchronization error rather than silently stretching captions.

Actual duration: **61.884063 seconds**, **1857 frames** at 30fps. Forty-four phrase cues use local Whisper token onsets. Foreign phrases in three subtitle cues are localized into Indonesian (pembuatan GIF, edit dengan markup, alur kerja desain); the original audio is untouched. Alignment is ASR-derived, not claimed as a human acoustic audit.

The audio places iterative editing before speed. The product-reveal chapter therefore includes the editing/workflow demonstration before moving to speed, variants and the new-capability recap. `complexity` is an on-screen supplementary API fact; the narrator does not say this parameter's name.

No MP4 export is performed by default. If requested: H.264 / AAC, 1080×1920, 30fps.

## Verification

- `npm run lint` passes (ESLint + TypeScript).
- `node scripts/openai-images-qa.mjs` checks 296 Studio frames, including before/at/after scene and subtitle boundaries: zero failures or browser runtime errors. Closing-specific checks verify illustration geometry changes, three graphical choices, the pot-edit reveal and the final still hold.
- Persistent subtitle identity, caption contents, two-line maximum, subtitle bottom215 anchor, clearance beside the character, 39 expression changes, local font/image readiness, text bounds and fixed character geometry are checked automatically.
- Studio screenshots at 1080×1920 and 540×960 are in `.preview/openai-images/studio/`. Hook, reveal, edit, workflow, speed, both variants, GIF, markup, SVG, reality check and CTA were visually reviewed.
- The two progress bars are a labeled conceptual illustration (no seconds, no benchmark result). Their animation uses an illustrative 3:2 duration ratio rather than claiming 50% less latency.
- No video has been encoded, so final MP4 playback/codec QA remains for the requested export step.

## Suggested Indonesian upload description

OpenAI memperkenalkan Images 2.6 pada 4 November 2026: klaim generasi 50% lebih cepat, dua pilihan model API, GIF, edit dengan markup, ekspor SVG, dan kontrol perencanaan. Waktu aktual dan hasil edit tetap bergantung pada permintaan. Animasi di video merupakan ilustrasi konsep, bukan hasil uji produk.

Referensi: tautan resmi di atas.

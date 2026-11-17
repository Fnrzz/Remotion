# Episode 003 — Gemini 4 Carbon

## Source and assets

- Official article, retrieved 2026-10-31: https://blog.google/innovation-and-ai/models-and-research/gemini-models/introducing-gemini-4-carbon/
- Announcement date: 2026-10-28. Long-running coding is an observation reported by Google's internal teams, not independent validation or a universal performance guarantee.
- Initial access: selected cyber defenders; wider access is planned in phases. No public availability date is asserted.
- Audio: user-supplied `public/assets/audio/vo-gemini4carbon.mp3`, 42.266063 seconds according to ffprobe. No generated voice, music, speed/pitch change, or trimming.
- Local Plus Jakarta Sans and the existing user-provided Prof Deps mascot are reused. Topic illustrations are original inline SVG and marked ILUSTRASI. The revised closing card uses the unmodified static Gemini wordmark, downloaded after verifying its PD-textlogo status; see `public/assets/branding/google-gemini-SOURCES.md`. No downloaded footage is used.

## Timing and preview

- Composition: `Gemini4CarbonNews`, 1080×1920, 30fps, 1268 frames (42.266667 seconds, rounded up to a complete frame).
- Studio: http://localhost:3000/Gemini4CarbonNews
- Scene boundaries: 4.50 / 11.18 / 18.50 / 25.90 / 34.06 seconds, rounded to frames. Four-frame crossfades retain the previous scene underneath, with no blank intervals.
- Last question remains visible through the last audio frame. No artificial end hold or fade that removes the question early.
- Timings are editable in `data/sceneTimings.ts`; text and its timed phrases are in `data/subtitles.json`.
- Original local Whisper analysis: `.preview/episode003/narration.json`. Transcription-only decoding to WAV does not replace the original MP3 in the composition. Corrected recognition errors include Gemini, bug, kodenya, pembela, Bayangin; written Indonesian uses siber.

## Layout preservation

The existing headline stage, lower supporting-card offset, fixed subtitle box, stationary mascot and @prof.deps watermark are reused. The latest repository includes an additional 48px overlay-only adjustment: it is preserved rather than silently restoring the older reference. Subtitles end at Y1391, below the hard Y1400 limit. Backgrounds are solid colors as explicitly requested for this episode. No existing episode or shared component is visually modified.

Closing-card revision: redundant question text inside the card is replaced by
the original Gemini wordmark and a separate `4 CARBON` model label. The headline,
card geometry, mascot, captions, VO and timing are unchanged. This is the Gemini
brand logo, not a claim that a separate official Carbon-specific logo exists.
The original logo colors are retained; all authored typography/canvas colors
continue to use the episode palette. This revision is preview-only until a new
export is explicitly requested; the earlier MP4 has not been overwritten.

Introduction-card revision: repeated model typography is replaced by a static
archive photo of the Google/DeepMind building entrance at 6 Pancras Square,
London. It is explicitly labeled 2017 and not documentation of the Carbon team.
Photo by Gciriani, CC BY-SA 4.0, verified before downloading; local asset and full
rights record are in `public/assets/images/gemini-carbon/`. Source/creator/license
appear as plain 16px text above the card. The original image proportions and file
are retained; no photo background, footage, or fake team/product demo is added.
Heading, outer card, subtitles, mascot, VO and scene timing remain unchanged.

## Documentary visual revision

The six existing scene nodes and their original frame boundaries are preserved.
Eight distinct licensed static photographs now support the hook, introduction,
coding workflow, cyber illustration and closing. New reusable photo-window and
source-overlay components live beside the existing editorial primitives. All
prior SVG components/assets remain available; the animated workflow returns for
the final coding phrase. No package/configuration/reference-episode changes.

Photo motion is limited to bounded 1.00–1.05 image scale, short local reveals and
an incoming cross-dissolve. Sources are plain independent 16px text above the
original card; Google internal-performance caveats and ILUSTRASI labels remain.
The access scene now uses a clear two-stage editorial status summary, not a fake
official document. The original Gemini wordmark is retained above closing photos.

Rights manifest: `public/assets/documentary/manifest.json`; rationale and Google
screenshot limitation: `public/assets/documentary/EDITORIAL-DECISIONS.md`.
Eight used photos are documented; the additionally researched CC BY-SA 3.0
San Francisco photo is not used. No footage/GIF/video was downloaded. No official
blog screenshot or artwork is reproduced without an established permission basis.

QA: narration, subtitle JSON, scene timing data and shared typography/mascot/
subtitle/registration files are checksum-verified unchanged. Studio checks inspect
36 documentary/transition samples and all 135 existing caption-boundary samples;
no loading, source collision, fixed-overlay or safe-area failures, and no remote
render-time media. Subtitle bottom remains Y1391 (the existing 48px user offset).
Preview checked at 540×960 and 1080×1920. Parallel sparse-frame screenshots showed
transient compositor tearing; isolated and concurrency=1 preview checks are clean,
so the documentary MP4 is rendered sequentially and checked after encoding.

New delivery target: `out/episode-003-gemini-4-carbon-documentary.mp4`, H.264/AAC,
1080×1920, 30fps, 1268 frames. The previous MP4 is preserved. Export QA and credits
are stored separately under `.preview/documentary/` and the delivery `-CREDITS.txt`.

That documentary export completed successfully: full decode and no-blank-frame
checks passed, nine reference-frame SSIM checks passed, and original-VO waveform
correlations exceeded 0.99995 in all five sampled windows.

Subsequent scene-01-only revision: the hook photograph is replaced with an
original React/SVG laptop illustration. Its screen shows a clearly labeled
conceptual Gemini 4 Carbon agent workflow (understand task, analyze code, prepare
repair), not a real product UI, recording, or measured execution. Laptop and
step motion are frame-driven; the hook's native black background, headline,
outer card, timing, VO, captions, mascot and all other scenes are unchanged.
The no-longer-displayed hook photo credit is replaced by original-visual credit;
the same licensed photograph remains in the closing. This latest laptop revision
is Studio-only and is NOT included in the completed documentary MP4 above.

Latest scene-01 cleanup, explicitly requested: removed its outer editorial card,
all visible illustration/disclaimer/source labels (including the small Google
attribution), and original-visual source line. The standalone laptop retains its
settled screen position and frame-driven task/check/progress animation directly
on the black scene. Its authored drawing is still conceptual, not a captured or
verified Google interface; this provenance stays documented here rather than
printed in the scene. Other scene source labels remain intact. Preview-only;
the existing documentary MP4 has not been overwritten.

Scene-02 text cleanup: removed its upper Google article-source line, the in-card
“SUMBER: GOOGLE · 28 OKT 2026” line, and the “FOTO ARSIP · LONDON, 2017” caption.
The required office-photo creator/source/license/change credit above the card
remains; archival provenance stays in the asset rights records. Article-source
lines in later scenes, photos, scene timing, narration and captions are unchanged.
This cleanup remains Studio-only until another export is requested.

Latest scenes 03–04 motion revision: their documentary photo sequences are
replaced by the original `AgentCodeMotion` component. A scanning highlight and
magnifier inspect illustrative pseudocode, pause on a bug/input-validation issue,
then type the repaired line and draw a completion check. Scene 03 corrects an
overwritten running total; scene 04 adds conceptual input validation. The scene-
local animation derives existing VO cues from `EXPLANATION_MOTION`, compensating
for original rounded scene starts. No live test, test count, timing benchmark,
real security incident or official Gemini interface is claimed. ILUSTRASI and
the internal-Google / non-guarantee caveats remain visible.

Scene 03's source overlay is removed as requested. Removed photos are no longer
credited in either motion scene; scene 04 retains only its Google article source.
The previous exported photo helper components and all licensed files are retained
for reuse. Other scenes, VO, subtitles, scene order and timing are unchanged.
This new motion revision is Studio-only; the existing MP4 predates it.

Latest refinement:

- Scene 01 laptop is fully visible at frame 0, with no opacity/translation entry.
  Only its internal agent steps and progress remain animated.
- Scene 05 has no main card, source overlay, in-content source heading or dated
  attribution footer. Original status rows and rollout caveat now sit directly
  on the native black scene; the headline, message and cut times are unchanged.
- Scene 06 retains the original Gemini wordmark and question headline. Its photo
  pair is replaced by `AiEvolutionMotion`: a growing conceptual AI network,
  drawn developer branch, open question mark, and a second supervision/eye branch.
  Branch timing follows the existing question VO (about local 2.72s and 5.94s),
  without claiming a benchmark trend or choosing an answer. Both remain visible
  through the final frame. No photo credits are shown for removed closing photos.
- QA uses a nonvisual global-frame DOM marker on the existing overlay layer to
  wait for React seeks; this does not affect visible content or caption identity.

The latest refinements remain preview-only. No revised MP4 export was requested.

Latest branding placement: scene 02 keeps the GOOGLE heading and replaces the
Gemini text beneath it with the existing unmodified local Gemini wordmark, plus
a separate editorial “4 CARBON” line (not an invented official Carbon lockup).
The office photograph, source credit and supporting text are unchanged. Closing
logo/model label and outer card are removed; its existing AI evolution/question
motion now appears directly on the off-white background, preserving its settled
diagram geometry and VO-synchronized timing. The closing headline, subtitles,
maskot and watermark remain unchanged. Preview only; MP4 still predates this.

Explanation-motion revision: the existing workflow and cyber SVGs now have
staggered internal reveals, active-step emphasis, drawn connectors, a one-pass
code highlight, and narration-timed repair checks. All are deterministic and
frame-driven, with absolute VO cue times configurable in `EXPLANATION_MOTION`
in `data/sceneTimings.ts`. No looped shaking, particles, neon, product UI, or
mascot/subtitle motion is added. ILUSTRASI and the vendor-claim caveat remain
visible. Outer card geometry, headlines, source text, audio and scene cuts are
unchanged. This motion revision has not been exported to the earlier MP4.

## Delivery

`npx remotion render Gemini4CarbonNews out/episode-003-gemini-4-carbon.mp4 --codec=h264 --audio-codec=aac --crf=18 --pixel-format=yuv420p`

The shared `TikTokSafeAreaOverlay` is enabled by default in Studio through
`showTikTokOverlay`, using exactly the same PNG and opacity as Genie4News and
TerraVsSolNews. Its environment guard always omits it from renders, regardless
of the Studio toggle. The older schematic is no longer used.

### Verified export

- MP4 created at the path above; 1268 video frames, H.264 1080×1920 at 30fps, AAC 48kHz stereo. The JPEG-backed video is signaled as full-range 8-bit 4:2:0 (`yuvj420p`).
- Video duration is 42.266667 seconds; container duration is 42.283 seconds including normal AAC packet padding.
- Audio waveform correlation against the original exceeds 0.99995 in all five inspected windows (beginning through final narration), with no timing drift.
- Studio QA: 135 inspected frames, stable subtitle DOM identity, no empty cues, maximum two lines, subtitle bottom Y1391, fonts loaded locally, no remote media requests.
- Export contact sheet, including final frame 1267, confirms no safe-area guide burned into the output and the final question remains visible. No blank black frames detected across the delivered video.
- `npm run lint` passes. Machine-readable reports are `.preview/episode003/studio-qa.json` and `delivery-qa.json`.

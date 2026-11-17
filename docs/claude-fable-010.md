# Prof Deps · Claude Fable 5.2 · 010

## Original recording

- Exact supplied expression: `staticFile("assets/audio/vo_test claude fable 5.2.mp3")`.
- File verified readable: `public/assets/audio/vo_test claude fable 5.2.mp3`.
- MP3, mono, 44,100 Hz. ffprobe duration: **49.789375 seconds**.
- SHA-256: `5f5b62dbf3fb4bdeeabf3a4648920dfd2c2837ff286ba81b356925a2d64e4294`.
- Already inside `public/`; no relocation, duplicate narration, overwrite, trim,
  time-stretch, pitch shift, volume processing or replacement is necessary.
- `.preview/claude-fable/analysis.wav` is a local 16kHz analysis derivative only;
  the composition plays the original supplied MP3, not this derivative.
- 30fps duration ceiling: **1494 frames / 49.8 seconds**. Keep the closing shot
  through the final frame. No arbitrary 50/60-second duration.

## Source and editorial qualification

Official source, fetched and reviewed on 10 November 2026:
https://www.anthropic.com/claude-fable-and-mythos-5-2

Published 9 November 2026. The Coding section explicitly describes one engineer
assigning a prototype OS project, an empty folder, over 1,000 subagents, eight days
of writing/testing/review, and a laptop boot. Its reported components are the
core, disk/keyboard/network drivers, permanent file storage, windows, a login
screen, an installer and built-in Claude functionality.

These are **Anthropic's reported experimental results**, not Prof Deps testing.
The production does not assert a commercial release, Windows/macOS replacement,
perfect task success, absence of human involvement or universal reliability.
Every OS depiction is a **prototype** and carries **ILUSTRASI KONSEPTUAL**.

## Illustration provenance and layout

All folders, geometric agents, packet paths, workstreams, architecture, timeline,
laptop hardware, login and desktop are original React/SVG editorial constructions.
No stock footage, downloaded demonstrations, GIFs, authentic-looking fabricated
screenshots, benchmarks, fake terminal logs or PASS results are used.

The six workstreams are explanatory editorial categories, **not verified actual
subagent assignments**. The eight-day module assembly is editorial progression,
**not evidence of completion milestones on specific days**. The fictional boot
sequence is not a reproduction of Anthropic's actual interface or footage.
Representative nodes stand for scale; they are not a 1,000-node execution trace.

Retains the approved Kronos full-canvas/cardless baseline, local Plus Jakarta Sans,
black hook/off-white body, x84..996 editorial margins, top240 headlines and top720
diagram stage. Shared overlays retain character bottom180, subtitle bottom215 and
the text-only `@prof.deps` watermark. No safe-zone layer, content cards, source
furniture or replacement platform fitting is added. Existing episodes and project
configuration are preserved. Character expression cuts do not animate its pose.

## Timing and captions

Machine-readable manifest: `src/episodes/claude-fable/data/timing.json`.
Subtitles: `src/episodes/claude-fable/data/subtitles.json` (`Caption[]`).

The complete approved transcript was not included in the brief. A local
Indonesian whisper.cpp transcription of the exact supplied recording is used as
a **review draft**, with raw output retained in `.preview/claude-fable/`.
ASR token onsets are measured model estimates, not hand-invented word timestamps
or a claim of perfect forced alignment. Confidence for editorially grouped
phrases is null. The transcript and anchor timings require a final listening/
approval pass before publication. Spoken wording, including the final question,
must not be rewritten to match the brief.

Draft transcript for approval: `.preview/claude-fable/transcript-review.txt`.

| Original VO time | Visual progression                                                                            |
| ---------------: | --------------------------------------------------------------------------------------------- |
|          0–4.50s | Empty folder → one agent → 48 representative nodes; 1.000+ scale and 8-day reveal             |
|      4.50–15.55s | Fable identification → empty folder → abstract brief → development branches                   |
|     15.55–22.98s | Subagent expansion → six conceptual workstreams → writing, scan, review packets               |
|     22.98–25.24s | Eight-day completion → system integration → closed laptop                                     |
|     25.24–32.22s | Laptop opens; power at 25.99s; driver/storage/window/login/installer concepts                 |
| 32.22–49.789375s | Prototype/internal caveats → not a finished OS → coordination recap → complete final question |

The timeline first enters at the testing cue (20.53s), continuing across the
scene boundary and reaching day 8 at the measured 23.61s cue. The OS narration
names windows **before** login: a surrounding window glyph respects that order,
then the fictional login/desktop sequence completes. Final question starts at
45.13s; artwork settles by 46.50s and remains through frame 1493 while the last
subtitles continue. ASR's punctuation extends beyond the real file; the manifest
and final subtitle end are capped to the measured recording, not to 50 seconds.

## Preview / delivery

Studio: http://localhost:3000/ClaudeFable010

Browser QA: `node scripts/claude-fable-qa.mjs`. Browser captures (not an MP4) are
saved at 1080×1920 and 540×960 in `.preview/claude-fable/studio/`.
No MP4 export is performed by default. When requested, delivery is H.264/AAC.

### Verification completed

- `npm run lint`: passed (ESLint and TypeScript).
- Live Studio browser QA: **242 frames**, **0 runtime errors, 0 failed checks**.
- Checked before/at/after caption boundaries, persistent subtitle/character nodes,
  two-line fit, local font readiness, editorial bounds, bottom180/bottom215
  anchors, conceptual disclosures, original audio URL/duration/playback rate and
  unchanged SHA-256. Browser audio was decoded (`readyState: 4`, no media error).
- Asserted network expansion on the hook cue, day-8 completion, laptop power-on
  and an identical closing-network SVG at frame 1400 and the final frame 1493.
- Representative screenshots from all scene families visually inspected at
  **1080×1920 and 540×960**. Browser capture is not a rendered MP4 or an assertion
  that ASR timing has received human listening approval.
- Report: `.preview/claude-fable/studio-qa.json`.
- Full listening/transcript approval remains the publication gate.

### Files

- Registration: `src/Root.tsx` (additive import and composition only).
- Composition: `src/ClaudeFable010.tsx`.
- Original illustrations, six scenes, captions, expression cues and timing:
  `src/episodes/claude-fable/`.
- Reproducible caption manifest and Studio checks:
  `scripts/claude-fable-captions.mjs`, `scripts/claude-fable-qa.mjs`.
- This production/source note: `docs/claude-fable-010.md`.

No existing episode, shared overlay, audio/character/font asset, dependency or
project configuration was replaced.

## Suggested upload description

Menurut Anthropic, Claude Fable 5.2 mengoordinasikan lebih dari 1.000 subagent
selama delapan hari untuk membangun prototipe sistem operasi dari folder kosong.
Anthropic melaporkan prototipe itu dapat boot di laptop. Ini eksperimen internal,
bukan OS komersial atau pengujian independen Prof Deps. Semua animasi adalah
ilustrasi konseptual; kategori modul dan urutan perakitannya merupakan penjelasan
editorial, bukan log pengembangan asli.

Sumber resmi: https://www.anthropic.com/claude-fable-and-mythos-5-2

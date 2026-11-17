# Prof Deps 012 — Gemini 4 Hydrogen

## Preview

- Studio: http://localhost:3000/GeminiHydrogen012
- 1080 × 1920, 30 fps. Complete original VO: **61.387750 s**, **1842 frames** (rounded up).
- Audio: `public/assets/audio/vo_gemini hydrogen.mp3`, MP3, mono, 44.1 kHz. No copy or modification required; `staticFile()` resolves its existing public path.
- SHA-256: `0fe5740e70222451f2aaff1d42cbcecdca92f960a90c17250e89cc8cc2ea07e8`.
- Playback rate 1; no trim, fades, generated narration, additional music, or pitch processing.
- No MP4 rendered. On explicit export request, use H.264/AAC and verify the exported file separately.

## Review status — not publication-approved

Read [the source review](episode-012-hydrogen-source-review.md). The launch date, index scores and Standard API rates were corroborated. Google's two official articles conflict over Terminal-Bench **4.0 versus 4.1**. The video identifies the launch article's 4.0 attribution and notes Antigravity's 4.1 wording. Resolve this discrepancy before publication; the original narration does not name a version and has not been changed.

19% time / 24% quota reductions refer only to **Google's reported multi-model Orchestrator evaluation**. The normalized meters are 100→81 and 100→76; not seconds, money, independently measured throughput, or standalone Hydrogen performance. Quota savings are not API-cost savings. Near-Carbon results do not mean identical success.

Pricing is **USD, Standard paid API, per million input/output tokens**, not subscription access or project cost. Output billing includes thinking tokens according to the reviewed pricing page. Tool/grounding charges and other pricing tiers can differ. Availability depends on plan and rollout; no universal access guarantee appears on screen.

## Audio-driven timing

`src/episodes/gemini-hydrogen/data/timing.json` stores duration, fingerprint, scene boundaries and 28 motion anchors. `subtitles.json` uses Remotion `Caption` objects. Raw ASR and the review transcript are in `.preview/gemini-hydrogen/`.

| Scene        |        Seconds | Story                                                                                |
| ------------ | -------------: | ------------------------------------------------------------------------------------ |
| Hook         |         0–3.88 | Two full 0–100 score meters; one-point gap                                           |
| Reveal       |     3.88–15.80 | Hydrogen → conceptual repository, file, tool, review                                 |
| Index        |    15.80–28.56 | Proportional 51/50 bars; high thinking; one index only                               |
| Orchestrator |    28.56–39.68 | Four task types, dispatch, bidirectional model cooperation, feedback, unified output |
| Efficiency   |    39.68–48.44 | Orchestrator's reported time and quota reductions                                    |
| Pricing      |    48.44–55.36 | Separate input/output token streams and rates                                        |
| Closing      | 55.36–61.38775 | Balanced single-model/team choice; hold through question and tail                    |

**Alignment is machine-estimated, not human-approved forced alignment.** Local existing whisper.cpp small multilingual (`language=id`) produced token-offset estimates from an analysis WAV. The WAV is an analysis derivative only and never plays in the composition. Product spellings were normalized; punctuation and spoken-price notation require listening confirmation. No approved written transcript was supplied. Review every subtitle and especially numbers/names against the original MP3. Closing question is fully included.

To update the recording: transcribe the new source first, revise phrase onsets and cues in `scripts/gemini-hydrogen-captions.mjs`, regenerate JSON with `node scripts/gemini-hydrogen-captions.mjs`, then update authored JSX scene/motion boundaries. Do not merely stretch scenes. Metadata rejects a changed duration rather than silently using old alignment.

## Visual contract

Preserves the approved Kronos full-canvas baseline and existing historical episodes. No content cards, fake screenshots, terminal logs, fabricated PASS results, stock footage, neon, gradients or particles. Key route paths and groups are separately authored for Studio selection. All motion is deterministic; scene-local seconds derive from Remotion frame/fps.

- Plus Jakarta Sans, loaded from existing local variable-font files with `delayRender()`.
- Black opening; off-white remainder. Palette black/white/slate/gray.
- Equal x84–996 editorial margins; headline y240; cardless stage x84/y720/w912/h660.
- A single persistent shared `FullCanvasOverlays` instance: watermark `@prof.deps`, character bottom180, subtitle bottom215. Narration-timed expression cuts only; no character motion.
- Entire design scales uniformly at 540×960. No legacy TikTok fitting, UI overlay, or Y1400 constraint is introduced.
- Explicit requested benchmark attribution appears inside its chart, not as a default source-URL overlay. Conceptual workflows carry `ILUSTRASI KONSEPTUAL`.
- Original procedural SVG artwork is authored for this episode, not a recording or Google product demo. Character and font assets reuse project-owned existing files; historical assets remain untouched.
- Routing visibly states **RUTE & PERAN DAPAT BERUBAH**; task shapes visit both models. Architecture/execution imagery illustrates one possible handoff, not permanently assigned model roles.
- Repository packet reaches REVIEW at the 14.46-second phrase anchor and holds about 1.34 seconds before the index scene; it does not arrive only at the cut.

## QA

`node scripts/gemini-hydrogen-qa.mjs` inspects the **live Studio**, not a render: frame/caption/scene boundaries, stable subtitle/character identity and anchors, two-line maximum, headline/diagram bounds, audio duration/rate/fingerprint, and screenshots at 1080×1920 and 540×960. Evidence: `.preview/gemini-hydrogen/studio-qa.json` and `studio/`.

Publication gates still required: human listening approval, resolution/acceptance of benchmark-version discrepancy, and explicit export request followed by output-level H.264/AAC/playback QA. Studio screenshots are not final MP4 verification.

### Completed preview checks

- `npm run lint`: passed (ESLint and TypeScript).
- Live Studio QA: **319 sampled/boundary frames**, **zero failures or runtime exceptions**.
- **46 screenshots** captured at 1080×1920 and 540×960. Opening, workflow, comparison/context, routing/execution/feedback/output, efficiency, pricing, and complete final question visually inspected.
- Narration metadata in Chrome: **61.38775 s**, playback rate **1**, fingerprint unchanged before/after QA.
- Subtitle DOM identity persists across scene/cue boundaries, at most two lines; shared overlay anchors and all tested headline/diagram text bounds passed.
- No bundle, still renderer, video export, or final-file verification was performed.

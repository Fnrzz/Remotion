# Episode 007 — API prices and coding benchmarks

Studio: http://localhost:3000/KimiComparison007

1080 × 1920, 30 fps. Duration is calculated from the actual supplied MP3:
**58.122438 seconds**, rounded up to **1744 frames**. No MP4 exported.

## Approved audio and synchronization

- Only `public/assets/audio/vo_kimi k3.1 pro.mp3` is used.
- SHA-256: `f4794dd6736a3d440b18040261b1bfeb7092ab7198c7db1ff4fadf0dd3467f04`.
- Untrimmed original, normal volume, no speed/pitch processing or replacement narration.
- Local whisper.cpp `small`, Indonesian, transcribed this exact recording. Raw
  token offsets and SRT: `.preview/kimi-comparison/narration.json` / `.srt`.
- Phrase captions are derived from those measured token onsets, not equal-duration
  text estimates. `node scripts/kimi-comparison-captions.mjs` regenerates the JSON.
- Proper-name transcription corrections: Cloud → Claude; terminal Bench →
  Terminal-Bench; test → tes; angkat → angka. Punctuation and numerals normalized.
- Captions hold through short natural pauses; the same DOM node persists.
- Timing is in episode-local `data/timing.json`. Re-align if audio changes.

| Scene                                 | Audio seconds   |
| ------------------------------------- | --------------- |
| Hook / 5× token-rate comparison       | 0–6.96          |
| Three model names                     | 6.96–13.44      |
| Separate input/output token prices    | 13.44–24.84     |
| Code Bench internal long-horizon      | 24.84–34.44     |
| Terminal-Bench / configuration caveat | 34.44–47.72     |
| Real cost and balanced question       | 47.72–58.122438 |

Numeric onsets are recorded individually: input/output prices 15.86/16.92,
18.59/19.07, 20.41/21.20; Code Bench Astra/Kimi/Opus 28.74/30.37/32.52;
Terminal-Bench Opus/Kimi/Astra 39.48/41.16/43.38 seconds.

## Source verification — 6 November 2026

1. Kimi standard token pricing:
   https://platform.kimi.ai/docs/pricing/chat
   `kimi-k3.1-pro`: **$2 input / $10 output per MTok**.
   The pricing table is present in the embedded HTML payload, even when its
   Markdown serialization omits it. Do not substitute Highspeed ($4/$20),
   batch, cache-hit or cache-write prices.
2. Anthropic model overview:
   https://platform.claude.com/docs/en/about-claude/models/overview
   `claude-opus-5-5`: **$4 input / $20 output per MTok**.
3. OpenAI model catalog:
   https://developers.openai.com/api/docs/models
   `gpt-6-astra`: **$10 input / $50 output per MTok**.
4. Moonshot's model report:
   https://www.kimi.com/en/blog/kimi-k3-1-pro
   Its embedded benchmark data reports:

| Reported score, model order fixed           | Kimi K3.1 Pro | Claude Opus 5.5 | GPT-6 Astra |
| ------------------------------------------- | ------------: | --------------: | ----------: |
| Kimi Code Bench 3.0 Long-horizon (Internal) |          61.2 |            58.5 |        66.5 |
| Terminal-Bench 4.0                          |          65.7 |            66.4 |        58.2 |

The figures are attributed to Moonshot, not independently reproduced by KAVDRA.
Report coding footnotes 1 and 7 identify Claude-Code as Kimi's harness.
Terminal-Bench comparison values (except DeepSeek, not shown) were selected from
model reports or the official leaderboard; configurations are not all identical.
Internal Code Bench comparison models used maximum effort, and Moonshot warns of
possible proprietary-model fallback behavior. Default Kimi settings, unless
otherwise stated: max reasoning effort, temperature 1.0, top-p 0.95.

Persistent chart attribution: **BENCHMARK INTERNAL MOONSHOT** or
**ANGKA DIHIMPUN MOONSHOT**. The mixed-source caveat stays below Terminal-Bench.
Chart values use a common linear 0–100 scale, no percentage symbol, no averaged
score, no reordered identities and no universal winner.

## Editorial constraints

- 5× refers only to Astra/Kimi's listed standard input and output token rates.
- These are API token prices, not subscriptions or complete-project quotes.
- Real bills depend on token counts, caching/writes, tools, modes, retries and
  applicable extra charges/taxes. Lower token rates do not guarantee lower cost
  per solved task. No new narration has been invented to extend the recording.
- All primary graphics are authored in React/CSS/SVG; no footage, GIFs or stock
  photographs were downloaded. The requested revision adds static Kimi and Claude
  brand SVGs and reuses the existing OpenAI mark. Provenance and trademark notes:
  `public/assets/branding/kimi-comparison-LOGOS.md`. These identify brands, not
  special model-version logos.
- Existing episodes/assets/configuration remain untouched. Rounded model cards,
  explicit source qualifications and the black closing are deliberate user-brief
  overrides; shared full-canvas watermark/character/stable subtitles retain the
  approved anchors and lower whitespace. No TikTok fitting or safe-zone overlay.
- Plus Jakarta Sans uses the existing local delayRender font registration.

## QA / publication gate

### Logo and motion revision

- Intro initials replaced by Kimi, Claude and OpenAI logo images, with staggered
  mask/scale reveals and directional card settling aligned to the spoken names.
- Three models visibly connect to the two comparison criteria using drawn SVG
  paths and traveling signals; all three have equal visual weight.
- Hook includes equal-size token chips illustrating one-versus-five standard
  token rates, never fivefold total task cost.
- Pricing includes narration-timed token movement and thicker proportional bars.
- Benchmark grid draws in; endpoint markers/pulses follow each spoken score.
  Brand marks persist beside model labels; chart geometry is unchanged.
- Closing adds an animated two-criteria/three-options diagram. No automatic
  winner is selected. No VO, caption timing, score, price or overlay anchor changed.

`npm run lint`

`node scripts/kimi-comparison-qa.mjs` inspects the live Studio, caption boundaries,
text collisions, fixed overlay geometry, chart data and screenshot previews.
Outputs: `.preview/kimi-comparison/studio/`, `studio-qa.json`.

Completed logo/motion revision QA: ESLint/TypeScript and Prettier passed. **314 sampled Studio frames**
including phrase boundaries, scene cuts and score onsets: **0 failures, 0 runtime
errors**. Fixed model order, exact final scores, common 0–100 chart geometry,
separate input/output bar scales and persistent source labels passed.
All three logo images loaded successfully and were visually checked at both sizes. Subtitles
retain one node and at most two lines. Opening, model reveal, pricing, both
benchmarks and closing were visually inspected; pricing/benchmark/closing were
also checked at 540 × 960. Screenshot artifacts are live Studio captures, not
rendered video frames or an exported MP4.

Review the final preview and narration before publication. Recheck live list
prices and the report if publishing after the verification date. **Do not render
until the user requests export and approves the source/narration review.**

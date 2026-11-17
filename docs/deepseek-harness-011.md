# Prof Deps 011 — DeepSeek Harness vs Claude Code

## Preview and recording

- Studio: `http://localhost:3000/DeepSeekHarness011`.
- 1080 × 1920, 30 fps; 1,679 frames (55.9667 s).
- Original VO: `public/assets/audio/vo_deepseek herness.mp3`.
- Correct reference: `staticFile("assets/audio/vo_deepseek herness.mp3")`.
- MP3, mono, 44,100 Hz, 128 kbps; measured duration 55.954250 s.
- SHA-256: `9a379e12f7e3c42d0851012849699ce4e7e35f2de7a71c4963611999983a6a0a`.
- Recording was already publicly addressable: no redundant copy, edit, regeneration, trim, playback-rate change or pitch change. Analysis WAV files are separate temporary derivatives; the composition plays the original MP3.
- `calculateHarnessMetadata` measures the actual recording and rejects a changed duration until cue review. Frame ceiling preserves the entire file, including its final tail.

## Timing and transcript review status

**ASR ESTIMATES — LISTENING REVIEW REQUIRED.** No approved written transcript or forced alignment was supplied. No human listening approval or exact word timestamps are claimed.

Local installed whisper.cpp, cached multilingual `small` model, `language=id`, was run on a separate 16 kHz analysis WAV. Raw outputs are retained in `.preview/deepseek-harness/narration.{json,srt,txt}`. Phrase starts were taken from its token offsets, grouped into short readable cues; `timestampMs` and `confidence` are null. Proper nouns were normalized. The raw ASR's “int agent” is interpreted as “inti agent”, and “tahap review” as “tahap preview” from context. **Confirm these two phrases against the recording before publication.** A second unprompted crop transcription also produced “review”; this does not establish the missing initial consonant, so the interpretation remains explicitly unapproved.

The complete derived transcript is `.preview/deepseek-harness/transcript-review.txt`. Regenerate the JSON from `node scripts/deepseek-harness-captions.mjs` after approving/correcting phrase boundaries. Episode-local `data/timing.json` contains the audio fingerprint, scene boundaries and individual motion events.

| Scene             | Recording time   | Visual event                                                                                            |
| ----------------- | ---------------- | ------------------------------------------------------------------------------------------------------- |
| Two approaches    | 0–4.88 s         | Black hook, modular network and active integrated editor; not a foundation-model comparison             |
| Architecture      | 4.88–17.62 s     | Claude reads/edits/uses tools; attention shifts to modular Harness; tool swap with configuration cue    |
| Creator mode      | 17.62–23.84 s    | Chat request → skeleton → component assembly → installed plugin → 25:00 Pomodoro                        |
| Extensions        | 23.84–35.78 s    | Distinct Plugin / Skills / Hooks / MCP connectors; core loop replacement; integrated workflow extension |
| Cost and maturity | 35.78–50.30 s    | Separate billing flows; Pro reference; preview and compatibility qualification                          |
| Choice            | 50.30–55.95425 s | Equal-weight approaches; “RAKIT ATAU PAKAI?”; full spoken question in subtitles                         |

Scenes follow the actual recording order, which introduces Claude before Harness. They are not equal length. Character expression cuts follow the episode's phrase cues, without changing position or pose-canvas dimensions.

## Editorial fact check — 10 November 2026

All media are original schematic SVG/React illustrations, not real product screens, tool calls, test results or execution transcripts. No stock footage, vendor screenshots, remote fonts/media, music or third-party SFX were added. The original project character art and locally registered Plus Jakarta Sans are reused.

### DeepSeek

- Canonical official page: https://www.deepseek.com/en/harness/ (the supplied https://www.deepseek.com/harness/en/ links onward here).
  - “Install plugins, or create them through chat in ‘Creator mode’, to extend tools, skills, and the interface.”
  - Public preview and open source.
- Repository: https://github.com/deepseek-ai/deepseek-harness
  - “everything-is-a-plugin” architecture powered by Cordis.
  - “developer preview … THERE WILL BE COMPATIBILITY-BREAKING CHANGES.”
- Architecture: https://github.com/deepseek-ai/deepseek-harness/blob/master/docs/architecture.md
  - Model adapter, tool registry, session log and agent loop are replaceable from configuration; “There is no privileged core to patch”. This is the supported architectural distinction, not a claim about model intelligence or zero-configuration hot-swapping.
- License: https://github.com/deepseek-ai/deepseek-harness/blob/master/LICENSE — MIT. No license fee does not mean free inference, infrastructure or compute.
- Model setup: https://deepseek-harness.github.io/deepseek-harness/en/guide/quickstart — provider API-key configuration.
- **Pomodoro qualification:** Creator mode is verified. The current fetched official landing page did not establish the prompt's claimed official Pomodoro demonstration. The timer here is therefore an original hypothetical example, labeled conceptual and “Contoh konsep · bukan rekaman eksekusi”. Do not describe this animation as footage of an official demonstration.

### Claude Code

- https://code.claude.com/docs/en/features-overview
  - Skills add reusable knowledge/workflows; Hooks react to lifecycle events; MCP connects services/tools; a Plugin bundles capabilities including skills, hooks, subagents and MCP servers. These are distinct mechanisms, not equivalent interchangeable core modules.
- https://code.claude.com/docs/en/agent-teams
  - Agent teams exist but are experimental and disabled by default. No extra claim is inserted into the approved VO.
- https://code.claude.com/docs/en/plugins/mods/overview.md
  - Current Mods documentation says a plugin can change how Claude Code looks and behaves, runs inside Claude Code, can redraw its interface and step into tool calls/requests. **Do not claim Claude has only external add-ons or cannot customize internal behavior.** The narrower comparison is Harness's explicit configuration-level replacement of foundational pieces, including its agent loop, versus extending an integrated coding runtime. The schematic connector locations are not architectural proof that every extension is external.
- https://claude.com/pricing
  - Pro includes Claude Code; US$20 if billed monthly. Taxes and usage limits can apply. This is a reference subscription price, not a cost-per-task statistic or the only access method.
- https://claude.com/product/claude-code
  - Multiple plans and Claude Console access; Console consumes API tokens at standard API rates.
- https://code.claude.com/docs/en/third-party-integrations
  - Additional deployment/billing options; no claim of exclusive Pro access.

The brief's “Harness → provider → usage billing” and “Pro → Code” represent different arrangements. They are deliberately **not equivalent total-workflow cost bars**. No benchmark, success-rate, speed, token-use, safety ranking, free-versus-paid showdown or universal winner is shown. Recheck dynamic prices and preview status immediately before publication.

## Layout and QA

### Revision — penjelasan satu per satu

During explanatory passages, only the currently narrated system is shown, centered and enlarged within the existing open stage. Named sub-sequences preserve the recording's exact order:

- 4.88–10.91 s: Claude Code; ready agent → reading project → editing → tools.
- 10.91–17.62 s: Harness; modules appear one by one, then a configured component replacement.
- 23.84–27.99 s: Claude Code; Plugin, Skills, Hooks and MCP attach in spoken order.
- 27.99–32.09 s: Harness; core loop replacement.
- 32.09–35.78 s: Claude Code; integrated workflow extensions.

Only the opening and closing retain the original balanced side-by-side architecture view. The cost-flow illustration, Creator sequence, audio, total duration and stable subtitle/character overlays are unchanged. `timing.json.explanationShots` records these cuts; Studio QA checks that exactly one matching system illustration is visible throughout each passage (hidden premounted sequences are excluded). Existing rendered stills from the earlier revision are retained as history; regenerated live Studio screenshots show the current revision.

Preserves the current approved full-canvas Kronos layout, not the superseded TikTok-safe-stage positions: editorial x84..996, headlines y240, open 636×400 content scaled inside x84/y720/w912/h660. Only the stable subtitle overlay is boxed; all main artwork is cardless. No safe-area overlays or default source labels are rendered.

The single composition-level `FullCanvasOverlays` keeps watermark top108/right84, character width320/right84/bottom180, and subtitles left84/width550/height135/bottom215/font36. It is not remounted at scene or caption changes. Foreground ends above the approved bottom whitespace.

- `npm run lint`: ESLint and TypeScript.
- `node scripts/deepseek-harness-qa.mjs`: live Studio inspection across representative frames, all scene and subtitle boundaries ±1, 1080/540 screenshots, subtitle identity/fit, headline fit, fixed anchors, local fonts, original audio duration/rate/readiness, fingerprint, scene adjacency, conceptual labels, runtime exceptions.
- `.preview/deepseek-harness/studio-qa.json`: machine-check results.
- `.preview/deepseek-harness/studio/`: screenshots from the live Studio, not an exported video.
- Representative still renders, when present, are under `.preview/deepseek-harness/stills/`.
- MP4 has **not** been exported; no encoded-video/audio QA claim is made. After transcript listening approval, the intended explicit export is H.264 with AAC, e.g. `npx remotion render src/index.ts DeepSeekHarness011 out/deepseek-harness-011.mp4 --codec=h264 --audio-codec=aac`. Verify the actual output with ffprobe and audiovisual playback before publication.

Historical episodes, existing audio, font assets, character assets, package versions and Remotion configuration remain unchanged.

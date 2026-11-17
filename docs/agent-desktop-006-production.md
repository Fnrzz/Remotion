# Episode 006 — motion-first agent-desktop

## Preview and output

- Studio composition: `http://localhost:3000/AgentDesktop006`
- Final target: `out/agent-desktop-006.mp4`
- 1080 × 1920, 30 fps, 1428 frames (47.6 s frame-aligned container).
- Original narration file duration: 47.568938 s; no speed/pitch change, trim, regeneration, or added music.
- H.264, AAC, yuv420p; no network resources required for rendering.
- Historical compositions and shared components remain unchanged.

## Layout and illustrations

Preserves the existing full-canvas editorial geometry, local Plus Jakarta Sans,
text-only `@prof.deps` watermark, stationary presenter, subtitle bottom215 and
presenter bottom180 anchors. No TikTok safe-zone fitting or overlay is introduced.
No downloaded photographs, screenshots, footage, GIFs, or sound effects are used.

The new episode uses kinetic typography, a fictional notes UI, cursor movement,
typing, a drawn accessibility tree, agent/tool/app connectors, request packets,
new-observation comparison, generic app icons, permission rows and dummy-data
privacy masks. Explanatory scenes carry `ILUSTRASI MEKANISME`. The outlined
privacy boundary is an editorial metaphor, not a product dashboard.

## Measured narration synchronization

Source audio was decoded locally to 16 kHz mono for **analysis only**, then
transcribed with the installed `whisper-cli` and the multilingual small model.
The original MP3 remains the composition's only audio asset. Raw recognition and
token timestamps are in `.preview/agent-desktop/narration.json`; the 16 kHz WAV
is not used for export. Phrase captions preserve continuous boundaries and a
single stable subtitle DOM node.

| Spoken trigger        | Source timestamp | Visual                                       |
| --------------------- | ---------------: | -------------------------------------------- |
| klik                  |           4.84 s | Cursor clicks the fictional supported button |
| ngetik                |           5.23 s | `Catatan baru` begins appearing              |
| agent-desktop         |           9.14 s | Masked project-name reveal                   |
| bukan                 |          13.44 s | Tool / not-model distinction                 |
| bukan agent           |          15.29 s | Not-autonomous clarification                 |
| Agent yang memakainya |          17.54 s | Calling-agent flow packet                    |
| membaca               |          22.40 s | Accessibility-tree reveal                    |
| baca                  |          27.13 s | Brief tree emphasis                          |
| tindakan              |          28.57 s | Request moves through the separate tool      |
| cek lagi              |          29.65 s | New illustrative observation                 |
| Izin                  |          34.18 s | Permission concept rows                      |
| tindakan              |          36.13 s | Sent ≠ finished distinction                  |
| data pribadi          |          41.70 s | Dummy-field editorial masking                |
| bagian apa            |          45.18 s | Closing question                             |

ASR spelling corrections: `Bahaya angin` → `Bayangin`, `Diversal Labs` →
`di Vercel Labs`, `Agent tiap sistem` → `Izin tiap sistem`, and standard spelling
`antarmuka` / `simpel`. The permission wording was cross-checked with a second
local transcription of the relevant audio region. These correct caption
recognition, not the narration audio. No approved wording was regenerated.

## Files and reproducibility

- Registration: `src/Root.tsx` (new composition only).
- Composition: `src/AgentDesktop006.tsx`.
- Episode-local components/scenes and JSON timing/captions:
  `src/episodes/agent-desktop/`.
- Factual sources, caveats, licensing and suggested upload description:
  `docs/agent-desktop-006-sources.md`.
- Representative stills: `node scripts/agent-desktop-stills.mjs`.
- Studio geometry, font, caption-boundary and node-stability checks:
  `node scripts/agent-desktop-qa.mjs`.
- Delivery format, full-stream decode, source hash, narration correlation and
  exported-frame extraction: `node scripts/agent-desktop-verify.mjs`.

```sh
npm run lint
npx remotion render src/index.ts AgentDesktop006 out/agent-desktop-006.mp4 \
  --codec=h264 --audio-codec=aac --pixel-format=yuv420p --crf=18 --concurrency=2
```

Preview stills and machine-readable reports live under `.preview/agent-desktop/`.
Metadata refuses a substantially different audio duration rather than silently
reusing mismatched captions. If the narration is replaced, re-transcribe it and
update episode-local timing, captions and expressions before rendering again.

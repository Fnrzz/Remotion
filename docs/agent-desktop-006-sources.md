# Agent Desktop — episode 006: sources and editorial guardrails

Verified by reading primary-source text on 2026-11-06. This is documentary verification, not a product test: agent-desktop was not installed, executed, or benchmarked. No remote image, video, or audio assets were downloaded. No `src` files were edited for this research task.

## Source registry and version caveat

| ID  | Source                                                             | Provenance / use                                                                                                                                                                                                                                                               |
| --- | ------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| S1  | https://github.com/vercel-labs/agent-desktop/releases/tag/v1.0.2   | Requested historical release. The page links tag `v1.0.2` to commit `a47ed664e0db00d1d4df364eb3fe8a5599882f3c`; its notes cover documentation, launcher-overhead messaging, permission-guide fixes, and the docs site.                                                         |
| S2  | https://github.com/vercel-labs/agent-desktop/blob/v1.0.2/README.md | Version-pinned README; factual baseline for this episode. Read directly as text at https://raw.githubusercontent.com/vercel-labs/agent-desktop/v1.0.2/README.md . Sections: introduction, Quick start, Commands, Platform support, installation, privacy warning, and License. |
| S3  | https://agent-browser.dev/desktop                                  | Live official documentation, observed with `lastUpdated: 2026-11-03`. Sections: What agent-desktop is and is not; The loop in four commands; How it works; Platform support. This page is not pinned to the release.                                                           |

**Do not display a “current version,” “latest version,” or version badge in the episode.** The requested tag is a research baseline, not proof of the current release. The live documentation can advance independently; statements supported only there must not silently be attributed to the older tag. Release-note changes are not proof that the entire product first launched with this release. Avoid an unverified “just launched” date.

The README example's JSON `"version": "2.5"` is not evidence of the product's release version. Do not turn that example value into an on-screen product-version claim. Avoid copying dynamic npm badges, download counts, GitHub stars, or changing repository statistics into illustrations.

## Claim-to-source ledger

| Claim suitable for an explanatory episode                                                              | Support                                                                 | Necessary qualification                                                                                                                                                                          |
| ------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| agent-desktop lets a calling agent read and operate desktop apps through the OS accessibility tree.    | S2 introduction; S3 introduction / How it works                         | It is a tool, not a built-in reasoning model. App accessibility exposure limits what it can read and control.                                                                                    |
| It ships as a CLI and C library for macOS, Windows, and Linux.                                         | S2 introduction / Language bindings / Platform support; S3 introduction | Cross-platform does not mean feature parity or support for every app, session, or Linux desktop.                                                                                                 |
| Snapshots return JSON, with refs for actionable elements; an agent can act on a ref and observe again. | S2 Quick start; S3 loop                                                 | The observe–act–verify loop belongs to the calling agent or script. A successful action alone does not prove the UI changed.                                                                     |
| Refs are scoped to the snapshot that produced them.                                                    | S2 Quick start; S3 loop                                                 | The tagged README says a bare `@e8` is rejected and stale/ambiguous targets require a fresh snapshot. Use snapshot-qualified refs if commands appear.                                            |
| Its native accessibility workflow does not depend on pixel matching.                                   | S2 introduction; S3 What it is and is not                               | Do not broaden this into “never uses screenshots”: S2 lists a screenshot command. Do not imply it can understand arbitrary pixels or a UI with no accessibility tree.                            |
| Ref actions are headless by default; `--headed` allows physical input.                                 | S2 Quick start / Platform support                                       | Not every operation works headlessly. Do not promise universal background automation or zero focus/input interference for every command.                                                         |
| macOS requires Accessibility permission.                                                               | S2 Installation; S3 Platform support                                    | Permissions and OS-specific setup remain necessary. Windows privilege boundaries and Linux graphical-session/AT-SPI requirements also matter.                                                    |
| The native tool is not itself an AI agent, model, chat interface, or GUI application.                  | S3 What it is and is not; S2 says the loop stays in your agent          | Any conversational or desktop interface drawn for the video is an editorial illustration, not the product's own GUI.                                                                             |
| It is distinct from agent-browser for web-page automation.                                             | S3 What it is and is not                                                | S3 describes agent-browser for web contents and Chromium/Electron integration. Do not claim agent-desktop alone replaces browser automation or silently backport live integration details to S2. |
| The tagged README lists an Apache-2.0 license.                                                         | S2 License                                                              | This is a statement about the project license, not ownership of third-party trademarks, UI, or supplied character art.                                                                           |

### Details best omitted from short-form copy

- S2 says **60 command names, 56 operational commands**. The four held-input commands (`key-down`, `key-up`, `mouse-down`, `mouse-up`) refuse to run. Do not say “60 working commands.” S3 also says these four fail closed.
- S2 lists macOS shell surfaces as planned, Linux window control as X11-dependent, Linux notifications as GNOME Shell-dependent, and several Wayland/helper requirements. A three-OS graphic must not imply identical capabilities.
- S2 says official Homebrew and Scoop packages were being submitted, not available in the default catalogs at that baseline. Do not show them as verified installation methods.
- S1 mentions messaging about Node launcher overhead. Neither the reviewed release page nor the reviewed README/docs supplies a comparative benchmark supporting a faster-than-humans, faster-than-browser-tools, latency, accuracy, or task-success claim.

## Privacy and illustration disclaimer

S2 explicitly warns that snapshots, clipboard reads, screenshots, command output, and debug artifacts can contain private desktop content and should stay out of public logs/uploads. It also describes an **optional, separate JEV helper** sending screen descriptions to a configured model provider. Native-tool operation is not evidence that an entire calling-agent workflow is offline or that no content can leave the machine.

Production rules:

- Make the episode primarily from original SVG diagrams and typography. Any app windows, rows, buttons, chats, documents, refs, command output, or cursor paths drawn for explanation are **fictional UI / simulated editorial examples**, not captured execution or official product screenshots.
- Mark relevant illustrative UI `ILUSTRASI`. Do not present animated task completion as a real demo, measured speed, verified reliability, or a benchmark.
- Use invented names, addresses, file names, and document contents. Any blur, redaction, hidden field, privacy shield, or mask is an **editorial choice made by the video**, not a demonstrated automatic privacy or secret-detection feature of agent-desktop.
- Do not invent a first-party agent-desktop app dashboard, assistant chat, privacy mode, confirmation system, or model-selection UI. A simplified interface may explain another app being operated, with the illustration qualification visible.
- No remote image/video/audio downloads are needed or authorized for this episode. Research links are citations, not permission to retrieve their embedded demo media.

Suggested upload-description wording:

> Agent-desktop adalah alat CLI dan pustaka C yang dapat dipanggil agen untuk membaca dan mengoperasikan aplikasi desktop lewat accessibility tree sistem operasi. Dukungan bergantung pada aplikasi, izin, dan platform. Tampilan UI dan alur kerja dalam video merupakan ilustrasi fiktif, bukan rekaman pengujian atau benchmark. Masker privasi dibuat secara editorial, bukan klaim fitur penyamaran otomatis. Dokumentasi dapat berubah; sumber ditautkan di bawah.

Include S1–S3 in the upload description rather than adding persistent on-screen source labels.

## Local asset provenance and preservation

| Asset               | Existing local file / treatment                                                                                                                                                                                                                                                                                                                                                                            |
| ------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Supplied narration  | `public/assets/audio/vo-agent-dekstop.mp3`; Remotion static path `assets/audio/vo-agent-dekstop.mp3`. Preserve the exact supplied spelling and file bytes. No replacement, re-encoding, trimming, or remote audio.                                                                                                                                                                                         |
| Narration integrity | SHA-256 observed during this review: `76f1b456a768f8db9e67f5d1fb493191b83cfadd1fc9d5520c55e00d286e5dfb`. This review did not transcribe or validate every spoken claim in the file.                                                                                                                                                                                                                        |
| Typeface            | Existing local Plus Jakarta Sans variable WOFF2 files: `public/assets/fonts/plus-jakarta-sans-v12-normal-latin.woff2` and `public/assets/fonts/plus-jakarta-sans-v12-normal-latin-ext.woff2`; already loaded locally by `src/fonts.ts`. Attribution: Tokotype / The Plus Jakarta Sans Project Authors; SIL OFL 1.1. See existing `public/assets/fonts/SOURCES.md` and `OFL.txt`. Do not fetch fonts again. |
| Presenter character | Reuse existing `public/assets/images/charactersheet/karaktersheet-*.png` poses as mapped by `src/data/character.ts`, with the existing shared overlay. Existing project-supplied art, not agent-desktop/Vercel product art; no new third-party ownership or license claim is established here.                                                                                                             |
| Main visuals        | Newly authored SVG editorial diagrams; no remote stock photos, product-demo footage, remote screenshots, or downloaded product audio. Illustrative output must remain labeled and non-benchmark.                                                                                                                                                                                                           |

This is a **new Remotion episode**, not a replacement for old compositions. Preserve all historical compositions and assets. Keep the approved full-canvas, cardless Prof Deps layout, local typography, existing character, stable subtitles, and bottom whitespace. This research document does not authorize source-code edits or a global layout migration.

## Material factual concerns to carry into production

1. Do not call the tool a standalone AI agent or show a fictional interface as its real app: the docs expressly say it is a tool with no embedded LLM or GUI.
2. Do not claim universal app control, platform parity, unrestricted background execution, or screenshot/pixel understanding. Accessibility, permissions, stale refs, OS/session capabilities, and verification constrain the workflow.
3. Do not imply automatic privacy masking, guaranteed privacy, or wholly offline agent operation. These are unsupported by the reviewed sources and conflict with the explicit private-content warning if stated categorically.
4. Do not present animation as an actual demo or benchmark. No product execution, timing, accuracy, reliability, or comparative speed was independently verified.
5. Keep version drift out of the video: use the tagged README as baseline, distinguish the live docs, and display no “current” version. The supplied narration still requires a separate spoken-claim check before final publication; this text-only review does not certify it.

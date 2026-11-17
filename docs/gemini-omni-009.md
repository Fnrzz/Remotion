# Prof Deps · Gemini Omni 1.2 Flash · 009

## Preview and implementation

- Studio: http://localhost:3000/GeminiOmni009
- 1080 × 1920, 30fps, 1460 frames (48.6667s). Actual supplied MP3: 48.666063s.
- Source audio: `public/assets/audio/vo-gemini 1.2 flash.mp3`. Full file plays once, at its original speed, pitch and volume; no voice generation, replacement, trims or time-stretching.
- No MP4 has been rendered. Intended delivery on explicit export request: H.264 video / AAC audio.
- Existing episodes, source audio, character assets, font registration and project configuration are preserved.

## Source and factual review

Official Google article, fetched and checked on 7 November 2026:
https://blog.google/innovation-and-ai/technology/developers-tools/introducing-gemini-omni-1-2-flash/

Published 5 November 2026. It describes native clips up to 15s (up from 10s with Omni 1.1), multi-turn editing, improved reference following / character and object consistency, and a 30% lower published 720p API rate of $0.07 per second. Recheck the article and linked current product pricing and mode documentation immediately before publishing.

- Timeline comparison is Omni 1.1 Flash → Omni 1.2 Flash, not unlimited duration. On-screen qualifier: “PADA MODE YANG MENDUKUNG”.
- Conversational editing illustration is a conceptual explanation, not a promise of perfect instruction following or evidence of actual Gemini output.
- Consistency is Google's claim. Display “MENURUT GOOGLE” and “DEMO RESMI GOOGLE · BUKAN UJI PROF DEPS”. The consistency scene now uses real stills from Google's published demo, not the procedural camera illustration. No independent Prof Deps test is claimed.
- Price bars use a common baseline. Current length / old length = 0.70. This is a **30% relative reduction**, not percentage points. The implied comparison rate is $0.10/s (0.07 / 0.70), not an invented billing session. Only current rate is typeset. “API · 720P” remains visible with it.
- Closing narration and visual qualifier explain that duration and access vary by mode and service.

## Visual provenance

All landscape, timeline thumbnails, film-camera object, chat, price geometry and recap artwork are original React/SVG constructions authored for this episode. None are genuine Gemini output, stock media or product UI screenshots. The landscape and recap retain illustration disclosures. The consistency scene is now an official Google demo, separately labeled as such. No external render-time media or network fetch is used.

### Official consistency demo stills (subsequent user revision)

- Article section: **Better reference adherence**. Google's description explicitly discusses model identity and garment cut, drape and back details across turns/match cuts. The original scene's camera illustration remains in its component file but is no longer shown in the consistency scene or the revised closing.
- Original video linked directly by the official article: https://storage.googleapis.com/gweb-uniblog-publish-prod/original_videos/ECom_Try_On_Demo.mp4
- Download retained at `.preview/gemini-omni/official/ECom_Try_On_Demo.mp4` (1920×1080, 20.65s). The official article HTML containing the link and explanatory caption is retained at `.preview/gemini-omni/google-article.html`.
- Extracted JPEG stills at **7.0s** (`public/assets/images/gemini-omni/google-tryon-front.jpg`) and **10.0s** (`google-tryon-back.jpg`). Both show the same reference photos and the same generated model wearing the same tan trench coat from front and rear three-quarter angles. Full frames are preserved, without retouching, synthetic replacement, crop, or color changes; only JPEG encoding is applied.
- Scene displays the front still, then cross-dissolves to the rear still. This is an editorial transition between two official stills, **not** an independently generated or tested result and not a presentation of the complete demo video. No source audio is used.
- Google owns the demo artwork. Used for editorial discussion of the announced feature, not represented as public-domain stock or independently licensed media. The embedded English “Reference Images” label is part of the original official frame, not added narration/caption copy.
- The fetched poster thumbnails `google-reference-consistency.webp` and `google-object-consistency.webp` show prompt-entry UIs and are **not used** as evidence in the composition.

Per the user's subsequent request, the introduction displays Google's official announcement image containing the Gemini Omni 1.2 Flash logo/name, replacing the three abstract feature symbols after the timeline collapse. The complete unmodified artwork is stored locally at `public/assets/images/gemini-omni/google-gemini-omni-1.2-flash.png`, and is shown unframed, not as a full-canvas backdrop. Its embedded English announcement copy is preserved as part of the official artwork; no English caption or narration was added. Source: the official article's `og:image`, https://storage.googleapis.com/gweb-uniblog-publish-prod/images/gemini-omni-1.2_FZLql41.width-1300.png . Copyright/brand artwork: Google; editorial identification, not a public-domain or separately licensed stock asset. This promotional artwork is not Prof Deps model testing or an original procedural demo.

The existing approved Prof Deps character expressions and local Plus Jakarta Sans fonts are reused unchanged. Shared full-canvas overlays preserve the watermark, subtitle box and bottom whitespace. No TikTok fitting or platform overlay was introduced. Per the explicit visual-first brief, main scene headlines are replaced by authored motion objects and minimal labels; equal editorial margins, off-white body canvas and black opening are retained. The historical film-camera illustration remains available in its original component; the active consistency scene uses Google's demo stills.

### Closing question motion (subsequent user revision)

At 42.8s, the main-content three-object recap is replaced by an original drawn question mark. A filmstrip/playhead enters with the longer-duration option, followed by a chat bubble with writing/submission motion for the editing option. These are minimal vector question symbols, not model output or clickable controls. The existing top question, preceding mode caveat, original narration and persistent overlays are unchanged. Motion settles by 47.9s and holds to the audio end. Component: `src/episodes/gemini-omni/components/ClosingQuestionMotion.tsx`.

## Narration and subtitle synchronization

Transcribed locally using existing whisper.cpp `whisper-cli` and multilingual `ggml-small.bin`, language `id`. No packages installed and no audio uploaded. Raw transcript/token offsets retained in `.preview/gemini-omni/narration.{json,srt,txt}`. Phrase cues use real token onsets, not equally divided timestamps. Script: `scripts/gemini-omni-captions.mjs`.

ASR orthography is corrected without altering narration: `cat` → `chat`, official model name spacing, and `Omni 1.110 detik` → `Omni 1.1, 10 detik`. Confidence values are null because edited phrase confidence is not measured. Token timings are ASR estimates; a final listening pass is recommended before publication.

|         Time | Authored sequence                                                                          |
| -----------: | ------------------------------------------------------------------------------------------ |
|       0–3.88 | Black opening; timeline expands with the first spoken 15-second claim                      |
|    3.88–7.92 | Thumbnail geometry collapses into product reveal and official Google announcement artwork  |
|   7.92–14.16 | Narration-aligned Omni 1.1 10s → Omni 1.2 15s comparison                                   |
|  14.16–24.72 | Parallax day scene, submitted chat, continuous night transformation, sliding before/after  |
|  24.72–30.12 | Two official Google virtual try-on demo stills: same model and coat, front/back angles     |
|  30.12–37.12 | Common-baseline bars shorten to 70%; −30% and $0.07/s API 720p                             |
| 37.12–48.666 | Mode caveat, then main-content question-mark motion and two options held through audio end |

## QA

`npm run lint` passed. `node scripts/gemini-omni-qa.mjs` inspected 193 frames in the actual running Studio, including caption boundaries and stable overlay geometry, and verified the price ratio, closing question progression, content bounds and final still hold: zero runtime errors or failed checks. All layout families were captured at 1080×1920 and 540×960 without rendering a video. Representative frames from every scene were visually reviewed. Results: `.preview/gemini-omni/studio-qa.json`; screenshots: `.preview/gemini-omni/studio/`.

## Suggested upload description

Gemini Omni 1.2 Flash membawa klip hingga 15 detik pada mode yang mendukung, editing lewat instruksi lanjutan, peningkatan konsistensi menurut Google, dan tarif API 720p $0.07 per detik—turun 30% dibanding Omni 1.1 Flash. Batas durasi dan akses fitur bergantung pada mode serta layanan. Adegan konsistensi memakai dua cuplikan gambar dari demo resmi Google; gambar perkenalan juga berasal dari pengumuman resmi Google. Animasi lainnya adalah ilustrasi konseptual Prof Deps. Tidak ada klaim pengujian independen.

Sumber resmi Google: https://blog.google/innovation-and-ai/technology/developers-tools/introducing-gemini-omni-1-2-flash/

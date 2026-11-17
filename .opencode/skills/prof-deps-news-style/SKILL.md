---
name: prof-deps-news-style
description: Preserve the approved Prof Deps full-canvas, cardless Indonesian news style with consistent bottom whitespace. Use for every new video, topic, episode, composition, or revision in this project. Locks responsive 1080x1920 geometry, character bottom180, stable subtitles bottom215, text-only @prof.deps watermark, typography, palette, and restrained motion. Never introduce a TikTok safe zone or main-content cards.
---

# Prof Deps — full-canvas, cardless news style

The user-approved baseline is **Kronos full-canvas / no safe zone / no content
cards / raised overlays with bottom whitespace**, approved on 2026-11-02.
These rules explicitly supersede the **2026-10-31 Genie4 safe-zone
positions and photo cards**, including its Y1400 limit and on-screen sources.
Do not restore legacy styling through old components or reference images.

## Read first

1. Load `remotion-best-practices` and the relevant Remotion task skill.
2. Read [the layout contract](references/layout-contract.md) in full.
3. Inspect the full-canvas references before designing:
   [closing](assets/approved-full-canvas-raised-closing.png) and
   [data](assets/approved-full-canvas-raised-data.png). These are preview references,
   not media to insert into an episode. They record the requested 2026-11-02
   revision. Never fall back to the old safe-zone images.
4. Read `src/KronosDocumentary.tsx`,
   `src/episodes/kronos/components/Editorial.tsx`,
   `src/episodes/kronos/components/Diagrams.tsx`,
   `src/episodes/kronos/scenes/KronosScenes.tsx`, and
   `src/components/FullCanvasOverlays.tsx` before adapting the layout.
5. Paths above are repository-relative; supporting links are skill-relative.
   Preserve newer user edits rather than silently restoring a reference version.

## Locked design

- Portrait **1080 × 1920, 30fps**, scaled responsively as one design space.
- Black typographic hook; off-white remainder. Plus Jakarta Sans, ExtraBold
  headlines, black text and restrained slate emphasis; generous whitespace.
- Equal editorial margins: **x84..996, width 912**. Headline top **240**;
  per-scene headline sizes **88..112px**, weight 800.
- `ContentStage`: left **84**, top **720**, width **912**, height **660**.
  No background, border, radius, shadow, card, or padding. Its inner authored
  diagram/type space is **636 × 400**, scaled by **912 / 636**.
  This is an editorial content stage, **not a TikTok safe stage**.
- Main body extent ends at **Y1380**. That is a layout extent, not a reserved
  platform-UI safe zone. Use the lower canvas for the overlays below.
- No main-content cards: no rounded photo frames, mattes, panel backgrounds,
  shadows, badges, or enclosing UI chrome. Use direct typography, diagrams,
  unframed stills/screenshots and editorial rules. No full-screen photo backdrop.
- A closing GitHub CTA may intentionally show a **real repository screenshot**
  with a legible repository URL. Do not add a framed card around it.
- Shared `FullCanvasOverlays` owns the independent watermark, character and
  persistent subtitle node; keep these outside scene remounts and content scaling.
- Watermark: text only **`@prof.deps`**, top **108**, right **84**, font **30/700**,
  opacity **0.58**. No logo, icon, or alternate display name.
- Character: width **320**, right **84**, bottom **180**; stationary with only
  narration-timed expression cuts and an initial opacity fade. No shake, bob,
  tilt, slide, zoom, rotation, or audio-reactive motion.
- Subtitles: one persistent fixed box, left **84**, bottom **215**, width **550**,
  height **135**, font **36/600**, line-height **1.3**, maximum two centered lines.
  Only this overlay may retain a subtle rounded box. No per-cue key, remount,
  fade, movement, resizing, or backdrop blur; update only the cue text.
- Always preserve the approved **bottom breathing room**: character ends at
  **Y1740**, subtitle box at **Y1705**, leaving **180px / 215px** respectively
  to the canvas edge. Keep this lower area free of new text, logos, cards or
  artwork; continue the scene's native background, not an added footer strip.
  These are editorial margins, not a TikTok safe zone. Scale them at other
  resolutions (90px / 107.5px at 540 × 960). Do not lower the overlays to fill
  the whitespace or apply another 80px shift when reusing the current component.
- No on-screen **“Sumber”** text by default. Keep accurate source URLs, credits
  and asset provenance in documentation and the upload description instead.
  A useful editorial URL, such as the GitHub CTA, is not a source overlay.
- Never use a safe-zone PNG, `TikTokSafeStage`, `getTikTokSafeArea`,
  `TIKTOK_VERTICAL_BALANCE`, or a Y1400 limit in new compositions.
- No new persistent header/footer, scene-number label, or decorative section bar.

## Episode workflow

1. Use the supplied topic, narration and assets; ask only for blocking inputs.
   Verify new facts and provenance rather than copying another story's claims.
2. Add a distinct composition and episode-local data. Preserve existing Genie,
   Terra, Gemini and Mistral compositions and old safe-zone components as history;
   do not silently migrate them or globally replace their shared data.
3. Reuse the Kronos full-canvas patterns and shared overlays. Read imports first:
   isolate episode timing and narration through props/adapters, not legacy globals.
4. Follow the story's rhythm: black hook → off-white reveal → explanation/data
   → limitations/status → closing. Scene count and timing follow the new audio,
   not a copied frame number. Animations remain restrained and frame-driven.
5. Fit copy to the approved columns: shorten/split headlines, body copy and cues
   or add a scene. Do not shrink the entire layout or move overlays to fit text.
6. Derive duration, captions and expression cuts from the current narration.
   Use verified stills; label non-official illustrative imagery `ILUSTRASI`.
7. Reuse/start Studio and report its actual URL and composition ID. Preview by
   default; do not render/export unless requested. Run `npm run lint` after code edits.

## Acceptance gate

- Compare to the full-canvas closing/data references, never legacy photo cards.
- Check canvas bounds, equal margins, headline/body fit, screenshot/URL legibility,
  and collisions among content, watermark, subtitles and the character face.
- Verify **1080 × 1920** and **540 × 960**; scale the complete design uniformly.
- Verify the bottom180 character / bottom215 subtitle anchors in every scene;
  do not let scene-specific artwork or copy fill the approved bottom whitespace.
- Inspect opening, every layout family, longest headline/caption and scene cuts.
- Inspect before/at/after caption boundaries: stable node, box geometry and
  visibility; no artificial blank/faded frames between adjacent cues.
- Inspect expression cuts: identical character position, size and pose canvas;
  no scene transition or motion envelope may restart the character's entrance.
- Preserve all historical images and compositions. Change this baseline only
  when the user explicitly requests it; never infer permission to redesign.

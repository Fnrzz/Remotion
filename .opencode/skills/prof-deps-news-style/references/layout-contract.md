# Layout contract — full-canvas, cardless Kronos baseline

Current approved revision: raised character/subtitles with bottom whitespace,
2026-11-02. The earlier full-canvas bottom100/bottom135 anchors are superseded.

This contract supersedes the **2026-10-31 Genie4 safe-zone positions and photo
cards**. Historical reference images and compositions remain unchanged, but are
not instructions for new work. Never restore their geometry through references.

## Design space and tokens

- Portrait **1080 × 1920**, **30fps**. Preserve 9:16.
- Scale the complete design uniformly by `compositionWidth / 1080`
  (`compositionHeight / 1920` is identical at 9:16), including fonts and overlays.
- Keep CSS placement in design coordinates under a shared responsive transform,
  or scale every dimension consistently; never double-scale nested content.
- Plus Jakarta Sans, loaded before frames appear. Headlines weight 800,
  tracking approximately -0.04em, line-height approximately 1.
- Black `#000000`, off-white `#FAF9F6`, white `#FFFFFF`, slate `#708090`,
  secondary gray `#555555`. Black hook, off-white remaining scenes.
- Minimal editorial texture may remain quiet; no photographic canvas background.

## Editorial geometry — no platform safe zone

| Element                 | 1080 × 1920 design coordinates                                  |
| ----------------------- | --------------------------------------------------------------- |
| Equal editorial margins | left 84, right 84; x84..996; width 912                          |
| Headline                | left 84, top 240, width 912; font 88..112 per scene, weight 800 |
| `ContentStage` outer    | left 84, top 720, width 912, height 660                         |
| Inner authored content  | 636 × 400; top-left origin; scale `912 / 636`                   |
| Main body extent        | bottom Y1380 (`720 + 660`)                                      |

`ContentStage` has **no background, border, border radius, shadow, card, or
padding**. The inner scale is approximately 1.433962; it makes authored diagrams
and typography fit the editorial width, not a TikTok focus region. The inner
400px height becomes approximately 573.58px; it need not fill all 660px.
Do not stretch it vertically or shrink the whole layout to fit new copy.

Y1380 is the main-body extent, **not a platform-UI exclusion or reserved safe
zone**. The canvas continues below it for character and subtitles. There is no
Y1400 limit. Check actual content bounds and collisions, not obsolete UI guides.

Never add a safe-zone PNG or import `TikTokSafeStage`, `getTikTokSafeArea`,
`TIKTOK_VERTICAL_BALANCE`, or old safe-area fitting constants in new compositions.
Equal editorial margins are ordinary page layout, not replacement safe-zone math.

## Independent full-canvas overlays

Use `src/template/FullCanvasOverlays.tsx` once at composition level, outside
scene sequences and the inner content transform. Its coordinates scale with the
design canvas, not with the 636px authored content. Preserve global cue timing.

| Element          | Placement and styling                                                |
| ---------------- | -------------------------------------------------------------------- |
| Watermark        | `@prof.deps` text only; top 108, right 84; font 30/700; opacity 0.58 |
| Character        | width 320, right 84, bottom 180; original 307:272 pose aspect        |
| Character bounds | x676..996, y≈1456.48..1740; height ≈283.52                           |
| Subtitle box     | left 84, bottom 215, width 550, height 135                           |
| Subtitle bounds  | x84..634, y1570..1705; 42px gap to character canvas                  |
| Subtitle text    | font 36/600, line-height 1.3; max two lines; centered both ways      |

### Required bottom breathing room

- Preserve the current raised group: character bottom **180px**, subtitle bottom
  **215px** at 1080 × 1920. These are final anchors, not offsets to add again.
- Keep the area below character Y1740 and subtitle Y1705 clear of foreground
  artwork, extra captions, logos, cards, footers or callouts. Subtle existing
  overlay shadows may feather into the gap; do not create a new filled strip.
- Continue the native scene background through the bottom of the canvas.
  Do not lower the overlays or stretch artwork to consume this negative space.
- Scale uniformly: at 540 × 960, character bottom90, subtitle bottom107.5;
  character ends at Y870, subtitle at Y852.5.
- This is approved editorial whitespace, **not platform UI safe-zone fitting**.
  No guides, safe-area imports or legacy Y1400 rules are reintroduced.
- Main-body extent remains Y1380, leaving approximately 76.48px before the
  character canvas. Preserve clearance rather than moving the group downward.

Only subtitles may use a subtle rounded box. Keep contrast appropriate to the
background; no backdrop blur. No logo or TikTok icon in the watermark.
The character stays stationary: only initial opacity fade and narration-timed
expression cuts. Use identical transparent pose canvases/anchors; no bob, shake,
tilt, translation, zoom, rotation, or audio-reactive envelope.
Scene fades must not remount or restart the character's initial fade.

### Stable subtitles

- Keep one persistent fixed-size node across adjacent cues and scene boundaries;
  retain `data-subtitle="stable"` for inspection where used.
- No `key={caption.startMs}`, per-cue entrance/exit, opacity ramp, movement,
  auto-sizing, or changing box geometry. Update only current cue text.
- Reserve two lines even for one-line cues; center text horizontally/vertically.
- Split long text into shorter narration-aligned cues instead of shrinking type,
  widening the box or moving the character. Do not create artificial cue gaps.
- At boundaries inspect the preceding, exact and following frames for flicker,
  remounts, accidental blanks, clipping and unintentional opacity changes.

## Cardless content, screenshots and provenance

- Main content uses direct type, diagrams, editorial rules and unframed stills.
  No background panels, rounded photo cards, mattes, enclosing borders, shadows,
  pills, or decorative UI chrome. Do not reuse `AnimatedImageCard` for new work.
- A deliberate GitHub closing CTA may use a **real repository screenshot** and a
  legible repository URL. Native screenshot UI is evidence, not permission to
  wrap the screenshot in a styled card. Preserve readable cropping and scale.
- No on-screen `Sumber`, source badge or source overlay by default. Keep real
  asset/source URLs, licensing/credits and provenance in episode documentation
  and the upload description. Do not import legacy attribution overlays.
- An editorial repository URL in a CTA is allowed; it is not mandatory source
  furniture. Label non-official illustrative imagery `ILUSTRASI` as appropriate.
- Retain restrained, deterministic frame-driven text/diagram/image reveals.
  Caption box and character geometry remain stable independently of scene motion.

## Canonical implementation and references

Repository-relative paths to inspect before adapting:

- `src/template/NewsTemplate.tsx`: standalone example scenes and layer ordering.
- `src/template/Editorial.tsx`: headlines and the cardless content stage.
- `src/template/FullCanvasOverlays.tsx`: persistent watermark/character/subtitles;
  takes captions and public-relative expression image cues through props, with
  no episode-global data imports. Empty cues intentionally omit the character.
- `src/index.ts`, `src/template/Root.tsx`, `src/fonts.ts`: registration and fonts.
- `public/assets/images/charactersheet/`: preserve original expression assets.

New visual references (skill-relative):
`../assets/approved-full-canvas-raised-closing.png` and
`../assets/approved-full-canvas-raised-data.png`. Captured from Kronos frames 1350 and
590 respectively in `.preview/kronos/raised-overlays/stills/` on 2026-11-02.
Follow this contract and canonical implementation, not an old image as a fallback.
Only these two current references are published with the reusable skill.
Earlier `approved-*` images, if present locally, remain untouched historical
records, not instructions. None may restore safe-zone placement, photo cards,
on-screen source text or old watermark logos.

Historical episode compositions, if present locally, are not silently migrated
and are not required by the template. New episodes get distinct registration
and episode-local data/props; never globally overwrite another episode's timing.
Keep production episodes/media/research out of template commits, as specified
in the root README and `.gitignore`.

## QA and delivery

Use Studio by default; **no rendering/export unless requested**. Run
`npm run lint` after implementation changes. Check at 1080 × 1920 and 540 × 960:
canvas bounds, equal margins, headline fit, body extent, bottom180/bottom215
whitespace, all content/overlay
collisions, longest captions and repository URL readability. Inspect every layout
family and scene cut, plus subtitle boundaries and character expression cuts.
Report the actual preview URL/composition ID; do not change dependencies, global
configuration or historical references as an incidental styling fix.

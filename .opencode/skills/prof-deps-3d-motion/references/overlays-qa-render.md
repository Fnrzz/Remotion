# Overlays, QA and delivery

The 3D scene is the picture; the Prof Deps overlay system is the brand. Keep
the overlay anchors identical to `prof-deps-news-style` so a 3D episode still
feels like the same channel.

## Layer order

```tsx
<AbsoluteFill style={{ backgroundColor: PALETTE.offWhite }}>
  <OfficeWorld />
  <DesignSpace>
    <PixelOffice />
    <WorldLabels />
    <SceneTypography />
    <TerminalSplit />
    <OfficeSideLabel />
  </DesignSpace>
  <ProfDepsOverlay /> {/* watermark, host, subtitles */}
  <Audio src={staticUrl} />
</AbsoluteFill>
```

- `OfficeWorld` is the full-frame canvas.
- `PixelOffice` sits directly above the 3D so it can crossfade in place.
- Typography and terminal UI are inside `DesignSpace` so they scale with the
  1080 × 1920 design canvas.
- Host and subtitles are the topmost graphics, outside scene sequences. They
  must never remount, fade or move when a scene changes.

## Locked anchors at 1080 × 1920

| Element        | Placement                       | Style                                             |
| -------------- | ------------------------------- | ------------------------------------------------- |
| Watermark      | top 108, right 84               | `@prof.deps`, 30/700, black, opacity 0.58         |
| Host           | right 84, bottom 180, width 320 | 307:272 aspect, object-fit contain, bottom center |
| Subtitle box   | left 84, bottom 215, 550 × 135  | white 0.92, 1 px black 0.07 border, radius 18     |
| Subtitle text  | centered, 2 lines max           | 36/600, line-height 1.3, black                    |
| Headline block | left 84, top 240, width 912     | see below                                         |
| Kicker         | inside block                    | 26/800, tracking 0.055em, gray, uppercase         |
| Headline       | below kicker, mt 26             | 82–112/800, tracking −0.045em, line-height 1.03   |
| Support        | mt 24                           | 30/700, line-height 1.35, ink                     |
| Repo           | mt 22 + rule + 16               | 23/700, gray                                      |
| Disclosure     | block top −52                   | 18/700, tracking 0.16em, black 0.42               |

At **540 × 960**, halve every dimension: host 160 wide, right 42, bottom 90;
subtitle left 42, bottom 107.5, 275 × 67.5.

## Scene typography

- One authored block per story beat, each its own JSX node.
- Kicker names the idea; headline is 1–2 short lines, often with a slate accent
  line; support adds one sentence; repo only in the closing.
- The top scrim is part of the typography layer: empty state must never let 3D
  props collide with the headline.

Reference scrim:

```tsx
background: "linear-gradient(180deg, #FAF9F6 0%, #FAF9F6 70%, rgba(250,249,246,0.96) 78%, rgba(250,249,246,0.55) 88%, rgba(250,249,246,0) 100%)";
height: 660;
```

For the closing `holdEnd` block, add a taller scrim (height ~700, solid to 86%,
transparent by 100%) so the repository URL is on clean off-white above the
terminal split at y 660.

## Host cues

- The original Prof Deps presenter assets. Never substitute an AI robot or an
  unrelated character.
- Assets: `public/assets/images/charactersheet/karaktersheet-r1c4.png`
  (surprised), `r1c3` (friendly), `r1c5` (thinking), `r2c3` (thumbs-up). Use
  these transparent single-pose files, not the full sheet.
- Use contiguous cues from 0 ms to the end. A gap is a bug, not a stylistic
  pause.
- The host is stationary. Only the image changes, at narration beats. No CSS
  motion, no bob, no slide.
- The first cue must be visible at frame 0: do not apply an entrance fade to the
  very first cue unless the user explicitly asks.
- Expression map for a typical explainer:
  - Hook / surprise: `r1c4`
  - Friendly intro: `r1c3`
  - Terminal / careful explanation: `r1c5`
  - Stand-up / Kanban / reveal: `r1c4`
  - Backend / demo: `r1c5`
  - Meaning / proud: `r1c3`
  - Closing / approval: `r2c3`

Keep the host face clear of the subtitle box and of bright 3D objects. The host
sits over the scene; a drop shadow (`0 8px 16px rgba(0,0,0,0.18)`) separates it
without a card.

## Subtitles

- One persistent fixed node; update only the text.
- Author Indonesian phrases with explicit `\n`; let the box clamp to two lines
  with `-webkit-line-clamp: 2`.
- Make each cue's `endMs` equal the next cue's `startMs`. Adjacent cues with a
  gap produce blank frames.
- Keep narration-synced wording; correct transcription manually. Do not
  paraphrase into longer sentences that overflow.
- Do not animate per-cue entrances, exits, scaling or blur.

## World labels

- Project only essential labels: **BACKEND** and **GATEWAY**.
- Use the same `cameraAt` + `projectToScreen` camera state as the 3D canvas.
- 19/800, tracking 0.14em, ink, with an off-white text shadow.
- Fade in/out with the backend scene; hide when off-screen, never clamp to the
  edge.
- Remove redundant projected terminal/log/dashboard/HERMES3D labels. The 3D
  set already carries the sign and screens.

## Closing terminal split

- Left panel: left 0, top 660, width 448, height 1260, `#080A0B`.
- Header: 74 high, `#0E1214`, three dots, `AGENT RUNTIME`, LIVE dot.
- `ILUSTRASI KONSEPTUAL` at 14/700, tracking 0.16em, white 0.26.
- 16 terminal lines, 21 px, 0.18 s/line reveal; typing at ~0.012 s/char.
- Footer `SIMULATED STREAM` + percent at top 1186; progress bar at top 1236.
- Ghost `CLI` at bottom right, white 0.03.
- Slide in from the left over 14 frames at the closing beat.
- The office remains visible on the right; the side label `KANTOR 3D` at left
  488, top 664, amber dot + 18/800 tracked ink.

## Disclosure

- Use `ILUSTRASI KONSEPTUAL` for any simulated telemetry, backend diagram,
  demo mode, or pixel-map sequence.
- Place it above the headline block (top −52) or inside the terminal header.
- Do not hide it behind the host or subtitles.

## QA checklist

### Composition

- 1080 × 1920 at 30 fps; also inspect 540 × 960.
- Host, subtitles and watermark at the exact anchors in every scene.
- No host gap; host face visible and unobstructed.
- No subtitle clipping; max two lines; contiguous cues.
- Headline / support fit within x84..996 and never collide with the scrim edge.

### 3D

- Real 3D renders on the first frame; no blank canvas or loading flash.
- One office layout across every shot.
- Camera clips: check the hook, terminal close-up, working wide, stand-up,
  Kanban, overhead, backend, demo, meaning and closing.
- No geometry between camera and subject; no inside-the-wall frames.
- Agents: feet on floor, no teleport, no desk intersection, walk phase synced.
- Kanban: no z-fighting, cards readable, moving card above the board.
- Screens: text bars legible, one amber accent, no flicker.
- Backend/gateway: labels readable, event dot travels the path, office visible.

### Pixel mode

- The 3D camera is already overhead when the 2D overlay starts.
- Same room, desks, board, plants and agents at the same coordinates.
- Agent positions match at the fade edges (sample both sides at 30 fps).
- Sprites sorted by world z; no agent hidden behind a desk.
- Fade is smooth; no white flash or hard pop.

### Closing

- Terminal reveals at 0.18 s/line; no clipped line.
- Repo URL fully legible on off-white.
- Host thumbs-up does not cover the URL or terminal text.
- Last frame still shows the host and closing composition.

## Render recipe

Only render when the user explicitly asks.

```bash
npx remotion render src/index.ts <CompositionId> out/<episode>.mp4 \
  --codec=h264 --crf=18 --audio-codec=aac \
  --image-format=png --pixel-format=yuv420p
```

Why these flags:

- `--image-format=png` + `--pixel-format=yuv420p` produces standard
  limited-range `yuv420p`. The JPEG pipeline tags full-range `yuvj420p`, which
  some platforms re-encode badly.
- `--crf=18` is the approved quality/size point. Keep 17–19.
- `--audio-codec=aac` keeps the VO in AAC for MP4.

Verify:

```bash
ffprobe -v error -show_entries format=duration,size \
  -show_entries stream=codec_type,codec_name,width,height,pix_fmt,r_frame_rate,sample_rate,channels \
  -of default=noprint_wrappers=1 out/<episode>.mp4

ffmpeg -v error -i out/<episode>.mp4 -f null -
ffmpeg -hide_banner -i out/<episode>.mp4 -af volumedetect -f null -
```

Expected:

- H.264 video, AAC audio, 1080 × 1920, 30/1, `yuv420p`.
- Duration equals `DURATION_IN_FRAMES / 30`.
- Full decode exits 0.
- Audio peak below 0 dB (Hermes3D reference: max −1.2 dB).
- Extract and inspect the first frame, one frame per scene, both pixel fade
  edges, and the final frame.

## Production workflow

1. `ffprobe` the supplied VO; derive `DURATION_IN_FRAMES`.
2. Transcribe locally; author phrase cues with explicit line breaks.
3. Map story beats to `SCENES`; retime camera, host, agent and overlay data.
4. Build the one office, the agents and the camera path.
5. Add typography, host cues, subtitles and closing terminal.
6. Preview in Studio at `/<composition-id>`; keep it running.
7. Render QA stills; fix framing, collisions, z-fighting and fade pops.
8. `npm run lint`; fix type/lint errors.
9. Render only when requested; verify the MP4 and report the path.

## Known failure modes

- **Host missing in a scene:** cue gaps. Make cues contiguous; first cue must
  exist at 0 ms.
- **Blank subtitle frames:** non-contiguous `endMs` / `startMs`.
- **Kanban cards disappear:** coplanar z. Lift columns to 0.11, moving cards
  to 0.14.
- **Terminal never fully leaves:** fade-out window or data burst extends past
  the office reveal.
- **Camera clips a wall:** widen FOV / move the key outward; never shrink the
  set to hide it.
- **Label sits on the host:** project and inspect at the exact label frames.
- **Repo URL dirty:** add the closing-only taller scrim; do not add a card.
- **Pixel agents pop:** the 2D overlay started before the camera was overhead
  or uses a different world mapping.
- **Washed-out MP4 on upload:** re-render from PNG frames with `yuv420p`.

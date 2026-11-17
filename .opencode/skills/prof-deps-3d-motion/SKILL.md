---
name: prof-deps-3d-motion
description: Build Prof Deps 3D motion videos in the approved procedural voxel-office style. Use for any 3D scene, camera choreography, voxel AI agent, isometric office, 3D-to-2D pixel transition, or 3D revision in this project. Locks real React Three Fiber rendering, cinematic camera language, palette, lighting, character poses, host/subtitle anchors, and H.264 delivery based on Hermes3D.
---

# Prof Deps — procedural 3D motion style

Approved baseline: episode 014 **Hermes3D** (2026-11-17). Future 3D episodes
inherit this language. It extends the approved full-canvas/cardless overlay
contract in `prof-deps-news-style`; it never replaces it.

## Read first

1. Load `remotion-best-practices`, then `prof-deps-news-style`, then the
   relevant Remotion task skill (usually `remotion-create` / `remotion-markup`).
2. Read [world, camera and agents](references/world-camera-agents.md),
   [set, light and pixel mode](references/set-light-pixel.md), and
   [overlays, QA and render](references/overlays-qa-render.md) in full.
3. Inspect the approved stills:
   [hook](assets/approved-3d-hook.png),
   [Kanban](assets/approved-3d-kanban.png),
   [pixel mode](assets/approved-3d-pixel.png),
   [backend](assets/approved-3d-backend.png),
   [closing](assets/approved-3d-closing.png).
   These are preview references, never media to insert.
4. If the local Hermes3D implementation still exists, read
   `src/hermes3d/HermesEpisode.tsx`, `world.ts`, `Character.tsx`,
   `OfficeWorld.tsx`, `OfficeProps.tsx`, `PixelOffice.tsx`, `Overlays.tsx`,
   and `data.ts`. It is episode-local and Git-ignored; a fresh clone may not
   have it, so these references are the source of truth.
5. Preserve newer user edits. Do not migrate or restyle an existing episode
   unless asked.

## Locked style

- **Real 3D only.** `@remotion/three` `<ThreeCanvas>` + `@react-three/fiber` +
  `three`. Build the office, agents and props procedurally. No static office
  photos, no sprite sheets, no pre-rendered 3D plates, no CSS fake-3D.
  The only 2D exception is the authored pixel-art mode overlay.
- **One persistent world.** Every shot moves the camera through the same
  office. Never rebuild or redecorate the room between scenes.
- **Portrait 1080 × 1920, 30 fps.** Scale the design from these coordinates.
- **Voice-over is the master clock.** Derive duration, scene windows, captions,
  host expressions and agent beats from the supplied VO. Never regenerate or
  replace the narration unless explicitly asked.
- **Prof Deps palette.** Black `#000000`, off-white `#FAF9F6`, white `#FFFFFF`,
  slate `#708090`, gray `#555555`. The 3D set adds warm floor/wall neutrals,
  charcoal furniture, muted sage/sand/slate agents and sparse amber accents
  (`#C08A4E`). No saturated brand colors.
- **Editorial daylight.** Bright, soft, architectural. No moody neon, bloom,
  volumetric fog, lens flares or cinematic teal/orange grading.
- **Restrained motion.** Slow dolly/push-in camera moves, walk cycles, typing,
  gestures, one overhead transition. No camera shake, Dutch angles, whip-pans
  or random orbiting.

Compatible stack: `@remotion/three@4.0.539`, `three@0.187.0`,
`@react-three/fiber@9.8.2`, dev `@types/three@0.187.0`. Do not upgrade these
unprompted; follow `remotion-upgrade` if a version change is required.

## Must-keep overlays

These values come from `prof-deps-news-style` and are non-negotiable in 3D
episodes too:

- Watermark: text `@prof.deps`, top 108, right 84, 30/700, opacity 0.58.
- Host: original Prof Deps presenter, width 320, right 84, bottom 180,
  aspect 307:272, `objectFit: contain`. Continuous presence from frame 0 to
  the end; narration-timed expression cuts only. No bob, slide, zoom or shake.
- Subtitles: one stable box, left 84, bottom 215, 550 × 135, 36/600,
  line-height 1.3, max two centered lines. Author explicit `\n`; keep cues
  contiguous so no frame is blank.
- Scene typography: left 84, top 240, width 912; kicker 26/800 tracked;
  headline 82–112/800 tight; optional slate accent line; support 30/700.
- No main-content cards, TikTok safe zones, scene numbers, headers or footers.
  The only rounded surface is the subtitle box; the 3D terminal UI is diegetic.

## Composition architecture

Use episode-local files. Only promote to `src/template/` when the piece is truly
reusable.

| File                | Responsibility                                                                                                              |
| ------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| `world.ts`          | Pure data/time: palette, office layout, scene windows, agent schedules, camera keys, `cameraAt`, `projectToScreen`, easing. |
| `Character.tsx`     | Procedural voxel agent rig and pose blending.                                                                               |
| `OfficeProps.tsx`   | Floor, walls, desks, chairs, Kanban, terminal, backend, demo, plants, trails.                                               |
| `OfficeWorld.tsx`   | `ThreeCanvas`, lights, `CameraRig`, scene visibility windows.                                                               |
| `PixelOffice.tsx`   | Full-frame SVG pixel mode using the same world coordinates and agent states.                                                |
| `Overlays.tsx`      | Host, subtitles, text blocks, scrims, world labels, closing terminal split.                                                 |
| `data.ts`           | Captions, text blocks, host cues, timing constants.                                                                         |
| `HermesEpisode.tsx` | Layer order and `<Audio>`.                                                                                                  |
| `Root.tsx`          | Register the composition at 1080 × 1920, 30 fps.                                                                            |

Layer order (bottom to top): `OfficeWorld` → `DesignSpace` (`PixelOffice`,
`WorldLabels`, `SceneTypography`, `TerminalSplit`, `OfficeSideLabel`) →
`ProfDepsOverlay` (watermark, host, subtitles) → `Audio`.

Use `@remotion/media` `<Audio>` with `staticFile()` for the VO, and load Plus
Jakarta Sans once through `src/fonts.ts`.

## Scene grammar

Keep the story arc, retime it to the new VO:

1. **Hook** — wide 3/4 establishing shot of the whole office; off-white
   typography; host already visible.
2. **Reveal** — slow push-in while a presenter agent talks; introduce the
   project name and the one-sentence premise.
3. **Contrast** — terminal/log/dashboard close-up or overlay to show the old,
   invisible way; `ILUSTRASI KONSEPTUAL` when simulated.
4. **Work** — wide-ish shot of agents at desks, walking, typing.
5. **Stand-up** — meeting circle; presenter gestures, listeners nod.
6. **Kanban** — board-facing shot; cards move; agents reach.
7. **3D → 2D** — camera rises to overhead; crossfade to the pixel-art map at
   the top of the move; hold, then return to 3/4.
8. **Backend/gateway** — show the connection, not an "AI brain"; labels
   BACKEND and GATEWAY; keep the office visible.
9. **Demo** — label the simulation; never claim the visual is real telemetry.
10. **Meaning** — pull back to the whole office; host proud.
11. **Closing** — terminal split on the left, office on the right, host
    thumbs-up; repo URL on clean off-white.

## 3D → 2D handoff

- Put the 2D fade inside the overhead camera hold. In Hermes3D: 3D rises at
  ~29.8 s, 2D starts 30.25 s, full 30.5 s, fades 31.4–31.75 s.
- The 2D SVG must use the same world → screen mapping and the same
  `getAgentState` results; otherwise agents pop between modes.
- No sprite sheets: draw pixel agents as blocky SVG rects, sorted by world Z.

## Episode workflow

1. `ffprobe` the VO; set `DURATION_IN_FRAMES = ceil(duration × 30)`. Never trim
   the narration to a guessed length.
2. Transcribe locally and author Indonesian phrase cues with explicit line
   breaks. Keep cues contiguous.
3. Map story beats to scene windows; keep one world and one camera path.
4. Author agent schedules in seconds, with `at` or `path`, facing, pose and
   variant. Check continuity and prop clearance.
5. Build the set and light rig; add only props the story needs.
6. Build overlays, host cues and the closing split.
7. Preview in Studio. Render representative stills at every scene, camera key,
   caption boundary, pixel fade edge and closing URL.
8. Run `npm run lint`. Render only when explicitly requested; verify with
   `ffprobe` and a full decode.

## Acceptance gate

- Real 3D renders; no static office image or fake perspective.
- One office layout across every shot and the 2D map.
- Host present from frame 0 through the end, with no gap scene.
- Subtitles: two lines max, no clipping, contiguous, stable box.
- Anchors: host bottom 180 / right 84; subtitles left 84 / bottom 215;
  watermark top 108 / right 84; at 1080 × 1920 and 540 × 960.
- Camera: no wall/desk clipping, no floor horizon through the set, no empty
  frame; labels readable over the 3D.
- Agents: feet on the floor, no teleporting, walk phase matches travel,
  poses blend; no agent intersects a desk.
- Kanban: no z-fighting; cards readable; moving cards above columns.
- Pixel mode: aligned room, aligned agents, no pop at either fade edge.
- Closing: repo URL legible on off-white; terminal reveals at 0.18 s/line.
- MP4: H.264/AAC, 1080 × 1920, 30 fps, `yuv420p` limited range, CRF 18,
  duration matches, decode clean, audio peak below 0 dB.

## Pitfalls

- **Host gaps:** use contiguous cues; the first cue must render at frame 0, so
  do not fade it in from zero unless the user asks.
- **Caption blank frames:** make each cue start exactly when the previous ends.
- **Kanban z-fighting:** lift cards/headers off the panel (z 0.11, moving cards
  0.14) and set board depth explicitly.
- **Terminal fade:** end at 16.55–16.9 s in the reference and cut the data
  burst before 17 s.
- **Camera clipping:** widen the hook, working, Kanban and backend framings;
  keep targets near the room center and above y ≈ 1.4.
- **Projected label clutter:** keep only BACKEND and GATEWAY; remove redundant
  TERMINAL/LOG/DASHBOARD/HERMES3D labels.
- **Closing URL:** a taller closing-only off-white scrim (height ~700) keeps the
  repo line clean above the terminal at y 660.
- **Pixel pop:** fade the 2D overlay while the 3D camera is already overhead,
  and drive both from the same time state.
- **JPEG color range:** default JPEG frames produce `yuvj420p`; use PNG frames
  and `--pixel-format=yuv420p` for platform-safe delivery.

## Render recipe

Only after approval:

```bash
npx remotion render src/index.ts <CompositionId> out/<episode>.mp4 \
  --codec=h264 --crf=18 --audio-codec=aac \
  --image-format=png --pixel-format=yuv420p
```

Verify:

```bash
ffprobe -v error -show_entries format=duration,size \
  -show_entries stream=codec_type,codec_name,width,height,pix_fmt,r_frame_rate,sample_rate,channels \
  -of default=noprint_wrappers=1 out/<episode>.mp4
ffmpeg -v error -i out/<episode>.mp4 -f null -
```

Expected: 1080 × 1920, 30/1, `yuv420p`, H.264 + AAC, duration equal to
`DURATION_IN_FRAMES / 30`, clean decode.

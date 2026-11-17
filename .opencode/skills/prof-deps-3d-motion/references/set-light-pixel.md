# Set, light and 2D pixel mode

The office is a designed diorama, not a photoreal interior. Build it from
boxes, cylinders, planes and canvas text planes. Every prop must read as a
silhouette at 540 × 960.

## Palette tokens

```ts
export const PALETTE = {
  black: "#000000",
  offWhite: "#FAF9F6",
  white: "#FFFFFF",
  slate: "#708090",
  gray: "#555555",
  ink: "#1E2226",
  floorA: "#F1EEE7",
  floorB: "#E7E3DA",
  floorLine: "#D9D4C9",
  wall: "#F6F3ED",
  wallShade: "#EAE5DC",
  deskTop: "#E5DFD3",
  deskTopEdge: "#D1CABB",
  deskDark: "#34383D",
  deskDarker: "#262A2E",
  chair: "#2E3236",
  plant: "#7E8C7C",
  plantDark: "#647260",
  screen: "#0D1114",
  screenGlow: "#E8F2EF",
  amber: "#C08A4E",
  sand: "#B4A38D",
  sage: "#87938C",
  paleSlate: "#AEBCC6",
} as const;
```

- Walls and floor: warm off-white.
- Desks: light tops, charcoal legs and storage.
- Chairs and screens: near-black.
- Accents: sage, sand, pale slate; amber only for live/status/one moving card.
- Never introduce a saturated secondary brand color.

## Materials

- `meshStandardMaterial` everywhere.
- Roughness **0.8–0.98** for wood, fabric, walls, plastic.
- Metalness **0** except tiny screen bezels; avoid chrome.
- Screens: near-black `#0D1114`, with pale emissive text lines
  (`toneMapped={false}` for crisp type).
- Use `Part` (a box mesh helper) for 80% of the set. Reserve custom geometry
  for cylinders (mugs, table legs), rings (rug), and canvas text planes.
- No `MeshPhysicalMaterial`, transmission or glass. No bloom/postprocessing.

## Floor

- Base box: **14.9 × 0.4 × 20** at y −0.22, color `#E9E3D8`.
- Plinth: **15.5 × 0.08 × 20.6** at y −0.43, color `#C9C3B7`.
- Walkable floor: **13 × 18 plane** at y 0.001 with a procedural canvas tile
  texture.
- Tile texture: 512 × 512 canvas, 2 × 2 tiles of 256 px, alternating
  `floorA` / `floorB`, 5 px seams `floorLine`, a 2 px highlight inset; repeat
  **6.5 × 9**, `SRGBColorSpace`, anisotropy 16.
- Dark perimeter trim: 0.08 high along the front and both open sides.
- The floor must stay bright; no large dark shadows that swallow the agents.

## Walls and signage

- Back wall: 13.4 × 5.2 × 0.26 at z −9.12, warm wall color.
- Left wall: 0.26 × 4.8 × 8.3 at x −6.62.
- Right wall: 0.26 × 4.8 × 5.0 at x 6.62, stopping before the camera side.
- Top trim: charcoal, 0.16 high. Base trim: dark, 0.2 high.
- Vertical seams every ~2 units, 0.018 wide, `#E6E1D7`.
- Large black wall sign `HERMES3D / VIRTUAL OFFICE`, built as a black box plus a
  `TextPlane` (canvas texture), not a flat image.
- Optional `OPS / 014` poster, wall clock, and open shelves with boxes and
  plants. Props must be signed to the world, not random noise.

## Props

### Desk (per workstation)

- Top: **2.15 × 0.095 × 1.02** at y 0.79, `deskTop`.
- Four legs 0.075 × 0.78; back modesty panel; under-desk drawer block with two
  slate handle lines.
- Monitor: 0.5 × 0.035 × 0.3 base, 0.075 × 0.36 stand, screen plane with
  animated text lines.
- Keyboard: 0.95 × 0.032 × 0.31, key grid from small boxes.
- Mouse, two paper sheets, mug, tiny plant, and a name plate (`ALPHA` etc.).
- Chair at local `[0.18, 0, 0.7]`, rotated π.
- The desk group is positioned by `WORKSTATIONS[id].pos` and rotated by
  `rotation`; never duplicate coordinates.

### Chair

- Seat, back, five-star base with five short spokes; near-black.
- Keep the silhouette simple: it should read at thumbnail size.

### Meeting area

- Stand-up rug: circle radius **2.25** at `[0.2, 0.02, -1.0]`, slightly darker
  off-white, ring border, `STAND-UP` text plane at 0.55 opacity.
- Meeting table: cylinder radius 1.05 at `[1.3, 0, -4.8]`, center pedestal,
  four chairs around at radius 1.3, one mug and two paper sheets.
- Meeting agents stand on the circle, not on the table.

### Kanban board

- Board group at `[3.6, 2.75, -9.0]`; black outer frame **5.7 × 3.05 × 0.12**,
  inner warm panel **5.44 × 2.8 × 0.05** at z 0.06.
- Three columns (`TODO`, `DOING`, `REVIEW`) at x −1.78, 0, 1.82, z **0.11**.
- Column titles via text planes; two static cards per column; one accent bar per
  card.
- Moving card at z **0.14** plus a small pop; never share the column z. The
  reference moves at 25.25, 42.35 and 49.4 s.
- Keep the board off-white with gray text and a single amber card accent.

### Terminal cluster (old way)

- Three dark panels floating at the left/back of the room; main screen, log
  screen, dashboard screen.
- Screen content is pale text bars, not real text; one amber status line.
- Visible only during the terminal scene; scale/fade in 10.7–11.15 s and out
  16.55–16.9 s.
- Add a small burst of data particles as the office is revealed, but cut it
  before 17 s.

### Backend / gateway (conceptual architecture)

- Backend node at `[-1.6, 6.2, -10.5]`, gateway at `[-4.6, 3.4, -3.0]`.
- Boxes with one accent face; thin connecting lines/curves; a traveling event
  dot.
- HTML labels BACKEND/GATEWAY project from these points; no 3D text labels
  needed.
- Show the office below; the architecture is a layer over the world, not a
  separate scene.

### Demo sign

- A physical sign or panel near the presenter, with `DEMO MODE` and
  `SIMULASI` / `ILUSTRASI KONSEPTUAL`.
- Reveal at 37.55 s; keep it diegetic, not a full-screen card.

### Plants, pendants, shelves, break area

- Plants: stacked spheres/boxes in sage, dark sage; pot in off-white.
- Pendants: cone/cylinder shade, thin black cable, warm emissive bulb.
- Shelves: dark thin slabs with boxes, binders and plants.
- Break area: simple counter, stools, mugs; only if it is in shot.
- All decorative props must be `React.memo` or part of a memoized static group.

## Lighting rig

```tsx
<color attach="background" args={[PALETTE.offWhite]} />
<ambientLight intensity={1.15} color="#FFFDF7" />
<hemisphereLight args={["#FFFFFF", "#D8D1C5", 1.15]} />
<directionalLight position={[10, 16, 12]} intensity={1.7} color="#FFF8EC" />
<directionalLight position={[-9, 11, 5]} intensity={0.55} color="#DEE8EA" />
<directionalLight position={[0, 8, -12]} intensity={0.4} color="#FFFFFF" />
```

- Warm key from front-right, cool fill from left, soft white back light.
- No shadow maps required: use baked circle contact shadows under agents and
  furniture. If you enable shadows, keep them soft and low-resolution; crisp
  black shadows break the editorial daylight.
- `dpr={1}` on `ThreeCanvas` for deterministic, fast rendering.
- `gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}`.
- Camera near 0.1, far 320.

## Performance and z-fighting

- Memoize the static set (`OfficeFloor`, `OfficeWalls`, plants, rug, table,
  pendants) in one `StaticOffice` memo.
- Only agents, screens, clock, Kanban cards, backend and trails re-render per
  frame.
- Offset coplanar decals by **0.01–0.03** along the normal. Board columns at
  z 0.11 and cards at 0.14 exist specifically to avoid z-fighting.
- Keep geometry counts modest: boxes and cylinders; no high-poly spheres except
  plant blobs and clock faces.
- Do not use `Math.random()` in geometry; seeded `random()` only if variation is
  needed.

## 2D pixel mode

The 2D mode is a full-frame procedural SVG overlay, not an image or sprite
sheet. It uses the same world coordinates and the same agent states as the 3D
scene.

### Mapping

```ts
const UNIT = 90; // px per world tile
const CENTER_X = 540;
const CENTER_Y = 960;
const TARGET_X = 0.2; // world point at screen center
const TARGET_Z = -0.8;

const sx = (x: number) => CENTER_X + (x - TARGET_X) * UNIT;
const sy = (z: number) => CENTER_Y + (z - TARGET_Z) * UNIT;
```

- `viewBox="0 0 1080 1920"`, `shapeRendering="crispEdges"`.
- Floor: 17 × 26 tiles starting at −8 / −12; alternating `#F0ECE4` / `#E8E3D8`
  with 1 px `#D2CABB` stroke.
- Seeded speckles for texture (opacity 0.18–0.5); no random per frame.
- Major grid lines at x −8, −3, 2, 7 and z −12, −7, −2, 3, 8, 13.
- Back wall band above `sy(-9)`, seams, dark top band, soft wall shadow.
- Then sign, clock, Kanban, stand-up rug + `STAND-UP`, meeting table, desks,
  plants.
- Agents last, sorted by world z ascending, so lower sprites overlap higher
  ones.

### Pixel agents

- Draw from the same `getAgentState(agent, t)`; do not animate a separate loop.
- Sprite rows ~30 px; body/head/limbs as rects; dark visor with two pale eye
  squares; accent chest bar; accessory per agent.
- Walk: two-frame leg alternation driven by the same `travel / 0.62` phase;
  small vertical bob.
- Work: typing arm offset; Kanban/talk: raised arm; facing flip from
  `Math.sin(facing) < -0.2`.
- Shadow ellipse under each sprite.

### Fade windows

Keep the constants in `data.ts`:

```ts
export const PIXEL_MODE_START_SECONDS = 30.05;
export const PIXEL_MODE_END_SECONDS = 31.75;

const opacity =
  smoothstep(START + 0.2, START + 0.45, t) *
  (1 - smoothstep(END - 0.35, END, t));
```

- Start the overlay only after the 3D camera is looking straight down.
- Fade in over ~0.25 s; fade out over ~0.35 s while the camera is still
  overhead.
- If agents appear to jump at the handoff, the mapping or the sample time is
  wrong, not the fade.

## QA for set and pixel mode

- Thumbnail test at 540 × 960: desks, agents, board, sign and screens still
  read.
- No z-fighting on the Kanban, sign, wall seams, posters or screen text.
- No prop floats above the floor or intersects a wall.
- Floor tile seams line up with the 2D grid at both fade edges.
- Pixel agents line up with their 3D positions at the moment of the crossfade.
- No agent is hidden behind a desk or another agent during a story beat.
- All simulated/architecture visuals carry `ILUSTRASI KONSEPTUAL` where needed.

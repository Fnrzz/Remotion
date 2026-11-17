# World, camera and agent choreography

Reusable spatial contract from Hermes3D. Retime the values to the new VO; keep
the one-world rule, the camera grammar and the continuity checks.

## Coordinate system

- 1 unit ≈ 1 floor tile / one agent body scale.
- X: left (−) → right (+). Y: floor (0) → up. Z: back (−9) → front (+9).
- Camera starts front-right and looks toward the room center.
- Office: **13 wide × 18 deep**; back wall at z = −9; sides at x = ±6.5.
- The front and right sides are open so the camera can orbit without hitting a
  fourth wall.

## Shared office layout

```ts
export const OFFICE = {
  width: 13,
  depth: 18,
  backZ: -9,
  frontZ: 9,
  leftX: -6.5,
  rightX: 6.5,
  tile: 1,
} as const;

export const WORKSTATIONS = {
  A: {
    agent: "alpha",
    pos: [-3.35, 3.55],
    rotation: -0.42,
    accent: "#AEBCC6",
    mug: "#FAF9F6",
  },
  B: {
    agent: "beta",
    pos: [3.25, 4.15],
    rotation: 0.5,
    accent: "#B4A38D",
    mug: "#1E2226",
  },
  C: {
    agent: "gamma",
    pos: [-4.0, -0.35],
    rotation: 1.35,
    accent: "#87938C",
    mug: "#FAF9F6",
  },
  D: {
    agent: "epsilon",
    pos: [4.0, -1.1],
    rotation: -1.35,
    accent: "#708090",
    mug: "#C08A4E",
  },
  E: {
    agent: "zeta",
    pos: [-3.75, -6.0],
    rotation: 1.15,
    accent: "#AEBCC6",
    mug: "#B4A38D",
  },
} as const;

export const MEETING = {
  center: [0.2, -1.0],
  presenter: [1.55, -1.0],
  alpha: [-0.9, -0.3],
  beta: [-0.8, -1.95],
  gamma: [0.35, -2.4],
};

export const KANBAN = {
  center: [3.6, 2.75, -8.9],
  width: 5.3,
  height: 2.7,
  watch: [4.5, -7.3],
};

export const BACKEND = {
  pos: [-1.6, 6.2, -10.5],
  gateway: [-4.6, 3.4, -3.0],
};
```

Add a helper to convert a desk's local seat offset into world space; never
hardcode seat positions separately from the desk.

```ts
export const SEAT_LOCAL = [0.18, 0.62] as const;

export const deskSeat = (desk: DeskId): Vec2 => {
  const station = WORKSTATIONS[desk];
  const [x, z] = rotate2D(SEAT_LOCAL, station.rotation);
  return [station.pos[0] + x, station.pos[1] + z];
};

export const deskSeatFacing = (desk: DeskId) =>
  WORKSTATIONS[desk].rotation + Math.PI;
```

## Scene windows

Use a single `SCENES` object in seconds. Scene functions read only this and the
VO; no component invents its own timing.

```ts
export const SCENES = {
  hook: 0,
  intro: 4.25,
  terminal: 10.85,
  working: 16.7,
  standup: 23.0,
  kanban: 24.65,
  mode2d: 26.8,
  backend: 31.6,
  demo: 37.4,
  meaning: 40.3,
  closing: 46.85,
} as const;
```

These are Hermes3D values only. Re-derive from the new narration, then keep the
same order and overlap the 3D transition by 0.2–0.4 s.

## Camera contract

Every camera key holds position, look target and FOV:

```ts
export type CameraKey = {
  t: number;
  pos: Vec3;
  target: Vec3;
  fov: number;
};
```

Approved Hermes3D path (absolute world coordinates). Use it as the starting
grammar; retime `t` and adjust positions if the room changes:

```ts
export const CAMERA_KEYS: readonly CameraKey[] = [
  { t: 0, pos: [13.0, 12.0, 24.0], target: [0.0, 1.2, -1.5], fov: 34 },
  { t: 3.6, pos: [10.5, 10.2, 19.5], target: [0.0, 1.3, -1.4], fov: 35 },
  { t: 4.3, pos: [8.2, 8.8, 17.0], target: [-0.4, 1.5, -1.5], fov: 36 },
  { t: 7.0, pos: [6.6, 7.8, 15.5], target: [-0.6, 1.5, -2.0], fov: 37 },
  { t: 10.4, pos: [5.2, 7.2, 14.5], target: [-0.8, 1.6, -2.4], fov: 38 },
  { t: 11.2, pos: [-1.0, 4.8, 8.0], target: [-6.6, 2.7, -1.0], fov: 36 },
  { t: 14.4, pos: [-1.5, 4.6, 7.6], target: [-6.9, 2.7, -1.2], fov: 34 },
  { t: 15.4, pos: [1.0, 5.0, 10.5], target: [-5.0, 2.5, -0.5], fov: 37 },
  { t: 16.2, pos: [2.2, 6.0, 14.6], target: [-4.2, 2.2, 0.2], fov: 38 },
  { t: 17.4, pos: [2.0, 5.6, 12.4], target: [-3.2, 1.6, 1.6], fov: 37 },
  { t: 19.2, pos: [5.6, 7.2, 19.0], target: [-0.6, 1.5, 0.6], fov: 36 },
  { t: 22.2, pos: [5.4, 5.8, 12.5], target: [-0.6, 1.4, -0.4], fov: 37 },
  { t: 23.8, pos: [5.9, 5.5, 9.0], target: [0.4, 1.2, -1.0], fov: 38 },
  { t: 24.9, pos: [6.6, 5.4, 9.2], target: [0.7, 1.3, -1.2], fov: 38 },
  { t: 25.6, pos: [8.8, 5.8, 9.2], target: [3.8, 2.4, -8.6], fov: 38 },
  { t: 26.6, pos: [8.4, 5.6, 9.0], target: [3.8, 2.5, -8.6], fov: 37 },
  { t: 27.4, pos: [7.0, 6.2, 6.0], target: [2.8, 2.2, -6.8], fov: 36 },
  { t: 28.6, pos: [5.0, 9.0, 5.0], target: [1.2, 1.4, -4.5], fov: 30 },
  { t: 29.8, pos: [1.2, 40.0, 10.0], target: [0.2, 0.2, -1.0], fov: 24 },
  { t: 30.4, pos: [0.8, 52.0, 8.0], target: [0.2, 0.0, -0.8], fov: 23 },
  { t: 31.5, pos: [0.8, 52.0, 8.0], target: [0.2, 0.0, -0.8], fov: 23 },
  { t: 32.1, pos: [9.5, 8.8, 16.5], target: [-1.8, 4.2, -3.4], fov: 42 },
  { t: 33.6, pos: [8.8, 8.2, 15.5], target: [-2.2, 4.4, -3.8], fov: 41 },
  { t: 35.2, pos: [7.8, 7.6, 14.2], target: [-2.4, 4.2, -3.4], fov: 40 },
  { t: 36.4, pos: [5.6, 6.2, 11.5], target: [-1.4, 3.0, -2.2], fov: 37 },
  { t: 37.4, pos: [5.2, 5.4, 10.5], target: [0.4, 1.8, -1.0], fov: 36 },
  { t: 39.4, pos: [4.8, 5.2, 10.0], target: [0.4, 1.5, -1.2], fov: 36 },
  { t: 40.4, pos: [7.2, 7.8, 17.5], target: [-0.5, 1.8, -1.5], fov: 36 },
  { t: 43.6, pos: [8.4, 8.4, 18.5], target: [-0.4, 1.8, -1.5], fov: 35 },
  { t: 46.4, pos: [7.6, 7.4, 16.5], target: [-0.8, 1.7, -1.5], fov: 36 },
  { t: 47.2, pos: [7.0, 6.4, 13.2], target: [-1.8, 1.5, -1.2], fov: 34 },
  { t: 53.5, pos: [6.2, 5.8, 12.0], target: [-1.4, 1.5, -1.2], fov: 34 },
];
```

Interpolate position, target and FOV with `easeInOutCubic`:

```ts
export const cameraAt = (t: number) => {
  let from = CAMERA_KEYS[0];
  let to = CAMERA_KEYS[0];
  for (let i = 0; i < CAMERA_KEYS.length; i++) {
    if (t <= CAMERA_KEYS[i].t || i === CAMERA_KEYS.length - 1) {
      to = CAMERA_KEYS[i];
      from = CAMERA_KEYS[Math.max(0, i - 1)];
      break;
    }
  }
  if (to === from) return { pos: from.pos, target: from.target, fov: from.fov };
  const p = easeInOutCubic(
    clamp((t - from.t) / Math.max(to.t - from.t, 0.00001)),
  );
  return {
    pos: vecLerp(from.pos, to.pos, p),
    target: vecLerp(from.target, to.target, p),
    fov: lerp(from.fov, to.fov, p),
  };
};
```

Apply it every frame from a `CameraRig` inside the canvas:

```tsx
const CameraRig = () => {
  const camera = useThree((state) => state.camera);
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const state = cameraAt(frame / fps);

  camera.position.set(...state.pos);
  if (camera instanceof THREE.PerspectiveCamera) {
    camera.fov = state.fov;
    camera.near = 0.1;
    camera.far = 320;
    camera.updateProjectionMatrix();
  }
  camera.up.set(0, 1, 0);
  camera.lookAt(...state.target);
  camera.updateMatrixWorld();
  return null;
};
```

### Camera rules

- FOV **23–42**. Wide establishing shots ~34–38; close-ups ~34–37; overhead
  ~23–24.
- Keep look targets between y **1.2 and 4.4** and near the room center. A target
  at y 0 makes the horizon slice through props.
- Move slowly. A full establishing push can take 4–6 s; a scene transition
  0.8–1.5 s.
- The only fast move is the deliberate rise to overhead. Hold the overhead
  frame while the 2D overlay crossfades.
- Return from overhead with a 0.6–0.9 s cut/move to a 3/4 shot; do not orbit
  through the floor.
- Verify every key with a still. Widen the framing if a wall, desk or agent
  clips the edge of interest.

### Pinning HTML labels to 3D

Project with the exact same camera state, not a separate Three.js camera:

```ts
export const projectToScreen = (
  point: Vec3,
  camera: { pos: Vec3; target: Vec3; fov: number },
  width = 1080,
  height = 1920,
) => {
  const cam = new THREE.PerspectiveCamera(camera.fov, width / height, 0.1, 240);
  cam.position.set(...camera.pos);
  cam.up.set(0, 1, 0);
  cam.lookAt(new THREE.Vector3(...camera.target));
  cam.updateMatrixWorld();
  const projected = new THREE.Vector3(...point).project(cam);
  return {
    x: (projected.x * 0.5 + 0.5) * width,
    y: (-projected.y * 0.5 + 0.5) * height,
    visible: projected.z > -1 && projected.z < 1,
  };
};
```

Use it for BACKEND/GATEWAY labels only. Add an off-white text shadow so labels
survive both wall and floor backgrounds.

## Agent choreography

Agents are driven by authored time segments, not physics:

```ts
type AgentSegment = {
  start: number; // seconds, VO time
  end: number;
  pose: "walk" | "work" | "idle" | "talk" | "listen" | "kanban";
  path?: readonly Vec2[]; // for walk
  at?: Vec2; // for stationary poses
  facing?: number; // radians
  variant?: string; // pose flavour
};
```

Example: the presenter stays at the meeting point and changes pose on narration
beats; a worker walks to the Kanban board and back.

```ts
delta: [
  { start: 0,     end: 10.7, pose: "talk",   at: MEETING.presenter, facing: Math.PI + 0.22, variant: "delta-open" },
  { start: 10.7,  end: 16.2, pose: "listen", at: MEETING.presenter, facing: Math.PI + 0.05, variant: "delta-listen" },
  { start: 16.2,  end: 22.9, pose: "talk",   at: MEETING.presenter, facing: Math.PI - 0.18, variant: "delta-explains" },
  // ...
],

epsilon: [
  { start: 0,     end: 24.5, pose: "work", at: seatD, facing: faceD },
  { start: 24.5,  end: 25.75, pose: "walk", path: [seatD, [5.2, -3.8], KANBAN.watch] },
  { start: 25.75, end: 31.75, pose: "kanban", at: KANBAN.watch, facing: Math.PI, variant: "epsilon-kanban" },
  // ...
],
```

Resolve a state from the segment, path and eased progress:

```ts
const getAgentState = (agent: AgentId, t: number): AgentState => {
  const segments = AGENT_SEGMENTS[agent];
  const { segment, index } = segmentAt(segments, t);
  const localTime = Math.max(0, t - segment.start);
  const progress = clamp(
    localTime / Math.max(segment.end - segment.start, 0.00001),
  );
  // walk: ease along path, derive facing from a short look-back delta
  // stationary: hold at `at`, blend facing from the previous segment
  // returns { pos, facing, travel, walking, mode, localTime, segmentIndex,
  //           progress, incomingFacing, targetFacing, variant }
};
```

### Agent rules

- Start and end at a real station/meeting point. Do not spawn or vanish.
- Walk paths use 2–4 waypoints that clear desks and chairs. A straight line
  through a desk is a bug even if it looks fine at one frame.
- Walk phase is derived from travelled distance (`travel / 0.62`), so feet stay
  in sync with speed.
- Facing blends over **0.32 s** while walking and **0.42 s** when entering a
  stationary pose. Pose parameters blend over **0.42 s** at segment changes.
- Presenter faces the group; listeners/getters face the presenter. Kanban
  watchers face the board (`Math.PI`).
- Agent heights vary 0.95–1.05 to avoid a clone army.
- Do not let agents overlap each other at the meeting circle; positions above
  are deliberately spaced ~1 m apart.

## Agent look reference

| Agent   | Body      | Dark      | Accent    | Visor     | Accessory | Height |
| ------- | --------- | --------- | --------- | --------- | --------- | ------ |
| alpha   | `#5D6D7A` | `#3D4A54` | `#DCE6EA` | `#C8DDE3` | headset   | 1.00   |
| beta    | `#737E86` | `#4A535A` | `#C5B39B` | `#F2EEE4` | cap       | 0.97   |
| gamma   | `#87938C` | `#5D6962` | `#C8BBA6` | `#E9F1EC` | beanie    | 0.95   |
| delta   | `#363B40` | `#24282C` | `#BAC7CF` | `#E8F2F4` | scarf     | 1.05   |
| epsilon | `#8C8478` | `#5F594F` | `#E4DBCB` | `#EFF3F2` | antenna   | 0.98   |
| zeta    | `#626B72` | `#424A50` | `#AFC0C8` | `#E3EEF0` | visor     | 0.99   |

The presenter is **delta**: darkest body, scarf accent, tallest. Keep that
hierarchy unless the user asks for a different cast.

## QA for world and camera

- Every camera key still: no clipping, no empty frame, no geometry between the
  camera and the subject.
- Agent continuity: sample every segment boundary ±0.1 s; no teleport, no
  facing snap, no floating feet.
- Walk paths: watch the full walk at 30 fps; feet slide or cut through desks is
  a fail.
- Kanban move: sample at start, mid-pop and end; no card behind the board.
- Labels: project BACKEND/GATEWAY at the exact frames they are visible; check
  they do not sit on a subtitle, host face or headline.

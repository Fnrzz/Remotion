# OpenCode setup for this Remotion project

This folder contains the project-local OpenCode configuration.

```text
.opencode/
├── opencode.json           # project config: default agent + formatter
├── agents/
│   └── remotion.md         # "remotion" primary agent (Remotion video engineer)
└── skills/                 # 12 Remotion skills + 2 custom Prof Deps skills
    ├── remotion-best-practices/   (router)
    ├── remotion-captions/
    ├── remotion-create/
    ├── remotion-docs/
    ├── remotion-interactivity/
    ├── remotion-maps/
    ├── remotion-markup/
    ├── remotion-multimedia/
    ├── remotion-render/
    ├── remotion-saas/
    ├── remotion-studio/
    ├── remotion-upgrade/
    ├── prof-deps-news-style/
    └── prof-deps-3d-motion/
```

## Usage

Run OpenCode from this directory:

```bash
# From the cloned repository root:
opencode
```

The `remotion` agent is selected by default. It routes to the right skill per
task, previews in Remotion Studio before building, and only renders when you
explicitly ask for it.

To use a different agent for one session, pick another agent in the TUI
(e.g. `build` or `plan`).

## Notes

### Reuse the approved video style

The project skill `prof-deps-news-style` records the approved Prof Deps visual
identity and full-canvas cardless layout: no TikTok safe-zone guide or fitting,
no main-content cards, stable subtitles, stationary character, text-only watermark,
and source credits in documentation rather than scene overlays. Its current
contract and two preview references record the approved Kronos layout.
The portable implementation is in `src/template/`, independent of old episodes.
The `remotion` agent loads it for new videos and visual revisions. Previous
production episodes and their media are no longer present in this template
checkout; keep future production episodes local and Git-ignored.

Example request:

```text
Use @prof-deps-news-style to make a new video about [topic].
Keep the approved style and positions. Use [narration file] and preview only.
```

Location: `.opencode/skills/prof-deps-news-style/`. To use it in another project,
copy the entire directory, then bring over the reusable template/assets listed
in `references/layout-contract.md`. The skill is project-local, not globally
installed. If it is not listed in an already-open session, start a new session.

### Reuse the approved 3D motion style

The project skill `prof-deps-3d-motion` records the approved procedural
voxel-office language from episode 014 Hermes3D: real React Three Fiber
rendering, one persistent office world, cinematic camera keys, six voxel agents
with authored schedules, warm editorial lighting, a 3D→2D pixel-art handoff,
and the same Prof Deps overlay anchors. It includes technical references for
world/camera/agents, set/light/pixel mode, and overlays/QA/render, plus five
approved stills.

Example request:

```text
Use @prof-deps-3d-motion to make a new 3D episode about [topic].
Keep the approved voxel office, camera grammar and overlay anchors.
Use [narration file] and preview only.
```

Location: `.opencode/skills/prof-deps-3d-motion/`. Load it after
`prof-deps-news-style`; the 3D skill extends the scene layer, while the news
skill keeps the full-canvas cardless overlay contract. The skill is
project-local, not globally installed. If it is not listed in an already-open
session, start a new session.

### Skill maintenance

- Skills are discovered automatically from `.opencode/skills/`. That is the
  canonical, project-local location; there is no separate `.agents` or
  `.claude` mirror.
- To refresh vendor skills, install the updated skill folders directly into
  `.opencode/skills/` and keep the custom Prof Deps skills untouched.
  `skills-lock.json` records the vendor skill sources and hashes.
- Skill references inside each `SKILL.md` are relative to that skill's own
  directory, so keep the whole tree when copying.

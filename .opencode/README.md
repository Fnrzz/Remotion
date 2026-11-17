# OpenCode setup for this Remotion project

This folder contains the project-local OpenCode configuration.

```text
.opencode/
├── opencode.jsonc          # project config: default agent + formatter
├── agents/
│   └── remotion.md         # "remotion" primary agent (Remotion video engineer)
└── skills/                 # all 12 Remotion skills, copied from .agents/skills
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
    └── remotion-upgrade/
```

## Usage

Run OpenCode from this directory:

```bash
cd /Users/macbook/Documents/Projects/remotion
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
contract and preview images use Kronos; older Genie4 positions/images are history.
The `remotion` agent loads it for new videos and visual revisions; historical
episodes are not silently migrated.

Example request:

```text
Use @prof-deps-news-style to make a new video about [topic].
Keep the approved style and positions. Use [narration file] and preview only.
```

Location: `.opencode/skills/prof-deps-news-style/`. To use it in another project,
copy the entire directory, then bring over the reusable components/assets listed
in `references/layout-contract.md`. The skill is project-local, not globally
installed. If it is not listed in an already-open session, start a new session.

### Skill maintenance

- Skills are discovered automatically from `.opencode/skills/`. They override
  the copies in `.agents/skills/` (which OpenCode also reads for compatibility).
- To refresh the skills after `npx skills update` (or a Remotion upgrade),
  re-copy them:

  ```bash
  cp -R .agents/skills/. .opencode/skills/
  ```

- Skill references inside each `SKILL.md` are relative to that skill's own
  directory, so keep the whole tree when copying.

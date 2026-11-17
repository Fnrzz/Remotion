# TikTok safe-zone overlay

- Creator: Orson Lord.
- Article: https://orsonlord.com/articles/free-safe-zone-overlays-for-reels-tiktok-and-shorts
- Original PNG: https://websitedownloadableassets.s3.us-east-1.amazonaws.com/TikTok+Safe+Zone.png
- Downloaded: 2026-10-31; unchanged transparent PNG, 1080 × 1920.
- Offered as a free editing guide by the creator; no broader license is assumed.

This is a creator's guide, not an official TikTok UI screenshot or a guarantee
for every device, app version, expanded caption, or ad placement. The PNG also
marks a lower-right interaction area, not just rectangular outer margins.

## Studio controls

`Genie4News`, `TerraVsSolNews`, and `Gemini4CarbonNews` all use the shared
`src/components/TikTokSafeAreaOverlay.tsx` as the top timeline layer. It wraps
the original interactive `TikTokSafeZoneOverlay`, preserving exactly the same
PNG, full-canvas fit, 65% opacity, and preview-only behavior in all episodes.

- http://localhost:3000/Genie4News
- http://localhost:3000/TerraVsSolNews
- http://localhost:3000/Gemini4CarbonNews

Select the composition (click its name in the compositions panel) and toggle
**showTikTokOverlay** in **Default Props → Schema**. This checkbox is available
in all three videos. Select **Overlay TikTok — Orson Lord (preview saja)** in the
timeline to adjust its **Opacity**. Initial visibility is on, at 65% opacity.

The guide scales to the composition canvas, stays above the final fade, does not
intercept pointer events, and is automatically omitted from renders even if
enabled in Studio. No existing layout positions, safe-area constants, assets,
narration, or timing were changed.

## Reuse in another episode

```tsx
import { TikTokSafeAreaOverlay } from "./components/TikTokSafeAreaOverlay";

// Last child of the full-canvas AbsoluteFill, outside TikTokSafeStage:
<TikTokSafeAreaOverlay enabled={showTikTokOverlay} />;
```

Add `showTikTokOverlay: true` to the composition's inline `defaultProps` for
the same Studio toggle. Optional `opacity={0.65}` overrides the shared default.
No need to copy the asset, styles, or environment guard into a new episode.

Legacy `showSafeArea` props remain compatible in Terra/Gemini, but now select
this same guide, not the old schematic. In Gemini an explicitly supplied
`showTikTokOverlay` takes precedence over its legacy prop. The old schematic
source file is preserved, but no registered composition uses it.

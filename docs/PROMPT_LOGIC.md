# PROMPT LOGIC — Kling 3.0 Technical Specifications

> How the dashboard generates AI video prompts. Source of truth: `src/lib/styleBible.ts`

## Prompt Structure

Every generated prompt follows this format:

```
[KLING_AI_PROMPT // SCENE_XX: SCENE_NAME]

--- STYLE_BIBLE ---
CATEGORY: value
...

--- CHARACTER_ELEMENTS ---
[ARCHETYPE] Name // District N
  STATUS: Active|Killed
  PROMPT_ANCHOR: (full visual description)
  VISUAL_LOGIC: (camera/lighting instructions)

--- DIRECTOR_NOTES ---
(custom per-generation directives)

[END_PROMPT]
```

## Global Style Bible (All Scenes)

| Category | Rule |
|----------|------|
| **LIGHTING** | Overcast ambient, teal-and-orange color grading, desaturated palette, natural falloff |
| **CAMERA** | Handheld movement, 35mm anamorphic lens, 24fps, shallow depth of field |
| **SACRED_RULE** | Dead serious tone only. No humor, no levity. Grounded realism. |
| **AUDIO_DESIGN** | Sound design over score. Sub-bass drones, industrial percussive hits, trap-influenced 808s on impacts. Distorted risers. Modern and lethal — not cinematic orchestra. |
| **LETHALITY** | Every surface reads as threat — rusted edges, wet metal, sharp angles. Breath visible. No warmth in frame. Holographic UI overlays on pedestals. |

## Scene-Specific Overrides

### Scene 1 — THE SETUP (Launch Sequence)

| Category | Override |
|----------|----------|
| **ENVIRONMENT** | Circular launch platforms, golden Cornucopia, metal tribute tubes/glass cylinders, dense forest treeline 200m out, holographic countdown timer (red, 60→0) |
| **CAMERA** | Slow vertical tilt as tribute rises from tube. Static locked-off wide during countdown. Snap-zooms to faces. No handheld until gong. |
| **SACRED_RULE** | Absolute silence except ambient wind and mockingjay calls. No score. Tension through stillness. Gong = only action cue. |

### Scene 2 — BLOODBATH (Cornucopia Sprint)

| Category | Override |
|----------|----------|
| **ENVIRONMENT** | Golden Cornucopia at center, supplies on grass, tributes sprinting from platforms. Arena floor = packed earth and grass (NOT mud/trenches). Futuristic game arena, not battlefield. |
| **SHUTTER** | 45–90 degrees. Staccato jittery motion, razor-sharp frames. No motion blur. |
| **COLOR** | Bleach bypass, desaturated teals, high-contrast shadows. Crushed blacks, blown highlights. Cold morning light. |
| **CAMERA** | Handheld chaos after gong. Erratic whip pans. Low-angle tracking of sprinting feet on grass. Flinch-zooms on impacts. Aerial drone establishing shot. |

## Shutter Angle Reference

| Angle | Effect | Use Case |
|-------|--------|----------|
| **45°** | Crisp, jittery, staccato | Combat/panic sequences |
| **90°** | Sharp with slight motion | Fast action, sprinting |
| **180°** (standard) | Natural motion blur | Default / dialogue |

## Color Pipeline

```
Base → Desaturate 40% → Bleach Bypass → Crush Blacks → Teal Shadows → Orange Highlights (subtle)
```

### Palette

| Token | Hex | Usage |
|-------|-----|-------|
| Teal Shadow | `#2A3F3F` | Shadow fill, environmental tint |
| Muted Earth | `#4A4035` | Terrain, wardrobe base |
| Overcast Gray | `#8A8A8A` | Sky, ambient fill |
| Desaturated Orange | `#8B6B4A` | Highlight accents, warm skin tones |
| Crushed Black | `#0A0A0A` | Deep shadows, vignette |

## Film Grain Spec

- **Type**: Super 35mm photochemical grain
- **Intensity**: Medium-heavy (visible at 1080p)
- **Character**: Organic, irregular clumping — NOT uniform digital noise
- **Highlight Grain**: Finer, less visible
- **Shadow Grain**: Coarser, more prominent

## Hard Negative Constraints (Global)

These are injected into every prompt as sacred rules:

```
NEVER: Digital-clean rendering
NEVER: Saturated/vibrant colors
NEVER: Heroic golden-hour sunlight
NEVER: Smiling or comedic expressions
NEVER: Clean/pristine wardrobe
NEVER: Smooth/airbrushed skin
```

## Implementation Files

| File | Purpose |
|------|---------|
| `src/lib/styleBible.ts` | Style rules, scene overrides, prompt assembly |
| `src/lib/characters.ts` | Character data, prompt anchors, visual logic |
| `src/lib/sceneScripts.ts` | Scene scripts, director's notes, narrator lines |
| `src/components/KlingCopyBox.tsx` | Per-character Kling prompt with copy button |
| `src/components/PromptGenerator.tsx` | Full scene prompt generator |
| `src/components/MasterExportButton.tsx` | CSV export of all tributes + prompts |

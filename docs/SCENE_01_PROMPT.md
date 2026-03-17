# SCENE 01: THE_SETUP — Canonical Kling AI Prompt

> Source of truth for the Scene 1 launch sequence prompt. This is the exact prompt format fed to Kling 3.0.

```
[KLING_AI_PROMPT // SCENE_01: THE_SETUP]
--- STYLE_BIBLE ---
LIGHTING: Overcast ambient, teal-and-orange color grading, desaturated palette, natural falloff
CAMERA_BASE: Handheld movement, 35mm anamorphic lens, 24fps, shallow depth of field
SACRED_RULE: Dead serious tone only. No humor, no levity. Grounded realism.
AUDIO_DESIGN: Sound design over score. Sub-bass drones, industrial percussive hits, metallic texture. Trap-influenced 808 sub-bass on impacts. Distorted risers for tension builds. Modern and lethal — not cinematic orchestra.
LETHALITY: Every surface looks like it could kill you — rusted edges, wet metal, sharp angles. Breath visible in cold air. No warmth anywhere in frame. Holographic UI overlays on tribute pedestals — vitals, district numbers, glitching red data.
--- SCENE_OVERRIDES [SCENE_01: THE_SETUP] ---
ENVIRONMENT: Circular launch platforms arranged in a ring around the golden Cornucopia. Rusted iron pedestals on damp packed earth. Tall dead yellow-brown grass surrounding the platforms. Metal tribute tubes/glass cylinders rise from underground — tributes ascend inside them. Dense forest treeline 200m out. Flat overcast sky, cold morning light. Holographic countdown timer projected above Cornucopia — red numbers ticking from 60 to 0. Holographic UI overlays near each pedestal — district numbers, vitals data, glitching red indicators.
CAMERA: Slow vertical tilt as tribute rises from underground glass cylinder. STATIC LOCKED-OFF wide shot of full arena platform ring during countdown — no movement, no handheld. Quick snap-zooms to individual faces during silence. Camera does NOT go handheld until the exact frame the gong sounds. Speed ramp: overcranked slow-motion on first step off platform, then snap to real-time chaos.
SACRED_RULE_S1: Absolute silence except ambient wind and distant mockingjay calls. No score. No music. Tension built entirely through stillness and held breath. The gong is the ONLY sound cue for action. Do not cut early — hold every take until it hurts.
AUDIO_DESIGN_S1: PRE-GONG: Dead silence. Wind. Distant mockingjay calls. Breath visible, audible. POST-GONG: Immediate low 808 sub-bass hit on the gong itself. Industrial percussive texture under sprint — metallic clangs, boot impacts on rusted iron. No melody. Distorted bass riser building as tributes close distance to Cornucopia. Trap hi-hat rolls on quick cuts between faces.
TRANSITION: At gong: immediate crash from locked-off static into full handheld chaos — no transition, no dissolve. The cut itself is the violence.
--- CHARACTER_ELEMENTS ---
[THE DAVID ROSE] Zach (@Zach) // District 1
  STATUS: Active
  PROMPT_ANCHOR: Zach: Early 20s, lean athletic build, toned arms, sharp jawline, youthful smooth skin, bright white straight teeth. Rising from metal tribute tube/glass cylinder on circular launch platform. Cream knit designer sweater, black tactical vest, silver rings. Diva disgust expression shifting to pure survival terror as countdown hits zero. Wind catching hair. Cornucopia visible in background. 35mm grit. END FRAME: Close-up of empty cylindrical glass tribute tube with metal base ring on circular stone launch platform, forest treeline behind, overcast teal-orange grading, no people.
  VISUAL_LOGIC: Overcast teal-and-orange. Slow vertical camera tilt as tube rises. Static held shot on face during countdown — snap to handheld chaos at gong. Exception: Warm amber cologne lighting for romance scenes only.
[THE ALTIMA DRIVER] Keisha & The Altima (@Keisha) // District 5
  STATUS: Active
  PROMPT_ANCHOR: Keisha: On the pedestal — exiting the 2014 Nissan Altima (airdropped onto the platform by the Capitol), one hand on door frame, phone in other hand, air fresheners swinging from the mirror. Engine still running. Cracked windshield. War-zone grit. High-shutter speed, desaturated teal-and-orange.
  VISUAL_LOGIC: Low-angle shaky cam. High-shutter speed. Interior POV from passenger seat when in car. On pedestal: locked wide, then chaos cam at sprint.
[DANCE MOM FROM HELL] Abby Lee Miller (@Abby_Lee) // District 7
  STATUS: Killed (Scene 2)
  PROMPT_ANCHOR: Abby Lee: Mid-50s heavyset woman, harsh weathered face, deep scowl lines, jowly cheeks, thin lips pressed tight. Permobil F5 Corpus motorized wheelchair — black matte frame, articulating footplates, high-back seat, joystick controller on right armrest. Positioned on circular launch platform. Black rhinestoned headband, oversized navy blue tactical vest over black silk blouse, silver chunky necklace. Plastic Starbucks cup in tactical cup holder. Wheelchair motors idle, ready. Cornucopia and forest treeline 200m out visible behind her.
  VISUAL_LOGIC: Low-angle emphasizing wheelchair's tank-like presence on the launch platform. At gong: heavy rolling momentum onto packed earth, sparks from metal scraping platform edge. Arena floor visible ahead — packed earth and tall dead yellow-brown grass.
--- SHOT_VARIABLES ---
SHOT_TYPE: HANDHELD SHAKY-CAM — rapidly panning between subjects at gong, documentary urgency, no stabilization
CAMERA_ACTION: static locked-off during countdown, then rapid crash into handheld at gong — the transition IS the cut
--- ACTION_EVENT ---
The 60-second countdown hits zero. @Zach, @Keisha, and @Abby_Lee are positioned on rusted iron pedestals in the meadow. The camera is a handheld shaky-cam, rapidly panning from their terrified faces to the metal Cornucopia. As the horn sounds, they sprint toward a pile of orange backpacks in the tall, dead grass. The ground is slick with gray mud.
--- DIRECTOR_NOTES ---
Camera is STATIC and SILENT during the countdown. No handheld until the exact frame the gong sounds — then crash immediately into chaos cam. Abby Lee's Permobil F5 wheelchair motors engage at gong — heavy rolling momentum from the pedestal base. DO NOT cut before all three are off the platforms.
--- NEGATIVE_PROMPT ---
NEVER: Digital-clean rendering
NEVER: Saturated/vibrant colors
NEVER: Heroic golden-hour sunlight or motivated key light
NEVER: Smiling or comedic expressions
NEVER: Clean/pristine wardrobe
NEVER: Smooth/airbrushed skin
NEVER: Handheld camera movement BEFORE the gong sounds
NEVER: Score or non-diegetic music during countdown sequence
[END_PROMPT]
```

## Prompt Structure Reference

| Section | Purpose |
|---------|---------|
| `STYLE_BIBLE` | Global visual rules (lighting, camera, tone) |
| `SCENE_OVERRIDES` | Scene-specific environment, camera, and sacred rules |
| `CHARACTER_ELEMENTS` | Per-character prompt anchors with status and visual logic |
| `SHOT_VARIABLES` | Shot type and camera action for the scene |
| `ACTION_EVENT` | Narrative description of what happens on screen |
| `DIRECTOR_NOTES` | Hard constraints for this specific scene |
| `NEGATIVE_PROMPT` | Explicit "NEVER" list to prevent unwanted generation |

## New Sections (Not Yet in Code)

The following sections exist in this canonical prompt but are **not yet generated** by the dashboard's `PromptGenerator` or `KlingCopyBox`:

- `SHOT_VARIABLES` — Shot type + camera action
- `ACTION_EVENT` — Narrative action description
- `NEGATIVE_PROMPT` — Hard negative constraints
- `TRANSITION` — Scene transition rules

These should be added to `src/lib/styleBible.ts` and the prompt generation pipeline.

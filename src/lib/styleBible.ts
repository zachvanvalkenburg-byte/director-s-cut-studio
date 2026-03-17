import type { CharacterElement } from "./characters";

export interface StyleRule {
  id: string;
  category: string;
  label: string;
  value: string;
}

export const DEFAULT_STYLE_BIBLE: StyleRule[] = [
  {
    id: "lighting-01",
    category: "LIGHTING",
    label: "Default Lighting",
    value: "Overcast ambient, teal-and-orange color grading, desaturated palette, natural falloff",
  },
  {
    id: "camera-01",
    category: "CAMERA",
    label: "Camera System",
    value: "Handheld movement, 35mm anamorphic lens, 24fps, shallow depth of field",
  },
  {
    id: "tone-01",
    category: "SACRED_RULE",
    label: "Tonal Directive",
    value: "Dead serious tone only. No humor, no levity. Grounded realism.",
  },
  {
    id: "audio-01",
    category: "AUDIO_DESIGN",
    label: "Global Sound Directive",
    value: "Sound design over score. No traditional soundtrack. Sub-bass drones, industrial percussive hits, metallic texture on impacts. Distorted risers for tension builds. Modern and aggressive — not cinematic orchestra.",
  },
  {
    id: "arena-tech-01",
    category: "ARENA_TECH",
    label: "Arena Technology",
    value: "Modern, technologically advanced arena infrastructure. Clean engineered metal platforms, smooth composite surfaces, precision-machined launch mechanisms. Visible weapons — bladed, ranged, improvised — scattered near Cornucopia and supply caches. Technology should feel sleek and deliberate, designed to kill efficiently.",
  },
];

// Scene-specific style overrides
export const SCENE_STYLE_OVERRIDES: Record<number, StyleRule[]> = {
  1: [
    {
      id: "arena-s1",
      category: "ENVIRONMENT",
      label: "Launch Arena",
      value: "Circular launch platforms arranged in a ring around the golden Cornucopia. Metal pedestals on packed earth. Tall dead yellow-brown grass surrounding the platforms. Metal tribute tubes/glass cylinders rise from underground — tributes ascend inside them. Dense forest treeline 200m out. Flat overcast sky, cold morning light. Holographic countdown timer projected above Cornucopia — red numbers ticking from 60 to 0. Visible weapons — blades, bows, tactical gear — scattered near Cornucopia and in orange backpacks.",
    },
    {
      id: "camera-s1",
      category: "CAMERA",
      label: "Launch Sequence Cam",
      value: "Slow vertical tilt as tribute rises from underground glass cylinder. STATIC LOCKED-OFF wide shot of full arena platform ring during countdown — no movement, no handheld. Quick snap-zooms to individual faces during silence. Camera does NOT go handheld until the exact frame the gong sounds. Speed ramp: overcranked slow-motion on first step off platform, then snap to real-time chaos.",
    },
    {
      id: "tone-s1",
      category: "SACRED_RULE",
      label: "Countdown Tension",
      value: "Absolute silence except ambient wind and distant mockingjay calls. No score. No music. Tension built entirely through stillness and held breath. The gong is the ONLY sound cue for action. Do not cut early — hold every take until it hurts.",
    },
    {
      id: "audio-s1",
      category: "AUDIO_DESIGN",
      label: "Scene 1 Sound Design",
      value: "PRE-GONG: Dead silence. Wind. Distant mockingjay calls. POST-GONG: Immediate low sub-bass hit on the gong itself. Industrial percussive texture under sprint — metallic impacts, boot stomps on metal platforms. No melody, no music. Distorted bass riser building as tributes close distance to Cornucopia.",
    },
    {
      id: "transition-s1",
      category: "TRANSITION",
      label: "Gong Cut",
      value: "At gong: immediate crash from locked-off static into full handheld chaos — no transition, no dissolve. The cut itself is the violence.",
    },
    {
      id: "negative-s1",
      category: "NEGATIVE_PROMPT",
      label: "Scene 1 Negs",
      value: "NEVER: Digital-clean rendering. NEVER: Saturated/vibrant colors. NEVER: Heroic golden-hour sunlight. NEVER: Smiling or comedic expressions. NEVER: Clean/pristine wardrobe. NEVER: Smooth/airbrushed skin. NEVER: Handheld camera BEFORE the gong sounds. NEVER: Score or non-diegetic music during countdown. NEVER: Traditional orchestral score. NEVER: Warm tones or orange highlights before blood is drawn.",
    },
  ],
  2: [
    {
      id: "arena-s2",
      category: "ENVIRONMENT",
      label: "Cornucopia Bloodbath",
      value: "Golden horn-shaped Cornucopia at arena center, supplies scattered on grass. Tributes sprinting from launch platforms. Forest edge visible. Arena floor is packed earth and grass — NOT mud or trenches. Futuristic game arena, not a battlefield.",
    },
    {
      id: "shutter-s2",
      category: "SHUTTER",
      label: "Shutter Angle",
      value: "45–90 degrees. Staccato jittery motion, razor-sharp frames. No motion blur — every frame captures the panic of the initial sprint.",
    },
    {
      id: "color-s2",
      category: "COLOR",
      label: "Bleach Bypass",
      value: "Bleach bypass effect, desaturated teals, high-contrast shadows. Crushed blacks, blown highlights. Cold morning arena light.",
    },
    {
      id: "camera-s2",
      category: "CAMERA",
      label: "Bloodbath Cam",
      value: "Handheld chaos cam after gong sounds. Erratic whip pans between tributes. Low-angle tracking shots of sprinting feet on grass. Flinch-zooms on impacts. Aerial drone shot establishing full arena geography.",
    },
  ],
};

export function getStyleBibleForScene(sceneId: number): StyleRule[] {
  const overrides = SCENE_STYLE_OVERRIDES[sceneId];
  if (!overrides) return DEFAULT_STYLE_BIBLE;
  return [...DEFAULT_STYLE_BIBLE, ...overrides];
}

interface SceneInfo {
  id: number;
  name: string;
}

export function generateScenePrompt(
  scene: SceneInfo,
  selectedCharacters: CharacterElement[],
  styleBible: StyleRule[],
  customDirectives: string
): string {
  const lines: string[] = [];
  const effectiveRules = getStyleBibleForScene(scene.id);

  lines.push(`[KLING_AI_PROMPT // SCENE_${String(scene.id).padStart(2, "0")}: ${scene.name}]`);
  lines.push("");

  // Style Bible (with scene overrides merged)
  lines.push("--- STYLE_BIBLE ---");
  for (const rule of effectiveRules) {
    lines.push(`${rule.category}: ${rule.value}`);
  }
  lines.push("");

  // Character Elements with full data
  lines.push("--- CHARACTER_ELEMENTS ---");
  if (selectedCharacters.length === 0) {
    lines.push("No elements assigned.");
  } else {
    for (const char of selectedCharacters) {
      lines.push(`[${char.archetype.toUpperCase()}] ${char.name} // District ${char.district}`);
      lines.push(`  STATUS: ${char.status}`);
      lines.push(`  PROMPT_ANCHOR: ${char.prompt_anchor}`);
      lines.push(`  VISUAL_LOGIC: ${char.visual_logic}`);
      lines.push("");
    }
  }

  // Custom directives
  if (customDirectives.trim()) {
    lines.push("--- DIRECTOR_NOTES ---");
    lines.push(customDirectives.trim());
    lines.push("");
  }

  lines.push("[END_PROMPT]");

  return lines.join("\n");
}

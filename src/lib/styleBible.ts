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
];

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

  lines.push(`[KLING_AI_PROMPT // SCENE_${String(scene.id).padStart(2, "0")}: ${scene.name}]`);
  lines.push("");

  // Style Bible
  lines.push("--- STYLE_BIBLE ---");
  for (const rule of styleBible) {
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

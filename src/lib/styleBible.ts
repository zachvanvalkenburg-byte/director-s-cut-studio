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

interface AssetInfo {
  name: string;
  type: string;
  assetId: string;
}

interface SceneInfo {
  id: number;
  name: string;
}

export function generateScenePrompt(
  scene: SceneInfo,
  selectedAssets: AssetInfo[],
  styleBible: StyleRule[],
  customDirectives: string
): string {
  const lines: string[] = [];

  // Header
  lines.push(`[KLING_AI_PROMPT // SCENE_${String(scene.id).padStart(2, "0")}: ${scene.name}]`);
  lines.push("");

  // Style Bible rules
  lines.push("--- STYLE_BIBLE ---");
  for (const rule of styleBible) {
    lines.push(`${rule.category}: ${rule.value}`);
  }
  lines.push("");

  // Scene elements
  lines.push("--- SCENE_ELEMENTS ---");
  if (selectedAssets.length === 0) {
    lines.push("No assets assigned.");
  } else {
    for (const asset of selectedAssets) {
      lines.push(`[${asset.type}] ${asset.name} (${asset.assetId})`);
    }
  }
  lines.push("");

  // Custom directives
  if (customDirectives.trim()) {
    lines.push("--- DIRECTOR_NOTES ---");
    lines.push(customDirectives.trim());
    lines.push("");
  }

  lines.push("[END_PROMPT]");

  return lines.join("\n");
}

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, Copy, Check, ChevronDown, ChevronUp } from "lucide-react";
import { toast } from "sonner";
import type { CharacterElement } from "@/lib/characters";
import { DEFAULT_STYLE_BIBLE, SCENE_STYLE_OVERRIDES } from "@/lib/styleBible";
import { scenes } from "@/components/SceneSidebar";

interface SystemPromptPanelProps {
  characters: CharacterElement[];
  activeScene: number;
}

const LOCATION_DATA = {
  setting: "High-altitude Appalachian Meadow / North Carolina Pine Forest",
  terrain: "Damp, dark gray earth; mud-slicked paths; tall, dead, yellow-brown grass",
  flora: "Dense, spindly pine and oak trees; overgrown, unmanaged wilderness",
  weather: "Constant flat overcast lighting; thick mountain mist; cold, damp atmosphere",
};

const CINEMATOGRAPHY = {
  filmStock: "Super 35mm film grit; visible grain; no 'digital clean' look",
  colorGrade: "Desaturated Bleach-Bypass; crushed blacks; teal-tinted shadows; muted earthy greens",
  motion: "Handheld 'shaky-cam' documentary style; 45-degree shutter angle (crisp, jittery, panicked motion)",
  framing: "2.35:1 Anamorphic; claustrophobic close-ups mixed with wide desolate meadow shots",
};

const PERFORMANCE_DIRECTIVES = {
  emotionalState: "High-anxiety; pure survival instinct; terrified and exhausted",
  wardrobe: "Dusty tactical gear; visible sweat and grime; torn fabrics",
  hardNegatives: "NO smiling; NO vibrant/saturated colors; NO heroic sunlight; NO clean skin",
};

function generateGeminiPrompt(
  characters: CharacterElement[],
  activeScene: number
): string {
  const alive = characters.filter((c) => c.is_alive);
  const dead = characters.filter((c) => !c.is_alive);
  const scene = scenes.find((s) => s.id === activeScene);
  const sceneOverrides = SCENE_STYLE_OVERRIDES[activeScene] || [];

  const lines: string[] = [];

  lines.push("=== TRIBUTE TUBE PROJECT — SYSTEM STATE UPDATE ===");
  lines.push(`Generated: ${new Date().toISOString()}`);
  lines.push(`Active Scene: ${activeScene} — ${scene?.name || "UNKNOWN"}`);
  lines.push("");

  // Location
  lines.push("--- CORE ENVIRONMENT ---");
  lines.push(`Setting: ${LOCATION_DATA.setting}`);
  lines.push(`Terrain: ${LOCATION_DATA.terrain}`);
  lines.push(`Flora: ${LOCATION_DATA.flora}`);
  lines.push(`Weather: ${LOCATION_DATA.weather}`);
  lines.push("");

  // Cinematography
  lines.push("--- TECHNICAL CINEMATOGRAPHY (KLING AI SPECS) ---");
  lines.push(`Film Stock: ${CINEMATOGRAPHY.filmStock}`);
  lines.push(`Color Grade: ${CINEMATOGRAPHY.colorGrade}`);
  lines.push(`Motion: ${CINEMATOGRAPHY.motion}`);
  lines.push(`Framing: ${CINEMATOGRAPHY.framing}`);
  lines.push("");

  // Kill Order
  lines.push("--- KILL ORDER STATUS ---");
  lines.push(`Alive: ${alive.length} tributes`);
  alive
    .sort((a, b) => b.survival_priority - a.survival_priority)
    .forEach((c) => {
      lines.push(`  [ALIVE] ${c.name} — ${c.archetype} — Priority ${c.survival_priority} — "${c.status}"`);
    });
  if (dead.length > 0) {
    lines.push(`Eliminated: ${dead.length} tributes`);
    dead.forEach((c) => {
      lines.push(`  [KIA] ${c.name} — ${c.archetype} — ${c.status}${c.death_scene ? ` (Scene ${c.death_scene})` : ""}`);
    });
  }
  lines.push("");

  // Visual Style Rules
  lines.push("--- VISUAL STYLE RULES (MANDATORY) ---");
  DEFAULT_STYLE_BIBLE.forEach((rule) => {
    lines.push(`${rule.category} / ${rule.label}: ${rule.value}`);
  });
  lines.push("");
  lines.push("HARD RULES:");
  lines.push("• 35mm anamorphic lens — ALL shots");
  lines.push("• Desaturated teal-and-orange color grading — NO saturated colors");
  lines.push("• NO smiling — dead serious tone only, no humor, no levity");
  lines.push("• Handheld camera movement — grounded realism");
  lines.push("• Hunger Games Arena aesthetic — NOT modern military");
  lines.push("");

  // Scene-specific overrides
  if (sceneOverrides.length > 0) {
    lines.push(`--- SCENE ${activeScene} OVERRIDES ---`);
    sceneOverrides.forEach((rule) => {
      lines.push(`${rule.category} / ${rule.label}: ${rule.value}`);
    });
    lines.push("");
  }

  // Character roster summary
  lines.push("--- CHARACTER PROMPT ANCHORS ---");
  characters.forEach((c) => {
    lines.push(`[${c.is_alive ? "ALIVE" : "KIA"}] ${c.name} (D${c.district}, ${c.archetype})`);
    lines.push(`  Prompt: ${c.prompt_anchor.slice(0, 200)}${c.prompt_anchor.length > 200 ? "..." : ""}`);
  });
  lines.push("");

  lines.push("=== END SYSTEM STATE ===");
  lines.push("Use this data to stay synchronized with the project. All visual outputs must comply with the style rules above.");

  return lines.join("\n");
}

const SystemPromptPanel = ({ characters, activeScene }: SystemPromptPanelProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [generatedPrompt, setGeneratedPrompt] = useState("");
  const [copied, setCopied] = useState(false);

  const alive = characters.filter((c) => c.is_alive);
  const dead = characters.filter((c) => !c.is_alive);

  const handleGenerate = () => {
    const prompt = generateGeminiPrompt(characters, activeScene);
    setGeneratedPrompt(prompt);
    toast.success("SYSTEM_PROMPT compiled for Gemini.");
  };

  const handleCopy = async () => {
    if (!generatedPrompt) return;
    await navigator.clipboard.writeText(generatedPrompt);
    setCopied(true);
    toast.success("Copied to clipboard — paste into Gemini.");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col gap-2 rounded-lg bg-surface p-4 shadow-inset-surface">
      {/* Toggle Header */}
      <button
        onClick={() => setIsOpen((p) => !p)}
        className="flex items-center gap-2 text-left"
      >
        <Terminal className="h-3.5 w-3.5 text-primary" />
        <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
          SYSTEM_PROMPT // GEMINI_SYNC
        </span>
        <div className="ml-auto flex items-center gap-2">
          <span className="font-mono text-[9px] text-primary/50">
            {alive.length}A / {dead.length}K
          </span>
          {isOpen ? (
            <ChevronUp className="h-3 w-3 text-muted-foreground" />
          ) : (
            <ChevronDown className="h-3 w-3 text-muted-foreground" />
          )}
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="flex flex-col gap-3 pt-2">
              {/* Quick status overview */}
              <div className="grid grid-cols-3 gap-2">
                <div className="rounded-sm bg-background/30 px-3 py-2">
                  <span className="font-mono text-[8px] uppercase tracking-widest text-muted-foreground">LOCATION</span>
                  <p className="mt-0.5 text-[11px] text-foreground/80">{LOCATION_DATA.setting}</p>
                </div>
                <div className="rounded-sm bg-background/30 px-3 py-2">
                  <span className="font-mono text-[8px] uppercase tracking-widest text-muted-foreground">KILL ORDER</span>
                  <p className="mt-0.5 text-[11px] text-foreground/80">{alive.length} alive / {dead.length} KIA</p>
                </div>
                <div className="rounded-sm bg-background/30 px-3 py-2">
                  <span className="font-mono text-[8px] uppercase tracking-widest text-muted-foreground">STYLE</span>
                  <p className="mt-0.5 text-[11px] text-foreground/80">35mm / Desat / No smile</p>
                </div>
              </div>

              {/* Generate button */}
              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleGenerate}
                className="w-full rounded-sm bg-primary/10 py-2.5 font-mono text-[10px] uppercase tracking-widest text-primary transition-colors hover:bg-primary/20"
              >
                Generate Gemini Update
              </motion.button>

              {/* Output */}
              {generatedPrompt && (
                <motion.div
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col gap-2"
                >
                  <pre className="max-h-[300px] overflow-auto rounded-sm bg-background/40 p-3 font-mono text-[10px] leading-relaxed text-foreground/70 whitespace-pre-wrap">
                    {generatedPrompt}
                  </pre>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[9px] text-muted-foreground">
                      {generatedPrompt.length} chars
                    </span>
                    <button
                      onClick={handleCopy}
                      className="flex items-center gap-1.5 rounded-sm bg-primary/10 px-3 py-1.5 font-mono text-[10px] uppercase tracking-widest text-primary transition-colors hover:bg-primary/20"
                    >
                      {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                      {copied ? "COPIED" : "COPY TO CLIPBOARD"}
                    </button>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SystemPromptPanel;

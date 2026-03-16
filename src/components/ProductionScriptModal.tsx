import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clapperboard, Copy, Check, X } from "lucide-react";
import { toast } from "sonner";
import type { CharacterElement } from "@/lib/characters";
import type { Scene } from "@/components/SceneSidebar";
import { sceneScripts } from "@/lib/sceneScripts";
import { getStyleBibleForScene } from "@/lib/styleBible";

interface ProductionScriptModalProps {
  scene: Scene;
  characters: CharacterElement[];
}

const ProductionScriptModal = ({ scene, characters }: ProductionScriptModalProps) => {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const sceneScript = sceneScripts.find((s) => s.sceneId === scene.id);
  const styleRules = getStyleBibleForScene(scene.id);

  // Characters alive during this scene (not killed before it)
  const activeChars = characters.filter(
    (c) => c.is_alive || (c.death_scene !== undefined && c.death_scene >= scene.id)
  );
  const sceneChars = sceneScript
    ? activeChars.filter((c) => sceneScript.characterIds.includes(c.id))
    : [];

  const generateScript = () => {
    const lines: string[] = [];

    lines.push(`[KLING_AI_PRODUCTION_SCRIPT // SCENE_${String(scene.id).padStart(2, "0")}: ${scene.name}]`);
    lines.push("");

    // Environment rules
    lines.push("--- ENVIRONMENT_RULES ---");
    for (const rule of styleRules) {
      lines.push(`${rule.category}: ${rule.value}`);
    }
    lines.push("");

    // Characters with subject binding tags
    lines.push("--- SUBJECT_BINDING ---");
    if (sceneChars.length === 0) {
      lines.push("No characters assigned to this scene.");
    } else {
      for (const char of sceneChars) {
        const tag = `@${char.id.replace(/\s/g, "_")}`;
        lines.push(`${tag} — ${char.name} (District ${char.district})`);
        lines.push(`  ANCHOR: ${char.prompt_anchor}`);
        lines.push(`  VISUAL: ${char.visual_logic}`);
        lines.push("");
      }
    }

    // Action description
    if (sceneScript) {
      lines.push("--- ACTION_DESCRIPTION ---");
      lines.push(sceneScript.directorsNotes);
      lines.push("");
      lines.push("--- NARRATOR ---");
      lines.push(`"${sceneScript.narratorScript}"`);
      lines.push("");
    }

    lines.push("[END_PRODUCTION_SCRIPT]");
    return lines.join("\n");
  };

  const script = generateScript();

  const handleCopy = () => {
    navigator.clipboard.writeText(script);
    setCopied(true);
    toast.success(`PRODUCTION_SCRIPT: Scene ${String(scene.id).padStart(2, "0")} copied to clipboard.`);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <motion.button
        onClick={() => setOpen(true)}
        className="flex w-full items-center justify-center gap-2 rounded-lg bg-accent/10 py-3 font-mono text-[11px] uppercase tracking-widest text-accent transition-colors hover:bg-accent/20"
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.98 }}
      >
        <Clapperboard className="h-4 w-4" />
        Generate Production Script — Scene {String(scene.id).padStart(2, "0")}
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              className="mx-4 max-h-[85vh] w-full max-w-2xl overflow-hidden rounded-lg bg-surface shadow-surface-hover"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between border-b border-muted/20 px-5 py-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[10px] text-primary">
                      SCENE_{String(scene.id).padStart(2, "0")}
                    </span>
                    <span className="text-muted-foreground/30">·</span>
                    <span className="font-mono text-[10px] text-accent/70">
                      {sceneChars.length} TRIBUTES
                    </span>
                  </div>
                  <h2 className="mt-1 text-base font-semibold tracking-tight text-foreground">
                    Ready for Production
                  </h2>
                </div>
                <div className="flex items-center gap-2">
                  <motion.button
                    onClick={handleCopy}
                    className="flex items-center gap-1.5 rounded-sm bg-primary px-3 py-1.5 font-mono text-[10px] uppercase tracking-widest text-primary-foreground transition-colors hover:bg-primary/90"
                    whileTap={{ scale: 0.95 }}
                  >
                    {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                    {copied ? "COPIED" : "COPY TO CLIPBOARD"}
                  </motion.button>
                  <button
                    onClick={() => setOpen(false)}
                    className="flex h-7 w-7 items-center justify-center rounded-sm text-muted-foreground transition-colors hover:bg-muted/30 hover:text-foreground"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Script content */}
              <div className="max-h-[65vh] overflow-y-auto p-5">
                <pre className="whitespace-pre-wrap font-mono text-[11px] leading-relaxed text-foreground/80">
                  {script}
                </pre>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ProductionScriptModal;

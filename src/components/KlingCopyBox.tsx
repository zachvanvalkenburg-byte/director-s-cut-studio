import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import type { CharacterElement } from "@/lib/characters";
import type { SceneScript } from "@/lib/sceneScripts";
import { getScenesForCharacter } from "@/lib/sceneScripts";

interface KlingCopyBoxProps {
  selectedCharacters: CharacterElement[];
  activeScene: { id: number; name: string };
}

function buildKlingPrompt(
  character: CharacterElement,
  scene: SceneScript
): string {
  return [
    character.prompt_anchor,
    `Scene: ${scene.sceneName}. ${scene.directorsNotes}`,
    `Visual Logic: ${character.visual_logic}`,
  ].join("\n\n");
}

const KlingCopyBox = ({ selectedCharacters, activeScene }: KlingCopyBoxProps) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  if (selectedCharacters.length === 0) return null;

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    toast.success("KLING_PROMPT_COPIED");
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col gap-3 rounded-lg bg-surface p-4 shadow-inset-surface"
    >
      <div className="flex items-center justify-between">
        <label className="font-mono text-[10px] uppercase tracking-widest text-primary">
          KLING_COPY // SCENE_0{activeScene.id}
        </label>
        <span className="font-mono text-[10px] text-muted-foreground">
          {selectedCharacters.length} ELEMENT{selectedCharacters.length !== 1 ? "S" : ""}
        </span>
      </div>

      <div className="flex flex-col gap-3">
        {selectedCharacters.map((char) => {
          const sceneData = getScenesForCharacter(char.id).find(
            (s) => s.sceneId === activeScene.id
          );

          // Build prompt even if character isn't mapped to this scene — use scene name + notes from sidebar
          const prompt = sceneData
            ? buildKlingPrompt(char, sceneData)
            : [
                char.prompt_anchor,
                `Scene: ${activeScene.name}.`,
                `Visual Logic: ${char.visual_logic}`,
              ].join("\n\n");

          const isCopied = copiedId === `kling-${char.id}`;

          return (
            <div key={char.id} className="rounded-md bg-background/40 p-3">
              <div className="mb-2 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[9px] text-primary">
                    D{char.district}
                  </span>
                  <span className="text-xs font-medium tracking-tight text-foreground/80">
                    {char.name}
                  </span>
                  {!sceneData && (
                    <span className="font-mono text-[8px] text-accent/50">
                      NOT_IN_SCENE
                    </span>
                  )}
                </div>
                <motion.button
                  onClick={() => handleCopy(prompt, `kling-${char.id}`)}
                  className="flex items-center gap-1 rounded-sm bg-primary/10 px-2 py-1 font-mono text-[9px] uppercase tracking-widest text-primary transition-colors hover:bg-primary/25"
                  whileTap={{ scale: 0.95 }}
                >
                  {isCopied ? (
                    <Check className="h-2.5 w-2.5" />
                  ) : (
                    <Copy className="h-2.5 w-2.5" />
                  )}
                  {isCopied ? "COPIED" : "COPY"}
                </motion.button>
              </div>
              <pre className="whitespace-pre-wrap font-mono text-[11px] leading-relaxed text-foreground/60">
                {prompt}
              </pre>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default KlingCopyBox;

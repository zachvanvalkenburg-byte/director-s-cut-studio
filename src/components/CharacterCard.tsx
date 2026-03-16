import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, FileText, X, Copy, Skull, ExternalLink, Image } from "lucide-react";
import { toast } from "sonner";
import type { CharacterElement } from "@/lib/characters";
import { getScenesForCharacter } from "@/lib/sceneScripts";
import VFXReviewPanel from "@/components/VFXReviewPanel";

interface CharacterCardProps {
  character: CharacterElement;
  selected?: boolean;
  onToggle?: () => void;
  onKill?: (deathScene?: number) => void;
  onSetDeathScene?: (scene: number) => void;
  onUpdateCharacter?: (updates: Partial<CharacterElement>) => void;
}

const CharacterCard = ({ character, selected, onToggle, onKill, onSetDeathScene, onUpdateCharacter }: CharacterCardProps) => {
  const [showScript, setShowScript] = useState(false);
  const [pendingKillScene, setPendingKillScene] = useState<number>(1);
  const isDead = !character.is_alive;

  const handleGenerateScript = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowScript(true);
  };

  const handleCloseScript = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowScript(false);
  };

  const handleCopyNarrator = (e: React.MouseEvent, text: string) => {
    e.stopPropagation();
    navigator.clipboard.writeText(text);
    toast.success("NARRATOR_LINE_COPIED");
  };

  const handleKillToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isDead) {
      onKill?.();
    } else {
      onKill?.(pendingKillScene);
    }
  };

  const handleDeathSceneChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.stopPropagation();
    const scene = Number(e.target.value);
    setPendingKillScene(scene);
    if (isDead) {
      onSetDeathScene?.(scene);
    }
  };

  const characterScenes = getScenesForCharacter(character.id);

  return (
    <>
      <motion.div
        layout
        onClick={onToggle}
        className={`relative aspect-square cursor-pointer overflow-hidden rounded-lg bg-surface transition-shadow ${
          selected
            ? "shadow-[0_0_0_2px_hsl(185,35%,45%),0_4px_12px_-2px_rgba(0,0,0,0.4)]"
            : "shadow-surface hover:shadow-surface-hover"
        }`}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
      >
        {/* Image */}
        <img
          src={character.image}
          alt={character.name}
          className={`h-full w-full object-cover transition-all duration-500 ${
            isDead
              ? "opacity-40 grayscale"
              : selected
              ? "opacity-100 grayscale-0"
              : "opacity-80 grayscale-[0.2] hover:opacity-100 hover:grayscale-0"
          }`}
        />

        {/* Selection check */}
        {selected && !isDead && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute left-2 top-2 flex h-5 w-5 items-center justify-center rounded-sm bg-primary"
          >
            <Check className="h-3 w-3 text-primary-foreground" />
          </motion.div>
        )}

        {/* KIA badge + death scene */}
        {isDead && (
          <div className="absolute left-2 top-2 flex items-center gap-1.5">
            <div className="rounded-sm bg-destructive/80 px-1.5 py-0.5 font-mono text-[8px] uppercase tracking-widest text-destructive-foreground backdrop-blur-sm">
              ✕ ELIMINATED
            </div>
            <select
              onClick={(e) => e.stopPropagation()}
              onChange={handleDeathSceneChange}
              value={character.death_scene || 1}
              className="h-5 rounded-sm bg-destructive/60 px-1 font-mono text-[8px] text-destructive-foreground backdrop-blur-sm outline-none cursor-pointer"
            >
              {[1, 2, 3, 4, 5, 6].map((s) => (
                <option key={s} value={s} className="bg-background text-foreground">
                  S{s}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Survival priority indicator */}
        <div className="absolute right-2 top-2 flex items-center gap-1.5">
          <div className="rounded-sm bg-background/60 px-1.5 py-0.5 font-mono text-[8px] text-muted-foreground backdrop-blur-md">
            SP:{character.survival_priority}
          </div>
          {/* Kill toggle */}
          <motion.button
            onClick={handleKillToggle}
            className={`flex h-5 w-5 items-center justify-center rounded-sm backdrop-blur-md transition-colors ${
              isDead
                ? "bg-destructive/60 text-destructive-foreground hover:bg-primary/60"
                : "bg-background/60 text-muted-foreground hover:bg-destructive/60 hover:text-destructive-foreground"
            }`}
            whileTap={{ scale: 0.9 }}
            title={isDead ? "Revive tribute" : "Eliminate tribute"}
          >
            <Skull className="h-3 w-3" />
          </motion.button>
        </div>

        {/* Bottom gradient overlay */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background/95 via-background/50 to-transparent p-3 pb-2">
          <div className="mb-0.5 flex items-center gap-1.5">
            <span className="font-mono text-[9px] uppercase tracking-widest text-primary">
              D{character.district}
            </span>
            <span className="text-muted-foreground/30">·</span>
            <span className="font-mono text-[9px] text-accent/70 truncate">
              {character.archetype}
            </span>
          </div>
          <h3 className={`text-sm font-semibold truncate ${isDead ? "text-muted-foreground line-through" : "text-foreground"}`}>
            {character.name}
          </h3>

          {!isDead && (
            <div className="mt-2 flex flex-col gap-1">
              <motion.button
                onClick={handleGenerateScript}
                className="flex w-full items-center justify-center gap-1.5 rounded-sm bg-primary/10 py-1.5 font-mono text-[9px] uppercase tracking-widest text-primary transition-colors hover:bg-primary/25"
                whileTap={{ scale: 0.96 }}
              >
                <FileText className="h-3 w-3" />
                Generate Script
              </motion.button>

              {/* Kling Production Sync */}
              <div className="flex gap-1">
                <motion.button
                  onClick={(e) => {
                    e.stopPropagation();
                    const url = new URL(character.image, window.location.origin).href;
                    navigator.clipboard.writeText(url);
                    toast.success("IMAGE_URL_COPIED");
                  }}
                  className="flex flex-1 items-center justify-center gap-1 rounded-sm bg-accent/10 py-1 font-mono text-[8px] uppercase tracking-widest text-accent transition-colors hover:bg-accent/20"
                  whileTap={{ scale: 0.96 }}
                  title="Copy image URL"
                >
                  <Image className="h-2.5 w-2.5" />
                  IMG
                </motion.button>
                <motion.button
                  onClick={(e) => {
                    e.stopPropagation();
                    navigator.clipboard.writeText(character.prompt_anchor);
                    toast.success("ELEMENT_PROMPT_COPIED");
                  }}
                  className="flex flex-1 items-center justify-center gap-1 rounded-sm bg-accent/10 py-1 font-mono text-[8px] uppercase tracking-widest text-accent transition-colors hover:bg-accent/20"
                  whileTap={{ scale: 0.96 }}
                  title="Copy element prompt for Kling"
                >
                  <Copy className="h-2.5 w-2.5" />
                  PROMPT
                </motion.button>
                <motion.button
                  onClick={(e) => {
                    e.stopPropagation();
                    window.open("https://klingai.com", "_blank");
                  }}
                  className="flex flex-1 items-center justify-center gap-1 rounded-sm bg-accent/10 py-1 font-mono text-[8px] uppercase tracking-widest text-accent transition-colors hover:bg-accent/20"
                  whileTap={{ scale: 0.96 }}
                  title="Open Kling AI"
                >
                  <ExternalLink className="h-2.5 w-2.5" />
                  KLING
                </motion.button>
              </div>
            </div>
          )}
        </div>
      </motion.div>

      {/* Script overlay modal */}
      <AnimatePresence>
        {showScript && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm"
            onClick={handleCloseScript}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              className="mx-4 max-h-[80vh] w-full max-w-lg overflow-y-auto rounded-lg bg-surface p-5 shadow-surface-hover"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mb-4 flex items-start justify-between">
                <div>
                  <div className="mb-1 flex items-center gap-2">
                    <span className="font-mono text-[9px] uppercase tracking-widest text-primary">
                      D{character.district}
                    </span>
                    <span className="text-muted-foreground/30">·</span>
                    <span className="font-mono text-[9px] text-accent/70">
                      {character.archetype}
                    </span>
                  </div>
                  <h2 className="text-base font-semibold tracking-tight text-foreground">
                    {character.name}
                  </h2>
                  <p className="mt-1 text-[11px] leading-relaxed text-muted-foreground">
                    {character.prompt_anchor}
                  </p>
                </div>
                <button
                  onClick={handleCloseScript}
                  className="flex h-6 w-6 items-center justify-center rounded-sm text-muted-foreground transition-colors hover:bg-muted/30 hover:text-foreground"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <div className="flex flex-col gap-3">
                <label className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                  NARRATOR_LINES // {characterScenes.length} SCENE{characterScenes.length !== 1 ? "S" : ""}
                </label>

                {characterScenes.length === 0 ? (
                  <p className="text-xs text-muted-foreground/60 italic">
                    No scenes assigned to this character.
                  </p>
                ) : (
                  characterScenes.map((scene) => (
                    <div key={scene.sceneId} className="rounded-md bg-background/40 p-3">
                      <div className="mb-2 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-[10px] text-primary">
                            0{scene.sceneId}
                          </span>
                          <span className="text-xs font-medium tracking-tight text-foreground/80">
                            {scene.sceneName}
                          </span>
                        </div>
                        <motion.button
                          onClick={(e) => handleCopyNarrator(e, scene.narratorScript)}
                          className="flex items-center gap-1 rounded-sm px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-widest text-muted-foreground transition-colors hover:bg-muted/30 hover:text-foreground"
                          whileTap={{ scale: 0.95 }}
                        >
                          <Copy className="h-2.5 w-2.5" />
                          COPY
                        </motion.button>
                      </div>
                      <p className="font-mono text-[11px] italic leading-relaxed text-foreground/60">
                        "{scene.narratorScript}"
                      </p>
                    </div>
                  ))
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default CharacterCard;

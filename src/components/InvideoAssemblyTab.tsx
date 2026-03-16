import { useState } from "react";
import { Copy, Check, Clapperboard } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { sceneScripts } from "@/lib/sceneScripts";

const InvideoAssemblyTab = () => {
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const handleCopy = (text: string, fieldId: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldId);
    toast.success("COPIED: Text ready for video editor.");
    setTimeout(() => setCopiedField(null), 2000);
  };

  return (
    <div className="flex flex-col gap-4 rounded-lg bg-surface p-4 shadow-inset-surface">
      <div className="flex items-center gap-2">
        <Clapperboard className="h-3.5 w-3.5 text-accent" />
        <label className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
          INVIDEO_ASSEMBLY // SCRIPT_PIPELINE
        </label>
      </div>

      <div className="flex flex-col gap-3">
        {sceneScripts.map((scene) => (
          <motion.div
            key={scene.sceneId}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: scene.sceneId * 0.03 }}
            className="rounded-md bg-background/30 p-3"
          >
            <div className="mb-3 flex items-center gap-2 border-b border-muted/20 pb-2">
              <span className="font-mono text-[10px] text-primary">
                0{scene.sceneId}
              </span>
              <span className="text-xs font-medium tracking-tight text-foreground">
                {scene.sceneName}
              </span>
            </div>

            <div className="mb-3">
              <div className="mb-1 flex items-center justify-between">
                <span className="font-mono text-[9px] uppercase tracking-widest text-accent/70">
                  DIRECTOR'S_NOTES
                </span>
                <CopyButton
                  copied={copiedField === `notes-${scene.sceneId}`}
                  onClick={() => handleCopy(scene.directorsNotes, `notes-${scene.sceneId}`)}
                />
              </div>
              <p className="text-xs leading-relaxed text-foreground/70">
                {scene.directorsNotes}
              </p>
            </div>

            <div>
              <div className="mb-1 flex items-center justify-between">
                <span className="font-mono text-[9px] uppercase tracking-widest text-primary/70">
                  NARRATOR_SCRIPT
                </span>
                <CopyButton
                  copied={copiedField === `script-${scene.sceneId}`}
                  onClick={() => handleCopy(scene.narratorScript, `script-${scene.sceneId}`)}
                />
              </div>
              <p className="font-mono text-xs italic leading-relaxed text-foreground/60">
                "{scene.narratorScript}"
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const CopyButton = ({ copied, onClick }: { copied: boolean; onClick: () => void }) => (
  <motion.button
    onClick={onClick}
    className="flex items-center gap-1 rounded-sm px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-widest text-muted-foreground transition-colors hover:bg-muted/30 hover:text-foreground"
    whileTap={{ scale: 0.95 }}
  >
    {copied ? <Check className="h-2.5 w-2.5 text-primary" /> : <Copy className="h-2.5 w-2.5" />}
    {copied ? "COPIED" : "COPY"}
  </motion.button>
);

export default InvideoAssemblyTab;

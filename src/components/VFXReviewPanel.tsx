import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, X, RotateCcw, Check, History, Sparkles } from "lucide-react";
import { toast } from "sonner";
import type { CharacterElement } from "@/lib/characters";

export interface VFXVersion {
  id: string;
  image: string;
  timestamp: number;
  prompt_anchor: string;
  visual_logic: string;
  label: string;
}

interface VFXReviewPanelProps {
  character: CharacterElement;
  onUpdateCharacter: (updates: Partial<CharacterElement>) => void;
}

const VFXReviewPanel = ({ character, onUpdateCharacter }: VFXReviewPanelProps) => {
  const [open, setOpen] = useState(false);
  const [versions, setVersions] = useState<VFXVersion[]>([]);
  const [pendingImage, setPendingImage] = useState<string | null>(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [changeDescription, setChangeDescription] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      toast.error("INVALID_FILE: Images only.");
      return;
    }
    const reader = new FileReader();
    reader.onload = (ev) => {
      setPendingImage(ev.target?.result as string);
      setShowConfirm(true);
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (!file || !file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      setPendingImage(ev.target?.result as string);
      setShowConfirm(true);
    };
    reader.readAsDataURL(file);
  }, []);

  const handleConfirmMaster = () => {
    if (!pendingImage) return;

    // Save current version to history
    setVersions((prev) => [
      {
        id: `v${Date.now()}`,
        image: character.image,
        timestamp: Date.now(),
        prompt_anchor: character.prompt_anchor,
        visual_logic: character.visual_logic,
        label: `V${prev.length + 1}`,
      },
      ...prev,
    ]);

    // Build updated prompt
    const updatedAnchor = changeDescription.trim()
      ? `${character.prompt_anchor} UPDATE: ${changeDescription.trim()}`
      : character.prompt_anchor;

    onUpdateCharacter({
      image: pendingImage,
      prompt_anchor: updatedAnchor,
    });

    toast.success(`VFX_UPDATE: ${character.name} master reference updated.`);
    setPendingImage(null);
    setShowConfirm(false);
    setChangeDescription("");
  };

  const handleReject = () => {
    setPendingImage(null);
    setShowConfirm(false);
    setChangeDescription("");
  };

  const handleRevert = (version: VFXVersion) => {
    // Save current as a version first
    setVersions((prev) => [
      {
        id: `v${Date.now()}`,
        image: character.image,
        timestamp: Date.now(),
        prompt_anchor: character.prompt_anchor,
        visual_logic: character.visual_logic,
        label: `V${prev.length + 1}`,
      },
      ...prev,
    ]);

    onUpdateCharacter({
      image: version.image,
      prompt_anchor: version.prompt_anchor,
      visual_logic: version.visual_logic,
    });

    toast.success(`VFX_REVERT: ${character.name} reverted to ${version.label}.`);
  };

  return (
    <>
      <motion.button
        onClick={(e) => {
          e.stopPropagation();
          setOpen(true);
        }}
        className="flex w-full items-center justify-center gap-1.5 rounded-sm bg-muted/20 py-1 font-mono text-[8px] uppercase tracking-widest text-muted-foreground transition-colors hover:bg-muted/40 hover:text-foreground"
        whileTap={{ scale: 0.96 }}
      >
        <Sparkles className="h-2.5 w-2.5" />
        VFX Review
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
              className="mx-4 max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-lg bg-surface p-5 shadow-surface-hover"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="mb-4 flex items-start justify-between">
                <div>
                  <div className="mb-1 flex items-center gap-2">
                    <Sparkles className="h-3.5 w-3.5 text-accent" />
                    <span className="font-mono text-[10px] uppercase tracking-widest text-accent">
                      VFX_REVIEW
                    </span>
                  </div>
                  <h2 className="text-base font-semibold tracking-tight text-foreground">
                    {character.name}
                  </h2>
                </div>
                <button
                  onClick={() => setOpen(false)}
                  className="flex h-6 w-6 items-center justify-center rounded-sm text-muted-foreground transition-colors hover:bg-muted/30 hover:text-foreground"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              {/* Current Master */}
              <div className="mb-4">
                <label className="mb-2 block font-mono text-[9px] uppercase tracking-widest text-muted-foreground">
                  CURRENT_MASTER
                </label>
                <div className="overflow-hidden rounded-md">
                  <img
                    src={character.image}
                    alt={character.name}
                    className="h-48 w-full object-cover"
                  />
                </div>
                <p className="mt-2 font-mono text-[10px] leading-relaxed text-foreground/60">
                  {character.prompt_anchor}
                </p>
              </div>

              {/* Upload zone */}
              <div
                onDrop={handleDrop}
                onDragOver={(e) => e.preventDefault()}
                className="mb-4 flex cursor-pointer flex-col items-center gap-2 rounded-md border-2 border-dashed border-muted/30 py-6 transition-colors hover:border-accent/50 hover:bg-accent/5"
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload className="h-5 w-5 text-muted-foreground" />
                <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                  DROP KLING RENDER OR CLICK TO UPLOAD
                </span>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="hidden"
                />
              </div>

              {/* Pending confirmation */}
              <AnimatePresence>
                {showConfirm && pendingImage && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mb-4 overflow-hidden rounded-md bg-background/40 p-4"
                  >
                    <label className="mb-2 block font-mono text-[9px] uppercase tracking-widest text-accent">
                      MAKE THIS THE NEW MASTER REFERENCE?
                    </label>
                    <img
                      src={pendingImage}
                      alt="New version"
                      className="mb-3 h-40 w-full rounded-sm object-cover"
                    />
                    <div className="mb-3">
                      <label className="mb-1 block font-mono text-[8px] uppercase tracking-widest text-muted-foreground">
                        WHAT CHANGED? (updates prompt_anchor)
                      </label>
                      <input
                        type="text"
                        value={changeDescription}
                        onChange={(e) => setChangeDescription(e.target.value)}
                        placeholder="e.g., scar on left cheek, torn sweater, blood splatter"
                        className="w-full rounded-sm bg-background/60 px-3 py-2 font-mono text-[11px] text-foreground placeholder:text-muted-foreground/40 outline-none focus:ring-1 focus:ring-accent/50"
                      />
                    </div>
                    <div className="flex gap-2">
                      <motion.button
                        onClick={handleConfirmMaster}
                        className="flex flex-1 items-center justify-center gap-1.5 rounded-sm bg-primary py-2 font-mono text-[10px] uppercase tracking-widest text-primary-foreground"
                        whileTap={{ scale: 0.96 }}
                      >
                        <Check className="h-3 w-3" />
                        YES, UPDATE MASTER
                      </motion.button>
                      <motion.button
                        onClick={handleReject}
                        className="flex flex-1 items-center justify-center gap-1.5 rounded-sm bg-destructive/20 py-2 font-mono text-[10px] uppercase tracking-widest text-destructive"
                        whileTap={{ scale: 0.96 }}
                      >
                        <X className="h-3 w-3" />
                        DISCARD
                      </motion.button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Version History */}
              {versions.length > 0 && (
                <div>
                  <div className="mb-2 flex items-center gap-2">
                    <History className="h-3 w-3 text-muted-foreground" />
                    <label className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground">
                      VERSION_HISTORY // {versions.length} VERSION{versions.length !== 1 ? "S" : ""}
                    </label>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {versions.map((v) => (
                      <div key={v.id} className="group relative overflow-hidden rounded-sm">
                        <img
                          src={v.image}
                          alt={v.label}
                          className="aspect-square w-full object-cover opacity-70 transition-opacity group-hover:opacity-100"
                        />
                        <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 bg-background/60 opacity-0 transition-opacity group-hover:opacity-100">
                          <span className="font-mono text-[8px] uppercase tracking-widest text-foreground">
                            {v.label}
                          </span>
                          <motion.button
                            onClick={() => handleRevert(v)}
                            className="flex items-center gap-1 rounded-sm bg-primary/80 px-2 py-1 font-mono text-[8px] uppercase tracking-widest text-primary-foreground"
                            whileTap={{ scale: 0.95 }}
                          >
                            <RotateCcw className="h-2.5 w-2.5" />
                            REVERT
                          </motion.button>
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 bg-background/80 px-1 py-0.5">
                          <span className="font-mono text-[7px] text-muted-foreground">
                            {new Date(v.timestamp).toLocaleTimeString()}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default VFXReviewPanel;

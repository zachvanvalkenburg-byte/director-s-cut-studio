import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link2, Plus, Trash2, Copy, Check, ChevronDown, ChevronUp, FileText, Eye } from "lucide-react";
import { toast } from "sonner";

interface ReferenceCard {
  id: string;
  url: string;
  label: string;
  description: string;
  type: "youtube" | "cdn" | "other";
  active: boolean;
}

function detectType(url: string): ReferenceCard["type"] {
  if (/youtube\.com|youtu\.be/i.test(url)) return "youtube";
  if (/cdn|storage|assets|cloudfront|imgur|cloudinary/i.test(url)) return "cdn";
  return "other";
}

function generateManifesto(cards: ReferenceCard[]): string {
  const active = cards.filter((c) => c.active);
  if (active.length === 0) return "// No active references to compile.";

  const lines: string[] = [];
  lines.push("=== TRIBUTE TUBE — VISUAL REFERENCE MANIFESTO ===");
  lines.push(`Compiled: ${new Date().toISOString()}`);
  lines.push(`Active References: ${active.length}`);
  lines.push("");
  lines.push("INSTRUCTION: The following URLs and descriptions define the visual");
  lines.push("language of this project. Use them as ground-truth for all image/video");
  lines.push("generation. Do NOT deviate from these references.");
  lines.push("");

  active.forEach((card, i) => {
    lines.push(`--- REF ${String(i + 1).padStart(2, "0")}: ${card.label.toUpperCase()} ---`);
    lines.push(`Type: ${card.type.toUpperCase()}`);
    lines.push(`URL: ${card.url}`);
    lines.push(`Description: ${card.description}`);
    lines.push("");
  });

  lines.push("--- ENVIRONMENT BASELINE ---");
  lines.push("Setting: Appalachian hardwood forest, late autumn");
  lines.push("Palette: Desaturated teal-and-orange, brown/grey dominant, no green canopy");
  lines.push("Atmosphere: Mountain mist, overcast sky, cold damp air, low visibility beyond 50m");
  lines.push("Terrain: Dead leaves, exposed roots, rocky outcrops, bare branches");
  lines.push("Lens: 35mm anamorphic — ALL shots");
  lines.push("Mood: Dead serious — NO smiling, no humor, no levity");
  lines.push("");
  lines.push("=== END MANIFESTO ===");
  lines.push("Paste this at the start of every new AI session to maintain visual continuity.");

  return lines.join("\n");
}

const ReferenceIngestorPanel = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [cards, setCards] = useState<ReferenceCard[]>([]);
  const [urlInput, setUrlInput] = useState("");
  const [manifesto, setManifesto] = useState("");
  const [copied, setCopied] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const addReference = useCallback(() => {
    const trimmed = urlInput.trim();
    if (!trimmed) return;
    const card: ReferenceCard = {
      id: crypto.randomUUID(),
      url: trimmed,
      label: `Reference ${cards.length + 1}`,
      description: "// Paste your visual summary here",
      type: detectType(trimmed),
      active: true,
    };
    setCards((prev) => [...prev, card]);
    setUrlInput("");
    setEditingId(card.id);
    toast.success("REF_ADDED — click to edit description.");
  }, [urlInput, cards.length]);

  const removeCard = useCallback((id: string) => {
    setCards((prev) => prev.filter((c) => c.id !== id));
    toast.success("REF_REMOVED.");
  }, []);

  const toggleActive = useCallback((id: string) => {
    setCards((prev) =>
      prev.map((c) => (c.id === id ? { ...c, active: !c.active } : c))
    );
  }, []);

  const updateCard = useCallback((id: string, updates: Partial<ReferenceCard>) => {
    setCards((prev) =>
      prev.map((c) => (c.id === id ? { ...c, ...updates } : c))
    );
  }, []);

  const handleGenerateManifesto = () => {
    const text = generateManifesto(cards);
    setManifesto(text);
    toast.success("MANIFESTO compiled.");
  };

  const handleCopy = async () => {
    if (!manifesto) return;
    await navigator.clipboard.writeText(manifesto);
    setCopied(true);
    toast.success("Copied to clipboard.");
    setTimeout(() => setCopied(false), 2000);
  };

  const activeCount = cards.filter((c) => c.active).length;

  return (
    <div className="flex flex-col gap-2 rounded-lg bg-surface p-4 shadow-inset-surface">
      <button
        onClick={() => setIsOpen((p) => !p)}
        className="flex items-center gap-2 text-left"
      >
        <Link2 className="h-3.5 w-3.5 text-primary" />
        <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
          REFERENCE_INGESTOR
        </span>
        <div className="ml-auto flex items-center gap-2">
          <span className="font-mono text-[9px] text-primary/50">
            {activeCount}/{cards.length} ACTIVE
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
              {/* URL Input */}
              <div className="flex gap-2">
                <input
                  type="url"
                  value={urlInput}
                  onChange={(e) => setUrlInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && addReference()}
                  placeholder="Paste YouTube or CDN link..."
                  className="flex-1 rounded-sm border border-border/30 bg-background/40 px-3 py-2 font-mono text-[11px] text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-primary/30"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={addReference}
                  className="flex items-center gap-1 rounded-sm bg-primary/10 px-3 py-2 font-mono text-[10px] uppercase tracking-widest text-primary transition-colors hover:bg-primary/20"
                >
                  <Plus className="h-3 w-3" />
                  ADD
                </motion.button>
              </div>

              {/* Context Cards */}
              {cards.length > 0 && (
                <div className="flex flex-col gap-2">
                  {cards.map((card) => (
                    <motion.div
                      key={card.id}
                      layout
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: card.active ? 1 : 0.4, y: 0 }}
                      exit={{ opacity: 0, y: -4 }}
                      className="rounded-sm border border-border/20 bg-background/30 p-3"
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1">
                          {/* Label */}
                          <input
                            value={card.label}
                            onChange={(e) => updateCard(card.id, { label: e.target.value })}
                            className="w-full bg-transparent font-mono text-[11px] font-semibold text-foreground/90 focus:outline-none"
                          />
                          {/* URL */}
                          <p className="mt-0.5 truncate font-mono text-[9px] text-primary/50">
                            [{card.type.toUpperCase()}] {card.url}
                          </p>
                        </div>
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => toggleActive(card.id)}
                            title={card.active ? "Deactivate" : "Activate"}
                            className={`rounded-sm p-1 transition-colors ${
                              card.active
                                ? "text-primary hover:bg-primary/10"
                                : "text-muted-foreground hover:bg-muted/20"
                            }`}
                          >
                            <Eye className="h-3 w-3" />
                          </button>
                          <button
                            onClick={() => removeCard(card.id)}
                            className="rounded-sm p-1 text-destructive/60 transition-colors hover:bg-destructive/10 hover:text-destructive"
                          >
                            <Trash2 className="h-3 w-3" />
                          </button>
                        </div>
                      </div>
                      {/* Description */}
                      <textarea
                        value={card.description}
                        onChange={(e) => updateCard(card.id, { description: e.target.value })}
                        onFocus={() => {
                          if (card.description === "// Paste your visual summary here") {
                            updateCard(card.id, { description: "" });
                          }
                        }}
                        rows={3}
                        className="mt-2 w-full resize-none rounded-sm bg-background/40 p-2 font-mono text-[10px] leading-relaxed text-foreground/70 placeholder:text-muted-foreground/40 focus:outline-none focus:ring-1 focus:ring-primary/20"
                        placeholder="Describe the visual content of this reference..."
                      />
                    </motion.div>
                  ))}
                </div>
              )}

              {cards.length === 0 && (
                <div className="flex items-center justify-center gap-2 rounded-sm border border-dashed border-border/20 py-6">
                  <FileText className="h-3.5 w-3.5 text-muted-foreground/40" />
                  <span className="font-mono text-[10px] text-muted-foreground/40">
                    No references added yet
                  </span>
                </div>
              )}

              {/* Generate Button */}
              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleGenerateManifesto}
                disabled={cards.length === 0}
                className="w-full rounded-sm bg-primary/10 py-2.5 font-mono text-[10px] uppercase tracking-widest text-primary transition-colors hover:bg-primary/20 disabled:opacity-30 disabled:cursor-not-allowed"
              >
                Generate Gemini Brief
              </motion.button>

              {/* Manifesto Output */}
              {manifesto && (
                <motion.div
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col gap-2"
                >
                  <pre className="max-h-[300px] overflow-auto rounded-sm bg-background/40 p-3 font-mono text-[10px] leading-relaxed text-foreground/70 whitespace-pre-wrap">
                    {manifesto}
                  </pre>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[9px] text-muted-foreground">
                      {manifesto.length} chars
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

export default ReferenceIngestorPanel;

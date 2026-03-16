import { useState } from "react";
import { Copy, Check, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";

interface PromptGeneratorProps {
  generatedPrompt: string;
  onGenerate: () => void;
  canGenerate: boolean;
}

const PromptGenerator = ({ generatedPrompt, onGenerate, canGenerate }: PromptGeneratorProps) => {
  const [customDirectives, setCustomDirectives] = useState("");
  const [copied, setCopied] = useState(false);
  const displayPrompt = generatedPrompt || "";

  const handleCopy = () => {
    if (!displayPrompt.trim()) {
      toast.error("PROMPT_EMPTY: Generate a scene prompt first.");
      return;
    }
    navigator.clipboard.writeText(displayPrompt);
    setCopied(true);
    toast.success("PROMPT_COPIED: Ready for Kling pipeline.");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col gap-3 rounded-lg bg-surface p-4 shadow-inset-surface">
      <div className="flex items-center justify-between">
        <label className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
          GLOBAL_PROMPT_ENGINE
        </label>
        <span className="font-mono text-[10px] italic text-accent/80">
          Ready for Kling 1.5
        </span>
      </div>

      {/* Custom directives input */}
      <textarea
        value={customDirectives}
        onChange={(e) => setCustomDirectives(e.target.value)}
        className="min-h-[60px] w-full resize-none rounded-sm bg-background/50 p-3 font-mono text-sm leading-relaxed text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-primary/30"
        placeholder="Additional director notes (optional)..."
      />

      {/* Generate button */}
      <motion.button
        onClick={onGenerate}
        disabled={!canGenerate}
        className={`flex items-center justify-center gap-2 rounded-md py-2.5 font-mono text-xs font-bold uppercase tracking-widest transition-colors ${
          canGenerate
            ? "bg-accent/15 text-accent hover:bg-accent hover:text-accent-foreground"
            : "cursor-not-allowed bg-muted/20 text-muted-foreground/40"
        }`}
        whileTap={canGenerate ? { scale: 0.97 } : {}}
      >
        <Zap className="h-3.5 w-3.5" />
        Generate Scene Prompt
      </motion.button>

      {/* Generated output */}
      {displayPrompt && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="flex flex-col gap-2"
        >
          <label className="font-mono text-[10px] uppercase tracking-widest text-primary">
            OUTPUT_PREVIEW
          </label>
          <pre className="max-h-[200px] overflow-y-auto whitespace-pre-wrap rounded-sm bg-background/70 p-3 font-mono text-[11px] leading-relaxed text-foreground/80">
            {displayPrompt}
          </pre>
        </motion.div>
      )}

      <div className="flex items-center justify-between">
        <span className="font-mono text-[10px] text-muted-foreground">
          {displayPrompt.length} CHARS
        </span>

        <motion.button
          onClick={handleCopy}
          className="flex items-center justify-center gap-2 rounded-md bg-primary/10 px-4 py-2.5 font-mono text-xs font-bold uppercase tracking-widest text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
          whileTap={{ scale: 0.97 }}
        >
          {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
          {copied ? "Copied" : "Copy to Kling"}
        </motion.button>
      </div>
    </div>
  );
};

export { PromptGenerator };
export default PromptGenerator;
export type { PromptGeneratorProps };

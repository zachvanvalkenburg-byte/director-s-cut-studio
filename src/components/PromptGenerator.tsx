import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";

const PromptGenerator = () => {
  const [prompt, setPrompt] = useState("");
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (!prompt.trim()) {
      toast.error("PROMPT_EMPTY: Enter cinematic directives first.");
      return;
    }
    navigator.clipboard.writeText(prompt);
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

      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        className="min-h-[120px] w-full resize-none rounded-sm bg-background/50 p-3 font-mono text-sm leading-relaxed text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-1 focus:ring-primary/30"
        placeholder="Enter cinematic directives..."
      />

      <div className="flex items-center justify-between">
        <span className="font-mono text-[10px] text-muted-foreground">
          {prompt.length} CHARS
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

export default PromptGenerator;

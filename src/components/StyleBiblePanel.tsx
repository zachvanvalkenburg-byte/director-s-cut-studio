import { motion } from "framer-motion";
import { BookOpen, Shield } from "lucide-react";
import { DEFAULT_STYLE_BIBLE, type StyleRule } from "@/lib/styleBible";

interface StyleBiblePanelProps {
  rules: StyleRule[];
}

const categoryIcons: Record<string, string> = {
  LIGHTING: "◐",
  CAMERA: "◎",
  SACRED_RULE: "⛊",
};

const categoryColors: Record<string, string> = {
  LIGHTING: "text-primary",
  CAMERA: "text-primary",
  SACRED_RULE: "text-accent",
};

const StyleBiblePanel = ({ rules }: StyleBiblePanelProps) => {
  return (
    <div className="flex flex-col gap-3 rounded-lg bg-surface p-4 shadow-inset-surface">
      {/* Header */}
      <div className="flex items-center gap-2">
        <BookOpen className="h-3.5 w-3.5 text-accent" />
        <label className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
          KNOWLEDGE_BASE // STYLE_BIBLE
        </label>
        <div className="ml-auto flex items-center gap-1.5">
          <Shield className="h-3 w-3 text-accent/60" />
          <span className="font-mono text-[9px] uppercase tracking-widest text-accent/60">
            LOCKED
          </span>
        </div>
      </div>

      {/* Rules */}
      <div className="flex flex-col gap-2">
        {rules.map((rule, i) => (
          <motion.div
            key={rule.id}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
            className="group flex gap-3 rounded-sm bg-background/30 px-3 py-2.5 transition-colors hover:bg-background/50"
          >
            {/* Category tag */}
            <div className="flex flex-shrink-0 flex-col items-center gap-1 pt-0.5">
              <span className={`text-xs ${categoryColors[rule.category] || "text-primary"}`}>
                {categoryIcons[rule.category] || "●"}
              </span>
              <span className="font-mono text-[8px] uppercase tracking-widest text-muted-foreground">
                {rule.category}
              </span>
            </div>

            {/* Content */}
            <div className="flex flex-col gap-0.5">
              <span className="font-mono text-[10px] font-medium uppercase tracking-wider text-foreground/70">
                {rule.label}
              </span>
              <span className="text-xs leading-relaxed text-muted-foreground">
                {rule.value}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default StyleBiblePanel;

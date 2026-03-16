import { motion } from "framer-motion";
import { Check } from "lucide-react";
import type { CharacterElement } from "@/lib/characters";

interface CharacterCardProps {
  character: CharacterElement;
  selected?: boolean;
  onToggle?: () => void;
}

const CharacterCard = ({ character, selected, onToggle }: CharacterCardProps) => {
  const isKilled = character.status.startsWith("Killed");

  return (
    <motion.div
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
        className={`h-full w-full object-cover transition-all duration-300 ${
          isKilled ? "opacity-40 grayscale" : selected ? "opacity-100 grayscale-0" : "opacity-80 grayscale-[0.2] hover:opacity-100 hover:grayscale-0"
        }`}
      />

      {/* Selection check */}
      {selected && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute left-2 top-2 flex h-5 w-5 items-center justify-center rounded-sm bg-primary"
        >
          <Check className="h-3 w-3 text-primary-foreground" />
        </motion.div>
      )}

      {/* Status badge (killed) */}
      {isKilled && (
        <div className="absolute left-2 top-2 rounded-sm bg-destructive/80 px-1.5 py-0.5 font-mono text-[8px] uppercase tracking-widest text-destructive-foreground backdrop-blur-sm">
          ✕ KIA
        </div>
      )}

      {/* Bottom gradient overlay */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background/95 via-background/50 to-transparent p-3">
        <div className="mb-0.5 flex items-center gap-1.5">
          <span className="font-mono text-[9px] uppercase tracking-widest text-primary">
            D{character.district}
          </span>
          <span className="text-muted-foreground/30">·</span>
          <span className="font-mono text-[9px] text-accent/70 truncate">
            {character.archetype}
          </span>
        </div>
        <h3 className="text-sm font-semibold text-foreground truncate">{character.name}</h3>
      </div>

      {/* ID badge */}
      <div className="absolute right-2 top-2 rounded-sm bg-background/60 px-1.5 py-0.5 font-mono text-[9px] text-muted-foreground backdrop-blur-md">
        {character.id.toUpperCase()}
      </div>
    </motion.div>
  );
};

export default CharacterCard;

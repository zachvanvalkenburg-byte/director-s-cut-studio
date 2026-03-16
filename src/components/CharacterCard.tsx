import { motion } from "framer-motion";

interface CharacterCardProps {
  name: string;
  type: string;
  assetId: string;
  image: string;
}

const CharacterCard = ({ name, type, assetId, image }: CharacterCardProps) => {
  return (
    <motion.div
      className="relative aspect-square cursor-pointer overflow-hidden rounded-lg bg-surface shadow-surface transition-shadow hover:shadow-surface-hover"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
    >
      {/* Image */}
      <img
        src={image}
        alt={name}
        className="h-full w-full object-cover opacity-80 grayscale-[0.2] transition-all duration-300 hover:opacity-100 hover:grayscale-0"
      />

      {/* Bottom gradient overlay */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background/90 via-background/40 to-transparent p-3">
        <p className="font-mono text-[10px] uppercase tracking-widest text-primary">
          {type}
        </p>
        <h3 className="text-sm font-semibold text-foreground">{name}</h3>
      </div>

      {/* Asset ID badge */}
      <div className="absolute right-2 top-2 rounded-sm bg-background/60 px-1.5 py-0.5 font-mono text-[9px] text-muted-foreground backdrop-blur-md">
        ID: {assetId}
      </div>
    </motion.div>
  );
};

export default CharacterCard;

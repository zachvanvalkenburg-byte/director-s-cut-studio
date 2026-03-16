import { useState } from "react";
import { motion } from "framer-motion";
import { Film } from "lucide-react";

interface Scene {
  id: number;
  name: string;
  duration: string;
}

const scenes: Scene[] = [
  { id: 1, name: "THE_SETUP", duration: "00:42" },
  { id: 2, name: "PURSUIT_BEGINS", duration: "01:18" },
  { id: 3, name: "SAFEHOUSE_INT", duration: "00:56" },
  { id: 4, name: "CONFRONTATION", duration: "01:34" },
  { id: 5, name: "THE_REVEAL", duration: "00:48" },
  { id: 6, name: "RESOLUTION", duration: "01:02" },
];

const SceneSidebar = () => {
  const [activeScene, setActiveScene] = useState(1);

  return (
    <aside className="relative flex h-full w-[240px] flex-shrink-0 flex-col bg-sidebar shadow-[inset_-1px_0_0_rgba(255,255,255,0.04)]">
      {/* Header */}
      <div className="flex items-center gap-2 px-4 py-5">
        <Film className="h-4 w-4 text-primary" />
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
          SCENE_INDEX
        </span>
      </div>

      {/* Scene List */}
      <nav className="flex flex-1 flex-col gap-0.5 px-2">
        {scenes.map((scene) => {
          const isActive = activeScene === scene.id;
          return (
            <motion.button
              key={scene.id}
              onClick={() => setActiveScene(scene.id)}
              className="group relative flex items-center gap-3 rounded-sm px-3 py-3 text-left transition-colors duration-150 hover:bg-sidebar-accent"
              whileTap={{ scale: 0.98 }}
            >
              {/* Active indicator */}
              {isActive && (
                <motion.div
                  layoutId="scene-active"
                  className="absolute left-0 top-1/2 h-4 w-[2px] -translate-y-1/2 bg-primary"
                  style={{
                    boxShadow: "0 0 8px rgba(74,157,164,0.5)",
                  }}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}

              {/* Scene number */}
              <span
                className={`font-mono text-[10px] transition-colors ${
                  isActive
                    ? "text-primary"
                    : "text-muted-foreground group-hover:text-primary"
                }`}
              >
                0{scene.id}
              </span>

              {/* Scene name */}
              <span
                className={`flex-1 text-sm font-medium tracking-tight transition-colors ${
                  isActive
                    ? "text-foreground"
                    : "text-foreground/60 group-hover:text-foreground"
                }`}
              >
                {scene.name}
              </span>

              {/* Duration */}
              <span className="font-mono text-[10px] text-muted-foreground">
                {scene.duration}
              </span>
            </motion.button>
          );
        })}
      </nav>

      {/* Footer status */}
      <div className="border-t border-sidebar-border px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="h-1.5 w-1.5 rounded-full bg-primary animate-pulse" />
          <span className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground">
            SYSTEM_READY
          </span>
        </div>
      </div>
    </aside>
  );
};

export default SceneSidebar;

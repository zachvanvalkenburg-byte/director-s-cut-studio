import { motion } from "framer-motion";
import { Download } from "lucide-react";
import { toast } from "sonner";
import type { CharacterElement } from "@/lib/characters";
import type { Scene } from "@/components/SceneSidebar";
import { generateScenePrompt, DEFAULT_STYLE_BIBLE } from "@/lib/styleBible";

interface MasterExportButtonProps {
  characters: CharacterElement[];
  activeScene: Scene;
}

function escapeCSV(value: string): string {
  if (value.includes(",") || value.includes('"') || value.includes("\n")) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}

const MasterExportButton = ({ characters, activeScene }: MasterExportButtonProps) => {
  const handleExport = () => {
    const headers = ["Name", "District", "Archetype", "Status", "Survival Priority", "Kling Technical Prompt"];

    const rows = characters.map((char) => {
      const prompt = generateScenePrompt(activeScene, [char], DEFAULT_STYLE_BIBLE, "");
      return [
        escapeCSV(char.name),
        String(char.district),
        escapeCSV(char.archetype),
        escapeCSV(char.status),
        String(char.survival_priority),
        escapeCSV(prompt),
      ].join(",");
    });

    const csv = [headers.join(","), ...rows].join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `master-export_scene-${String(activeScene.id).padStart(2, "0")}.csv`;
    link.click();
    URL.revokeObjectURL(url);

    toast.success(`MASTER_EXPORT: ${characters.length} tributes exported for Scene ${String(activeScene.id).padStart(2, "0")}.`);
  };

  return (
    <motion.button
      onClick={handleExport}
      className="flex w-full items-center justify-center gap-2 rounded-lg bg-primary py-3 font-mono text-[11px] uppercase tracking-widest text-primary-foreground transition-colors hover:bg-primary/90"
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.98 }}
    >
      <Download className="h-4 w-4" />
      Master Export — {characters.length} Tributes × Scene {String(activeScene.id).padStart(2, "0")}
    </motion.button>
  );
};

export default MasterExportButton;

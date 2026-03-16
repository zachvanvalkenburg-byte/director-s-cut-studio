import { useState } from "react";
import { motion } from "framer-motion";
import { Volume2, Copy, Check } from "lucide-react";
import { toast } from "sonner";
import { sceneScripts } from "@/lib/sceneScripts";
import type { Scene } from "@/components/SceneSidebar";

// Suggested SFX mapped per scene
const sceneSFX: Record<number, string[]> = {
  1: ["City ambience — distant sirens, traffic hum", "Footsteps on wet concrete", "Wind through corridor"],
  2: ["Engine roar — V6 Altima with exhaust rattle", "Tire screech on wet asphalt", "Rain on windshield", "Artillery shell impact — Abby Lee elimination", "Fireball explosion with shockwave rumble", "Wheelchair metal debris scatter"],
  3: ["Single overhead bulb hum", "Muffled rain outside", "Chair scrape on concrete", "Tense silence — room tone only"],
  4: ["Low cello drone — score entry", "Weapon rack focus click", "Heartbeat pulse — sub-bass", "Clown horn — single, distant, unsettling"],
  5: ["Breath — close-mic inhale", "Teal wash — ambient synth pad", "Memory flashback reverb tail", "Door lock — mechanical click"],
  6: ["Dawn birdsong — sparse", "Footsteps receding — gravel to silence", "City waking — distant horns", "Fade to silence — 4 second tail"],
};

interface ExportAudioScriptProps {
  scene: Scene;
}

const ExportAudioScript = ({ scene }: ExportAudioScriptProps) => {
  const [copied, setCopied] = useState(false);

  const sceneScript = sceneScripts.find((s) => s.sceneId === scene.id);
  const sfx = sceneSFX[scene.id] || [];

  const generateAudioScript = () => {
    const lines: string[] = [];

    lines.push(`[INVIDEO_AUDIO_SCRIPT // SCENE_${String(scene.id).padStart(2, "0")}: ${scene.name}]`);
    lines.push(`DURATION: ${scene.duration}`);
    lines.push("");

    // Narrator
    lines.push("--- NARRATOR_VO ---");
    if (sceneScript) {
      lines.push(`"${sceneScript.narratorScript}"`);
      lines.push("");
      lines.push("DELIVERY: Slow, deliberate. Low register. No emotion — let the words carry weight.");
    } else {
      lines.push("No narrator script assigned.");
    }
    lines.push("");

    // SFX
    lines.push("--- SOUND_EFFECTS ---");
    if (sfx.length > 0) {
      sfx.forEach((effect, i) => {
        lines.push(`  ${String(i + 1).padStart(2, "0")}. ${effect}`);
      });
    } else {
      lines.push("No SFX assigned.");
    }
    lines.push("");

    // Director's audio notes
    if (sceneScript) {
      lines.push("--- DIRECTOR_AUDIO_NOTES ---");
      lines.push(sceneScript.directorsNotes);
      lines.push("");
    }

    lines.push("[END_AUDIO_SCRIPT]");
    return lines.join("\n");
  };

  const script = generateAudioScript();

  const handleCopy = () => {
    navigator.clipboard.writeText(script);
    setCopied(true);
    toast.success(`AUDIO_SCRIPT: Scene ${String(scene.id).padStart(2, "0")} exported for Invideo.`);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="rounded-lg bg-surface p-4 shadow-inset-surface">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Volume2 className="h-3.5 w-3.5 text-accent" />
          <label className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
            AUDIO_SCRIPT // SCENE_{String(scene.id).padStart(2, "0")}
          </label>
        </div>
        <motion.button
          onClick={handleCopy}
          className="flex items-center gap-1.5 rounded-sm bg-accent/10 px-2.5 py-1.5 font-mono text-[9px] uppercase tracking-widest text-accent transition-colors hover:bg-accent/20"
          whileTap={{ scale: 0.95 }}
        >
          {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
          {copied ? "COPIED" : "EXPORT FOR INVIDEO"}
        </motion.button>
      </div>

      <div className="rounded-md bg-background/30 p-3">
        <pre className="whitespace-pre-wrap font-mono text-[10px] leading-relaxed text-foreground/70">
          {script}
        </pre>
      </div>
    </div>
  );
};

export default ExportAudioScript;

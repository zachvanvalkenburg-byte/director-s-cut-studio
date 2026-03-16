import { useState } from "react";
import { Copy, Check, Clapperboard } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";

interface SceneScript {
  sceneId: number;
  sceneName: string;
  directorsNotes: string;
  narratorScript: string;
}

const sceneScripts: SceneScript[] = [
  {
    sceneId: 1,
    sceneName: "THE_SETUP",
    directorsNotes: "Open cold. No music. Ambient city hum only. Zach enters frame from the left, camera tracks at waist-height. Hold on his face for 3 beats before he speaks. Let the silence do the work.",
    narratorScript: "The city doesn't sleep. It watches. And tonight, it has its eyes on one man who made the mistake of looking back.",
  },
  {
    sceneId: 2,
    sceneName: "PURSUIT_BEGINS",
    directorsNotes: "Quick cuts. Handheld shakes increase. Keisha's Altima tears through wet streets — use low-angle tracking shot from curb level. Orange sodium lights streak across the windshield. No dialogue, only engine and rain.",
    narratorScript: "She drove like the road owed her something. Every turn sharper than the last, every red light a suggestion she chose to ignore.",
  },
  {
    sceneId: 3,
    sceneName: "SAFEHOUSE_INT",
    directorsNotes: "Single overhead bulb, everything else in shadow. Zach and Keisha face each other across a bare table. Camera holds static — two-shot, no cuts for 45 seconds. Let the tension build in the stillness.",
    narratorScript: "Four walls. One light. Two people who stopped trusting the world outside — and were starting to doubt each other.",
  },
  {
    sceneId: 4,
    sceneName: "CONFRONTATION",
    directorsNotes: "Marcus enters from deep background, slowly sharpening into focus. Rack focus between Marcus and Zach three times. Score enters here — low cello drone. Close-up on the weapon. Trigger discipline matters.",
    narratorScript: "Marcus didn't raise his voice. He didn't need to. The weight of what he knew was louder than any bullet.",
  },
  {
    sceneId: 5,
    sceneName: "THE_REVEAL",
    directorsNotes: "Slow push-in on Keisha's face as the truth lands. Hold the take even if it feels too long. The audience needs to sit in her realization. Desaturate 10% more than base grade. Kill the orange — teal only.",
    narratorScript: "The truth didn't set her free. It locked every door she'd ever walked through and swallowed the key.",
  },
  {
    sceneId: 6,
    sceneName: "RESOLUTION",
    directorsNotes: "Wide shot, dawn light creeping in. Zach walks away from camera — do NOT follow. Let him shrink into the frame. Hold until he's a silhouette. Fade to black over 4 seconds. No credits music.",
    narratorScript: "Some stories end with answers. This one ends with footsteps — getting quieter, getting further, until there's nothing left but the sound of a city waking up to forget.",
  },
];

const InvideoAssemblyTab = () => {
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const handleCopy = (text: string, fieldId: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldId);
    toast.success("COPIED: Text ready for video editor.");
    setTimeout(() => setCopiedField(null), 2000);
  };

  return (
    <div className="flex flex-col gap-4 rounded-lg bg-surface p-4 shadow-inset-surface">
      {/* Header */}
      <div className="flex items-center gap-2">
        <Clapperboard className="h-3.5 w-3.5 text-accent" />
        <label className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
          INVIDEO_ASSEMBLY // SCRIPT_PIPELINE
        </label>
      </div>

      {/* Scene scripts */}
      <div className="flex flex-col gap-3">
        {sceneScripts.map((scene) => (
          <motion.div
            key={scene.sceneId}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: scene.sceneId * 0.03 }}
            className="rounded-md bg-background/30 p-3"
          >
            {/* Scene header */}
            <div className="mb-3 flex items-center gap-2 border-b border-muted/20 pb-2">
              <span className="font-mono text-[10px] text-primary">
                0{scene.sceneId}
              </span>
              <span className="text-xs font-medium tracking-tight text-foreground">
                {scene.sceneName}
              </span>
            </div>

            {/* Director's Notes */}
            <div className="mb-3">
              <div className="mb-1 flex items-center justify-between">
                <span className="font-mono text-[9px] uppercase tracking-widest text-accent/70">
                  DIRECTOR'S_NOTES
                </span>
                <CopyButton
                  copied={copiedField === `notes-${scene.sceneId}`}
                  onClick={() => handleCopy(scene.directorsNotes, `notes-${scene.sceneId}`)}
                />
              </div>
              <p className="text-xs leading-relaxed text-foreground/70">
                {scene.directorsNotes}
              </p>
            </div>

            {/* Narrator Script */}
            <div>
              <div className="mb-1 flex items-center justify-between">
                <span className="font-mono text-[9px] uppercase tracking-widest text-primary/70">
                  NARRATOR_SCRIPT
                </span>
                <CopyButton
                  copied={copiedField === `script-${scene.sceneId}`}
                  onClick={() => handleCopy(scene.narratorScript, `script-${scene.sceneId}`)}
                />
              </div>
              <p className="font-mono text-xs italic leading-relaxed text-foreground/60">
                "{scene.narratorScript}"
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const CopyButton = ({ copied, onClick }: { copied: boolean; onClick: () => void }) => (
  <motion.button
    onClick={onClick}
    className="flex items-center gap-1 rounded-sm px-1.5 py-0.5 font-mono text-[9px] uppercase tracking-widest text-muted-foreground transition-colors hover:bg-muted/30 hover:text-foreground"
    whileTap={{ scale: 0.95 }}
  >
    {copied ? <Check className="h-2.5 w-2.5 text-primary" /> : <Copy className="h-2.5 w-2.5" />}
    {copied ? "COPIED" : "COPY"}
  </motion.button>
);

export default InvideoAssemblyTab;

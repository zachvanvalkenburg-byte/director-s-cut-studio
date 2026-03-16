import { useState } from "react";
import { Send, Loader2, Settings2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

interface MakeSyncButtonProps {
  sceneTitle: string;
  characterElements: { name: string; type: string; assetId: string }[];
  generatedPrompt: string;
}

const WEBHOOK_STORAGE_KEY = "make_webhook_url";

const MakeSyncButton = ({ sceneTitle, characterElements, generatedPrompt }: MakeSyncButtonProps) => {
  const [webhookUrl, setWebhookUrl] = useState(() => localStorage.getItem(WEBHOOK_STORAGE_KEY) || "");
  const [showConfig, setShowConfig] = useState(false);
  const [syncing, setSyncing] = useState(false);

  const saveWebhookUrl = (url: string) => {
    setWebhookUrl(url);
    localStorage.setItem(WEBHOOK_STORAGE_KEY, url);
  };

  const handleSync = async () => {
    if (!webhookUrl.trim()) {
      setShowConfig(true);
      toast.error("WEBHOOK_MISSING: Configure Make.com webhook URL first.");
      return;
    }

    if (!generatedPrompt.trim()) {
      toast.error("PROMPT_EMPTY: Generate a scene prompt before syncing.");
      return;
    }

    setSyncing(true);
    const payload = {
      timestamp: new Date().toISOString(),
      scene_title: sceneTitle,
      character_elements: characterElements,
      technical_prompt: generatedPrompt,
    };

    try {
      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      toast.success("SYNC_COMPLETE: Payload delivered to Make.com.");
    } catch (err) {
      toast.error(`SYNC_FAILED: ${err instanceof Error ? err.message : "Unknown error"}`);
    } finally {
      setSyncing(false);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      {/* Config toggle */}
      <AnimatePresence>
        {showConfig && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="flex flex-col gap-2 overflow-hidden"
          >
            <label className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground">
              MAKE.COM_WEBHOOK_URL
            </label>
            <input
              type="url"
              value={webhookUrl}
              onChange={(e) => saveWebhookUrl(e.target.value)}
              placeholder="https://hook.us1.make.com/..."
              className="w-full rounded-sm bg-background/50 px-3 py-2 font-mono text-xs text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:ring-1 focus:ring-accent/30"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Button row */}
      <div className="flex items-center gap-2">
        <motion.button
          onClick={handleSync}
          disabled={syncing}
          className="flex flex-1 items-center justify-center gap-2 rounded-md bg-accent/15 py-2.5 font-mono text-xs font-bold uppercase tracking-widest text-accent transition-colors hover:bg-accent hover:text-accent-foreground disabled:cursor-not-allowed disabled:opacity-50"
          whileTap={!syncing ? { scale: 0.97 } : {}}
        >
          {syncing ? (
            <Loader2 className="h-3.5 w-3.5 animate-spin" />
          ) : (
            <Send className="h-3.5 w-3.5" />
          )}
          {syncing ? "Syncing..." : "Sync to Make.com"}
        </motion.button>

        <motion.button
          onClick={() => setShowConfig(!showConfig)}
          className="flex h-[38px] w-[38px] items-center justify-center rounded-md bg-muted/30 text-muted-foreground transition-colors hover:bg-muted/50 hover:text-foreground"
          whileTap={{ scale: 0.95 }}
        >
          <Settings2 className="h-3.5 w-3.5" />
        </motion.button>
      </div>
    </div>
  );
};

export default MakeSyncButton;

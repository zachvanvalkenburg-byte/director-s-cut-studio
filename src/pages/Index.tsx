import { useState, useCallback, useMemo } from "react";
import { motion } from "framer-motion";
import SceneSidebar, { scenes } from "@/components/SceneSidebar";
import CharacterCard from "@/components/CharacterCard";
import PromptGenerator from "@/components/PromptGenerator";
import StyleBiblePanel from "@/components/StyleBiblePanel";
import MakeSyncButton from "@/components/MakeSyncButton";
import InvideoAssemblyTab from "@/components/InvideoAssemblyTab";
import KlingCopyBox from "@/components/KlingCopyBox";
import { DEFAULT_STYLE_BIBLE, generateScenePrompt } from "@/lib/styleBible";
import { characterElements } from "@/lib/characters";
import { toast } from "sonner";

type DashboardTab = "assets" | "invideo";

const Index = () => {
  const [activeScene, setActiveScene] = useState(1);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [generatedPrompt, setGeneratedPrompt] = useState("");
  const [activeTab, setActiveTab] = useState<DashboardTab>("assets");

  const toggleAsset = useCallback((id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }, []);

  const handleGenerate = useCallback(() => {
    const scene = scenes.find((s) => s.id === activeScene);
    if (!scene) return;
    const selected = characterElements.filter((c) => selectedIds.has(c.id));
    const prompt = generateScenePrompt(scene, selected, DEFAULT_STYLE_BIBLE, "");
    setGeneratedPrompt(prompt);
    toast.success(`PROMPT_GENERATED: Scene ${String(scene.id).padStart(2, "0")} compiled.`);
  }, [activeScene, selectedIds]);

  const canGenerate = selectedIds.size > 0;
  const activeSceneData = scenes.find((s) => s.id === activeScene)!;
  const selectedCharsForSync = characterElements
    .filter((c) => selectedIds.has(c.id))
    .map(({ id, name, archetype }) => ({ name, type: archetype, assetId: id }));
  const selectedChars = useMemo(
    () => characterElements.filter((c) => selectedIds.has(c.id)),
    [selectedIds]
  );

  const tabs: { id: DashboardTab; label: string }[] = [
    { id: "assets", label: "ASSET_LIBRARY" },
    { id: "invideo", label: "INVIDEO_ASSEMBLY" },
  ];

  return (
    <div className="flex h-screen w-full overflow-hidden bg-background">
      <SceneSidebar activeScene={activeScene} onSceneSelect={setActiveScene} />

      <main className="flex flex-1 flex-col gap-6 overflow-y-auto p-6">
        {/* Header + Tabs */}
        <div className="flex flex-col gap-4">
          <div className="flex items-end justify-between">
            <div>
              <h1 className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                DIRECTOR'S_DASHBOARD
              </h1>
              <p className="mt-1 text-lg font-semibold tracking-tight text-foreground">
                {activeTab === "assets" ? "Character Element Library" : "Invideo Assembly"}
              </p>
            </div>
            <div className="flex items-center gap-4">
              {activeTab === "assets" && selectedIds.size > 0 && (
                <span className="font-mono text-[10px] text-primary">
                  {selectedIds.size} SELECTED
                </span>
              )}
              <span className="font-mono text-[10px] text-muted-foreground">
                {activeTab === "assets"
                  ? `${characterElements.length} ELEMENTS_LOADED`
                  : "6 SCENES_INDEXED"}
              </span>
            </div>
          </div>

          {/* Tab bar */}
          <div className="flex gap-1 rounded-md bg-background/50 p-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative flex-1 rounded-sm py-2 font-mono text-[10px] uppercase tracking-widest transition-colors ${
                  activeTab === tab.id
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground/70"
                }`}
              >
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="tab-active"
                    className="absolute inset-0 rounded-sm bg-surface shadow-surface"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Tab content */}
        {activeTab === "assets" ? (
          <>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
              {characterElements.map((char) => (
                <CharacterCard
                  key={char.id}
                  character={char}
                  selected={selectedIds.has(char.id)}
                  onToggle={() => toggleAsset(char.id)}
                />
              ))}
            </div>

            {/* Kling Copy Box — appears when character + scene selected */}
            <KlingCopyBox
              selectedCharacters={selectedChars}
              activeScene={activeSceneData}
            />

            <StyleBiblePanel rules={DEFAULT_STYLE_BIBLE} />

            <PromptGenerator
              generatedPrompt={generatedPrompt}
              onGenerate={handleGenerate}
              canGenerate={canGenerate}
            />

            <MakeSyncButton
              sceneTitle={activeSceneData?.name || "UNKNOWN"}
              characterElements={selectedCharsForSync}
              generatedPrompt={generatedPrompt}
            />
          </>
        ) : (
          <InvideoAssemblyTab />
        )}
      </main>
    </div>
  );
};

export default Index;

import { useState, useCallback } from "react";
import SceneSidebar, { scenes } from "@/components/SceneSidebar";
import CharacterCard from "@/components/CharacterCard";
import PromptGenerator from "@/components/PromptGenerator";
import StyleBiblePanel from "@/components/StyleBiblePanel";
import { DEFAULT_STYLE_BIBLE, generateScenePrompt } from "@/lib/styleBible";
import { toast } from "sonner";

import charZach from "@/assets/char-zach.jpg";
import charKeisha from "@/assets/char-keisha.jpg";
import charAltima from "@/assets/char-altima.jpg";
import charSafehouse from "@/assets/char-safehouse.jpg";
import charMarcus from "@/assets/char-marcus.jpg";
import charPropWeapon from "@/assets/char-prop-weapon.jpg";

const assets = [
  { name: "Zach", type: "CHARACTER", assetId: "CHR-001", image: charZach },
  { name: "Keisha", type: "CHARACTER", assetId: "CHR-002", image: charKeisha },
  { name: "Keisha's Altima", type: "VEHICLE", assetId: "VHC-001", image: charAltima },
  { name: "Safehouse", type: "LOCATION", assetId: "LOC-001", image: charSafehouse },
  { name: "Marcus", type: "CHARACTER", assetId: "CHR-003", image: charMarcus },
  { name: "Service Weapon", type: "PROP", assetId: "PRP-001", image: charPropWeapon },
];

const Index = () => {
  const [activeScene, setActiveScene] = useState(1);
  const [selectedAssetIds, setSelectedAssetIds] = useState<Set<string>>(new Set());
  const [generatedPrompt, setGeneratedPrompt] = useState("");

  const toggleAsset = useCallback((assetId: string) => {
    setSelectedAssetIds((prev) => {
      const next = new Set(prev);
      if (next.has(assetId)) {
        next.delete(assetId);
      } else {
        next.add(assetId);
      }
      return next;
    });
  }, []);

  const handleGenerate = useCallback(() => {
    const scene = scenes.find((s) => s.id === activeScene);
    if (!scene) return;

    const selectedAssets = assets.filter((a) => selectedAssetIds.has(a.assetId));

    const prompt = generateScenePrompt(
      scene,
      selectedAssets,
      DEFAULT_STYLE_BIBLE,
      "" // custom directives handled inside PromptGenerator display
    );

    setGeneratedPrompt(prompt);
    toast.success(`PROMPT_GENERATED: Scene ${String(scene.id).padStart(2, "0")} compiled.`);
  }, [activeScene, selectedAssetIds]);

  const canGenerate = selectedAssetIds.size > 0;

  return (
    <div className="flex h-screen w-full overflow-hidden bg-background">
      <SceneSidebar activeScene={activeScene} onSceneSelect={setActiveScene} />

      <main className="flex flex-1 flex-col gap-6 overflow-y-auto p-6">
        {/* Header */}
        <div className="flex items-end justify-between">
          <div>
            <h1 className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              DIRECTOR'S_DASHBOARD
            </h1>
            <p className="mt-1 text-lg font-semibold tracking-tight text-foreground">
              Character Asset Library
            </p>
          </div>
          <div className="flex items-center gap-4">
            {selectedAssetIds.size > 0 && (
              <span className="font-mono text-[10px] text-primary">
                {selectedAssetIds.size} SELECTED
              </span>
            )}
            <span className="font-mono text-[10px] text-muted-foreground">
              {assets.length} ASSETS_LOADED
            </span>
          </div>
        </div>

        {/* Asset Grid */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {assets.map((asset) => (
            <CharacterCard
              key={asset.assetId}
              {...asset}
              selected={selectedAssetIds.has(asset.assetId)}
              onToggle={() => toggleAsset(asset.assetId)}
            />
          ))}
        </div>

        {/* Knowledge Base: Style Bible */}
        <StyleBiblePanel rules={DEFAULT_STYLE_BIBLE} />

        {/* Prompt Generator */}
        <PromptGenerator
          generatedPrompt={generatedPrompt}
          onGenerate={handleGenerate}
          canGenerate={canGenerate}
        />
      </main>
    </div>
  );
};

export default Index;

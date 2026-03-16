import SceneSidebar from "@/components/SceneSidebar";
import CharacterCard from "@/components/CharacterCard";
import PromptGenerator from "@/components/PromptGenerator";

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
  return (
    <div className="flex h-screen w-full overflow-hidden bg-background">
      {/* Scene Sidebar */}
      <SceneSidebar />

      {/* Main Content */}
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
          <span className="font-mono text-[10px] text-muted-foreground">
            {assets.length} ASSETS_LOADED
          </span>
        </div>

        {/* Asset Grid */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {assets.map((asset) => (
            <CharacterCard key={asset.assetId} {...asset} />
          ))}
        </div>

        {/* Prompt Generator */}
        <PromptGenerator />
      </main>
    </div>
  );
};

export default Index;

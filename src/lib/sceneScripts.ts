export interface SceneScript {
  sceneId: number;
  sceneName: string;
  directorsNotes: string;
  narratorScript: string;
  /** Character IDs featured in this scene */
  characterIds: string[];
}

export const sceneScripts: SceneScript[] = [
  {
    sceneId: 1,
    sceneName: "THE_SETUP",
    directorsNotes: "Tributes rise from underground tubes on metal launch platforms arranged in a circle around the golden Cornucopia. Camera tilts vertically as each tribute ascends. Holographic countdown timer displays red numbers from 60. Visible weapons scattered near Cornucopia — blades, bows, tactical gear in orange backpacks. Absolute silence — only wind and distant mockingjay calls. Hold on Zach's face as he scans the arena. Kyle stands statue-still. No one moves until the gong. AUDIO: Pre-gong is dead silence. At gong: sub-bass hit, then industrial percussive sound design under the sprint — metallic impacts, boot stomps. No melody, no music, no score. Speed ramp: overcranked slow-motion on first step off platform, snap to real-time chaos.",
    narratorScript: "Twenty-four platforms. Twenty-four heartbeats. The arena doesn't care about any of them. The countdown begins, and the forest watches from the edge — patient, indifferent, waiting to swallow whoever survives.",
    characterIds: ["zach", "kyle"],
  },
  {
    sceneId: 2,
    sceneName: "BLOODBATH",
    directorsNotes: "The gong sounds. Tributes sprint toward the Cornucopia across open grass. Abby Lee's wheelchair launches from her platform — motors screaming. Supplies scattered on the ground. Quick cuts between tributes grabbing weapons. Keisha's Altima somehow in the arena (airdropped by Capitol). Abby Lee reaches the Cornucopia but a fireball detonation from a mine engulfs her wheelchair. First kill of the Games.",
    narratorScript: "The gong shattered the silence and the arena became a mouth. Abby Lee's wheelchair tore across the grass like a tank — but the mines don't care about momentum. The first fireball painted the Cornucopia gold and red.",
    characterIds: ["keisha_altima", "abby_lee"],
  },
  {
    sceneId: 3,
    sceneName: "SAFEHOUSE_INT",
    directorsNotes: "Single overhead bulb, everything else in shadow. Zach and Keisha face each other across a bare table. Camera holds static — two-shot, no cuts for 45 seconds. Let the tension build in the stillness.",
    narratorScript: "Four walls. One light. Two people who stopped trusting the world outside — and were starting to doubt each other.",
    characterIds: ["zach", "keisha_altima", "luigi"],
  },
  {
    sceneId: 4,
    sceneName: "CONFRONTATION",
    directorsNotes: "Marcus enters from deep background, slowly sharpening into focus. Rack focus between Marcus and Zach three times. Score enters here — low cello drone. Close-up on the weapon. Trigger discipline matters.",
    narratorScript: "Marcus didn't raise his voice. He didn't need to. The weight of what he knew was louder than any bullet.",
    characterIds: ["zach", "luigi", "art_clown"],
  },
  {
    sceneId: 5,
    sceneName: "THE_REVEAL",
    directorsNotes: "Slow push-in on Keisha's face as the truth lands. Hold the take even if it feels too long. The audience needs to sit in her realization. Desaturate 10% more than base grade. Kill the orange — teal only.",
    narratorScript: "The truth didn't set her free. It locked every door she'd ever walked through and swallowed the key.",
    characterIds: ["keisha_altima", "kyle"],
  },
  {
    sceneId: 6,
    sceneName: "RESOLUTION",
    directorsNotes: "Wide shot, dawn light creeping in. Zach walks away from camera — do NOT follow. Let him shrink into the frame. Hold until he's a silhouette. Fade to black over 4 seconds. No credits music.",
    narratorScript: "Some stories end with answers. This one ends with footsteps — getting quieter, getting further, until there's nothing left but the sound of a city waking up to forget.",
    characterIds: ["zach"],
  },
];

/** Get all scenes a character appears in */
export function getScenesForCharacter(characterId: string): SceneScript[] {
  return sceneScripts.filter((s) => s.characterIds.includes(characterId));
}

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
    directorsNotes: "Open cold. No music. Ambient city hum only. Zach enters frame from the left, camera tracks at waist-height. Hold on his face for 3 beats before he speaks. Let the silence do the work.",
    narratorScript: "The city doesn't sleep. It watches. And tonight, it has its eyes on one man who made the mistake of looking back.",
    characterIds: ["zach", "kyle"],
  },
  {
    sceneId: 2,
    sceneName: "PURSUIT_BEGINS",
    directorsNotes: "Quick cuts. Handheld shakes increase. Keisha's Altima tears through wet streets — use low-angle tracking shot from curb level. Orange sodium lights streak across the windshield. No dialogue, only engine and rain.",
    narratorScript: "She drove like the road owed her something. Every turn sharper than the last, every red light a suggestion she chose to ignore.",
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

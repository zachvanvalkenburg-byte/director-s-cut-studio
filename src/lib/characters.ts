import charZach from "@/assets/char-zach.jpg";
import charKyle from "@/assets/char-kyle.jpg";
import charAltima from "@/assets/char-keisha-altima.jpg";
import charAbbyLee from "@/assets/char-abby-lee.jpg";
import charLuigi from "@/assets/char-luigi.jpg";
import charArtClown from "@/assets/char-art-clown.jpg";

export interface CharacterElement {
  id: string;
  name: string;
  district: number;
  archetype: string;
  prompt_anchor: string;
  visual_logic: string;
  status: string;
  is_alive: boolean;
  survival_priority: number; // 1-10, used for wide shot filler generation
  image: string;
}

export const defaultCharacterElements: CharacterElement[] = [
  {
    id: "zach",
    name: "Zach (District 1)",
    district: 1,
    archetype: "The David Rose",
    prompt_anchor: "Zach: Cream knit designer sweater, black tactical vest, silver rings, diva disgust, 35mm grit.",
    visual_logic: "Overcast teal-and-orange. Exception: Warm amber cologne lighting for romance scenes.",
    status: "Active",
    is_alive: true,
    survival_priority: 9,
    image: charZach,
  },
  {
    id: "kyle",
    name: "Kyle (District 1)",
    district: 1,
    archetype: "The Daria",
    prompt_anchor: "Kyle: Monotone, combat boots, crossed arms, tactical jumpsuit. Static, dead-eyed, never moves.",
    visual_logic: "Locked-off Wes Anderson symmetry. Desaturated cold teal.",
    status: "Active",
    is_alive: true,
    survival_priority: 7,
    image: charKyle,
  },
  {
    id: "keisha_altima",
    name: "Keisha & The Altima",
    district: 5,
    archetype: "The Altima Driver",
    prompt_anchor: "Keisha: One hand on the wheel, doing nails with the other. 2014 Nissan Altima interior with hanging air fresheners, cracked windshield, bass-heavy vibration. High-shutter speed, war-zone grit, desaturated teal-and-orange.",
    visual_logic: "Low-angle shaky cam. High-shutter speed motion blur. Interior POV from passenger seat.",
    status: "Active",
    is_alive: true,
    survival_priority: 8,
    image: charAltima,
  },
  {
    id: "abby_lee",
    name: "Abby Lee Miller",
    district: 7,
    archetype: "Dance Mom from Hell",
    prompt_anchor: "Abby Lee: Motorized wheelchair, screaming, tactical gear. First death, massive fireball explosion.",
    visual_logic: "Saving Private Ryan aesthetic. High-intensity physics. Shockwave ripple.",
    status: "Killed (Scene 2)",
    is_alive: false,
    survival_priority: 2,
    image: charAbbyLee,
  },
  {
    id: "luigi",
    name: "Luigi Mangione",
    district: 3,
    archetype: "Revolutionary Heartthrob",
    prompt_anchor: "Luigi: 'Stop the Greed' shirt, tactical vest, revolutionary hair, healthcare bill weapon.",
    visual_logic: "Cologne ad lighting. Warm amber, shallow DOF, drifting leaves.",
    status: "Active",
    is_alive: true,
    survival_priority: 6,
    image: charLuigi,
  },
  {
    id: "art_clown",
    name: "Art the Clown",
    district: 13,
    archetype: "Silent Horror",
    prompt_anchor: "Art: B&W clown suit, silent, methodical, waving at camera mid-kill, blood splatters.",
    visual_logic: "Nature documentary stillness. High contrast, desaturated shadows.",
    status: "Killed (Scene 4)",
    is_alive: false,
    survival_priority: 3,
    image: charArtClown,
  },
];

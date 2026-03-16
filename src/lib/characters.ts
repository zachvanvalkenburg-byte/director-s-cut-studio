import charZach from "@/assets/char-zach.jpg";
import charKyle from "@/assets/char-kyle.jpg";
import charAltima from "@/assets/char-keisha-altima.jpg";
import charAbbyLee from "@/assets/char-abby-lee.jpg";
import charLuigi from "@/assets/char-luigi.jpg";
import charArtClown from "@/assets/char-art-clown.jpg";
import charSteveBurns from "@/assets/char-steve-burns.jpg";
import charBritney from "@/assets/char-britney.jpg";
import charTyra from "@/assets/char-tyra.jpg";
import charTimothee from "@/assets/char-timothee.jpg";
import charPrinceHarry from "@/assets/char-prince-harry.jpg";
import charTrudeau from "@/assets/char-trudeau.jpg";
import charGreta from "@/assets/char-greta.jpg";
import charBoebert from "@/assets/char-boebert.jpg";
import charGabourey from "@/assets/char-gabourey.jpg";
import charKristiNoem from "@/assets/char-kristi-noem.jpg";
import charLeaMichele from "@/assets/char-lea-michele.jpg";
import charJussie from "@/assets/char-jussie.jpg";
import charPogoClown from "@/assets/char-pogo-clown.jpg";

export interface CharacterElement {
  id: string;
  name: string;
  district: number;
  archetype: string;
  prompt_anchor: string;
  visual_logic: string;
  status: string;
  is_alive: boolean;
  survival_priority: number;
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
    prompt_anchor: "Abby Lee: Motorized wheelchair with reinforced steel frame, screaming commands, tactical gear strapped to chair arms. Wheelchair physics: heavy rolling momentum, sparks from metal scraping concrete, low center of gravity. First death, massive fireball explosion engulfing wheelchair.",
    visual_logic: "Saving Private Ryan aesthetic. High-intensity physics — wheelchair debris, shrapnel trajectory, shockwave ripple. Low-angle emphasizing wheelchair's tank-like presence.",
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
  {
    id: "steve_burns",
    name: "Steve Burns",
    district: 4,
    archetype: "The Sleeper Agent",
    prompt_anchor: "Steve: Green field jacket over striped shirt, calm fatherly demeanor masking tactical awareness, notebook as weapon, searching eyes. 35mm grit.",
    visual_logic: "Nostalgic warm tones bleeding into desaturated teal. Handheld, intimate framing.",
    status: "Active",
    is_alive: true,
    survival_priority: 5,
    image: charSteveBurns,
  },
  {
    id: "britney",
    name: "Britney Spears",
    district: 9,
    archetype: "The Comeback Weapon",
    prompt_anchor: "Britney: Orange polka dot top, two knives gripped low, feral grin, war-paint smeared mascara. Pop star turned feral weapon.",
    visual_logic: "Strobe-flash editing. High-contrast teal with bursts of hot orange. Music video meets warzone.",
    status: "Active",
    is_alive: true,
    survival_priority: 7,
    image: charBritney,
  },
  {
    id: "tyra",
    name: "Tyra Banks",
    district: 6,
    archetype: "The Apex Judge",
    prompt_anchor: "Tyra: Haute couture tactical armor, towering presence, smizing through the chaos. Weaponized confidence, runway walk through rubble.",
    visual_logic: "High fashion editorial lighting meets battlefield grit. Dutch angles. Dramatic slow-motion.",
    status: "Active",
    is_alive: true,
    survival_priority: 4,
    image: charTyra,
  },
  {
    id: "timothee",
    name: "Timothée Chalamet",
    district: 2,
    archetype: "The Beautiful Martyr",
    prompt_anchor: "Timothée: Vintage military coat over silk shirt, tousled curls, brooding artistic pain. Too pretty for war, knows it, doesn't care.",
    visual_logic: "Cologne ad lighting. Warm amber backlight, shallow DOF, wind in hair. Art house meets trenches.",
    status: "Active",
    is_alive: true,
    survival_priority: 8,
    image: charTimothee,
  },
  {
    id: "prince_harry",
    name: "Prince Harry",
    district: 8,
    archetype: "The Exiled Royal",
    prompt_anchor: "Harry: Military dress coat, thousand-yard stare, royal bearing cracked by battlefield trauma. Ginger beard, muddied medals.",
    visual_logic: "Overcast English grey bleeding into teal-and-orange war tones. Telephoto compression, paparazzi framing.",
    status: "Active",
    is_alive: true,
    survival_priority: 5,
    image: charPrinceHarry,
  },
  {
    id: "trudeau",
    name: "Justin Trudeau",
    district: 10,
    archetype: "The Diplomat",
    prompt_anchor: "Trudeau: Rolled sleeves, loosened tie, practiced empathy masking survival instinct. Campaign smile in a war zone.",
    visual_logic: "Press conference lighting gone wrong. Fluorescent flicker, handheld news cam aesthetic.",
    status: "Active",
    is_alive: true,
    survival_priority: 4,
    image: charTrudeau,
  },
  {
    id: "greta",
    name: "Greta Thunberg",
    district: 11,
    archetype: "The Prophet",
    prompt_anchor: "Greta: Yellow rain jacket, protest sign repurposed as shield, cold fury, unblinking. 'How dare you' energy weaponized.",
    visual_logic: "Desaturated Nordic grey. Cold blue undertones, static locked-off framing. Documentary realism.",
    status: "Active",
    is_alive: true,
    survival_priority: 6,
    image: charGreta,
  },
  {
    id: "boebert",
    name: "Lauren Boebert",
    district: 12,
    archetype: "The Provocateur",
    prompt_anchor: "Boebert: American flag bandana, dual pistols, defiant smirk, denim-and-kevlar combo. Campaign energy meets combat zone.",
    visual_logic: "Overexposed Fox News lighting clashing with battlefield grit. Dutch angles, aggressive push-ins.",
    status: "Active",
    is_alive: true,
    survival_priority: 3,
    image: charBoebert,
  },
];

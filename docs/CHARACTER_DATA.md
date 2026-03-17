# CHARACTER DATA — Tribute Roster

> Current status of all tributes. Source of truth: `src/lib/characters.ts`

## Status Legend

| Status | Meaning |
|--------|---------|
| `Active` | Alive and in play |
| `Killed (Scene N)` | Eliminated in Scene N |

## Tribute Roster

| # | ID | Name | District | Archetype | Status | Alive | Survival Priority | Death Scene |
|---|-----|------|----------|-----------|--------|-------|-------------------|-------------|
| 1 | `zach` | Zach | 1 | The David Rose | Active | ✅ | 9 | — |
| 2 | `kyle` | Kyle | 1 | The Daria | Active | ✅ | 7 | — |
| 3 | `keisha_altima` | Keisha & The Altima | 5 | The Altima Driver | Active | ✅ | 8 | — |
| 4 | `abby_lee` | Abby Lee Miller | 7 | Dance Mom from Hell | Killed (Scene 2) | ❌ | 2 | 2 |
| 5 | `luigi` | Luigi Mangione | 3 | Revolutionary Heartthrob | Active | ✅ | 6 | — |
| 6 | `art_clown` | Art the Clown | 13 | Silent Horror | Killed (Scene 4) | ❌ | 3 | 4 |
| 7 | `steve_burns` | Steve Burns | 4 | The Sleeper Agent | Active | ✅ | 5 | — |
| 8 | `britney` | Britney Spears | 9 | The Comeback Weapon | Active | ✅ | 7 | — |
| 9 | `tyra` | Tyra Banks | 6 | The Apex Judge | Active | ✅ | 4 | — |
| 10 | `timothee` | Timothée Chalamet | 2 | The Beautiful Martyr | Active | ✅ | 8 | — |
| 11 | `prince_harry` | Prince Harry | 8 | The Exiled Royal | Active | ✅ | 5 | — |
| 12 | `trudeau` | Justin Trudeau | 10 | The Diplomat | Active | ✅ | 4 | — |
| 13 | `greta` | Greta Thunberg | 11 | The Prophet | Active | ✅ | 6 | — |
| 14 | `boebert` | Lauren Boebert | 12 | The Provocateur | Active | ✅ | 3 | — |
| 15 | `gabourey` | Gabourey Sidibe | 14 | The Immovable Force | Active | ✅ | 5 | — |
| 16 | `kristi_noem` | Kristi Noem | 15 | The Enforcer | Active | ✅ | 3 | — |
| 17 | `lea_michele` | Lea Michele | 16 | The Understudy | Active | ✅ | 4 | — |
| 18 | `jussie` | Jussie Smollett | 17 | The Fabricator | Active | ✅ | 2 | — |
| 19 | `pogo_clown` | John Wayne Gacy (Pogo) | 13 | The Hidden Monster | Active | ✅ | 1 | — |

## Survival Priority Scale

- **9** = Plot-armored protagonist (Zach)
- **1** = Expendable / early elimination (Pogo)

## Character Prompt Anchor Format

Each character has a `prompt_anchor` field using this structure:
```
[Name]: [Age/Build/Physical], [Wardrobe], [Pose/Expression], [Environment Context]. [Film grain]. END FRAME: [Description of empty scene after character exits].
```

## Voiceover Scripts

Characters with `voiceover_script` fields have pre-written lines for ElevenLabs TTS integration. Currently assigned:
- **Abby Lee Miller** — Death monologue (Scene 2)

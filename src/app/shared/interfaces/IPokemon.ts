export interface IPokemon {
  abilities: IPokemonCompleteAbility[];
  base_experience: number;
  forms: IPokemonDataBase[];
  game_indices: IPokemonGameIndex[];
  height: number;
  held_items: any[];
  id: number;
  is_default: boolean;
  location_area_encounters: string;
  moves: IPokemonMove[];
  name: string;
  order: number;
  past_abilities: any[];
  past_types: any[];
  species: IPokemonDataBase;
  sprites: IPokemonSprites;
  stats: IPokemonStat[];
  types: IPokemonType[];
  weight: number;
}

export interface IPokemonCompleteAbility {
  ability: IPokemonDataBase;
  is_hidden: boolean;
  slot: number;
}

export interface IPokemonDataBase {
  name: string;
  url: string;
}

export interface IPokemonUrl {
  url: string;
}

export interface IPokemonGameIndex {
  game_index: number;
  version: IPokemonDataBase;
}

export interface IPokemonMove {
  move: IPokemonDataBase;
  version_group_details: IPokemonVersionGroupDetail[];
}

export interface IPokemonSprites {
  back_default: string;
  back_female?: any;
  back_shiny: string;
  back_shiny_female?: any;
  front_default: string;
  front_female?: any;
  front_shiny: string;
  front_shiny_female?: any;
  other: IPokemonSpriteOther;
  versions: IPokemonVersions;
}

export interface IPokemonStat {
  base_stat: number;
  effort: number;
  stat: IPokemonDataBase;
}

export interface IPokemonType {
  slot: number;
  type: IPokemonDataBase;
}

export interface IPokemonVersions {
  'generation-i': IPokemonGenerationI;
  'generation-ii': IPokemonGenerationII;
  'generation-iii': IPokemonGenerationIII;
  'generation-iv': IPokemonGenerationIV;
  'generation-v': IPokemonGenerationV;
  'generation-vi': IPokemonGenerationVI;
  'generation-vii': IPokemonGenerationVII;
  'generation-viii': IPokemonGenerationVIII;
}

export interface IPokemonVersionGroupDetail {
  level_learned_at: number;
  move_learn_method: IPokemonDataBase;
  version_group: IPokemonDataBase;
}

export interface IPokemonSpriteOther {
  dream_world: IPokemonSpriteDreamworld;
  home: IPokemonSpriteHome;
  'official-artwork': IPokemonSpriteOfficialartwork;
  showdown: IPokemonSpriteShowdown;
}

export interface IPokemonSpriteDreamworld {
  front_default: string;
  front_female?: any;
}

export interface IPokemonSpriteHome {
  front_default: string;
  front_female?: any;
  front_shiny: string;
  front_shiny_female?: any;
}
export interface IPokemonSpriteOfficialartwork {
  front_default: string;
  front_shiny: string;
}

export interface IPokemonSpriteShowdown {
  back_default: string;
  back_female?: any;
  back_shiny: string;
  back_shiny_female?: any;
  front_default: string;
  front_female?: any;
  front_shiny: string;
  front_shiny_female?: any;
}

export interface IPokemonFireRedLeafGreen {
  back_default: string;
  back_shiny: string;
  front_default: string;
  front_shiny: string;
}


export interface IPokemonCrystal {
  back_default: string;
  back_shiny: string;
  back_shiny_transparent: string;
  back_transparent: string;
  front_default: string;
  front_shiny: string;
  front_shiny_transparent: string;
  front_transparent: string;
}

export interface IPokemonGold {
  back_default: string;
  back_shiny: string;
  front_default: string;
  front_shiny: string;
  front_transparent: string;
}

export interface IPokemonRedblue {
  back_default: string;
  back_gray: string;
  back_transparent: string;
  front_default: string;
  front_gray: string;
  front_transparent: string;
}

export interface IPokemonBlackwhite {
  animated: IPokemonSpriteShowdown;
  back_default: string;
  back_female?: any;
  back_shiny: string;
  back_shiny_female?: any;
  front_default: string;
  front_female?: any;
  front_shiny: string;
  front_shiny_female?: any;
}

// ! Generations

export interface IPokemonGenerationI {
  'red-blue': IPokemonRedblue;
  yellow: IPokemonRedblue;
}

export interface IPokemonGenerationII {
  crystal: IPokemonCrystal;
  gold: IPokemonGold;
  silver: IPokemonGold;
}

export interface IPokemonGenerationIII {
  emerald: IPokemonSpriteOfficialartwork;
  'firered-leafgreen': IPokemonFireRedLeafGreen;
  'ruby-sapphire': IPokemonFireRedLeafGreen;
}

export interface IPokemonGenerationIV {
  'diamond-pearl': IPokemonSpriteShowdown;
  'heartgold-soulsilver': IPokemonSpriteShowdown;
  platinum: IPokemonSpriteShowdown;
}

export interface IPokemonGenerationV {
  'black-white': IPokemonBlackwhite;
}

export interface IPokemonGenerationVI {
  'omegaruby-alphasapphire': IPokemonSpriteHome;
  'x-y': IPokemonSpriteHome;
}

export interface IPokemonGenerationVII {
  icons: IPokemonSpriteDreamworld;
  'ultra-sun-ultra-moon': IPokemonSpriteHome;
}

export interface IPokemonGenerationVIII {
  icons: IPokemonSpriteDreamworld;
}

// ! Species

export interface IPokemonSpecieFlavor {
  flavor_text: string;
  language: IPokemonDataBase;
  version: IPokemonDataBase;
}

export interface IPokemonSpecieGenera {
  genus: string;
  language: IPokemonDataBase;
}

export interface IPokemonSpecieName {
  name: string;
  language: IPokemonDataBase;
}

export interface IPokemonSpecieEncounter {
  area: IPokemonDataBase;
  base_score: number;
  rate: number;
}

export interface IPokemonSpeciePokedex {
  entry_number: number;
  pokedex: IPokemonDataBase;
}

export interface IPokemonSpecieVarietie {
  is_default: boolean;
  pokemon: IPokemonDataBase;
}

export interface IPokemonSpecie {
  base_happiness: number;
  capture_rate: number;
  color: IPokemonDataBase;
  egg_groups: IPokemonDataBase[];
  evolution_chain: IPokemonUrl;
  evolves_from_species?: any;
  flavor_text_entries: IPokemonSpecieFlavor[];
  form_descriptions: any[];
  forms_switchable: boolean;
  gender_rate: number;
  genera: IPokemonSpecieGenera[];
  generation: IPokemonDataBase;
  growth_rate: IPokemonDataBase;
  habitat: IPokemonDataBase;
  has_gender_differences: boolean;
  hatch_counter: number;
  id: number;
  is_baby: boolean;
  is_legendary: boolean;
  is_mythical: boolean;
  name: string;
  names: IPokemonSpecieName[];
  order: number;
  pal_park_encounters: IPokemonSpecieEncounter[];
  pokedex_numbers: IPokemonSpeciePokedex[];
  shape: IPokemonDataBase;
  varieties: IPokemonSpecieVarietie[];
}

export interface IPokemonResponse<X> {
  count: number;
  next?: string;
  previous?: string;
  results: X[];
}

export interface IPokemonDamageRelation {
  double_damage_from: IPokemonDataBase[];
  double_damage_to: IPokemonDataBase[];
  half_damage_from: IPokemonDataBase[];
  half_damage_to: IPokemonDataBase[];
  no_damage_from: IPokemonDataBase[];
  no_damage_to: IPokemonDataBase[];
}

export interface IPokemonTypeDetails {
  damage_relations: IPokemonDamageRelation;
  game_indices: {
    game_index: number;
    generation: IPokemonDataBase;
  }[];
  generation: IPokemonDataBase;
  id: number;
  move_damage_class: IPokemonDataBase;
  moves: IPokemonDataBase[];
  name: string;
  past_damage_relations: {
    damage_relations: IPokemonDamageRelation;
    generation: IPokemonDataBase;
  }[];
  pokemon: {
    pokemon: IPokemonDataBase;
    slot: number;
  }[];
}

export interface IPokemonTypeData {
  type: string;
  damage: number;
}

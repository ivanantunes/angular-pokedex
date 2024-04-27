import { IPokemon, IPokemonEvolutionDetails } from './IPokemon';

export interface IModelEvolution {
  name: string;
  url: string;
  evolutionDetails?: IPokemonEvolutionDetails[];
}

export interface IModelPokemonEvolution {
  evolution: IModelEvolution;
  pokemon: IPokemon;
}

export interface IModelEvolutionItem {
  key: string;
  title: string;
  description: string;
}

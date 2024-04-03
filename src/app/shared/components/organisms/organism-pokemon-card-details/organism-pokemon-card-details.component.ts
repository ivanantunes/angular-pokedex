import { Component, Input } from '@angular/core';
import {
  MoleculeImageCirclePokemonComponent,
  MoleculeImagePokemonTypesComponent,
  MoleculeTextPokemonDetailsComponent,
  MoleculeTextPokemonReferenceComponent
} from '../../molecules';
import { IPokemon } from '../../../interfaces';
import { AtomButtonFavoriteComponent } from '../../atoms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'organism-pokemon-card-details',
  standalone: true,
  imports: [
    // ! Angular
    NgIf,
    // ! Atoms
    AtomButtonFavoriteComponent,
    // ! Molecules
    MoleculeTextPokemonReferenceComponent,
    MoleculeImagePokemonTypesComponent,
    MoleculeImageCirclePokemonComponent,
    MoleculeTextPokemonDetailsComponent,
  ],
  templateUrl: './organism-pokemon-card-details.component.html',
  styleUrl: './organism-pokemon-card-details.component.scss'
})
export class OrganismPokemonCardDetailsComponent {
  @Input({ required: true }) pokemon!: IPokemon;

  public styleObjectCode = {
    'color': '#7a7d80',
    'font-size': 'large',
  };

  public styleObjectName = {
    'font-weight': 'bolder',
    'font-size': 'large',
  }

  constructor() { }

  public get types(): string[] {
    return this.pokemon.types.map((type) => type.type.name);
  }
}

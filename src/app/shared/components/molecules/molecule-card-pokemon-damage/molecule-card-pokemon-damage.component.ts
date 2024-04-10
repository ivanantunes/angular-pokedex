import { Component, Input } from '@angular/core';
import { IPokemonTypeData } from '../../../interfaces';
import { AtomImagePokemonTypeComponent, AtomTextPokemonDamageComponent } from '../../atoms';
import { NgClass } from '@angular/common';

@Component({
  selector: 'molecule-card-pokemon-damage',
  standalone: true,
  imports: [
    // ! Angular
    NgClass,

    // ! Atoms
    AtomImagePokemonTypeComponent,
    AtomTextPokemonDamageComponent
  ],
  templateUrl: './molecule-card-pokemon-damage.component.html',
  styleUrl: './molecule-card-pokemon-damage.component.scss'
})
export class MoleculeCardPokemonDamageComponent {
  @Input({ required: true }) pokemonTypeDamage: IPokemonTypeData = { type: '', damage: 0 };

  public get damageClass() {
    return {
      'pcard--damage-all': this.pokemonTypeDamage.damage > 2,
      'pcard--damage-2x': this.pokemonTypeDamage.damage === 2,
      'pcard--damage-1x': this.pokemonTypeDamage.damage === 1 || this.pokemonTypeDamage.damage <= 0,
      'pcard--damage-0_5x': this.pokemonTypeDamage.damage === 0.5,
      'pcard--damage-0_25x': this.pokemonTypeDamage.damage === 0.25,
    };
  }
}

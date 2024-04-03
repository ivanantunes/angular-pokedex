import { Component, Input } from '@angular/core';
import { AtomImagePokemonComponent } from '../../atoms';
import { NgClass } from '@angular/common';
import { IPokemonSprites } from '../../../interfaces';

@Component({
  selector: 'molecule-image-circle-pokemon',
  standalone: true,
  imports: [
    // ! Angular
    NgClass,

    // ! Atoms
    AtomImagePokemonComponent
  ],
  templateUrl: './molecule-image-circle-pokemon.component.html',
  styleUrl: './molecule-image-circle-pokemon.component.scss'
})
export class MoleculeImageCirclePokemonComponent {
  @Input({ required: true }) pokemonType: string = '';
  @Input({ required: true }) pokemonName: string = '';
  @Input() pekemonSprites?: IPokemonSprites;
  @Input() pokemonShiny: boolean = false;
  @Input() smallCircle: boolean = false;
}

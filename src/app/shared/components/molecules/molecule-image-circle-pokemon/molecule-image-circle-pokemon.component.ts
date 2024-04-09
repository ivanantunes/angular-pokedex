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
  @Input({ required: true }) pokemonType = '';
  @Input({ required: true }) pokemonName = '';
  @Input() pekemonSprites?: IPokemonSprites;
  @Input() pokemonShiny = false;
  @Input() smallCircle = false;
}

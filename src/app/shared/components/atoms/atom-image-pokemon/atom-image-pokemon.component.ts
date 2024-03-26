import { Component, Input } from '@angular/core';
import { IPokemonSprites } from '../../../interfaces';

@Component({
  selector: 'atom-image-pokemon',
  standalone: true,
  imports: [],
  template: `
    <img  [src]="sprites ? sprites.front_default : 'assets/img/loading.png'" alt="Pokémon Name is {{pokemonName}}">
  `
})
export class AtomImagePokemonComponent {
  @Input({ required: true }) pokemonName: string = '';
  @Input({ required: true }) sprites?: IPokemonSprites;
}

import { Component, Input } from '@angular/core';
import { Sprites } from 'src/app/interfaces';

@Component({
  selector: 'atom-image-pokemon',
  standalone: true,
  imports: [],
  template: `
    <img [src]="sprites.front_default" alt="Pokémon Name is {{pokemonName}}">
  `
})
export class AtomImagePokemonComponent {
  @Input({ required: true }) pokemonName: string = '';
  @Input({ required: true }) sprites!: Sprites;
}

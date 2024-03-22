import { Component, Input } from '@angular/core';

@Component({
  selector: 'atom-image-pokemon-type',
  standalone: true,
  imports: [],
  template: `
    <img src="assets/img/icon-types/{{type}}.svg" alt="Pokémon Type is {{type}}" />
  `
})
export class AtomImagePokemonTypeComponent {
  @Input({ required: true }) type: string = '';
}

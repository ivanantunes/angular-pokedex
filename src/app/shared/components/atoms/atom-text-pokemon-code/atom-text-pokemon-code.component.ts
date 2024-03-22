import { NgStyle } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'atom-text-pokemon-code',
  standalone: true,
  imports: [
    NgStyle
  ],
  template: `
    <p [ngStyle]="styleObject">#{{pokemonId.toString().padStart(4, '0')}}</p>
  `
})
export class AtomTextPokemonCodeComponent {
  @Input({ required: true }) pokemonId: number = 0;
  @Input() styleObject?: any;
}

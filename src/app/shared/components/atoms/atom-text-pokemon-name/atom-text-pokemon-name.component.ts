import { NgStyle } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'atom-text-pokemon-name',
  standalone: true,
  imports: [
    // ! Angular
    NgStyle
  ],
  template: `
    @if (enableBold) {
      <strong><p [ngStyle]="styleObject">{{pokemonName}}</p></strong>
    } @else {
      <p [ngStyle]="styleObject">{{pokemonName}}</p>
    }
  `,
  styles: `
    strong p::first-letter {
      text-transform: uppercase;
    }
  `
})
export class AtomTextPokemonNameComponent {
  @Input({ required: true }) pokemonName = '';
  @Input() enableBold = true;
  @Input() styleObject?: any;
}

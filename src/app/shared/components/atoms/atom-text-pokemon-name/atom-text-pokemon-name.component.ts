import { NgStyle } from '@angular/common';
import { Component, Input } from '@angular/core';
import { PokemonUtil } from '../../../utils';

@Component({
  selector: 'atom-text-pokemon-name',
  standalone: true,
  imports: [
    // ! Angular
    NgStyle
  ],
  template: `
    @if (enableBold) {
      <strong><p [ngStyle]="styleObject">{{name}}</p></strong>
    } @else {
      <p [ngStyle]="styleObject">{{name}}</p>
    }
  `
})
export class AtomTextPokemonNameComponent {
  @Input({ required: true }) pokemonName = '';
  @Input() enableBold = true;
  @Input() styleObject?: any;

  public get name(): string {
    return PokemonUtil.firstLetterUpperCase(this.pokemonName);
  }
}

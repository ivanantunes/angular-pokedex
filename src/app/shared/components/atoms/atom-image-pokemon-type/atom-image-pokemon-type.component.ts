import { Component, Input } from '@angular/core';
import { MatTooltip } from '@angular/material/tooltip';
import { PokemonUtil } from '../../../utils';

@Component({
  selector: 'atom-image-pokemon-type',
  standalone: true,
  imports: [
    // ! Material
    MatTooltip
  ],
  template: `
    <img width="40" height="40" src="assets/img/icon-types/{{type}}.svg" alt="Pokémon Type is {{displayType}}" [matTooltip]="isTooltip ? displayType : ''"  />
  `,
})
export class AtomImagePokemonTypeComponent {
  @Input({ required: true }) type = '';
  @Input() isTooltip = false;

  public get displayType(): string {
    return PokemonUtil.firstLetterUpperCase(this.type);
  }
}

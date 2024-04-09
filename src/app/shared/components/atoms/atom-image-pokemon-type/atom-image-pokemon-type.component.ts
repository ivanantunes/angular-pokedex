import { Component, Input } from '@angular/core';
import { MatTooltip } from '@angular/material/tooltip';

@Component({
  selector: 'atom-image-pokemon-type',
  standalone: true,
  imports: [
    // ! Material
    MatTooltip
  ],
  template: `
    <img src="assets/img/icon-types/{{type}}.svg" alt="Pokémon Type is {{displayType}}" [matTooltip]="isTooltip ? displayType : ''"  />
  `,
})
export class AtomImagePokemonTypeComponent {
  @Input({ required: true }) type = '';
  @Input() isTooltip = false;

  public get displayType(): string {
    const firstLetter = this.type[0].toUpperCase();
    return `${firstLetter}${this.type.substring(1, this.type.length)}`;
  }
}

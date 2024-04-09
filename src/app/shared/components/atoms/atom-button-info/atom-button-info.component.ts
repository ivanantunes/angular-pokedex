import { Component, Input } from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'atom-button-info',
  standalone: true,
  imports: [
    // ! Angular
    RouterLink,

    // ! Material
    MatIconButton,
    MatIcon,
    MatTooltip
  ],
  template: `
    <button  mat-icon-button routerLink="/pokemon/details/{{pokemonId}}" matTooltip="Click to More Info!">
      <mat-icon>info</mat-icon>
    </button>
  `
})
export class AtomButtonInfoComponent {
  @Input({ required: true }) pokemonId = 0;
}

import { Component, Input } from '@angular/core';

@Component({
  selector: 'atom-text-pokemon-detail',
  standalone: true,
  imports: [],
  template: `
    <p><strong>{{title}}:</strong>&nbsp;{{text}}</p>
  `
})
export class AtomTextPokemonDetailComponent {
  @Input({ required: true }) title = '';
  @Input({ required: true }) text = '';
}

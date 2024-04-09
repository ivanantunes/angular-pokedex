import { Component, Input } from '@angular/core';
import { AtomTextPokemonCodeComponent, AtomTextPokemonNameComponent } from '../../atoms';

@Component({
  selector: 'molecule-text-pokemon-reference',
  standalone: true,
  imports: [
    // ! Atoms
    AtomTextPokemonCodeComponent,
    AtomTextPokemonNameComponent
  ],
  templateUrl: './molecule-text-pokemon-reference.component.html',
  styleUrl: './molecule-text-pokemon-reference.component.scss'
})
export class MoleculeTextPokemonReferenceComponent {
  @Input({ required: true }) pokemonId = 0;
  @Input({ required: true }) pokemonName = '';
  @Input() isInlineReference = false;
  @Input() styleObjectCode: any = {};
  @Input() styleObjectName: any = {};
}

import { Component, Input } from '@angular/core';
import { AtomTextPokemonCodeComponent, AtomTextPokemonNameComponent } from '../../atoms';

@Component({
  selector: 'molecule-text-pokemon-reference',
  standalone: true,
  imports: [
    AtomTextPokemonCodeComponent,
    AtomTextPokemonNameComponent
  ],
  templateUrl: './molecule-text-pokemon-reference.component.html',
  styleUrl: './molecule-text-pokemon-reference.component.scss'
})
export class MoleculeTextPokemonReferenceComponent {
  @Input({ required: true }) pokemonId: number = 0;
  @Input({ required: true }) pokemonName: string = '';
  @Input() isInlineReference: boolean = false;
  @Input() styleObjectCode: any = {};
  @Input() styleObjectName: any = {};
}

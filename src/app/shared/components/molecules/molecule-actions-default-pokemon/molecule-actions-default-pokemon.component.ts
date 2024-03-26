import { Component, Input } from '@angular/core';
import { AtomButtonFavoriteComponent, AtomButtonInfoComponent } from '../../atoms';

@Component({
  selector: 'molecule-actions-default-pokemon',
  standalone: true,
  imports: [
    // ! Atoms
    AtomButtonFavoriteComponent,
    AtomButtonInfoComponent
  ],
  templateUrl: './molecule-actions-default-pokemon.component.html',
  styleUrl: './molecule-actions-default-pokemon.component.scss'
})
export class MoleculeActionsDefaultPokemonComponent {
  @Input({ required: true }) pokemonId: number = 0;
}

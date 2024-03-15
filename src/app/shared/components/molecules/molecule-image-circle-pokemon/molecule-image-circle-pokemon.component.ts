import { Component, Input } from '@angular/core';
import { AtomImagePokemonComponent } from '../../atoms';
import { Pokemon } from 'src/app/interfaces';

@Component({
  selector: 'molecule-image-circle-pokemon',
  standalone: true,
  imports: [
    AtomImagePokemonComponent
  ],
  templateUrl: './molecule-image-circle-pokemon.component.html',
  styleUrl: './molecule-image-circle-pokemon.component.scss'
})
export class MoleculeImageCirclePokemonComponent {
  @Input({ required: true }) pokemon!: Pokemon;
}

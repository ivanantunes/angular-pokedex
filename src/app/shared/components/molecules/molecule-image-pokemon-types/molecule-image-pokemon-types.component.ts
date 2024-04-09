import { Component, Input } from '@angular/core';
import { AtomImagePokemonTypeComponent } from '../../atoms';
import { NgFor } from '@angular/common';

@Component({
  selector: 'molecule-image-pokemon-types',
  standalone: true,
  imports: [
    NgFor,
    AtomImagePokemonTypeComponent
  ],
  templateUrl: './molecule-image-pokemon-types.component.html',
  styleUrl: './molecule-image-pokemon-types.component.scss'
})
export class MoleculeImagePokemonTypesComponent {
  @Input({ required: true }) types: string[] = [];
  @Input() isDetailed = false;
}

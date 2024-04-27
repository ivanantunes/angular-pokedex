import { Component, Inject } from '@angular/core';
import { MoleculeTextPokemonEvolutionComponent } from '../../molecules';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IPokemonEvolutionDetails } from '../../../interfaces';

@Component({
  selector: 'dialog-pokemon-evolution',
  standalone: true,
  imports: [
    // ! Molecules
    MoleculeTextPokemonEvolutionComponent
  ],
  templateUrl: './dialog-pokemon-evolution.component.html',
  styleUrl: './dialog-pokemon-evolution.component.scss'
})
export class DialogPokemonEvolutionComponent {

  constructor(
    public dialogRef: MatDialogRef<DialogPokemonEvolutionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IPokemonEvolutionDetails[]
  ) {}

}

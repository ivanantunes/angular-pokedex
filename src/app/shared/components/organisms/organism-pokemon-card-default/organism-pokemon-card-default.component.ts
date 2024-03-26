import { Component, Input, OnInit } from '@angular/core';
import {
  MoleculeActionsDefaultPokemonComponent,
  MoleculeImageCirclePokemonComponent,
  MoleculeTextPokemonReferenceComponent,
  MoleculeImagePokemonTypesComponent
} from '../../molecules';
import { CommonModule, NgClass } from '@angular/common';
import { IPokemon } from '../../../interfaces';
import { PokemonRequestService } from '../../../services';
import { ToastrService } from 'ngx-toastr';
import { ToastrConfig } from 'src/app/shared/constants';
import { Subject } from 'rxjs';

@Component({
  selector: 'organism-pokemon-card-default',
  templateUrl: './organism-pokemon-card-default.component.html',
  styleUrl: './organism-pokemon-card-default.component.scss',
  standalone: true,
  imports: [
    // ! Angular
    CommonModule,
    NgClass,
    // ! Molecules
    MoleculeActionsDefaultPokemonComponent,
    MoleculeImageCirclePokemonComponent,
    MoleculeTextPokemonReferenceComponent,
    MoleculeImagePokemonTypesComponent
  ]
})
export class OrganismPokemonCardDefaultComponent implements OnInit {

  @Input({ required: true }) pokdemonId: number | string = 0;

  public styleObjectCode = {
    'display': 'block',
    'text-align': 'left',
    'font-weight': 500,
    'font-size': '1.3rem',
    'line-height': '150%',
    'color': '#7a7d80',
    'margin-bottom': '0.6rem'
  };

  public styleObjectName = {
    'font-weight': 600,
    'font-size': '1.8rem',
    'line-height': '150%',
    'color': '#2f3133'
  }

  public pokemon!: IPokemon;

  constructor(
    private pokemonRequest: PokemonRequestService,
    private toast: ToastrService
  ) { }

  ngOnInit(): void {
    this.pokemonRequest.getPokemonById(this.pokdemonId).subscribe({
      next: (pokemon) => {
        this.pokemon = pokemon;
      },
      error: (error) => {
        console.error('Failed to Loading Pokémon', error);
        this.toast.error('Failed to Loading Pokémon, Please Try Again.', 'Failed to Loading :(', ToastrConfig);
      }
    })
  }

  public get types(): string[] {
    return this.pokemon.types.map((type) => type.type.name);
  }

}

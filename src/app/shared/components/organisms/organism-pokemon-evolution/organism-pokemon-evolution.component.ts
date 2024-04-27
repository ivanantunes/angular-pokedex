import { Component, Input, OnInit } from '@angular/core';
import { IModelEvolution, IModelPokemonEvolution, IPokemon, IPokemonDataBase, IPokemonEvolutionChain, IPokemonEvolutionDetails } from '../../../interfaces';
import { PokemonRequestService } from '../../../services';
import { ToastrService } from 'ngx-toastr';
import { concat, map, switchMap, toArray } from 'rxjs';
import { TitleFailedLog, ToastrConfig } from 'src/app/shared/constants';
import {
  MoleculeTextPokemonReferenceComponent,
  MoleculeImageCirclePokemonComponent,
  MoleculeImagePokemonTypesComponent,
  MoleculeTextPokemonEvolutionComponent
} from '../../molecules';
import { AtomButtonInfoComponent } from '../../atoms';
import { MatDialog } from '@angular/material/dialog';
import { DialogPokemonEvolutionComponent } from '../../dialogs';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';

@Component({
  selector: 'organism-pokemon-evolution',
  standalone: true,
  imports: [
    // ! Material
    MatButtonModule,
    MatIcon,
    MatTooltip,

    // ! Atoms
    AtomButtonInfoComponent,

    // ! Molecules
    MoleculeTextPokemonReferenceComponent,
    MoleculeImageCirclePokemonComponent,
    MoleculeImagePokemonTypesComponent,
    MoleculeTextPokemonEvolutionComponent
  ],
  templateUrl: './organism-pokemon-evolution.component.html',
  styleUrl: './organism-pokemon-evolution.component.scss'
})
export class OrganismPokemonEvolutionComponent implements OnInit {
  @Input({ required: true }) species!: IPokemonDataBase;

  public pokemonEvolutions: IModelPokemonEvolution[] = [];

  public styleObjectCode = {
    color: '#7a7d80',
    'font-size': 'medium',
    height: '40px',
    display: 'flex',
    'align-items': 'center',
    'margin-bottom': '0px'
  };

  public styleObjectName = {
    'font-weight': 'bolder',
    'font-size': 'medium',
    height: '40px',
    display: 'flex',
    'align-items': 'center',
    'margin-bottom': '0px'
  };

  constructor(
    private pokemonRequest: PokemonRequestService,
    private toastr: ToastrService,
    private dialog: MatDialog
  ) {}

  public ngOnInit(): void {
    this.pokemonRequest.getSpecies(this.species.url).pipe(
      switchMap((response) => {
        const urlSplit = response.evolution_chain.url.split('/');
        const id = urlSplit[urlSplit.length - 2];

        return this.pokemonRequest.getEvolutionChain(id);
      }),
      map((evolution) => {
        const listOfEvolution: IModelEvolution[] = [];
        const name = evolution.chain.species.name;
        const url = evolution.chain.species.url;
        const evolutionDetails = evolution.chain.evolution_details;

        listOfEvolution.push({ name, url, evolutionDetails });

        if (evolution.chain.evolves_to && evolution.chain.evolves_to.length > 0) {
          listOfEvolution.push(...this.recurseEvolutionTo(evolution.chain.evolves_to));
        }

        return listOfEvolution;
      }),
      switchMap((listOfEvolution) => {
        return concat(...listOfEvolution.map((evolution) => {
          return this.pokemonRequest.getPokemonById(evolution.name).pipe(
            map((pokemon) => ({ evolution, pokemon } as IModelPokemonEvolution))
          );
        })).pipe(
          toArray()
        );
      })
    ).subscribe({
      next: (response) => {
        this.pokemonEvolutions = response;
      },
      error: (error) => {
        console.error(TitleFailedLog.evolution, error);
        this.toastr.error('Failed to Get Evolution Chain, Try Again.', TitleFailedLog.evolution, ToastrConfig);
      }
    });
  }

  private recurseEvolutionTo(evolvesTo: IPokemonEvolutionChain[]): IModelEvolution[]  {
    const listOfEvolution: IModelEvolution[] = [];

    if (evolvesTo.length > 0) {
      evolvesTo.forEach((evolution) => {
        const name = evolution.species.name;
        const url = evolution.species.url;
        const evolutionDetails = evolution.evolution_details;

        listOfEvolution.push({ name, url, evolutionDetails });

        if (evolution.evolves_to && evolution.evolves_to.length > 0) {
          listOfEvolution.push(...this.recurseEvolutionTo(evolution.evolves_to));
        }
      });
    }

    return listOfEvolution;
  }

  public getTypes(pokemon: IPokemon): string[] {
    return pokemon.types.map((type) => type.type.name);
  }

  public showDetails(details: IPokemonEvolutionDetails[]): void {
    this.dialog.open(DialogPokemonEvolutionComponent, {
      data: details,
      position: { bottom: '0px' },
      width: '500px',
      minWidth: '340px',
      maxWidth: '500px'
    });
  }
}

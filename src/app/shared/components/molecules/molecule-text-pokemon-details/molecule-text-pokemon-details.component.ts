import { merge, of, Subject, switchMap, tap } from 'rxjs';
import { Component, Input, OnInit } from '@angular/core';
import { AtomTextPokemonDetailComponent } from '../../atoms';
import { IPokemon } from '../../../interfaces';
import { PokemonRequestService } from '../../../services';
import { ToastrService } from 'ngx-toastr';
import { TitleFailedLog, ToastrConfig } from '../../../constants';
import { PokemonUtil } from '../../../utils';

@Component({
  selector: 'molecule-text-pokemon-details',
  standalone: true,
  imports: [
    // ! Atoms
    AtomTextPokemonDetailComponent
  ],
  templateUrl: './molecule-text-pokemon-details.component.html',
  styleUrl: './molecule-text-pokemon-details.component.scss'
})
export class MoleculeTextPokemonDetailsComponent implements OnInit {
  // TODO: Add news Details
  @Input({ required: true }) pokemon!: IPokemon;
  @Input({ required: true }) refeshDetails = new Subject<void>();

  public specie = '';
  public height = '0 m';
  public weight = '0 kg';
  public abilities = '';
  public meetingPlaces = '';
  public generation = '';

  constructor(
    private pokemonRequest: PokemonRequestService,
    private toastr: ToastrService
  ) { }

  public ngOnInit(): void {
    merge(this.refeshDetails).pipe(
      switchMap(() => {
        if (this.pokemon) {
          return this.setupSpecie();
        }

        return of(undefined);
      })
    ).subscribe({
      next: () => {
        if (this.pokemon) {
          this.setupWeight();
          this.setupHeight();
          this.setupAbilities();
        }
      },
      error: (error) => {
        console.error(TitleFailedLog.specie, error);
        this.toastr.error('Failed to Get Specie Pokémon', TitleFailedLog.specie, ToastrConfig);
      }
    });
  }

  private setupSpecie() {
    return this.pokemonRequest.getSpecies(this.pokemon.species.url).pipe(
      tap((species) => {
        this.specie = species.genera.find((f) => f.language.name === 'en')?.genus ?? 'Not Defined';
        this.meetingPlaces = species.pal_park_encounters.map((f) => PokemonUtil.firstLetterUpperCase(f.area.name)).join(', ');
        this.generation = species.generation.name.replace('generation-', '').toUpperCase();
      })
    );
  }

  private setupWeight(): void {
    this.weight = `${this.pokemon.weight / 10} kg`;
  }

  private setupHeight(): void {
    this.height = `${this.pokemon.height / 10} m`;
  }

  private setupAbilities(): void {
    this.abilities = this.pokemon.abilities
    .map((object) => object.ability.name)
    .map((ability) => `${ability.substring(0, 1).toUpperCase()}${ability.substring(1, ability.length)}`)
    .join(', ');
  }
}

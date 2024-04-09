import { firstValueFrom } from 'rxjs';
import { Component, Input, OnInit } from '@angular/core';
import { AtomTextPokemonDetailComponent } from '../../atoms';
import { IPokemon } from '../../../interfaces';
import { PokemonRequestService } from '../../../services';
import { ToastrService } from 'ngx-toastr';
import { TitleFailedLog, ToastrConfig } from 'src/app/shared/constants';

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

  public async ngOnInit(): Promise<void> {
    if (this.pokemon) {
      await this.setupSpecie();
      this.setupWeight();
      this.setupHeight();
      this.setupAbilities();
    }
  }

  private async setupSpecie() {
    try {
      const species = await firstValueFrom(this.pokemonRequest.getSpecies(this.pokemon.species.url));
      this.specie = species.genera.find((f) => f.language.name === 'en')?.genus ?? 'Not Defined';
      this.meetingPlaces = species.pal_park_encounters.map((f) => `${f.area.name[0].toUpperCase()}${f.area.name.substring(1, f.area.name.length)}`).join(', ');
      this.generation = species.generation.name.replace('generation-', '').toUpperCase();
    } catch (error) {
      console.error(TitleFailedLog.specie, error);
      this.toastr.error('Failed to Get Specie Pokémon', TitleFailedLog.specie, ToastrConfig);
    }
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

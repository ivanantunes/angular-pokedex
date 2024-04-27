import { ChangeDetectorRef, Component, DoCheck, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { debounceTime, merge, Subject, switchMap, tap } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { ToastrConfig } from '../../shared/constants';
import { AtomButtonBackComponent, AtomLoadingComponent } from '../../shared/components/atoms';
import {
  OrganismPokemonCardDetailsComponent,
  OrganismPokemonChartStatsComponent,
  OrganismPokemonDamageTakenComponent,
  OrganismPokemonEvolutionComponent
} from '../../shared/components/organisms';
import { IPokemon } from '../../shared/interfaces';
import { Title } from '@angular/platform-browser';
import { PokemonUtil } from '../../shared/utils';
import { PokemonRequestService } from '../../shared/services';

@Component({
    selector: 'app-pokemon-details',
    templateUrl: './pokemon-details.component.html',
    styleUrls: ['./pokemon-details.component.scss'],
    standalone: true,
    imports: [
      // ! Atoms
      AtomLoadingComponent,
      AtomButtonBackComponent,

      // ! Organisms
      OrganismPokemonCardDetailsComponent,
      OrganismPokemonChartStatsComponent,
      OrganismPokemonDamageTakenComponent,
      OrganismPokemonEvolutionComponent
    ]
})
export class PokemonDetailsComponent implements OnInit, DoCheck {
  public loading = false;
  public pokemon?: IPokemon;
  public refreshScreen = new Subject<void>();

  private lastId = 0;

  constructor(private route: ActivatedRoute,
              private pokemonRequest: PokemonRequestService,
              private toastrService: ToastrService,
              private title: Title,
              private cdr: ChangeDetectorRef
            ) { }

  public ngDoCheck(): void {
    if (this.pokemon && this.lastId !== this.pokemon.id) {
      this.lastId = this.pokemon.id;
      this.refreshScreen.next();
    }
  }

  public ngOnInit(): void {
    merge(this.refreshScreen).pipe(
      tap(() => this.loading = true),
      switchMap(() => this.route.paramMap),
      switchMap((params) => {
        const id = params.get('id');
        return this.pokemonRequest.getPokemonById(id ?? '');
      }),
    ).subscribe({
      next: (pokemon) => {
        this.loading = false;
        this.pokemon = pokemon;
        this.title.setTitle(`${PokemonUtil.firstLetterUpperCase(this.pokemon?.name ?? '')} - Pokédex`);
        this.cdr.detectChanges();
      },
      error: (error) => {
        this.toastrService.error(
          typeof error === 'string' ? error : `Failed to get Pokemon.`,
          'Get Pokemon Error :(',
          ToastrConfig
        );
        this.loading = false;
      }
    });

    this.refreshScreen.next();
  }

}

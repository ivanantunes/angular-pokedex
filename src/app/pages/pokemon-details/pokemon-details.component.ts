import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { concat, firstValueFrom, map, switchMap, toArray } from 'rxjs';
import { Location, NgIf } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { RequestService } from 'src/app/services';
import { ToastrConfig } from '../../shared/constants';
import { AtomLoadingComponent } from '../../shared/components/atoms';
import {
  OrganismPokemonCardDetailsComponent,
  OrganismPokemonChartStatsComponent,
  OrganismPokemonDamageTakenComponent
} from '../../shared/components/organisms';
import { IPokemon } from '../../shared/interfaces';
import { Title } from '@angular/platform-browser';
import { PokemonUtil } from '../../shared/utils';

@Component({
    selector: 'app-pokemon-details',
    templateUrl: './pokemon-details.component.html',
    styleUrls: ['./pokemon-details.component.scss'],
    standalone: true,
    imports: [
      // ! Angular
      NgIf,

      // ! Atoms
      AtomLoadingComponent,

      // ! Organisms
      OrganismPokemonCardDetailsComponent,
      OrganismPokemonChartStatsComponent,
      OrganismPokemonDamageTakenComponent
    ]
})
export class PokemonDetailsComponent implements OnInit {
  public loading = false;
  public pokemon?: IPokemon;


  public evolutionChain?: any[];

  constructor(private route: ActivatedRoute,
              private http: HttpClient,
              private toastrService: ToastrService,
              private request: RequestService,
              private title: Title,
              private _location: Location) { }

  async ngOnInit(): Promise<void> {
    try {
      this.loading = true;
      const params = await firstValueFrom(this.route.paramMap);
      const id = params.get('id');
      this.pokemon = await this.getPokemonById(id ?? '');
      this.title.setTitle(`${PokemonUtil.firstLetterUpperCase(this.pokemon?.name ?? '')} - Pokédex`);

      await this.setupEvolutionChain();

      this.loading = false;
    } catch (error) {
      this.toastrService.error(
        typeof error === 'string' ? error : `Failed to get Pokemon.`,
        'Get Pokemon Error :(',
        ToastrConfig
      );
      this.loading = false;
    }
  }

  private async getPokemonById(id: string): Promise<any> {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}/`;

    try {
      const pokemon = await firstValueFrom(this.http.get<any>(url));
      return Promise.resolve(pokemon);
    } catch (error) {
      return Promise.reject('Failed to get Pokemon by id, Try Again.');
    }
  }



  // backClicked() {
  //   this._location.back();
  // }
  public slice(text: string, position: number, inc: string): string {
		return text.slice(0, position) + inc + text.slice(position);
	}

  public recurseEvolutionTo(evolves_to: any[]): { name: string, url: string }[]  {
    if (evolves_to.length > 0) {
      const listOfLinks: { name: string, url: string }[] = [];
      evolves_to.forEach((r) => {
        if (r.species) {
          listOfLinks.push(r.species);
        }

        if (r.evolves_to && r.evolves_to.length > 0) {
          listOfLinks.push(...this.recurseEvolutionTo(r.evolves_to));
        }
      });

      return listOfLinks;
    }

    return [];
  }

  public async setupEvolutionChain(): Promise<void> {
    if (!this.pokemon) {
      return Promise.reject('Not Found Pokemon');
    }

    this.evolutionChain = await firstValueFrom(this.http.get<any>(this.pokemon.species.url).pipe(
      switchMap((species) => {
        const urlSplit = (species.evolution_chain.url as string).split('/');
        const id = urlSplit[urlSplit.length - 2];

        return this.http.get<any>(`https://pokeapi.co/api/v2/evolution-chain/${id}`)
      }),
      map((evolution) => {
        const listOfLinks: { name: string, url: string }[] = [];

        listOfLinks.push(evolution.chain.species);

        if (evolution.chain.evolves_to && evolution.chain.evolves_to.length > 0) {
          listOfLinks.push(...this.recurseEvolutionTo(evolution.chain.evolves_to))
        }

        return listOfLinks;
      }),
      switchMap((list) => {
        return concat(...list.map((l) => {
          return this.request.getPokemons(`https://pokeapi.co/api/v2/pokemon/${l.name}`);
        })).pipe(
          toArray()
        )
      })
    ));
  }
}

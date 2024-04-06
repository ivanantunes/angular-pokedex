import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink} from '@angular/router';
import { concat, firstValueFrom, map, merge, switchMap, toArray } from 'rxjs';
import { Location, NgIf, NgFor, NgClass } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { RequestService } from 'src/app/services';
import { AtomLoadingComponent } from '../../shared/components/atoms/atom-loading/atom-loading.component';
import { MatIcon } from '@angular/material/icon';
import { ToastrConfig } from 'src/app/shared/constants';
import { OrganismPokemonCardDetailsComponent, OrganismPokemonChartStatsComponent } from 'src/app/shared/components/organisms';

@Component({
    selector: 'app-pokemon-details',
    templateUrl: './pokemon-details.component.html',
    styleUrls: ['./pokemon-details.component.scss'],
    standalone: true,
    imports: [
      // ! Angular
      NgIf,
      NgFor,
      NgClass,
      RouterLink,

      // ! Material
      MatIcon,

      // ! Atoms
      AtomLoadingComponent,

      // ! Organisms
      OrganismPokemonCardDetailsComponent,
      OrganismPokemonChartStatsComponent
    ]
})
export class PokemonDetailsComponent implements OnInit {
  public loading = false;
  public pokemon?: any;

  // ! Types Damage
  public damages: { name: string, value: number }[] = [];
  public evolutionChain?: any[];

  constructor(private route: ActivatedRoute,
              private http: HttpClient,
              private toastrService: ToastrService,
              private request: RequestService,
              private _location: Location) {}

  async ngOnInit(): Promise<void> {
    try {
      this.loading = true;
      const params = await firstValueFrom(this.route.paramMap);
      const id = params.get('id');
      this.pokemon = await this.getPokemonById(id ?? '');

      // await firstValueFrom(this.pokemonTypeChart());
      this.pokemonTypeChart()
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

  public pokemonTypeChart(): void {
    this.request.pokemonTypes.pipe(
      switchMap((pokemonTypeObject) => {
        return merge(...(this.pokemon as any).types.map((type: any) => {
          return this.http.get<any>(type.type.url).pipe(
            map((damangeObject) => {
              const damaged: Array<{ type: string, damage: number }> = [];

              damangeObject.damage_relations.double_damage_from
                                            .forEach((doubleDamage: any) => damaged.push({ type: doubleDamage.name, damage: 2 }));

              damangeObject.damage_relations.half_damage_from
                                            .forEach((halfDamage: any) => damaged.push({ type: halfDamage.name, damage: 0.5 }));

              damangeObject.damage_relations.no_damage_from
                                            .forEach((noDamage: any) => damaged.push({ type: noDamage.name, damage: 0 }));

              return damaged;
            })
          )
        })).pipe(
          toArray(),
          map((damagedTypes: any) => {
            return pokemonTypeObject.results.map((result: any) => {
              let filterDamaged = damagedTypes[0].filter((e: any) => e.type === result.name);

              if (damagedTypes.length >= 2) {
                filterDamaged = [...filterDamaged, ...damagedTypes[1]].filter((e) => e.type === result.name);
              }

              let finalDamageTakenByType = filterDamaged.length <= 0 ? 1 : filterDamaged.reduce((a: any, b: any) => {
                a.damage *= b.damage;
                return a;
              }).damage;

              return { name: result.name, value: finalDamageTakenByType }
            })
          }),
          map((result) => {
            result.splice(result.findIndex((f: any) => f.name === 'shadow'), 1);
            result.splice(result.findIndex((f: any) => f.name === 'unknown'), 1);

            return result;
          })
        )
      })
    ).subscribe({
      next: (result) => this.damages = result,
      error: (error) => console.log(error)
    })
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

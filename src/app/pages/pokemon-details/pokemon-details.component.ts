import { AfterViewInit, Component, ElementRef, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink} from '@angular/router';
import { concat, firstValueFrom, map, merge, switchMap, toArray } from 'rxjs';
import { Location, NgIf, NgFor, NgClass } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { DamangeObject, Pokemon } from '../../interfaces';
import { ToastrService } from 'ngx-toastr';
import { ToastrConfig } from '../../constants';
import { DatabaseService, RequestService } from 'src/app/services';
import { FavoriteView } from 'src/app/view';
import { BarChartModule } from '@swimlane/ngx-charts';
import { ButtonFavoriteComponent } from '../../components/button-favorite/button-favorite.component';
import { LoadingComponent } from '../../components/loading/loading.component';
import { CardComponent } from 'src/app/components/card/card.component';
import { MatIcon } from '@angular/material/icon';

@Component({
    selector: 'app-pokemon-details',
    templateUrl: './pokemon-details.component.html',
    styleUrls: ['./pokemon-details.component.scss'],
    standalone: true,
    imports: [
      NgIf,
      NgFor,
      NgClass,
      RouterLink,
      BarChartModule,
      MatIcon,

      // ! Components
      LoadingComponent,
      ButtonFavoriteComponent,
      CardComponent
    ]
})
export class PokemonDetailsComponent implements OnInit {

  public loading = false;
  public pokemon?: Pokemon;
  public specie = '';
  public height = '0 m';
  public weight = '0 kg';
  public abilities = '';

  // ! Base Stats
  public results: { name: string, value: number }[] = [];
  public xScaleMax = 0;
  public colorScheme: any = {
    domain: ['#eb170c', '#851005', '#4ac70c', '#5c0b04', '#246304', '#0460bd']
  };

  // ! Types Damage
  public damages: { name: string, value: number }[] = [];
  public evolutionChain?: Pokemon[];

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
      console.log(this.pokemon);
      this.specie = await this.getSpecieByUrl(this.pokemon.species.url);
      this.setupBaseStats();

      const height = String(this.pokemon.height);
      const weight = String(this.pokemon.weight);

      let sliceHeight = this.slice(height, height.length - 1, '.');
      let sliceWeight  = this.slice(weight, weight.length - 1, '.');

      if (sliceHeight.indexOf('.') === 0) {
        sliceHeight = '0' + sliceHeight;
      }

      if (sliceWeight.indexOf('.') === 0) {
        sliceWeight = '0' + sliceWeight;
      }

      this.height = `${sliceHeight} m`;
      this.weight = `${sliceWeight} kg`;
      this.abilities = this.pokemon.abilities
                                          .map((rec) => rec.ability.name)
                                          .map((r) => `${r.substring(0, 1).toUpperCase()}${r.substring(1, r.length)}`)
                                          .join(', ');

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

  private async getPokemonById(id: string): Promise<Pokemon> {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}/`;

    try {
      const pokemon = await firstValueFrom(this.http.get<Pokemon>(url));
      return Promise.resolve(pokemon);
    } catch (error) {
      return Promise.reject('Failed to get Pokemon by id, Try Again.');
    }
  }

  private async getSpecieByUrl(url: string): Promise<string> {
    try {
      const specie = await firstValueFrom(this.http.get<any>(url));

      if (!specie.genera) {
        return Promise.resolve('Not Defined');
      }

      return Promise.resolve((specie.genera as any[]).find((rec) => rec.language.name === 'en').genus as string);
    } catch (error) {
      return Promise.reject('Failed to get Pokemon Specie, Try Again.');
    }
  }

  // backClicked() {
  //   this._location.back();
  // }
  public slice(text: string, position: number, inc: string): string {
		return text.slice(0, position) + inc + text.slice(position);
	}

  private setupBaseStats(): void {
    let max = 0;
    this.pokemon?.stats.forEach((stat) => {
      this.results.push({ name: this.getFormatStats(stat.stat.name), value: stat.base_stat });
      const tempMax = stat.stat.name === 'hp' ? this.getPokemonHPStat(stat.base_stat, 100, 31, 255) : this.getPokemonOthersStats(true, stat.base_stat, 100, 31, 255);

      if (tempMax > max) {
        max = tempMax;
      }

      // return {
      //   name: this.getFormatStats(stat.stat.name),
      //   baseStats: stat.base_stat,
      //   min: stat.stat.name === 'hp' ? this.getPokemonHPStat(stat.base_stat, 100) : this.getPokemonOthersStats(false, stat.base_stat, 100),
      //   max: stat.stat.name === 'hp' ? this.getPokemonHPStat(stat.base_stat, 100, 31, 255) : this.getPokemonOthersStats(true, stat.base_stat, 100, 31, 255),
      // }
    });

    this.xScaleMax = max;
  }

  private getFormatStats(name: string): string {
		switch (name) {
			case 'special-attack':
				return 'Sp. Atk';
			case 'special-defense':
				return 'Sp. Def';
			default:
				return name
					.replace(/-/g, ' ')
					.replace(/\w\S*/g, (w: any) => w.replace(/^\w/, (c: any) => c.toUpperCase()));
		}
	}

  public getPokemonHPStat(base: number, level: number, iv: number = 0, ev: number = 0): number {
		return Math.floor(0.01 * (2 * base + iv + Math.floor(0.25 * ev)) * level) + level + 10;
	}

  public getPokemonOthersStats(nature: boolean, base: number, level: number, iv: number = 0, ev: number = 0): number {
		return Math.floor(((((2 * base + iv + Math.floor(ev * 0.25)) * level) / 100) + 5) * (nature ? 1.1 : 0.9));
	}

  public pokemonTypeChart(): void {
    this.request.pokemonTypes.pipe(
      switchMap((pokemonTypeObject) => {
        return merge(...(this.pokemon as Pokemon).types.map((type) => {
          return this.http.get<DamangeObject>(type.type.url).pipe(
            map((damangeObject) => {
              const damaged: Array<{ type: string, damage: number }> = [];

              damangeObject.damage_relations.double_damage_from
                                            .forEach((doubleDamage) => damaged.push({ type: doubleDamage.name, damage: 2 }));

              damangeObject.damage_relations.half_damage_from
                                            .forEach((halfDamage) => damaged.push({ type: halfDamage.name, damage: 0.5 }));

              damangeObject.damage_relations.no_damage_from
                                            .forEach((noDamage) => damaged.push({ type: noDamage.name, damage: 0 }));

              return damaged;
            })
          )
        })).pipe(
          toArray(),
          map((damagedTypes) => {
            return pokemonTypeObject.results.map((result) => {
              let filterDamaged = damagedTypes[0].filter((e) => e.type === result.name);

              if (damagedTypes.length >= 2) {
                filterDamaged = [...filterDamaged, ...damagedTypes[1]].filter((e) => e.type === result.name);
              }

              let finalDamageTakenByType = filterDamaged.length <= 0 ? 1 : filterDamaged.reduce((a, b) => {
                a.damage *= b.damage;
                return a;
              }).damage;

              return { name: result.name, value: finalDamageTakenByType }
            })
          }),
          map((result) => {
            result.splice(result.findIndex((f) => f.name === 'shadow'), 1);
            result.splice(result.findIndex((f) => f.name === 'unknown'), 1);

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

    console.log(this.evolutionChain);
  }
}

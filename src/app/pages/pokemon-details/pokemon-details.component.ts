import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Pokemon } from '../../interfaces';
import { ToastrService } from 'ngx-toastr';
import { ToastrConfig } from '../../constants';
import { DatabaseService } from 'src/app/services';
import { FavoriteView } from 'src/app/view';

@Component({
  selector: 'app-pokemon-details',
  templateUrl: './pokemon-details.component.html',
  styleUrls: ['./pokemon-details.component.scss']
})
export class PokemonDetailsComponent implements OnInit {

  public loading = false;
  public pokemon?: Pokemon;
  public specie = '';
  public isFavorite = false;
  public height = '0 m';
  public weight = '0 kg';
  public abilities = ''

  private favoriteView = new FavoriteView(this.databaseService);

  constructor(private route: ActivatedRoute,
              private http: HttpClient,
              private toastrService: ToastrService,
              private databaseService: DatabaseService,
              private _location: Location) {}

  async ngOnInit(): Promise<void> {
    try {
      this.loading = true;
      const params = await firstValueFrom(this.route.paramMap);
      const id = params.get('id');
      this.pokemon = await this.getPokemonById(id ?? '');
      this.specie = await this.getSpecieByUrl(this.pokemon.species.url);
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

      try {
        const favoritePokemon = await this.favorite;

        if (favoritePokemon.length > 0) {
          this.isFavorite = favoritePokemon[0].pokemonId === this.pokemon?.id;
        }
      } catch (error) {
        this.toastrService.error(
          'Failed to Check Favorite Pokemon.',
          'Load Favorite Error :(',
          ToastrConfig
        );
      }

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

  public async onFavorite() {
    try {
      const favorite = await this.favorite;

      if (favorite.length > 0 && favorite[0].pokemonId === this.pokemon?.id) {
        await this.favoriteView.delete(favorite[0].id);
        this.toastrService.warning(
          'Success on Removed Pokemon to Favorite!',
          'Removed Favorite Warning :O',
          ToastrConfig
        );
        this.isFavorite = false;
      } else {
        await this.favoriteView.create({ pokemonId: this.pokemon?.id });
        this.toastrService.success(
          'Success on Added Pokemon to Favorite!',
          'Added Favorite Success ;)',
          ToastrConfig
        );
        this.isFavorite = true;
      }

    } catch (error) {
      this.toastrService.error(
        'Failed to Favorite Pokemon.',
        'Favorite Error :(',
        ToastrConfig
      );
    }
  }

  public get favorite() {
    return this.favoriteView.read({
        pageIndex: 0,
        pageSize: 1,
        where: { pokemonId: this.pokemon?.id }
      });
  }

  public slice(text: string, position: number, inc: string): string {
		return text.slice(0, position) + inc + text.slice(position);
	}
}

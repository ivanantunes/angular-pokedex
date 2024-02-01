import { AfterViewInit, Component, Input } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ToastrConfig } from 'src/app/constants';
import { Pokemon } from 'src/app/interfaces';
import { DatabaseService } from 'src/app/services';
import { FavoriteView } from 'src/app/view';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements AfterViewInit {

  @Input() pokemon!: Pokemon;

  private favoriteView = new FavoriteView(this.databaseService);

  public isFavorite = false;

  constructor(
    private databaseService: DatabaseService,
    private toastrService: ToastrService
  ) { }

  async ngAfterViewInit(): Promise<void> {
    try {
      const favoritePokemon = await this.favorite;

      if (favoritePokemon.length > 0) {
        this.isFavorite = favoritePokemon[0].pokemonId === this.pokemon.id;
      }
    } catch (error) {
      this.toastrService.error(
        'Failed to Check Favorite Pokemon.',
        'Load Favorite Error :(',
        ToastrConfig
      );
    }
  }

  public moreInfo(): void {
    location.href = `/pokemon/details/${this.pokemon.id}`
  }

  public async onFavorite() {
    try {
      const favorite = await this.favorite;

      if (favorite.length > 0 && favorite[0].pokemonId === this.pokemon.id) {
        await this.favoriteView.delete(favorite[0].id);
        this.toastrService.warning(
          'Success on Removed Pokemon to Favorite!',
          'Removed Favorite Warning :O',
          ToastrConfig
        );
        this.isFavorite = false;
      } else {
        await this.favoriteView.create({ pokemonId: this.pokemon.id });
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
        where: { pokemonId: this.pokemon.id }
      });
  }
}

import { AfterViewInit, Component, Input } from '@angular/core';
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
    private databaseService: DatabaseService
  ) { }

  async ngAfterViewInit(): Promise<void> {

    try {
      const favoritePokemon = await this.favorite;

      if (favoritePokemon.length > 0) {
        this.isFavorite = favoritePokemon[0].pokemonId === this.pokemon.id;
      }

    } catch (error) {
      // TODO: Add Toas Error
    }

  }

  public moreInfo(): void {
    alert('More Info');
  }

  public async onFavorite() {
    try {
      const favorite = await this.favorite;

      if (favorite.length > 0 && favorite[0].pokemonId === this.pokemon.id) {
        await this.favoriteView.delete(favorite[0].id);
        // alert('Success Removed Pokemon to Favorite!');
        this.isFavorite = false;
      } else {
        await this.favoriteView.create({ pokemonId: this.pokemon.id });
        // alert('Success Added Pokemon to Favorite!');
        this.isFavorite = true;
      }

    } catch (error) {
      // TODO: Add Toas Error
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

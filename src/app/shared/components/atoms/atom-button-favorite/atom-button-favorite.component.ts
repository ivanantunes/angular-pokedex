import { AfterViewInit, Component, Input } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FaceExpressionsLog, TitleFailedLog, ToastrConfig } from '../../../constants';
import { DatabaseService } from 'src/app/services';
import { FavoriteView } from 'src/app/view';
import { MatIcon } from '@angular/material/icon';
import { NgIf } from '@angular/common';
import { MatTooltip } from '@angular/material/tooltip';
import { MatIconButton } from '@angular/material/button';

@Component({
    selector: 'atom-button-favorite',
    template: `
      <button mat-icon-button color="warn" (click)="onFavorite()" [matTooltip]="isFavorite ? 'Click to Unfavorite :(' : 'Click to Favorite!'">
        @if (isFavorite) {
          <mat-icon>favorite</mat-icon>
        } @else {
          <mat-icon>favorite_border</mat-icon>
        }
      </button>
    `,
    standalone: true,
    imports: [
      // ! Angular
      NgIf,
      // ! Material
      MatIconButton,
      MatTooltip,
      MatIcon
  ]
})
export class AtomButtonFavoriteComponent implements AfterViewInit {

  @Input({ required: true }) pokemonId = 0;

  public isFavorite = false;

  private favoriteView = new FavoriteView(this.databaseService);

  constructor(
    private databaseService: DatabaseService,
    private toastr: ToastrService,
  ) { }

  public async ngAfterViewInit(): Promise<void> {
    try {
      const favoritePokemon = await this.favorite;

      if (favoritePokemon.length > 0) {
        this.isFavorite = favoritePokemon[0].pokemonId === this.pokemonId;
      }
    } catch (error) {
      console.error(TitleFailedLog.loading, error);

      this.toastr.error(
        'Failed to Check Favorite Pokémon.',
        TitleFailedLog.loading,
        ToastrConfig
      );
    }
  }

  public async onFavorite() {
    try {
      const favorite = await this.favorite;

      if (favorite.length > 0 && favorite[0].pokemonId === this.pokemonId) {
        await this.favoriteView.delete(favorite[0].id);
        this.toastr.warning(
          'Success in Removing Pokémon from Favorite!',
          `Removed Favorite Warning ${FaceExpressionsLog.warning}`,
          ToastrConfig
        );
        this.isFavorite = false;
      } else {
        await this.favoriteView.create({ pokemonId: this.pokemonId });
        this.toastr.success(
          'Success on Added Pokemon to Favorite!',
          `Added on Favorite with Success ${FaceExpressionsLog.success}`,
          ToastrConfig
        );
        this.isFavorite = true;
      }

    } catch (error) {
      console.error(TitleFailedLog.favorite, error);

      this.toastr.error(
        'Failed to Favorite Pokemon.',
        TitleFailedLog.favorite,
        ToastrConfig
      );
    }
  }

  public get favorite() {
    return this.favoriteView.read({
        pageIndex: 0,
        pageSize: 1,
        where: { pokemonId: this.pokemonId }
      });
  }
}

import { AfterViewInit, Component, Input } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ToastrConfig } from 'src/app/constants';
import { DatabaseService } from 'src/app/services';
import { FavoriteView } from 'src/app/view';
import { MatIcon } from '@angular/material/icon';
import { NgIf } from '@angular/common';
import { MatTooltip } from '@angular/material/tooltip';
import { MatIconButton } from '@angular/material/button';

@Component({
    selector: 'app-button-favorite',
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
      NgIf,

      // ! Material
      MatIconButton,
      MatTooltip,
      MatIcon
  ]
})
export class ButtonFavoriteComponent implements AfterViewInit {

  @Input() pokemonId = 0;

  public isFavorite = false;

  private favoriteView = new FavoriteView(this.databaseService);

  constructor(
    private databaseService: DatabaseService,
    private toastrService: ToastrService,
  ) { }

  public async ngAfterViewInit(): Promise<void> {
    try {
      const favoritePokemon = await this.favorite;

      if (favoritePokemon.length > 0) {
        this.isFavorite = favoritePokemon[0].pokemonId === this.pokemonId;
      }
    } catch (error) {
      this.toastrService.error(
        'Failed to Check Favorite Pokemon.',
        'Load Favorite Error :(',
        ToastrConfig
      );
    }
  }

  public async onFavorite() {
    try {
      const favorite = await this.favorite;

      if (favorite.length > 0 && favorite[0].pokemonId === this.pokemonId) {
        await this.favoriteView.delete(favorite[0].id);
        this.toastrService.warning(
          'Success on Removed Pokemon to Favorite!',
          'Removed Favorite Warning :O',
          ToastrConfig
        );
        this.isFavorite = false;
      } else {
        await this.favoriteView.create({ pokemonId: this.pokemonId });
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
        where: { pokemonId: this.pokemonId }
      });
  }
}

import { Component, Input } from '@angular/core';
import { IPokemonSprites } from '../../../interfaces';

@Component({
  selector: 'atom-image-pokemon',
  standalone: true,
  imports: [],
  template: `
    <img [width]="pokemonImage.width" [height]="pokemonImage.height" [src]="pokemonImage.url" alt="Pokémon Name is {{pokemonName}}">
  `
})
export class AtomImagePokemonComponent {
  @Input({ required: true }) pokemonName: string = '';
  @Input({ required: true }) sprites?: IPokemonSprites;

  public get pokemonImage(): { width: number, height: number, url: string } {
    let object = {
      width: 64,
      height: 64,
      url: 'assets/img/loading.png'
    };

    if (this.sprites?.other['official-artwork'].front_default) {
      object.url = this.sprites.other['official-artwork'].front_default;
    } else if (this.sprites?.other.dream_world.front_default) {
      object.url = this.sprites.other.dream_world.front_default
    } else if (this.sprites?.front_default) {
      object.width = 94;
      object.height = 94;
      object.url = this.sprites.front_default;
    }

    return object;
  }
}

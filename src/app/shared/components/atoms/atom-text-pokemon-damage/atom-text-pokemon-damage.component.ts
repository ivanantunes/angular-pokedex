import { Component, Input } from '@angular/core';
import { IPokemonTypeData } from '../../../interfaces';

@Component({
  selector: 'atom-text-pokemon-damage',
  standalone: true,
  imports: [],
  template: `
    <section class="text">
      <p class="text__type">{{pokemonTypeDamage.type}}</p>
      <p class="text__damage"><strong>{{pokemonTypeDamage.damage}}</strong></p>
    </section>
  `,
  styles: `
    .text {
      &__type {
        font-size: 16px;
      }

      &__type::first-letter {
        text-transform: uppercase;
      }

      &__damage {
        font-size: 20px;
      }
    }
  `
})
export class AtomTextPokemonDamageComponent {
  @Input({ required: true }) pokemonTypeDamage: IPokemonTypeData = { type: '', damage: 0 };
}

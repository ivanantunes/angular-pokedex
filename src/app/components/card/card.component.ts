import { Component, Input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Pokemon } from 'src/app/interfaces';
import { ButtonFavoriteComponent } from '../button-favorite/button-favorite.component';
import { MatIcon } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';
import { MatIconButton } from '@angular/material/button';
import { NgClass, NgFor } from '@angular/common';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
  standalone: true,
  imports: [
    NgClass,
    NgFor,
    RouterLink,
    // ! Material
    MatIconButton,
    MatTooltip,
    MatIcon,
    // ! Components
    ButtonFavoriteComponent
  ]
})
export class CardComponent {

  @Input() pokemon!: Pokemon;

  constructor(
    private route: Router
  ) { }

  public moreInfo(): void {
    this.route.navigate([`pokemon/details/${this.pokemon.id}`])
  }

}

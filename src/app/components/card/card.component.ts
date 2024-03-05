import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Pokemon } from 'src/app/interfaces';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
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

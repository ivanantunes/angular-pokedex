import { Component, Input } from '@angular/core';
import { Pokemon } from 'src/app/interfaces';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {

  @Input() pokemon!: Pokemon

  constructor() { }

  public moreInfo(): void {
    alert('More Info');
  }
}

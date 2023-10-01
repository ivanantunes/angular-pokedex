import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public pokemons = [1,2,3,4,5,6]

  constructor() { }


  public moreInfo(): void {
    alert('More Info');
  }

}

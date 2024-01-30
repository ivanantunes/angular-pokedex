import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-pokemon-details',
  templateUrl: './pokemon-details.component.html',
  styleUrls: ['./pokemon-details.component.scss']
})
export class PokemonDetailsComponent implements OnInit {

  constructor(private route: ActivatedRoute) {}

  async ngOnInit(): Promise<void> {
    const params = await firstValueFrom(this.route.paramMap);
    const id = params.get('id');
    console.log('Pokemon Id', id);
  }

}

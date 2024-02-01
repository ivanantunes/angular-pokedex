import { Component, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { firstValueFrom } from 'rxjs';
import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Pokemon } from '../../interfaces';
import { ToastrService } from 'ngx-toastr';
import { ToastrConfig } from '../../constants';

@Component({
  selector: 'app-pokemon-details',
  templateUrl: './pokemon-details.component.html',
  styleUrls: ['./pokemon-details.component.scss']
})
export class PokemonDetailsComponent implements OnInit {

  public pokemon?: Pokemon;

  constructor(private route: ActivatedRoute,
              private http: HttpClient,
              private toastrService: ToastrService,
              private _location: Location) {}

  async ngOnInit(): Promise<void> {
    try {
      const params = await firstValueFrom(this.route.paramMap);
      const id = params.get('id');
      this.pokemon = await this.getPokemonById(id ?? '');
    } catch (error) {
      this.toastrService.error(
        typeof error === 'string' ? error : `Failed to get Pokemon.`,
        'Get Pokemon Error :(',
        ToastrConfig
      )
    }
  }

  private async getPokemonById(id: string): Promise<Pokemon> {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}/`;

    try {
      const pokemon = await firstValueFrom(this.http.get<Pokemon>(url));
      return Promise.resolve(pokemon);
    } catch (error) {
      return Promise.reject('Failed to get Pokemon by id, Try Again.');
    }
  }

  // backClicked() {
  //   this._location.back();
  // }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PageSize } from '../constants';
import { PokemonTypeObject } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class RequestService {
  constructor(
    private http: HttpClient
  ) { }

  public getPokemons(url?: string, search?: string, pageSize?: number): Observable<any> {
    const defaultUrl = `https://pokeapi.co/api/v2/pokemon/${search ?? ''}?limit=${pageSize ?? PageSize}&offset=0`;
    return this.http.get<any>(url ?? defaultUrl);
  }

  public get pokemonTypes(): Observable<PokemonTypeObject> {
    return this.http.get<PokemonTypeObject>(`https://pokeapi.co/api/v2/type`);
  }
}

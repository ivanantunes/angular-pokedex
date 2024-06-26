import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPokemon, IPokemonDataBase, IPokemonEvolution, IPokemonResponse, IPokemonSpecie, IPokemonTypeDetails} from '../interfaces';
import { PageSize } from '../constants';

@Injectable({
  providedIn: 'root'
})
export class PokemonRequestService {
  private baseURL = 'https://pokeapi.co/api/v2';

  constructor(
    private http: HttpClient
  ) { }

  public getPokemonById(pokemonId: number | string): Observable<IPokemon> {
    return this.http.get<IPokemon>(`${this.baseURL}/pokemon/${pokemonId}`);
  }

  public getPokemons(url?: string, search?: string, pageSize?: number): Observable<any> {
    const defaultUrl = `${this.baseURL}/pokemon/${search ?? ''}?limit=${pageSize ?? PageSize}&offset=0`;
    return this.http.get<any>(url ?? defaultUrl);
  }

  public getSpecies(url: string): Observable<IPokemonSpecie> {
    return this.http.get<IPokemonSpecie>(url);
  }

  public get pokemonTypes(): Observable<IPokemonResponse<IPokemonDataBase>> {
    return this.http.get<any>(`${this.baseURL}/type`);
  }

  public getType(url: string): Observable<IPokemonTypeDetails> {
    return this.http.get<IPokemonTypeDetails>(url);
  }

  public getEvolutionChain(id: string): Observable<IPokemonEvolution> {
    return this.http.get<IPokemonEvolution>(`${this.baseURL}/evolution-chain/${id}`);
  }
}


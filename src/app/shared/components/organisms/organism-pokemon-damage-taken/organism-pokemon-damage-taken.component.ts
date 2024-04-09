import { Component, Input, OnInit } from '@angular/core';
import { PokemonRequestService } from '../../../services';
import { map, merge, switchMap, toArray } from 'rxjs';
import { IPokemonType } from '../../../interfaces';
import { ToastrService } from 'ngx-toastr';
import { TitleFailedLog, ToastrConfig } from '../../../constants';

@Component({
  selector: 'organism-pokemon-damage-taken',
  standalone: true,
  imports: [],
  templateUrl: './organism-pokemon-damage-taken.component.html',
  styleUrl: './organism-pokemon-damage-taken.component.scss'
})
export class OrganismPokemonDamageTakenComponent implements OnInit {
  @Input({ required: true }) types: IPokemonType[] = [];

  public damageTaken: { type: string, damage: number }[] = [];

  constructor(
    private pokemonRequest: PokemonRequestService,
    private toastr: ToastrService
  ) { }

  public ngOnInit(): void {
    this.pokemonRequest.pokemonTypes.pipe(
      map((result) => result.results),
      switchMap((listTypesRequest) => {
        return merge(...this.types.map((objectType) => {
          return this.pokemonRequest.getType(objectType.type.url).pipe(
            map((damangeObject) => {
              return [
                ...damangeObject.damage_relations.double_damage_from.map((row) => ({ type: row.name, damage: 2 })),
                ...damangeObject.damage_relations.half_damage_from.map((row) => ({ type: row.name, damage: 0.5 })),
                ...damangeObject.damage_relations.no_damage_from.map((row) => ({ type: row.name, damage: 0 })),
              ];
            })
          );
        })).pipe(
          toArray(),
          map((damagedTypes) => damagedTypes.flat()),
          map((damagedTypes) => {
            return listTypesRequest.map((pokemonType) => {
              const filterDamaged = damagedTypes.filter((damagedType) => damagedType.type === pokemonType.name);
              let finalDamageTakenByType = 1;

              if (filterDamaged.length > 0) {
                finalDamageTakenByType = filterDamaged.reduce((a, b) => {
                  a.damage *= b.damage;
                  return a;
                }).damage;
              }

              return { type: pokemonType.name, damage: finalDamageTakenByType };
            });
          }),
          map((damageTaken) => {
            damageTaken.splice(damageTaken.findIndex((f) => f.type === 'shadow'), 1);
            damageTaken.splice(damageTaken.findIndex((f) => f.type === 'unknown'), 1);

            return damageTaken;
          })
        );
      })
    ).subscribe({
      next: (result) => this.damageTaken = result,
      error: (error) => {
        console.error(TitleFailedLog.type, error);
        this.toastr.error('Failed to Get Types Pokémon', TitleFailedLog.type, ToastrConfig);
      }
    });
  }

}

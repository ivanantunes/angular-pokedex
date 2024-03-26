import { Component, Input } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Pokemon } from 'src/app/interfaces';
import { MatIcon } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';
import { MatIconButton } from '@angular/material/button';
import { NgClass, NgFor } from '@angular/common';
import { MoleculeActionsDefaultPokemonComponent, MoleculeImageCirclePokemonComponent, MoleculeTextPokemonReferenceComponent } from '../../molecules';
import { MoleculeImagePokemonTypesComponent } from '../../molecules/molecule-image-pokemon-types/molecule-image-pokemon-types.component';

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
    MoleculeActionsDefaultPokemonComponent,
    MoleculeImageCirclePokemonComponent,
    MoleculeTextPokemonReferenceComponent,
    MoleculeImagePokemonTypesComponent
  ]
})
export class CardComponent {

  @Input() pokemon!: Pokemon;

  public styleObjectCode = {
    'display': 'block',
    'text-align': 'left',
    'font-weight': 500,
    'font-size': '1.3rem',
    'line-height': '150%',
    'color': '#7a7d80',
    'margin-bottom': '0.6rem'
  };

  public styleObjectName = {
    'font-weight': 600,
    'font-size': '1.8rem',
    'line-height': '150%',
    'color': '#2f3133'
  }

  constructor(
    private route: Router
  ) { }

  public moreInfo(): void {
    this.route.navigate([`pokemon/details/${this.pokemon.id}`])
  }

  public get types(): string[] {
    return this.pokemon.types.map((type) => type.type.name);
  }

}

import { Component, Input, OnInit } from '@angular/core';
import { IModelEvolutionItem, IPokemonEvolutionDetails } from '../../../interfaces';
import { MatListModule } from '@angular/material/list';
import { PokemonUtil } from '../../../utils';

@Component({
  selector: 'molecule-text-pokemon-evolution',
  standalone: true,
  imports: [
    // ! Material
    MatListModule
  ],
  templateUrl: './molecule-text-pokemon-evolution.component.html',
  styleUrl: './molecule-text-pokemon-evolution.component.scss'
})
export class MoleculeTextPokemonEvolutionComponent implements OnInit {
  @Input({ required: true }) details!: IPokemonEvolutionDetails[];

  public items: IModelEvolutionItem[] = [];

  public ngOnInit(): void {
      this.setupDetails();
  }

  private setupDetails() {
    this.details.forEach((detail) => {
      if (detail.item) {
        this.managerItem({
          key: 'item',
          title: detail.item.name,
          description: 'Item'
        });
      }

      if (detail.held_item) {
        this.managerItem({
          key: 'held_item',
          title: detail.held_item.name,
          description: 'Held Item'
        });
      }

      if (detail.known_move) {
        this.managerItem({
          key: 'known_move',
          title: detail.known_move.name,
          description: 'Known Move'
        });
      }

      if (detail.known_move_type) {
        this.managerItem({
          key: 'known_move_type',
          title: detail.known_move_type.name,
          description: 'Known Move Type'
        });
      }

      if (detail.location) {
        this.managerItem({
          key: 'location',
          title: detail.location.name,
          description: 'Location'
        });
      }

      if (detail.min_level) {
        this.managerItem({
          key: 'min_level',
          title: String(detail.min_level),
          description: 'Level-Up'
        });
      }

      if (detail.min_happiness) {
        this.managerItem({
          key: 'min_happiness',
          title: String(detail.min_happiness),
          description: 'Min. Happiness'
        });
      }

      if (detail.min_beauty) {
        this.managerItem({
          key: 'min_beauty',
          title: String(detail.min_beauty),
          description: 'Min. Beauty'
        });
      }

      if (detail.min_affection) {
        this.managerItem({
          key: 'min_affection',
          title: String(detail.min_affection),
          description: 'Min. Affection'
        });
      }

      this.managerItem({
        key: 'needs_overworld_rain',
        title: detail.needs_overworld_rain ? 'Yes' : 'No',
        description: 'Needs Overworld Rain'
      });

      if (detail.party_species) {
        this.managerItem({
          key: 'party_species',
          title: detail.party_species.name,
          description: 'Party Species'
        });
      }

      if (detail.party_type) {
        this.managerItem({
          key: 'party_type',
          title: detail.party_type.name,
          description: 'Party Type'
        });
      }

      if (detail.relative_physical_stats !== undefined) {
        this.managerItem({
          key: 'relative_physical_stats',
          title: detail.relative_physical_stats === 1 ?
                                                        'Attack > Defense' :
                 detail.relative_physical_stats === 0 ? 'Attack = Defense' :
                                                        'Attack < Defense',
          description: 'Relative Physical Stats'
        });
      }

      if (detail.time_of_day) {
        this.managerItem({
          key: 'time_of_day',
          title: detail.time_of_day,
          description: 'Time of Day'
        });
      }

      if (detail.trade_species) {
        this.managerItem({
          key: 'trade_species',
          title: detail.trade_species.name,
          description: 'Trade Species'
        });
      }

      this.managerItem({
        key: 'turn_upside_down',
        title: detail.turn_upside_down ? 'Yes' : 'No',
        description: '3DS needs to be turned upside-down'
      });

    });
  }

  private isExistItem(key: string): number {
    return this.items.findIndex((f) => f.key === key);
  }

  private managerItem(item: IModelEvolutionItem): void {
    item.title = PokemonUtil.firstLetterUpperCase(item.title);

    const index = this.isExistItem(item.key);
    index > -1 ? this.items[index] = item : this.items.push(item);
  }
}

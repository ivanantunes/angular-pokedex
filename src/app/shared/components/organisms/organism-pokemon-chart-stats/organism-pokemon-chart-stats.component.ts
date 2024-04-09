import { Component, Input, OnInit } from '@angular/core';
import { BarChartModule, Color, ScaleType } from '@swimlane/ngx-charts';
import { IChartData, IPokemonStat } from '../../../interfaces';

@Component({
  selector: 'organism-pokemon-chart-stats',
  standalone: true,
  imports: [
    // ! Ngx
    BarChartModule,
  ],
  templateUrl: './organism-pokemon-chart-stats.component.html',
  styleUrl: './organism-pokemon-chart-stats.component.scss'
})
export class OrganismPokemonChartStatsComponent implements OnInit {
  @Input({ required: true }) stats: IPokemonStat[] = [];

  public chartColor: Color = {
    name: 'Stats',
    domain: ['#f44336'],
    selectable: true,
    group: ScaleType.Linear
  };
  public chartValue: IChartData[] = [];
  public xScaleMax = 0;

  public ngOnInit(): void {
    this.setupBaseStats();
  }

  private setupBaseStats(): void {
    let max = 0;

    this.stats.forEach((stat) => {
      this.chartValue.push({ name: this.formatStats(stat.stat.name), value: stat.base_stat });

      const tempMax = stat.stat.name === 'hp' ? this.pokemonHPStat(stat.base_stat, 100, 31, 255) : this.pokemonOthersStats(true, stat.base_stat, 100, 31, 255);

      if (tempMax > max) {
        max = tempMax;
      }
    });

    this.xScaleMax = max;
  }

  private formatStats(name: string): string {
    switch (name) {
      case 'special-attack':
        return 'Sp. Atk';
      case 'special-defense':
        return 'Sp. Def';
      default:
        return name.replace(/-/g, ' ').replace(/\w\S*/g, (w) => w.replace(/^\w/, (c) => c.toUpperCase()));
    }
  }

  private pokemonHPStat(base: number, level: number, iv: number = 0, ev: number = 0): number {
    return Math.floor(0.01 * (2 * base + iv + Math.floor(0.25 * ev)) * level) + level + 10;
  }

  private pokemonOthersStats(nature: boolean, base: number, level: number, iv: number = 0, ev: number = 0): number {
    return Math.floor(((((2 * base + iv + Math.floor(ev * 0.25)) * level) / 100) + 5) * (nature ? 1.1 : 0.9));
  }

}

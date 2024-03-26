import { HttpClient } from '@angular/common/http';
import { AfterViewInit, ChangeDetectorRef, Component } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { map } from 'rxjs';
import { PageSize, ToastrConfig } from 'src/app/constants';
import { ToastrService } from 'ngx-toastr';
import { AtomPaginatorComponent } from '../../shared/components/atoms/atom-paginator/atom-paginator.component';
import { OrganismPokemonCardDefaultComponent } from '../../shared/components/organisms/organism-pokemon-card-default/organism-pokemon-card-default.component';
import { AtomLoadingComponent } from '../../shared/components/atoms/atom-loading/atom-loading.component';
import { NgIf, NgFor } from '@angular/common';
import { MoleculeSearchComponent } from 'src/app/shared/components/molecules';
import { PokemonRequestService } from '../../shared/services';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss',
    standalone: true,
    imports: [
      NgIf,
      NgFor,

      // ! Atoms
      AtomLoadingComponent,
      AtomPaginatorComponent,

      // ! Molecules
      MoleculeSearchComponent,

      // ! Organism
      OrganismPokemonCardDefaultComponent,
    ]
})
export class HomeComponent implements AfterViewInit {

  public pokemonIds: string[] = [];

  private nextPageUrl = '';
  private previousPageUrl = '';
  public pokemonLenght = 0;
  private search?: string = '';
  public loading = false;

  public paginator?: MatPaginator;

  private get pageSize(): number {
    return this.paginator?.pageSize ?? PageSize;
  }

  public handlePageEvent(event: PageEvent): void {
    if (event.pageIndex > (event.previousPageIndex || 0)) {

      if (this.nextPageUrl) {
        const nextPageUrl = new URL(this.nextPageUrl);
        nextPageUrl.searchParams.set('limit', this.pageSize.toString());
        this.nextPageUrl = nextPageUrl.toString();
      }

      this.processPokemons(this.nextPageUrl, this.search);
    } else {
      if (this.previousPageUrl) {
        const previousPageUrl = new URL(this.previousPageUrl);
        previousPageUrl.searchParams.set('limit', this.pageSize.toString());
        this.previousPageUrl = previousPageUrl.toString();
      }

      this.processPokemons(this.previousPageUrl, this.search);
    }
  }

  constructor(
    private pokemonRequest: PokemonRequestService,
    private cdr: ChangeDetectorRef,
    private toastr: ToastrService
  ) { }

  ngAfterViewInit(): void {
    this.processPokemons();
    this.cdr.detectChanges();
  }

  private setupListOfLinks(data: any): any {
    if (data.results) {
      this.nextPageUrl = data.next;
      this.previousPageUrl = data.previous;
      this.pokemonLenght = data.count;
      return data.results as any[];
    } else {
      this.pokemonLenght = 1;
      this.nextPageUrl = '';
      this.previousPageUrl = '';
      return data;
    }
  }

  private scrollToTop(): void {
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });
  }

  public processPokemons(url?: string, search?: string): void {
    this.loading = true;
    this.search = search;

    this.pokemonRequest.getPokemons(url, this.search, this.pageSize).pipe(
      map((response) => this.setupListOfLinks(response)),
      map((response: { name: string, url: string }[]) => response.map((row: { name: string, url: string }) => row.name))
    ).subscribe({
      next: (pokemonIds) => {
        this.pokemonIds = pokemonIds;
        this.scrollToTop();
        this.loading = false;
      },
      error: (error) => {
        console.error('Failed to Loading :(', error);
        this.loading = false;
        this.pokemonIds = [];
        this.toastr.error(`Failed to Loading Pokémons, Please Try Again.`, 'Failed to Loading :(', ToastrConfig);
      }
    })
  }
}

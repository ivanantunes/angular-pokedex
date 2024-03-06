import { HttpClient } from '@angular/common/http';
import { AfterViewInit, ChangeDetectorRef, Component } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Observable, map, merge, of, switchMap, tap, toArray } from 'rxjs';
import { Pokemon } from '../../interfaces';
import { PageSize, ToastrConfig } from 'src/app/constants';
import { RequestService } from 'src/app/services';
import { ToastrService } from 'ngx-toastr';
import { PaginatorComponent } from '../../components/paginator/paginator.component';
import { CardComponent } from '../../components/card/card.component';
import { SearchComponent } from '../../components/search/search.component';
import { LoadingComponent } from '../../components/loading/loading.component';
import { NgIf, NgFor } from '@angular/common';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss',
    standalone: true,
    imports: [
      NgIf,
      NgFor,

      // ! Components
      LoadingComponent,
      SearchComponent,
      CardComponent,
      PaginatorComponent
    ]
})
export class HomeComponent implements AfterViewInit {
  public pokemons: Pokemon[] = [];
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
        this.nextPageUrl = this.nextPageUrl.substring(0, this.nextPageUrl.length - 2);
        this.nextPageUrl += this.pageSize;
      }

      this.processPokemons(this.nextPageUrl, this.search);
    } else {
      if (this.previousPageUrl) {
        this.previousPageUrl = this.previousPageUrl.substring(0, this.previousPageUrl.length - 2);
        this.previousPageUrl += this.pageSize;
      }

      this.processPokemons(this.previousPageUrl, this.search);
    }
  }

  constructor(private request: RequestService,
              private cdr: ChangeDetectorRef,
              private http: HttpClient,
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

  private setupPokemonByUrl(data: any): Observable<Pokemon[]> {
    if (Array.isArray(data)) {
      return merge(...data.map((row) => {
        return this.http.get<Pokemon>(row.url);
      })).pipe(
        toArray()
      );
    } else {
      if (this.paginator) {
        this.paginator.pageIndex = 0;
      }
      return of([data]);
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

    this.request.getPokemons(url, this.search, this.pageSize).pipe(
      map((listOfLinks) => this.setupListOfLinks(listOfLinks)),
      switchMap((rows) => this.setupPokemonByUrl(rows)),
      map((result) => result.sort((a, b) => a.id - b.id))
    ).subscribe({
      next: (result) => {
        this.pokemons = result;
        this.scrollToTop();
        this.loading = false;
      },
      error: (error) => {
        this.loading = false;
        this.pokemons = [];
        this.toastr.error(`Failed to Load Pokemons :(`, 'Error Load Pokemons', ToastrConfig);
      }
    })
  }
}

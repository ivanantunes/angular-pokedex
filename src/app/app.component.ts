import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { concat, map, merge, switchMap, toArray } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  public pokemons: any[] = [];
  private nextPageUrl = '';
  private previousPageUrl = '';
  public pokemonLenght = 0;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  private get pageSize(): number {
    return this.paginator.pageSize;
  }

  public handlePageEvent(event: PageEvent): void {
    if (event.pageIndex > (event.previousPageIndex || 0)) {
      this.request(this.nextPageUrl);
    } else {
      this.request(this.previousPageUrl);
    }
  }

  constructor(private http: HttpClient) { }

  ngAfterViewInit(): void {
    this.request();
  }

  public moreInfo(): void {
    alert('More Info');
  }

  public request(url?: string): void {
    this.http.get(url || `https://pokeapi.co/api/v2/pokemon?limit=${this.pageSize}&offset=0`).pipe(
      map((result: any) => {
        this.nextPageUrl = result.next;
        this.previousPageUrl = result.previous;
        this.pokemonLenght = result.count;

        return result.results as any[];
      }),
      switchMap((rows) => {
        return concat(...rows.map((row) => {
          return this.http.get(row.url);
        })).pipe(
          toArray()
        )
      })
    ).subscribe({
      next: (result) => {
        this.pokemons = result;
        window.scroll({
          top: 0,
          left: 0,
          behavior: 'smooth'
        });
      },
      error: (error) => {
        console.log(error);
      }
    })
  }
}

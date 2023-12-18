import { HttpClient } from '@angular/common/http';
import { AfterViewInit, ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { concat, map, merge, of, switchMap, toArray } from 'rxjs';

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
  private search?: string = '';
  public loading = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  private get pageSize(): number {
    return this.paginator.pageSize;
  }

  public handlePageEvent(event: PageEvent): void {
    if (event.pageIndex > (event.previousPageIndex || 0)) {
      this.request(this.nextPageUrl, this.search);
    } else {
      this.request(this.previousPageUrl, this.search);
    }
  }

  constructor(private http: HttpClient, private cdr: ChangeDetectorRef) { }

  ngAfterViewInit(): void {
    this.request();
    this.cdr.detectChanges();
  }

  public moreInfo(): void {
    alert('More Info');
  }

  public request(url?: string, search?: string): void {
    this.loading = true;
    this.search = search;

    this.http.get(url || `https://pokeapi.co/api/v2/pokemon/${this.search || ''}?limit=${this.pageSize}&offset=0`).pipe(
      map((listOfLinks: any) => {
        if (listOfLinks.results) {
          this.nextPageUrl = listOfLinks.next;
          this.previousPageUrl = listOfLinks.previous;
          this.pokemonLenght = listOfLinks.count;
          return listOfLinks.results as any[];
        } else {
          this.pokemonLenght = 1;
          this.nextPageUrl = '';
          this.previousPageUrl = '';
          return listOfLinks;
        }
      }),
      switchMap((rows) => {
        if (Array.isArray(rows)) {
          return concat(...rows.map((row) => {
            return this.http.get(row.url);
          })).pipe(
            toArray()
          );
        } else {
          this.paginator.pageIndex = 0;
          return of([rows]);
        }
      })
    ).subscribe({
      next: (result) => {
        this.pokemons = result;
        window.scroll({
          top: 0,
          left: 0,
          behavior: 'smooth'
        });
        this.loading = false;
      },
      error: (error) => {
        this.loading = false;
      }
    })
  }
}

import { Component, Output } from '@angular/core';
import { Subject, debounceTime } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  public searchEvent = new Subject<void>();
  public search = '';

  @Output() searchValue = new Subject<string>();

  constructor() {
    this.searchEvent.pipe(
      debounceTime(500),
    ).subscribe({
      next: () => this.searchValue.next(this.search)
    });
  }
}

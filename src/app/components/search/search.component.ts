import { Component, Output } from '@angular/core';
import { Subject, debounceTime } from 'rxjs';
import { MatIcon } from '@angular/material/icon';
import { MatIconButton } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatInput } from '@angular/material/input';
import { MatFormField, MatLabel, MatSuffix } from '@angular/material/form-field';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss'],
    standalone: true,
    imports: [MatFormField, MatLabel, MatInput, FormsModule, MatIconButton, MatSuffix, MatIcon]
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

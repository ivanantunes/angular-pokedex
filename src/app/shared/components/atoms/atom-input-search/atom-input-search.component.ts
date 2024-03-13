import { Component, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { Subject, debounceTime } from 'rxjs';

@Component({
  selector: 'atom-input-search',
  standalone: true,
  imports: [
    FormsModule,

    // ! Material
    MatFormField,
    MatLabel,
    MatInput,
  ],
  template: `
    <mat-form-field appearance="outline" color="warn" class="search__input--width">
      <mat-label>Search by Name or Code</mat-label>
      <input matInput type="text" (keyup)="searchEvent.next()" [(ngModel)]="search">
    </mat-form-field>
  `,
  styles: `
    .search__input--width {
      width: 100%;
    }
  `
})
export class AtomInputSearchComponent {
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

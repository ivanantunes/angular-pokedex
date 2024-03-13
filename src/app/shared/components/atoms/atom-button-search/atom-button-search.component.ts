import { Component, Input, Output } from '@angular/core';
import { MatFabButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { Subject } from 'rxjs';

@Component({
  selector: 'atom-button-search',
  standalone: true,
  imports: [
    MatFabButton,
    MatIcon
  ],
  template: `
    <button mat-fab aria-label="Search Button" color="warn" (click)="this.searchValue.next(this.value)">
      <mat-icon>search</mat-icon>
    </button>
  `
})
export class AtomButtonSearchComponent {
  @Input() value: any;
  @Output() searchValue = new Subject<any>();
}

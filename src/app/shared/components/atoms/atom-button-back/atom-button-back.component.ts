import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'atom-button-back',
  standalone: true,
  imports: [
    // ! Angular
    RouterLink,
    // ! Material
    MatButtonModule,
    MatIcon
  ],
  template: `
    <button class="btn-back" type="button" mat-button [routerLink]="url" color="warn">
      <mat-icon>arrow_back_ios</mat-icon>
      Back to List
    </button>
  `,
  styles: `
    .btn-back {
      border: 1px solid;
      border-radius: 20px;
      padding: 20px;
      margin-top: 10px;
      margin-bottom: 10px;
    }
  `
})
export class AtomButtonBackComponent {
  @Input({ required: true }) url = '';
}

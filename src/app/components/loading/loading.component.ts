import { Component } from '@angular/core';
import { MatProgressSpinner } from '@angular/material/progress-spinner';

@Component({
    selector: 'app-loading',
    template: `
      <section class="loading">
        <mat-spinner color="warn"></mat-spinner>
      </section>
    `,
    styles: `
      .loading {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100vh;
        background: rgba(0, 0, 0, 0.15);
        z-index: 200;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    `,
    standalone: true,
    imports: [MatProgressSpinner]
})
export class LoadingComponent { }

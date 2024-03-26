import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AtomImageLogoComponent } from '../../atoms';

@Component({
    selector: 'organism-header',
    templateUrl: './organism-header.component.html',
    styleUrl: './organism-header.component.scss',
    standalone: true,
    imports: [
      // ! Angular
      RouterLink,
      // ! Atoms
      AtomImageLogoComponent
    ]
})
export class OrganismHeaderComponent { }

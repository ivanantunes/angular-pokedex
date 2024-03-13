import { Component, Output } from '@angular/core';
import { AtomButtonSearchComponent, AtomInputSearchComponent } from '../../atoms';
import { Subject } from 'rxjs';
import { SearchModel } from '../../../interfaces';

@Component({
  selector: 'molecule-search',
  standalone: true,
  imports: [
    AtomButtonSearchComponent,
    AtomInputSearchComponent
  ],
  templateUrl: './molecule-search.component.html',
})
export class MoleculeSearchComponent {
  public value: SearchModel = {
    search: '',
    type: ''
  };

  public searchValue = new Subject<string>();

  @Output() searchEvent = new Subject<SearchModel>();

  constructor() {
    this.searchValue.subscribe((value) => {
      this.value.search = value;
      this.searchEvent.next(this.value);
    });
  }
}

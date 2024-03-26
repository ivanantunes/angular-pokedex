import { Component, Output } from '@angular/core';
import { AtomButtonSearchComponent, AtomInputSearchComponent } from '../../atoms';
import { Subject } from 'rxjs';
import { ISearchModel } from '../../../interfaces';

@Component({
  selector: 'molecule-search',
  standalone: true,
  imports: [
    // ! Atoms
    AtomButtonSearchComponent,
    AtomInputSearchComponent
  ],
  templateUrl: './molecule-search.component.html',
})
export class MoleculeSearchComponent {
  @Output() searchEvent = new Subject<ISearchModel>();

  public value: ISearchModel = {
    search: '',
    type: ''
  };

  public searchValue = new Subject<string>();

  constructor() {
    this.searchValue.subscribe((value) => {
      this.value.search = value;
      this.searchEvent.next(this.value);
    });
  }
}

import { AfterViewInit, Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { PageIndex, PageSize, PageSizeOptions } from '../../../constants';

@Component({
  selector: 'atom-paginator',
  standalone: true,
  imports: [MatPaginator],
  template: `
      <mat-paginator #paginator
      [color]="'warn'"
      (page)="onPageEvent.emit($event)"
      [length]="length"
      [pageSizeOptions]="pageSizeOptions"
      [pageSize]="pageSizeDefault"
      [pageIndex]="pageIndex"></mat-paginator>
    `,
})
export class AtomPaginatorComponent implements AfterViewInit {
  @Input({ required: true }) length = 0;
  @Output() onPageEvent = new EventEmitter<PageEvent>();
  @Output() onPaginator = new EventEmitter<MatPaginator>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  public pageSizeOptions = PageSizeOptions;
  public pageSizeDefault = PageSize;
  public pageIndex = PageIndex;

  constructor() { }

  ngAfterViewInit(): void {
    this.onPaginator.emit(this.paginator);
  }
}

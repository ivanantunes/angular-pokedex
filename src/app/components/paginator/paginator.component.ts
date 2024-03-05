import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { PageIndex, PageSize, PageSizeOptions } from 'src/app/constants';

@Component({
  selector: 'app-paginator',
  template: `
      <mat-paginator #paginator
      (page)="onPageEvent.emit($event)"
      [length]="length"
      [pageSizeOptions]="pageSizeOptions"
      [pageSize]="pageSizeDefault"
      [pageIndex]="pageIndex"></mat-paginator>
    `,
  standalone: true,
  imports: [MatPaginator]
})
export class PaginatorComponent implements AfterViewInit {
  @Input() length = 0;
  @Output() onPageEvent = new EventEmitter<PageEvent>()
  @Output() onPaginator = new EventEmitter<MatPaginator>()

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  public pageSizeOptions = PageSizeOptions;
  public pageSizeDefault = PageSize;
  public pageIndex = PageIndex;

  constructor() { }

  ngAfterViewInit(): void {
    this.onPaginator.emit(this.paginator);
  }
}

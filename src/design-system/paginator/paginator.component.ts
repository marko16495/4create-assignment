import {NgIf, AsyncPipe, DecimalPipe} from '@angular/common';
import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  OnInit,
  InjectionToken,
  Inject
} from '@angular/core';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {startWith, skip, Observable, of} from 'rxjs';
import {FabComponent} from '../fab/fab.component';
import {InterpolatePipe} from '../interpolate/interpolate.pipe';
import {SelectComponent} from '../select/select.component';

const DEFAULT_PAGE_SIZE_OPTIONS = [5, 10, 20];

export class PaginatorValue {
  constructor(
    /** Page index, starting from **1** */
    public index: number,
    /** Page size */
    public size: number,
  ) {
  }

  equals(paginatorValue: PaginatorValue): boolean {
    return this.index === paginatorValue.index && this.size === paginatorValue.size;
  }

  clone(): PaginatorValue {
    return new PaginatorValue(this.index, this.size);
  }

}

export interface PaginatorComponentIntl {
  totalItems: string;
  itemsPerPage: string;
  pageXofN: string;
  firstPage: string,
  previousPage: string,
  nextPage: string;
  lastPage: string;
}

export const DS_PAGINATOR_INTL = new InjectionToken<Observable<PaginatorComponentIntl>>('DS_PAGINATOR_INTL', {
  providedIn: 'root',
  factory: () => of({
    totalItems: 'Total items',
    itemsPerPage: 'Items per page',
    pageXofN: 'Page {{x}} of {{n}}',
    firstPage: 'First page',
    previousPage: 'Previous page',
    nextPage: 'Next page',
    lastPage: 'Last page'
  }),
});

@Component({
  selector: 'ds-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss'],
  imports: [
    ReactiveFormsModule,
    SelectComponent,
    FabComponent,
    NgIf,
    AsyncPipe,
    InterpolatePipe,
    DecimalPipe,
    SelectComponent
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PaginatorComponent implements OnInit {

  @Input() set totalElements(value: number | null) {
    if (typeof value !== 'number') {
      value = 0;
    }
    if (isNaN(value)) {
      value = 0;
    }
    this._totalElements = value;
    this._updateNumberOfPages();
    this._updateFirstAndLastItemIndex();
  }

  /** Total number of element across all pages */
  get totalElements(): number {
    return this._totalElements;
  }

  @Input() showItemsPerPage = true;
  @Input() showTotalElements = true;

  /** Array of page size options. If not provided {@link DEFAULT_PAGE_SIZE_OPTIONS} will be used */
  @Input() pageSizeOptions: number[] = DEFAULT_PAGE_SIZE_OPTIONS;
  /** Emits {@link PaginatorValue} object each time page index or page size changes */
  @Output() pageChange = new EventEmitter<PaginatorValue>();
  /** Total number of pages */
  numberOfPages = 1;
  /** Index (in the array of all elements) of the first element in the table */
  firstItemIndex = 0;
  /** Index (in the array of all elements) of the last element in the table */
  lastItemIndex = 0;
  /** Object representing current state of the paginator */
  paginatorValue = new PaginatorValue(1, 10);
  /** FormControl for changing size of the paginator */
  pageSizeControl = new FormControl<string>(this.paginatorValue.size.toString());

  private _totalElements = 0;
  private previousPage = new PaginatorValue(1, 10);

  constructor(@Inject(DS_PAGINATOR_INTL) public paginatorIntl$: Observable<PaginatorComponentIntl>) {
  }

  ngOnInit() {
    this.pageSizeControl.valueChanges
      .pipe(
        startWith(this.pageSizeControl.value),
        skip(1),
      )
      .subscribe(this._onPageSizeValueChange);
  }

  /** Decrement page index */
  previous() {
    this.paginatorValue.index--;
    this._updateFirstAndLastItemIndex();
    this._emitPageChange();
  }

  /** Increment page index */
  next() {
    this.paginatorValue.index++;
    this._updateFirstAndLastItemIndex();
    this._emitPageChange();
  }

  /** Set page index to 1 */
  first() {
    this.paginatorValue.index = 1;
    this._updateFirstAndLastItemIndex();
    this._emitPageChange();
  }

  /** Set page index to {@link numberOfPages} */
  last() {
    this.paginatorValue.index = this.numberOfPages;
    this._updateFirstAndLastItemIndex();
    this._emitPageChange();
  }

  /** This function is called each time user changes page size */
  private _onPageSizeValueChange = (pageSize: string | null) => {
    this.paginatorValue.size =  +pageSize!;
    this._updateNumberOfPages();
    if (this.numberOfPages < this.paginatorValue.index) {
      this.paginatorValue.index = this.numberOfPages;
      this._updateFirstAndLastItemIndex();
    } else {
      this.paginatorValue.index = Math.max(Math.ceil(this.firstItemIndex / this.paginatorValue.size), 1);
      this._updateFirstAndLastItemIndex();
    }
    this._emitPageChange();
  }

  private _emitPageChange() {
    if (!this.paginatorValue.equals(this.previousPage)) {
      this.pageChange.emit(this.paginatorValue.clone());
      this.previousPage = this.paginatorValue.clone();
    }
  }

  private _updateNumberOfPages() {
    this.numberOfPages = Math.max(Math.ceil(this._totalElements / this.paginatorValue.size), 1);
  }

  private _updateFirstAndLastItemIndex() {
    if (this.totalElements > 0) {
      this.firstItemIndex = (this.paginatorValue.size * this.paginatorValue.index) - this.paginatorValue.size + 1;
      this.lastItemIndex = Math.min(this.firstItemIndex + this.paginatorValue.size - 1, this.totalElements);
    } else {
      this.firstItemIndex = 0;
      this.lastItemIndex = 0;
    }
  }

}

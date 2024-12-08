import {CommonModule} from '@angular/common';
import {
  Component,
  ContentChildren,
  Input,
  QueryList,
  TemplateRef,
  OnDestroy,
  AfterContentInit,
  ElementRef,
  SimpleChanges,
  OnChanges,
  OnInit,
  TrackByFunction
} from '@angular/core';
import {Subscription, startWith} from 'rxjs';
import {FabComponent} from '../fab/fab.component';
import {ToggleDirective} from '../toggle/toggle.directive';
import {DsComponentSize} from '../types';
import {TableCellDirective} from './table-cell.directive';
import {TableColumns} from './table-column';
import {TableHeaderCellDirective} from './table-header-cell.directive';

@Component({
  selector: 'ds-table',
  imports: [CommonModule, FabComponent, ToggleDirective],
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnDestroy, AfterContentInit, OnChanges, OnInit {
  @Input() columns: TableColumns | null = [];
  @Input() data: any[] | null = [];
  @Input() size: DsComponentSize = 'md';

  @Input() trackRowsBy: TrackByFunction<any> = (index: number, item) => item;

  @ContentChildren(TableCellDirective)
  private tableCells: QueryList<TableCellDirective> | undefined;

  @ContentChildren(TableHeaderCellDirective)
  private tableHeaderCells: QueryList<TableHeaderCellDirective> | undefined;

  tableCellRefs: { [key: string]: TemplateRef<any> } = {};
  tableHeaderCellRefs: { [key: string]: TemplateRef<any> } = {};

  private _sizeClass = this._getSizeClass(this.size);
  private _subscriptions: Subscription[] = [];

  constructor(private _elementRef: ElementRef<HTMLElement>) {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['size']) {
      this._updateSizeClass();
    }
  }

  ngOnInit() {
    this._updateSizeClass();
  }

  ngAfterContentInit() {
    this._subscribeToTableCellChanges();
    this._subscribeToTableHeaderCellChanges();
  }

  ngOnDestroy() {
    this._subscriptions.forEach(s => s.unsubscribe());
  }

  private _subscribeToTableCellChanges() {
    const sub = this.tableCells!.changes.pipe(startWith(null))
      .subscribe(() => {
        this.tableCellRefs = {};
        this.tableCells?.toArray().forEach(cell => {
          this.tableCellRefs[cell.columnName] = cell.templateRef;
        });
      });
    this._subscriptions.push(sub);
  }

  private _subscribeToTableHeaderCellChanges() {
    const sub = this.tableHeaderCells!.changes.pipe(startWith(null))
      .subscribe(() => {
        this.tableHeaderCellRefs = {};
        this.tableHeaderCells?.toArray().forEach(cell => {
          this.tableHeaderCellRefs[cell.columnName] = cell.templateRef;
        });
      });
    this._subscriptions.push(sub);
  }

  private _updateSizeClass() {
    this._getHostElement().classList.remove(this._sizeClass);
    this._sizeClass = this._getSizeClass(this.size);
    this._getHostElement().classList.add(this._sizeClass);
  }

  private _getSizeClass(size: DsComponentSize): string {
    return `ds-table-size-${size}`;
  }

  private _getHostElement() {
    return this._elementRef.nativeElement
  }

}

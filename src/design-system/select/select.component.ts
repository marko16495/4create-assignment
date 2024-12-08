import {CommonModule} from '@angular/common';
import {Component, Input, ElementRef, SimpleChanges, OnInit, OnChanges, ViewEncapsulation} from '@angular/core';
import {DsComponentSize} from '../types';

@Component({
  selector: 'select[ds-select]',
  imports: [CommonModule],
  template: '<ng-content></ng-content>',
  styleUrls: ['./select.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SelectComponent implements OnInit, OnChanges {

  @Input() size: DsComponentSize = 'md';

  private _sizeClass = this._getSizeClass(this.size);

  constructor(private _elementRef: ElementRef<HTMLSelectElement>) {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['size']) {
      this._updateSizeClass();
    }
  }

  ngOnInit() {
    this._updateSizeClass();
  }

  private _updateSizeClass(): void {
    this._getHostElement().classList.remove(this._sizeClass);
    this._sizeClass = this._getSizeClass(this.size);
    this._getHostElement().classList.add(this._sizeClass);
  }

  private _getSizeClass(size: DsComponentSize): string {
    return `ds-select-size-${size}`;
  }

  private _getHostElement(): HTMLSelectElement {
    return this._elementRef.nativeElement
  }

}

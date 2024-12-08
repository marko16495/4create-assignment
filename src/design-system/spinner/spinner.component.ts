import {CommonModule} from '@angular/common';
import {Component, Input, ElementRef, SimpleChanges, OnInit, OnChanges} from '@angular/core';
import {DsComponentSize} from '../types';

@Component({
  selector: 'ds-spinner',
  imports: [CommonModule],
  template: '',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements OnInit, OnChanges {

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
    return `ds-spinner-size-${size}`;
  }

  private _getHostElement(): HTMLSelectElement {
    return this._elementRef.nativeElement
  }

}

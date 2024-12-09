import {CommonModule} from '@angular/common';
import {Component, OnInit, OnChanges, Input, ElementRef, SimpleChanges, inject} from '@angular/core';
import {DsComponentSize} from '../types';

@Component({
  selector: 'input[type="checkbox"][ds-checkbox]',
  imports: [CommonModule],
  template: '',
  styleUrls: ['./checkbox.component.scss']
})
export class CheckboxComponent implements OnInit, OnChanges {

  @Input() size: DsComponentSize = 'md';

  private _sizeClass = this._getSizeClass(this.size);

  private _elementRef = inject(ElementRef<HTMLInputElement>);

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
    return `ds-checkbox-size-${size}`;
  }

  private _getHostElement(): HTMLInputElement {
    return this._elementRef.nativeElement
  }

}

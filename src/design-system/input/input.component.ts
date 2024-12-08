import {
  Component,
  ChangeDetectionStrategy,
  Input,
  HostBinding,
  SimpleChanges,
  OnInit,
  OnChanges,
  ElementRef
} from '@angular/core';
import {DsComponentSize} from '../types';

@Component({
  selector: 'input[ds-input]',
  template: '',
  styleUrls: ['./input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InputComponent implements OnInit, OnChanges {

  @Input() @HostBinding('autocomplete') autocomplete: 'on' | 'off' = 'off';
  @Input() size: DsComponentSize = 'md';

  private _sizeClass = this._getSizeClass(this.size);

  constructor(private _elementRef: ElementRef<HTMLInputElement>) { }

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
    return `ds-input-size-${size}`;
  }

  private _getHostElement(): HTMLInputElement {
    return this._elementRef.nativeElement
  }

}

import {
  Component,
  Input,
  ElementRef,
  SimpleChanges,
  OnChanges,
  OnInit,
  ChangeDetectionStrategy,
  ViewEncapsulation
} from '@angular/core';
import {DsComponentSize, DsComponentColor} from '../types';

@Component({
  selector: 'button[ds-fab], button[ds-ghost-fab]',
  template: '<ng-content></ng-content>',
  styleUrls: ['./fab.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    '[attr.disabled]': 'disabled || null'
  }
})
export class FabComponent implements OnChanges, OnInit {

  @Input() disabled = false;

  @Input() color: DsComponentColor = 'primary';

  @Input() size: DsComponentSize = 'md';

  private _colorClass = this._getColorClass(this.color);

  private _sizeClass = this._getSizeClass(this.size);

  constructor(private _elementRef: ElementRef<HTMLButtonElement>) {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['color']) {
      this._updateColorClass();
    }
    if (changes['size']) {
      this._updateSizeClass();
    }
  }

  ngOnInit() {
    this._updateColorClass();
    this._updateSizeClass();
  }

  private _updateColorClass() {
    this._getHostElement().classList.remove(this._colorClass);
    this._colorClass = this._getColorClass(this.color);
    this._getHostElement().classList.add(this._colorClass);
  }

  private _updateSizeClass() {
    this._getHostElement().classList.remove(this._sizeClass);
    this._sizeClass = this._getSizeClass(this.size);
    this._getHostElement().classList.add(this._sizeClass);
  }

  private _getSizeClass(size: DsComponentSize): string {
    return `ds-fab-size-${size}`;
  }

  private _getColorClass(color: DsComponentColor): string {
    return `ds-fab-color-${color}`;
  }

  private _getHostElement() {
    return this._elementRef.nativeElement
  }

}

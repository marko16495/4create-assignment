import {
  Component,
  Input,
  ElementRef,
  SimpleChanges,
  OnChanges,
  OnInit,
  ChangeDetectionStrategy,
  ViewEncapsulation, HostBinding
} from '@angular/core';
import {DsComponentSize, DsComponentColor} from '../types';

const BUTTON_HOST_ATTRIBUTES = [
  'ds-button',
  'ds-stroked-button',
  'ds-ghost-button',
];

@Component({
  selector: 'button[ds-button], button[ds-stroked-button], button[ds-ghost-button]',
  template: '<ng-content></ng-content>',
  styleUrls: ['./button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  host: {
    '[attr.disabled]': 'disabled || null'
  }
})
export class ButtonComponent implements OnChanges, OnInit {

  @Input() disabled = false;

  @Input() color: DsComponentColor = 'primary';

  @Input() size: DsComponentSize = 'md';

  @Input() @HostBinding('class.ds-button-round-borders') roundBorders = true;

  private _colorClass = this._getColorClass(this.color);

  private _sizeClass = this._getSizeClass(this.size);

  constructor(private _elementRef: ElementRef<HTMLButtonElement>) {
    BUTTON_HOST_ATTRIBUTES.forEach(attr => {
      if (this._hasHostAttribute(attr)) {
        this._getHostElement().classList.add(attr);
      }
    });
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
    return `ds-button-size-${size}`;
  }

  private _getColorClass(color: DsComponentColor): string {
    return `ds-button-color-${color}`;
  }

  private _hasHostAttribute(attr: string) {
    return this._elementRef.nativeElement.hasAttribute(attr);
  }

  private _getHostElement() {
    return this._elementRef.nativeElement
  }

}

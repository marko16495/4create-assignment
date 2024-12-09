import {
  Component,
  Input,
  SimpleChanges,
  OnChanges,
  OnInit,
  ElementRef,
  Output,
  EventEmitter,
  inject
} from '@angular/core';
import {FabComponent} from '../../fab/fab.component';
import {DsComponentColor} from '../../types';

@Component({
  selector: 'ds-dialog-header',
  imports: [FabComponent],
  templateUrl: './dialog-header.component.html',
  styleUrls: ['./dialog-header.component.scss']
})
export class DialogHeaderComponent implements OnInit, OnChanges {

  @Input() label = '';

  @Input() color: DsComponentColor = 'primary';

  @Output() closeButtonClick = new EventEmitter<void>();

  private _elementRef = inject(ElementRef<HTMLElement>);

  private _colorClass = this._getColorClass(this.color);

  ngOnChanges(changes: SimpleChanges) {
    if (changes['color']) {
      this._updateColorClass();
    }
  }

  ngOnInit() {
    this._updateColorClass();
  }

  private _updateColorClass() {
    this._getHostElement().classList.remove(this._colorClass);
    this._colorClass = this._getColorClass(this.color);
    this._getHostElement().classList.add(this._colorClass);
  }

  private _getColorClass(color: DsComponentColor): string {
    return `ds-dialog-header-color-${color}`;
  }

  private _getHostElement() {
    return this._elementRef.nativeElement
  }

}

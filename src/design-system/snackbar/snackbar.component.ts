import {CommonModule} from '@angular/common';
import {
  Component,
  Input,
  ElementRef,
  SimpleChanges,
  OnInit,
  OnChanges,
  EventEmitter,
  Output,
  inject
} from '@angular/core';
import {FabComponent} from '../fab/fab.component';
import {DsComponentColor} from '../types';

@Component({
  selector: 'ds-snackbar',
  imports: [CommonModule, FabComponent, FabComponent],
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.scss']
})
export class SnackbarComponent implements OnInit, OnChanges {

  @Input() text?: string;
  @Input() color: DsComponentColor = 'primary';

  @Output() dismiss = new EventEmitter<void>();

  private _colorClass = this._getColorClass(this.color);

  private _elementRef = inject(ElementRef<HTMLElement>);

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
    return `ds-snackbar-color-${color}`;
  }

  private _getHostElement() {
    return this._elementRef.nativeElement
  }
}

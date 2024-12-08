import {Component, ChangeDetectionStrategy, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'ds-form-field',
  templateUrl: './form-field.component.html',
  styleUrls: ['./form-field.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormFieldComponent { }

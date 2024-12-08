import {NgIf, AsyncPipe} from '@angular/common';
import {Component, Input} from '@angular/core';
import {FormControl} from '@angular/forms';
import {FormControlErrorPipe} from './form-control-error.pipe';

@Component({
  selector: 'app-form-control-error[control]',
  standalone: true,
  imports: [FormControlErrorPipe, NgIf, AsyncPipe],
  templateUrl: './form-control-error.component.html',
})
export class FormControlErrorComponent {
  @Input() control!: FormControl;

  errorMessages: Record<string, string> = {
    required: 'Input is required',
    taken: 'Value is taken',
  }

}

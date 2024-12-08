import {DialogRef} from '@angular/cdk/dialog';
import {Component, OnDestroy, inject} from '@angular/core';
import {FormGroup, FormControl, Validators, ReactiveFormsModule} from '@angular/forms';
import {Subject} from 'rxjs';
import {ButtonComponent} from '../../../../design-system/button/button.component';
import {CheckboxComponent} from '../../../../design-system/checkbox/checkbox.component';
import {DialogActionsComponent} from '../../../../design-system/dialog/dialog-actions/dialog-actions.component';
import {DialogHeaderComponent} from '../../../../design-system/dialog/dialog-header/dialog-header.component';
import {ErrorComponent} from '../../../../design-system/error/error.component';
import {FormFieldComponent} from '../../../../design-system/form-field/form-field.component';
import {InputComponent} from '../../../../design-system/input/input.component';
import {CreateUserDto} from '../../../models/create-user.dto';
import {UserValidators} from '../../../validators/user.validators';
import {FormControlErrorComponent} from '../../form-control-error/form-control-error.component';

@Component({
  imports: [
    ReactiveFormsModule,
    FormFieldComponent,
    FormControlErrorComponent,
    ButtonComponent,
    InputComponent,
    ErrorComponent,
    DialogHeaderComponent,
    DialogActionsComponent,
    DialogHeaderComponent,
    DialogActionsComponent,
    ButtonComponent,
    CheckboxComponent,
    FormControlErrorComponent,
  ],
  templateUrl: './user-create-dialog.component.html',
  styleUrls: ['./user-create-dialog.component.scss'],
})
export class UserCreateDialogComponent implements OnDestroy {

  private _userValidators = inject(UserValidators);

  form = new FormGroup({
    name: new FormControl<string>('', [Validators.required], [this._userValidators.availableName(null)]),
    active: new FormControl<boolean>(false),
  });

  submit$ = new Subject<CreateUserDto>();

  constructor(private _dialogRef: DialogRef) { }

  close() {
    this._dialogRef.close();
  }

  submit() {
    this.form.markAllAsTouched();
    this.submit$.next({
      name: this.form.value.name!,
      active: this.form.value.active!
    });
  }

  ngOnDestroy() {
    this.submit$.complete();
  }

}

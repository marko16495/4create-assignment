import {DIALOG_DATA, DialogRef} from '@angular/cdk/dialog';
import {Component, Inject, OnInit, OnDestroy, inject} from '@angular/core';
import {FormGroup, FormControl, Validators, ReactiveFormsModule} from '@angular/forms';
import {Subject} from 'rxjs';
import {ButtonComponent} from '../../../../design-system/button/button.component';
import {CheckboxComponent} from '../../../../design-system/checkbox/checkbox.component';
import {DialogActionsComponent} from '../../../../design-system/dialog/dialog-actions/dialog-actions.component';
import {DialogHeaderComponent} from '../../../../design-system/dialog/dialog-header/dialog-header.component';
import {ErrorComponent} from '../../../../design-system/error/error.component';
import {FormFieldComponent} from '../../../../design-system/form-field/form-field.component';
import {InputComponent} from '../../../../design-system/input/input.component';
import {UpdateUserDto} from '../../../models/update-user.dto';
import {UserDto} from '../../../models/user-dto';
import {UserValidators} from '../../../validators/user.validators';
import {FormControlErrorComponent} from '../../form-control-error/form-control-error.component';

@Component({
  selector: 'app-user-edit-dialog',
  imports: [
    ReactiveFormsModule,
    FormFieldComponent,
    FormControlErrorComponent,
    ErrorComponent,
    InputComponent,
    ButtonComponent,
    DialogHeaderComponent,
    DialogActionsComponent,
    CheckboxComponent,
  ],
  templateUrl: './user-edit-dialog.component.html',
  styleUrls: ['./user-edit-dialog.component.scss'],
})
export class UserEditDialogComponent implements OnInit, OnDestroy {

  private _userValidators = inject(UserValidators);

  form = new FormGroup({
    name: new FormControl<string>('', [Validators.required]),
    active: new FormControl<boolean>(false),
  });

  submit$ = new Subject<UpdateUserDto>();

  constructor(
    @Inject(DIALOG_DATA) public userDto: UserDto,
    private _dialogRef: DialogRef,
  ) {
  }

  close() {
    this._dialogRef.close();
  }

  ngOnInit() {
    this.form.setValue({
      name: this.userDto.name,
      active: this.userDto.active
    });
    this.form.controls.name.setAsyncValidators([
      this._userValidators.availableName(this.userDto.id)
    ]);
  }

  ngOnDestroy() {
    this.submit$.complete();
  }

  submit() {
    this.form.markAllAsTouched();
    this.submit$.next({
      id: this.userDto.id,
      name: this.form.value.name!,
      active: this.form.value.active!
    });
  }

}

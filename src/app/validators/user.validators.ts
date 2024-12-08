import {Injectable, inject} from '@angular/core';
import {AsyncValidatorFn, ValidationErrors, AbstractControl} from '@angular/forms';
import {Observable, map, of} from 'rxjs';
import {UserService} from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class UserValidators {

  private _userService = inject(UserService);

  availableName(userId: number | null): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      if (!control.value) {
        return of(null);
      }
      return this._userService.isNameTakenByAnotherUser(control.value, userId)
        .pipe(map(isTaken => isTaken ? {taken: true} : null))
    }
  }

}

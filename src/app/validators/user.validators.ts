import {Injectable, inject} from '@angular/core';
import {AsyncValidatorFn, ValidationErrors, AbstractControl} from '@angular/forms';
import {Observable, map, of} from 'rxjs';
import {UsersStore} from '../state/users-store';

@Injectable({
  providedIn: 'root'
})
export class UserValidators {

  private _usersStore = inject(UsersStore);

  availableName(): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      if (!control.value) {
        return of(null);
      }
      return this._usersStore.findUserByName(control.value).pipe(
        map(user => !!user ? {taken: true} : null),
      )
    }
  }

}

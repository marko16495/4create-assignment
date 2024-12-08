import {PipeTransform, Pipe} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable, map, combineLatest, startWith} from 'rxjs';

@Pipe({
  name: 'appFormControlError$',
  standalone: true
})
export class FormControlErrorPipe implements PipeTransform {

  transform(control: FormControl): Observable<{key: string, value: any} | undefined> {
    return combineLatest([control.valueChanges, control.statusChanges]).pipe(
      startWith(null),
      map(() => {
        const errors = control.errors;
        if (!errors) {
          return undefined;
        }
        const key = Object.keys(control.errors)[0];
        return {
          key: key,
          value: control.errors[key]
        }
      })
    )
  }

}

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'interpolate',
})
export class InterpolatePipe implements PipeTransform {

  transform(key: string, params: { [key: string]: any } = {}): string {
    const paramKeys = Object.keys(params);
    paramKeys.forEach(paramKey => {
      const regExp = new RegExp(`{{${paramKey}}}`, 'g');
      key = key.replace(regExp, params[paramKey].toString());
    });
    return key;
  }

}

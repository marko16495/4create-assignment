import {Component, ChangeDetectionStrategy} from '@angular/core';

@Component({
  selector: 'ds-error',
  template: '<ng-content></ng-content>',
  styleUrls: ['./error.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ErrorComponent { }

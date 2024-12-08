import {Directive, HostListener} from '@angular/core';

@Directive({
  selector: '[dsToggle]',
  exportAs: 'dsToggle'
})
export class ToggleDirective {

  visible = false;

  @HostListener('click') onClick() {
    this.visible = !this.visible;
  }

}

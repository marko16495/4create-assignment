import {Directive, Input, TemplateRef, inject} from '@angular/core';

@Directive({
  selector: '[dsTableHeaderCell]',
})
export class TableHeaderCellDirective {

  @Input('dsTableHeaderCell') columnName!: string;

  readonly templateRef = inject(TemplateRef<any>);

}


import {Directive, Input, TemplateRef} from '@angular/core';

@Directive({
  selector: '[dsTableHeaderCell]',
})
export class TableHeaderCellDirective {

  @Input('dsTableHeaderCell') columnName!: string;

  constructor(readonly templateRef: TemplateRef<any>) { }

}


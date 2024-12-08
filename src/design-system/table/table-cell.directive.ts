import {Directive, Input, TemplateRef} from '@angular/core';

@Directive({
  selector: '[dsTableCell]',
})
export class TableCellDirective {

  @Input('dsTableCell') columnName!: string;

  constructor(readonly templateRef: TemplateRef<any>) { }

}

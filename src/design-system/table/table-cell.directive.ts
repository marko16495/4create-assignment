import {Directive, Input, TemplateRef, inject} from '@angular/core';

@Directive({
  selector: '[dsTableCell]',
})
export class TableCellDirective {

  @Input('dsTableCell') columnName!: string;

  readonly templateRef = inject(TemplateRef<any>);

}

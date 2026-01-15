import { Directive, Input, TemplateRef } from '@angular/core';

@Directive({
	selector: '[p-table-custom-row]',
})
export class TableCustomRowDirective {
	@Input() variant: 'default' | 'secondary' | 'header' = 'default';

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	constructor(public templateRef: TemplateRef<any>) {}
}

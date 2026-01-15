import { Directive, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

import { BaseValueAccessor } from '../base';

@Directive({
	selector: 'p-pagination-pages',
	host: {
		'(pageChange)': 'handleChangeEvent($event.detail)',
	},
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => PaginationPagesDirective),
			multi: true,
		},
	],
})
export class PaginationPagesDirective extends BaseValueAccessor {
	public override writeValue(value: number) {
		this.el.nativeElement.page = this.lastValue = value == null ? 1 : value;
	}

	public override registerOnChange(fn: (_: number | null) => void) {
		super.registerOnChange(value => fn(Number.parseInt(value, 10)));
	}
}

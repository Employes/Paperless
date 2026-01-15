import { Directive, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

import { BaseValueAccessor } from '../base';

@Directive({
	selector: 'p-pagination-size',
	host: {
		'(sizeChange)': 'handleChangeEvent($event.detail)',
	},
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => PaginationSizeDirective),
			multi: true,
		},
	],
})
export class PaginationSizeDirective extends BaseValueAccessor {
	override writeValue(value: number) {
		this.el.nativeElement.page = this.lastValue = value == null ? 12 : value;
	}

	override registerOnChange(fn: (_: number | null) => void) {
		super.registerOnChange(value => fn(Number.parseInt(value, 10)));
	}
}

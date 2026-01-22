import { Directive } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

import { BaseValueAccessor } from '../base';

@Directive({
	selector: 'p-datepicker',
	host: {
		'(valueChange)': 'handleChangeEvent($event.detail)',
	},
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: PDatepickerDirective,
			multi: true,
		},
	],
})
export class PDatepickerDirective extends BaseValueAccessor {
	override writeValue(value: string | Date) {
		this.el.nativeElement.value = this.lastValue =
			value === null ? JSON.parse(value) : value;
	}
}

import { Directive } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

import { BaseValueAccessor } from '../base';

@Directive({
	selector: 'p-field:not([type=number])',
	host: {
		'(valueChange)': 'handleChangeEvent($event.detail)',
	},
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: PFieldDirective,
			multi: true,
		},
	],
})
export class PFieldDirective extends BaseValueAccessor {
	override writeValue(value: number) {
		this.el.nativeElement.value = this.lastValue =
			value === null ? JSON.parse(value) : value;
	}
}

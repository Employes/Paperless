import { Directive, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

import { BaseValueAccessor } from '../base';

@Directive({
	selector: 'p-select',
	host: {
		'(valueChange)': 'handleChangeEvent($event.detail)',
	},
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => SelectDirective),
			multi: true,
		},
	],
})
export class SelectDirective extends BaseValueAccessor {
	override writeValue(value: unknown) {
		this.el.nativeElement.value = this.lastValue = value;
	}
}

import { Directive } from '@angular/core';
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
			useExisting: PSelectDirective,
			multi: true,
		},
	],
})
export class PSelectDirective extends BaseValueAccessor {
	override writeValue(value: unknown) {
		this.el.nativeElement.value = this.lastValue = value;
	}
}

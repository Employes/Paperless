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
			useExisting: SelectDirective,
			multi: true,
		},
	],
	standalone: false,
})
export class SelectDirective extends BaseValueAccessor {
	override writeValue(value: unknown) {
		this.el.nativeElement.value = this.lastValue = value;
	}
}

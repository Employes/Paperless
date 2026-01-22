import { Directive } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

import { BaseValueAccessor } from '../base';

@Directive({
	selector: 'p-toggle',
	host: {
		'(checkedChange)': 'handleChangeEvent($event.detail)',
	},
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: PToggleDirective,
			multi: true,
		},
	],
})
export class PToggleDirective extends BaseValueAccessor {
	override writeValue(value: boolean) {
		this.el.nativeElement.checked = this.lastValue =
			value === null ? false : value;
	}
}

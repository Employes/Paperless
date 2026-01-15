import { Directive, forwardRef } from '@angular/core';
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
			useExisting: forwardRef(() => ToggleDirective),
			multi: true,
		},
	],
})
export class ToggleDirective extends BaseValueAccessor {
	override writeValue(value: boolean) {
		this.el.nativeElement.checked = this.lastValue =
			value === null ? false : value;
	}
}

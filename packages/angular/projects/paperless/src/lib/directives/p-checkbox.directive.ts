import { Directive } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

import { BaseValueAccessor } from '../base';

@Directive({
	selector: 'p-checkbox',
	host: {
		'(checkedChange)': 'handleChangeEvent($event.detail)',
	},
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: PCheckboxDirective,
			multi: true,
		},
	],
})
export class PCheckboxDirective extends BaseValueAccessor {
	override writeValue(value: boolean | 'indeterminate') {
		this.el.nativeElement.checked = this.lastValue =
			value === null || value === 'indeterminate' ? false : value;
		this.el.nativeElement.indeterminate = value === 'indeterminate';
	}
}

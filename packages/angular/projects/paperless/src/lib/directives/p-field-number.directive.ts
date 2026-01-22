import { Directive } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

import { BaseNumberValueAccessor } from '../base/number-value-accessor';

@Directive({
	selector: 'p-field[type=number]',
	host: {
		'(valueChange)': 'handleChangeEvent($event.detail)',
	},
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: PFieldNumberDirective,
			multi: true,
		},
	],
})
export class PFieldNumberDirective extends BaseNumberValueAccessor {}

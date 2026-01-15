import { Directive, forwardRef } from '@angular/core';
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
			useExisting: forwardRef(() => FieldNumberDirective),
			multi: true,
		},
	],
})
export class FieldNumberDirective extends BaseNumberValueAccessor {}

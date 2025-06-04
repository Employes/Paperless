import { Directive, ElementRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

import { BaseValueAccessor } from '../base';

@Directive({
	selector: 'p-field',
	host: {
		'(valueChange)': 'handleChangeEvent($event.detail)',
	},
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: FieldDirective,
			multi: true,
		},
	],
})
export class FieldDirective extends BaseValueAccessor {
	constructor(el: ElementRef) {
		super(el);
	}

	override handleChangeEvent(value: any) {
		console.log(this.lastValue, value);
		this.lastValue = value;
		this.onChange(value);
	}

	override writeValue(value: any) {
		value = value === null ? JSON.parse(value) : value;
		console.log(this.lastValue, value);
		this.el.nativeElement.value = value;
		this.lastValue = value;
	}
}

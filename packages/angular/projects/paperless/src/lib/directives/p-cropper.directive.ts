import { Directive } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

import { BaseValueAccessor } from '../base';

@Directive({
	selector: 'p-cropper',
	host: {
		'(valueChange)': 'handleChangeEvent($event.detail)',
	},
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: CropperDirective,
			multi: true,
		},
	],
	standalone: false,
})
export class CropperDirective extends BaseValueAccessor {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	override writeValue(value: any) {
		this.el.nativeElement.value = this.lastValue = value;
	}
}

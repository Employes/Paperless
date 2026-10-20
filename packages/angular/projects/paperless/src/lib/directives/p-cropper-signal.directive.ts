import { Directive } from '@angular/core';

import { BaseSignalValueControl } from '../base';

@Directive({
	selector: 'p-cropper[formField]',
})
export class PCropperSignalDirective extends BaseSignalValueControl<unknown> {
	protected override writeValue(value: unknown) {
		this.lastValue = value;
		this.el.nativeElement['value'] = value;
	}
}

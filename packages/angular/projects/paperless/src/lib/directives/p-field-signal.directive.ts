import { Directive } from '@angular/core';

import { BaseSignalValueControl } from '../base';

@Directive({
	selector: 'p-field:not([type=number])[formField]',
})
export class PFieldSignalDirective extends BaseSignalValueControl<number> {
	protected override writeValue(value: number) {
		this.el.nativeElement['value'] = this.lastValue =
			value === null ? JSON.parse(value) : value;
	}
}

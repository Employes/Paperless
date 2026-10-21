import { Directive } from '@angular/core';

import { BaseSignalValueControl } from '../base';

@Directive({
	selector: 'p-field:not([type=number])[formField]',
})
export class PFieldSignalDirective extends BaseSignalValueControl<string> {
	protected override writeValue(value: string) {
		this.el.nativeElement['value'] = this.lastValue =
			value === null ? JSON.parse(value) : value;
	}
}

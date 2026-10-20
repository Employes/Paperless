import { Directive } from '@angular/core';

import { BaseSignalValueControl } from '../base';

@Directive({
	selector: 'p-select[formField]',
})
export class PSelectSignalDirective extends BaseSignalValueControl<unknown> {
	protected override writeValue(value: unknown) {
		this.lastValue = value;
		this.el.nativeElement['value'] = value;
	}
}

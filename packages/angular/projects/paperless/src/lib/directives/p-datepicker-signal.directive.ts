import { Directive } from '@angular/core';

import { BaseSignalValueControl } from '../base';
import { isSameDay } from '../util/is-same-day';

@Directive({
	selector: 'p-datepicker[formField]',
})
export class PDatepickerSignalDirective extends BaseSignalValueControl<
	string | Date
> {
	protected override handleChangeEvent(value: Date) {
		if (isSameDay(this.lastValue, value)) {
			return;
		}

		super.handleChangeEvent(value);
	}

	protected override writeValue(value: string | Date) {
		this.el.nativeElement['value'] = this.lastValue =
			value === null ? JSON.parse(value) : value;
	}
}

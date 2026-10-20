import { Directive } from '@angular/core';

import { BaseSignalValueControl } from '../base';

@Directive({
	selector: 'p-pagination-size[formField]',
	host: {
		'(sizeChange)': 'handleChangeEvent($event.detail)',
	},
})
export class PPaginationSizeSignalDirective extends BaseSignalValueControl<number> {
	protected override writeValue(value: number) {
		this.el.nativeElement['page'] = this.lastValue = value == null ? 12 : value;
	}

	protected override handleChangeEvent(value: number) {
		const size = Number.parseInt(String(value), 10);
		if (size === this.lastValue) {
			return;
		}

		this.lastValue = size;
		this.value.set(size);
	}
}

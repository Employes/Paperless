import { Directive } from '@angular/core';

import { BaseSignalValueControl } from '../base';

@Directive({
	selector: 'p-pagination-pages[formField]',
	host: {
		'(pageChange)': 'handleChangeEvent($event.detail)',
	},
})
export class PPaginationPagesSignalDirective extends BaseSignalValueControl<number> {
	protected override writeValue(value: number) {
		this.el.nativeElement['page'] = this.lastValue = value == null ? 1 : value;
	}

	protected override handleChangeEvent(value: number) {
		const page = Number.parseInt(String(value), 10);
		if (page === this.lastValue) {
			return;
		}

		this.lastValue = page;
		this.value.set(page);
	}
}

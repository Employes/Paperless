import { Directive } from '@angular/core';

import { BaseSignalValueControl } from '../../../base';

export interface TableFooterSignalDirectiveValue {
	page: number;
	pageSize: number;
}

@Directive({
	selector: 'p-table-footer[formField]',
	host: {
		'(pageChange)': 'handleChange($event.detail, "page")',
		'(pageSizeChange)': 'handleChange($event.detail, "pageSize")',
	},
})
export class PTableFooterSignalDirective extends BaseSignalValueControl<TableFooterSignalDirectiveValue> {
	protected override writeValue(
		value: TableFooterSignalDirectiveValue | undefined
	) {
		const page = value?.page == null ? 1 : value.page;
		const pageSize = value?.pageSize == null ? 12 : value.pageSize;
		this.lastValue = { page, pageSize };
		this.el.nativeElement['page'] = page;
		this.el.nativeElement['pageSize'] = pageSize;
	}

	protected handleChange(value: number, type: 'page' | 'pageSize') {
		const base = this.lastValue ?? { page: 1, pageSize: 12 };
		this.handleChangeEvent({
			...base,
			[type]: value,
		});
	}
}

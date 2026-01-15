import { Directive } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

import { BaseValueAccessor } from '../../../base';

@Directive({
	selector: 'p-table-footer',
	host: {
		'(pageChange)': 'handleChange($event.detail, "page")',
		'(pageSizeChange)': 'handleChange($event.detail, "pageSize")',
	},
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: TableFooterDirective,
			multi: true,
		},
	],
	standalone: false,
})
export class TableFooterDirective extends BaseValueAccessor {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	protected override lastValue: any = {
		page: 1,
		pageSize: 12,
	};

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	public override writeValue(value: any) {
		this.el.nativeElement.page = this.lastValue.page =
			value?.page == null ? 1 : value?.page;
		this.el.nativeElement.pageSize = this.lastValue.pageSize =
			value?.pageSize == null ? 12 : value?.pageSize;
	}

	public handleChange(value: number, type: 'page' | 'pageSize') {
		this.handleChangeEvent({
			...this.lastValue,
			[type]: value,
		});
	}
}

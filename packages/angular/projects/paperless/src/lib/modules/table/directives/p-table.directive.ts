/* eslint-disable @typescript-eslint/no-explicit-any */
import { Directive } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

import { QuickFilter } from '@paperless/core';

import { BaseValueAccessor } from '../../../base';

export interface NGXTableDirectiveValue {
	query?: string;
	quickFilter?: QuickFilter;
	page?: number;
	pageSize?: number;
	selectedRows?: any[];
}

@Directive({
	selector: 'p-table',
	host: {
		'(queryChange)': 'handleChange($event.detail, "query")',
		'(quickFilter)': 'handleChange($event.detail, "quickFilter")',
		'(pageChange)': 'handleChange($event.detail, "page")',
		'(pageSizeChange)': 'handleChange($event.detail, "pageSize")',
		'(selectedRowsChange)': 'handleChange($event.detail, "selectedRows")',
	},
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: PTableDirective,
			multi: true,
		},
	],
})
export class PTableDirective extends BaseValueAccessor {
	protected override lastValue: NGXTableDirectiveValue = {
		query: '',
		quickFilter: undefined,
		page: 1,
		pageSize: 12,
		selectedRows: [],
	};

	public override writeValue(value: NGXTableDirectiveValue) {
		this.el.nativeElement.query = this.lastValue.query = value?.query;
		this.lastValue.quickFilter = value?.quickFilter;

		this.el.nativeElement.page = this.lastValue.page =
			value?.page == null ? 1 : value?.page;
		this.el.nativeElement.pageSize = this.lastValue.pageSize =
			value?.pageSize == null ? 12 : value?.pageSize;

		this.lastValue.selectedRows =
			value?.selectedRows == null ? [] : value?.selectedRows;

		if (value?.quickFilter) {
			this._setActiveQuickFilter(value.quickFilter);
		}
	}

	public override registerOnChange(fn: (value: any) => void) {
		this.onChange = fn;
	}

	public override registerOnTouched(fn: () => void) {
		this.onTouched = fn;
	}

	public handleChange(
		value: number | string | QuickFilter,
		type: 'page' | 'pageSize' | 'query' | 'quickFilter' | 'selectedRows'
	) {
		this.handleChangeEvent({
			...this.lastValue,
			[type]: value,
		});

		if (type === 'quickFilter' && typeof value === 'object') {
			this._setActiveQuickFilter(value);
		}
	}

	private _setActiveQuickFilter(quickFilter: QuickFilter) {
		this.el.nativeElement.activeQuickFilterIdentifier = quickFilter?.identifier;
	}
}

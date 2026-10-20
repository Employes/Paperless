import { Directive } from '@angular/core';

import { QuickFilter } from '@paperless/core';

import { BaseSignalValueControl } from '../../../base';

import { NGXTableDirectiveValue } from './p-table.directive';

@Directive({
	selector: 'p-table[formField]',
	host: {
		'(queryChange)': 'handleChange($event.detail, "query")',
		'(quickFilter)': 'handleChange($event.detail, "quickFilter")',
		'(pageChange)': 'handleChange($event.detail, "page")',
		'(pageSizeChange)': 'handleChange($event.detail, "pageSize")',
		'(selectedRowsChange)': 'handleChange($event.detail, "selectedRows")',
	},
})
export class PTableSignalDirective extends BaseSignalValueControl<NGXTableDirectiveValue> {
	protected override writeValue(value: NGXTableDirectiveValue | undefined) {
		const page = value?.page == null ? 1 : value.page;
		const pageSize = value?.pageSize == null ? 12 : value.pageSize;
		const selectedRows = value?.selectedRows == null ? [] : value.selectedRows;

		this.lastValue = {
			query: value?.query,
			quickFilter: value?.quickFilter,
			page,
			pageSize,
			selectedRows,
		};

		this.el.nativeElement['query'] = value?.query;
		this.el.nativeElement['page'] = page;
		this.el.nativeElement['pageSize'] = pageSize;

		if (value?.quickFilter) {
			this.el.nativeElement['activeQuickFilterIdentifier'] =
				value.quickFilter.identifier;
		}
	}

	protected handleChange(
		value: number | string | QuickFilter,
		type: 'page' | 'pageSize' | 'query' | 'quickFilter' | 'selectedRows'
	) {
		const base: NGXTableDirectiveValue = this.lastValue ?? {
			query: '',
			quickFilter: undefined,
			page: 1,
			pageSize: 12,
			selectedRows: [],
		};
		this.handleChangeEvent({
			...base,
			[type]: value,
		});

		if (type === 'quickFilter' && typeof value === 'object') {
			this.el.nativeElement['activeQuickFilterIdentifier'] = value?.identifier;
		}
	}
}

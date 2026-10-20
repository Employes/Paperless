import { Directive, inject } from '@angular/core';

import { QuickFilter } from '@paperless/core';

import { BaseSignalValueControl } from '../../../base';
import { TableComponent } from '../components/table/table.component';

import { TableDirectiveValue } from './p-table-ngx.directive';

@Directive({
	selector: 'p-table-ngx[formField]',
	host: {
		'(queryChange)': 'handleChange($event, "query")',
		'(quickFilter)': 'handleChange($event, "quickFilter")',
		'(pageChange)': 'handleChange($event, "page")',
		'(pageSizeChange)': 'handleChange($event, "pageSize")',
		'(selectedRowsChange)': 'handleChange($event, "selectedRows")',
	},
})
export class PTableNgxSignalDirective extends BaseSignalValueControl<TableDirectiveValue> {
	private _base = inject(TableComponent, {
		host: true,
	});

	protected override writeValue(value: TableDirectiveValue | undefined) {
		const page = value?.page == null ? 1 : value.page;
		const pageSize = value?.pageSize == null ? 12 : value.pageSize;
		const selectedRows = value?.selectedRows == null ? [] : value.selectedRows;

		this.lastValue = {
			query: value?.query,
			quickFilter: value?.quickFilter,
			filters: value?.filters,
			page,
			pageSize,
			selectedRows,
		};

		this._base.query = value?.query;
		this._base.page = page;
		this._base.pageSize = pageSize;
		this._base.selectedRows = selectedRows;

		if (value?.quickFilter) {
			this._base.activeQuickFilterIdentifier = value.quickFilter.identifier;
		}

		this._base.selectedFiltersAmount =
			!value?.filters || value.filters.length === 0
				? undefined
				: value.filters.length;

		this._checkEmptyStateType();
		this._checkResetButtons();
	}

	protected handleChange(
		event: Event,
		type: 'page' | 'pageSize' | 'query' | 'quickFilter' | 'selectedRows'
	) {
		// The TableComponent emits the raw value directly (not a CustomEvent), unlike the
		// stencil web components the other directives bind to.
		const value = event as unknown as number | string | QuickFilter;
		const base: TableDirectiveValue = this.lastValue ?? {
			query: '',
			quickFilter: undefined,
			filters: [],
			page: 1,
			pageSize: 12,
			selectedRows: [],
		};
		this.handleChangeEvent({
			...base,
			[type]: value,
		});

		if (type === 'quickFilter' && typeof value === 'object') {
			this._base.activeQuickFilterIdentifier = value?.identifier;
		}

		this._checkEmptyStateType();
		this._checkResetButtons();
	}

	private _checkEmptyStateType() {
		if (
			this.lastValue?.query?.length ||
			(this.lastValue?.quickFilter && !this.lastValue.quickFilter?.default) ||
			(this._base.selectedFiltersAmount &&
				this._base.selectedFiltersAmount > 0) ||
			this.lastValue?.filters?.length
		) {
			this._base.emptyStateType = 'filtered';
			return;
		}

		this._base.emptyStateType = 'no_filter';
	}

	private _checkResetButtons() {
		const activeQuickFilter = this.lastValue?.quickFilter;
		const selectedFiltersAmount = this._base.selectedFiltersAmount;

		if (activeQuickFilter || selectedFiltersAmount) {
			this._base.filterModalShowReset =
				selectedFiltersAmount && selectedFiltersAmount > 0 ? true : false;

			this._base.filterModalShowResetMobile =
				(selectedFiltersAmount && selectedFiltersAmount > 0) ||
				!activeQuickFilter?.default
					? true
					: false;
		}
	}
}

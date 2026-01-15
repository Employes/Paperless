/* eslint-disable @typescript-eslint/no-explicit-any */
import { Directive, ElementRef, Host } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

import { QuickFilter } from '@paperless/core';

import { BaseValueAccessor } from '../../../base';
import { TableComponent } from '../components/table/table.component';

export interface TableDirectiveValue {
	query?: string;
	quickFilter?: QuickFilter;
	filters?: any[];
	page?: number;
	pageSize?: number;
	selectedRows?: any[];
}

@Directive({
	selector: 'p-table-ngx',
	host: {
		'(queryChange)': 'handleChange($event, "query")',
		'(quickFilter)': 'handleChange($event, "quickFilter")',
		'(pageChange)': 'handleChange($event, "page")',
		'(pageSizeChange)': 'handleChange($event, "pageSize")',
		'(selectedRowsChange)': 'handleChange($event, "selectedRows")',
	},
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: TableNgxDirective,
			multi: true,
		},
	],
	standalone: false,
})
export class TableNgxDirective extends BaseValueAccessor {
	protected override lastValue: TableDirectiveValue = {
		query: '',
		quickFilter: undefined,
		filters: [],
		page: 1,
		pageSize: 12,
		selectedRows: [],
	};

	constructor(
		el: ElementRef,
		@Host() private _base: TableComponent
	) {
		super(el);
	}

	public override writeValue(value: TableDirectiveValue) {
		this._base.query = this.lastValue.query = value?.query;
		// this.el.nativeElement.query = this.lastValue.query = value?.query;
		this.lastValue.quickFilter = value?.quickFilter;
		this.lastValue.filters = value?.filters;

		this._base.page = this.lastValue.page =
			value?.page == null ? 1 : value?.page;
		this._base.pageSize = this.lastValue.pageSize =
			value?.pageSize == null ? 12 : value?.pageSize;

		// this.el.nativeElement.page = this.lastValue.page =
		// 	value?.page == null ? 1 : value?.page;
		// this.el.nativeElement.pageSize = this.lastValue.pageSize =
		// 	value?.pageSize == null ? 12 : value?.pageSize;

		this._base.selectedRows = this.lastValue.selectedRows =
			value?.selectedRows == null ? [] : value?.selectedRows;

		if (value?.quickFilter) {
			this._setActiveQuickFilter(value.quickFilter);
		}

		this._base.selectedFiltersAmount =
			!value.filters || value.filters.length === 0
				? undefined
				: value.filters.length;

		this._checkEmptyStateType();
		this._checkResetButtons();
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

		this._checkEmptyStateType();
		this._checkResetButtons();
	}

	private _setActiveQuickFilter(quickFilter: QuickFilter) {
		this._base.activeQuickFilterIdentifier = quickFilter?.identifier;
		// this.el.nativeElement.activeQuickFilterIdentifier =
		// 	quickFilter?.identifier;
	}

	private _checkEmptyStateType() {
		if (
			this.lastValue.query?.length ||
			(this.lastValue.quickFilter && !this.lastValue.quickFilter?.default) ||
			(this._base.selectedFiltersAmount &&
				this._base.selectedFiltersAmount > 0) ||
			this.lastValue.filters?.length
		) {
			this._base.emptyStateType = 'filtered';
			return;
		}

		this._base.emptyStateType = 'no_filter';
	}

	private _checkResetButtons() {
		const activeQuickFilter = this.lastValue.quickFilter;
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

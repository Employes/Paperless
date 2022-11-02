/* eslint-disable @angular-eslint/no-host-metadata-property */
import { Directive, ElementRef, Host } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { QuickFilter } from '@paperless/core';
import { BaseValueAccessor } from '../base';
import { TableComponent } from '../components/table/table.component';

export interface TableDirectiveValue {
	query?: string;
	quickFilter?: QuickFilter;
	page?: number;
	pageSize?: number;
	selectedRows?: any[];
}

@Directive({
	selector: 'p-table-ngx',
	host: {
		'(queryChange)': 'handleChange($event.detail, "query")',
		'(quickFilter)': 'handleChange($event.detail, "quickFilter")',
		'(pageChange)': 'handleChange($event.detail, "page")',
		'(pageSizeChange)': 'handleChange($event.detail, "pageSize")',
		'(selectedRowsChange)': 'handleChange($event, "selectedRows")',
	},
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: TableNgxDirective,
			multi: true,
		},
	],
})
export class TableNgxDirective extends BaseValueAccessor {
	protected override lastValue: TableDirectiveValue = {
		query: '',
		quickFilter: undefined,
		page: 1,
		pageSize: 12,
		selectedRows: [],
	};

	constructor(el: ElementRef, @Host() private _base: TableComponent) {
		super(el);
	}

	public override writeValue(value: TableDirectiveValue) {
		this._base.query = this.lastValue.query = value?.query;
		// this.el.nativeElement.query = this.lastValue.query = value?.query;
		this.lastValue.quickFilter = value?.quickFilter;

		this._base.page = this.lastValue.page =
			value?.page == null ? 1 : value?.page;
		this._base.pageSize = this.lastValue.pageSize =
			value?.pageSize == null ? 12 : value?.pageSize;

		// this.el.nativeElement.page = this.lastValue.page =
		// 	value?.page == null ? 1 : value?.page;
		// this.el.nativeElement.pageSize = this.lastValue.pageSize =
		// 	value?.pageSize == null ? 12 : value?.pageSize;

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
		this._base.activeQuickFilterIdentifier = quickFilter?.identifier;
		// this.el.nativeElement.activeQuickFilterIdentifier =
		// 	quickFilter?.identifier;
	}
}
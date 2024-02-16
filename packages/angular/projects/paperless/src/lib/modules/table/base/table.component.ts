import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { QuickFilter } from '@paperless/core';
import { timer } from 'rxjs';
import {
	debounce,
	filter,
	map,
	pairwise,
	startWith,
	tap,
} from 'rxjs/operators';
import { BaseFormComponent } from '../../../base/form.component';
import { createFormFilters } from '../utils';

export type TableQuickFilter = QuickFilter & {
	value: string;
	metricName?: string;
};

export interface TableOptions {
	pageSize: number;
	page: number;
	quickFilter: TableQuickFilter | string | null;
	query: string;
	filters: any[];
	selectedRows: any[];
}

@UntilDestroy({ checkProperties: true })
@Component({
	template: ``,
})
export abstract class BaseTableComponent
	extends BaseFormComponent
	implements OnInit
{
	@Output() tableOptionsChange: EventEmitter<Partial<TableOptions> | null> =
		new EventEmitter();

	protected quickFilters: any[] = [];

	public filterForm: FormGroup<any> = new FormGroup<any>({});
	public filterFormQuickFilterKey?: string;
	public defaultFilterFormValues: any = {};

	public pageSizeDefault = 12;
	public tableOptions?: FormControl<TableOptions>;

	private _defaultTableValues: TableOptions = {
		pageSize: this.pageSizeDefault,
		page: 1,
		quickFilter: null,
		query: '',
		filters: [],
		selectedRows: [],
	};
	public defaultTableValues: Partial<TableOptions> = {};

	get pageSize() {
		if (!this.tableOptions) {
			return this._defaultTableValues.pageSize;
		}

		return this.tableOptions.value.pageSize;
	}

	set pageSize(pageSize: number) {
		this.tableValues = {
			pageSize,
		};
	}

	get page() {
		if (!this.tableOptions) {
			return this._defaultTableValues.page;
		}

		return this.tableOptions.value.page;
	}

	set page(page: number) {
		this.tableValues = {
			page,
		};
	}

	get quickFilter() {
		if (!this.tableOptions) {
			return this._defaultTableValues.quickFilter;
		}

		return this.tableOptions.value.quickFilter;
	}
	set quickFilter(quickFilter: TableQuickFilter | string | null) {
		this.tableValues = {
			quickFilter,
		};
	}

	get query() {
		if (!this.tableOptions) {
			return this._defaultTableValues.query;
		}

		return this.tableOptions.value.query;
	}
	set query(query: string) {
		this.tableValues = {
			query,
		};
	}

	get filters() {
		if (!this.tableOptions) {
			return this._defaultTableValues.filters;
		}

		return this.tableOptions.value.filters;
	}
	set filters(filters: any[]) {
		this.tableValues = {
			filters,
		};
	}

	get selectedRows() {
		if (!this.tableOptions) {
			return this._defaultTableValues.selectedRows;
		}

		return this.tableOptions.value.selectedRows;
	}
	set selectedRows(selectedRows: any[]) {
		this.tableValues = {
			selectedRows,
		};
	}

	// setter
	get parsedDefaultTableValues() {
		return {
			...this._defaultTableValues,
			...this.defaultTableValues,
			pageSize: this.defaultTableValues?.pageSize || this.pageSizeDefault,
		};
	}

	get tableValues() {
		return this.tableOptions?.value ?? {};
	}

	set tableValues(values: Partial<TableOptions>) {
		this._setTableValues({
			...this.tableValues,
			...values,
		});
	}

	constructor() {
		super();
	}

	ngOnInit() {
		this.tableOptions = new FormControl<TableOptions>({
			pageSize: this.parsedDefaultTableValues.pageSize,
			page: this.parsedDefaultTableValues.page,
			quickFilter: this.parsedDefaultTableValues.quickFilter,
			query: this.parsedDefaultTableValues.query,
			filters: this.parsedDefaultTableValues.filters,
			selectedRows: this.parsedDefaultTableValues.selectedRows,
		}) as FormControl<TableOptions>;

		this.tableOptions.valueChanges
			.pipe(
				untilDestroyed(this),
				startWith(this.tableOptions.value),
				tap((value: TableOptions) =>
					this.tableOptionsChange.next(value)
				),
				pairwise(),
				map(([previous, next]) => this._getChanges(previous, next)),
				filter((changes) => !!changes),
				debounce((changes) => {
					if (changes?.query && Object.keys(changes)?.length === 1) {
						return timer(300);
					}

					return timer(0);
				})
			)
			.subscribe((changes) => {
				if (changes?.page) {
					this._refresh();
					return;
				}

				this._resetPageOrRefresh();
			});

		this._refresh();
	}

	resetTable(emitEvent = true, forceRefresh = false) {
		this._setTableValues(this.parsedDefaultTableValues, emitEvent);

		if (forceRefresh) {
			this._refresh();
		}
	}

	applyFormFilters(values: any = null) {
		values = values ?? this.filterForm.value;

		const { filters, quickFilter } = createFormFilters(
			values,
			this.quickFilters,
			this.filterFormQuickFilterKey
		);

		if (quickFilter) {
			this.quickFilter = quickFilter;
		}

		this.filters = filters;
	}

	resetFormFilters(resetQuickFilter: boolean = false) {
		const values: any = this.filterForm.value;
		const defaultQuickFilter = this.quickFilters.find((f) => f.default);

		for (const key of Object.keys(values)) {
			if (key === this.filterFormQuickFilterKey) {
				if (resetQuickFilter) {
					values[key] = defaultQuickFilter.value;
				}
				continue;
			}

			values[key] = this.defaultFilterFormValues[key] ?? null;
		}

		this.filterForm.setValue(values);
		this.applyFormFilters(values);
	}

	protected _refresh() {
		console.warn('Not implemented');
	}

	private _resetPageOrRefresh() {
		if (!this.tableOptions) {
			return;
		}

		if (this.page !== 1) {
			this.page = 1;
		}

		this._refresh();
	}

	private _setTableValues(data: Partial<TableOptions>, emitEvent = true) {
		this.tableOptions?.setValue(
			{
				...this.tableOptions.value,
				...data,
			},
			{ emitEvent }
		);
	}

	private _getChanges(previous: TableOptions, next: TableOptions) {
		const changes: Partial<TableOptions> = {};

		let key: keyof TableOptions;
		for (key in next) {
			if (key === 'selectedRows') {
				continue;
			}

			if (JSON.stringify(previous[key]) !== JSON.stringify(next[key])) {
				// @ts-ignore
				changes[key] = next[key];
			}
		}

		return Object.keys(changes).length ? changes : null;
	}
}

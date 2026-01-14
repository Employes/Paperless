import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Observable, timer } from 'rxjs';
import {
	debounce,
	filter,
	map,
	pairwise,
	startWith,
	tap,
} from 'rxjs/operators';

import { PAGINATION_DEFAULT_PAGE_SIZE, QuickFilter } from '@paperless/core';

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
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	filters: any[];
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	selectedRows: any[];
}

@UntilDestroy({ checkProperties: true })
@Component({
	template: ``,
	standalone: false,
})
export abstract class BaseTableComponent
	extends BaseFormComponent
	implements OnInit
{
	@Output() tableOptionsChange =
		new EventEmitter<Partial<TableOptions> | null>();

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	protected quickFilters: any[] = [];

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	public filterForm: FormGroup<any> = new FormGroup<any>({});
	public filterFormQuickFilterKey?: string;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	public defaultFilterFormValues: any = {};

	public pageSizeDefault = PAGINATION_DEFAULT_PAGE_SIZE;
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
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
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
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
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
				tap((value: TableOptions) => this.tableOptionsChange.next(value)),
				pairwise(),
				map(([previous, next]) => this._getChanges(previous, next)),
				filter(changes => !!changes),
				debounce(changes => {
					if (changes?.query && Object.keys(changes)?.length === 1) {
						return timer(300);
					}

					return timer(0);
				})
			)
			.subscribe(changes => {
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

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
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

	checkFilterForm() {
		for (const key of Object.keys(this.filterForm.controls)) {
			const filter =
				this.filters.find(f => f.key === key) ||
				(key === this.filterFormQuickFilterKey ? this.quickFilter : null);
			this.filterForm.get(key)?.setValue(filter?.value ?? null);
		}
	}

	resetFormFilters(resetQuickFilter = false) {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const values: any = this.filterForm.value;
		const defaultQuickFilter = this.quickFilters.find(f => f.default);

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
				// eslint-disable-next-line @typescript-eslint/ban-ts-comment
				// @ts-expect-error
				changes[key] = next[key];
			}
		}

		return Object.keys(changes).length > 0 ? changes : null;
	}

	protected _watchProperty<T>(
		observable: Observable<T & { id: string }>,
		identifier: keyof (T & { id: string }) = 'id'
	) {
		return observable.pipe(
			untilDestroyed(this),
			startWith(null),
			pairwise(),
			filter(([prev, cur]) => prev !== cur && !!cur),
			tap(([previous, current]) => {
				if (previous && previous[identifier] !== current?.[identifier]) {
					this.resetTable(false, true);
				}
			}),
			// eslint-disable-next-line @typescript-eslint/no-unused-vars
			map(([_, current]) => current)
		);
	}
}

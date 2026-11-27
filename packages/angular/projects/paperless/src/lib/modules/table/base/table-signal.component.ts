import {
	Component,
	DestroyRef,
	Injector,
	Signal,
	computed,
	effect,
	inject,
	output,
	signal,
} from '@angular/core';
import { form } from '@angular/forms/signals';

import { PAGINATION_DEFAULT_PAGE_SIZE, QuickFilter } from '@paperless/core';

import { createFormFilters } from '../utils';

import { TableQuickFilter } from './table.component';

export type TableSignalQuickFilter = QuickFilter & {
	value: string;
	metricName?: string;
};

export interface TableSignalFilter {
	key: string;
	value: unknown;
}

interface TableSignalModelWithoutQuery<T> {
	pageSize: number;
	page: number;
	quickFilter: TableQuickFilter | null;
	selectedRows: T[];
	filters: TableSignalFilter[];
}

export type TableSignalModel<T> = TableSignalModelWithoutQuery<T> & {
	query: string;
};

@Component({
	template: ``,
})
export abstract class BaseTableSignalComponent<TRow = unknown> {
	private readonly _destroyRef = inject(DestroyRef);
	private readonly _injector = inject(Injector);

	protected quickFilters: TableSignalQuickFilter[] = [];

	protected pageSizeDefault = PAGINATION_DEFAULT_PAGE_SIZE;
	protected pageDefault = 1;
	protected queryDefault = '';
	protected quickFilterDefault: TableSignalQuickFilter | null = null;
	protected selectedRowsDefault: TRow[] = [];
	protected filtersDefault: TableSignalFilter[] = [];

	protected readonly pageSize = signal(this.pageSizeDefault);
	protected readonly page = signal(this.pageDefault);
	protected readonly quickFilter = signal<TableSignalQuickFilter | null>(
		this.quickFilterDefault
	);
	protected readonly query = signal<string>(this.queryDefault);
	protected readonly selectedRows = signal<TRow[]>(this.selectedRowsDefault);
	protected readonly filters = signal<TableSignalFilter[]>(this.filtersDefault);

	private readonly _modelWithoutQuery = computed<
		TableSignalModelWithoutQuery<TRow>
	>(() => ({
		pageSize: this.pageSize(),
		page: this.page(),
		quickFilter: this.quickFilter(),
		selectedRows: this.selectedRows(),
		filters: this.filters(),
	}));
	public readonly model = computed<TableSignalModel<TRow>>(() => ({
		...this._modelWithoutQuery(),
		query: this.query(),
	}));
	public readonly modelChange = output<TableSignalModel<TRow>>();

	protected readonly filterFormModel = signal<Record<string, unknown>>({});
	protected readonly filterForm = form(this.filterFormModel);

	protected filterFormQuickFilterKey?: string;
	protected defaultFilterFormValues: Record<string, unknown> = {};

	private _debounceHandle?: number;
	private _skipRefresh = false;

	constructor() {
		effect(() => {
			const next = this.model();
			this.modelChange.emit(next);
		});

		effect(() => {
			this.query();
			if (this._skipRefresh) {
				this._skipRefresh = false;
				return;
			}

			clearTimeout(this._debounceHandle);

			this._debounceHandle = setTimeout(() => this._refresh(), 300);
		});

		effect(() => {
			this._modelWithoutQuery();
			if (this._skipRefresh) {
				this._skipRefresh = false;
				return;
			}

			clearTimeout(this._debounceHandle);
			this._refresh();
		});

		this._destroyRef.onDestroy(() => clearTimeout(this._debounceHandle));
	}

	onModelChange(ev: TableSignalModel<TRow> | undefined) {
		if (!ev) {
			return;
		}

		if (ev.query) {
			this.query.set(ev.query);
		}

		if (ev.page) {
			this.page.set(ev.page);
		}

		if (ev.pageSize) {
			this.pageSize.set(ev.pageSize);
		}

		if (ev.quickFilter) {
			this.quickFilter.set(ev.quickFilter);
		}

		if (ev.selectedRows) {
			this.selectedRows.set(ev.selectedRows);
		}
	}

	resetTable(forceRefresh = false) {
		this.pageSize.set(this.pageSizeDefault);
		this.page.set(this.pageDefault);
		this.quickFilter.set(this.quickFilterDefault);
		this.query.set(this.queryDefault);
		this.selectedRows.set(this.selectedRowsDefault);
		this.filters.set(this.filtersDefault);

		if (forceRefresh) {
			return;
		}

		this._skipRefresh = true;
	}

	applyFormFilters(values: Record<string, unknown> | null = null) {
		values ??= this.filterFormModel();

		const { filters, quickFilter } = createFormFilters(
			values,
			this.quickFilters,
			this.filterFormQuickFilterKey
		);

		if (quickFilter) {
			this.quickFilter.set(quickFilter);
		}

		this.filters.set(filters);
	}

	checkFilterForm() {
		const values = this.filterFormModel();
		const updated: Record<string, unknown> = {};

		for (const key of Object.keys(values)) {
			const match: TableSignalFilter | TableSignalQuickFilter | string | null =
				this.filters().find(f => f.key === key) ??
				(key === this.filterFormQuickFilterKey ? this.quickFilter() : null);

			updated[key] =
				match && typeof match === 'object' && 'value' in match
					? match.value
					: null;
		}

		this.filterFormModel.set(updated);
	}

	resetFormFilters(resetQuickFilter = false) {
		const values = { ...this.filterFormModel() };
		const defaultQuickFilter = this.quickFilters.find(f => f.default);

		for (const key of Object.keys(values)) {
			if (key === this.filterFormQuickFilterKey) {
				if (resetQuickFilter) {
					values[key] = defaultQuickFilter?.value;
				}
				continue;
			}

			values[key] = this.defaultFilterFormValues[key] ?? null;
		}

		this.filterFormModel.set(values);
		this.applyFormFilters(values);
	}

	protected _refresh() {
		console.warn('Not implemented');
	}

	protected _watchProperty<T extends { id: string }>(
		value: Signal<T | null | undefined>,
		callback: (value: T) => void,
		identifier: keyof T = 'id' as keyof T
	) {
		let previous: T | undefined;

		effect(
			() => {
				const current = value();
				if (!current) {
					return;
				}

				if (previous && previous[identifier] !== current[identifier]) {
					this.resetTable(true);
				}

				previous = current;
				callback(current);
			},
			{ injector: this._injector }
		);
	}
}

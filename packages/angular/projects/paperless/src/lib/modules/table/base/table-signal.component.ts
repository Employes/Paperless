import {
	Component,
	DestroyRef,
	Injector,
	OnInit,
	Signal,
	WritableSignal,
	effect,
	inject,
	output,
	signal,
	untracked,
} from '@angular/core';
import { form } from '@angular/forms/signals';

import { PAGINATION_DEFAULT_PAGE_SIZE, QuickFilter } from '@paperless/core';

import { createFormFilters } from '../utils';

export type TableSignalQuickFilter = QuickFilter & {
	value: string;
	metricName?: string;
};

export interface TableSignalFilter {
	key: string;
	value: unknown;
}

export interface TableSignalOptions<TRow = unknown> {
	pageSize: number;
	page: number;
	quickFilter: TableSignalQuickFilter | string | null;
	query: string;
	filters: TableSignalFilter[];
	selectedRows: TRow[];
}

@Component({
	template: ``,
})
export abstract class BaseSignalTableComponent<
	TRow = unknown,
> implements OnInit {
	private readonly _destroyRef = inject(DestroyRef);
	private readonly _injector = inject(Injector);

	readonly tableOptionsChange = output<Partial<
		TableSignalOptions<TRow>
	> | null>();

	protected readonly quickFilters = signal<TableSignalQuickFilter[]>([]);

	protected readonly filterFormModel = signal<Record<string, unknown>>({});
	protected readonly filterForm = form(this.filterFormModel);
	protected filterFormQuickFilterKey?: string;
	protected defaultFilterFormValues: Record<string, unknown> = {};

	readonly pageSizeDefault = PAGINATION_DEFAULT_PAGE_SIZE;

	defaultTableValues: Partial<TableSignalOptions<TRow>> = {};

	readonly tableOptions: WritableSignal<TableSignalOptions<TRow>> = signal(
		this._baseTableValues()
	);

	private _previousTableOptions: TableSignalOptions<TRow> | undefined;
	private _suppressNotify = false;
	private _debounceHandle?: number;

	get pageSize() {
		return this.tableOptions().pageSize;
	}

	set pageSize(pageSize: number) {
		this.tableValues = { pageSize };
	}

	get page() {
		return this.tableOptions().page;
	}

	set page(page: number) {
		this.tableValues = { page };
	}

	get quickFilter() {
		return this.tableOptions().quickFilter;
	}

	set quickFilter(quickFilter: TableSignalQuickFilter | string | null) {
		this.tableValues = { quickFilter };
	}

	get query() {
		return this.tableOptions().query;
	}

	set query(query: string) {
		this.tableValues = { query };
	}

	get filters() {
		return this.tableOptions().filters;
	}

	set filters(filters: TableSignalFilter[]) {
		this.tableValues = { filters };
	}

	get selectedRows() {
		return this.tableOptions().selectedRows;
	}

	set selectedRows(selectedRows: TRow[]) {
		this.tableValues = { selectedRows };
	}

	protected get parsedDefaultTableValues(): TableSignalOptions<TRow> {
		return {
			...this._baseTableValues(),
			...this.defaultTableValues,
			pageSize: this.defaultTableValues.pageSize || this.pageSizeDefault,
		};
	}

	get tableValues() {
		return this.tableOptions();
	}

	set tableValues(values: Partial<TableSignalOptions<TRow>>) {
		this._setTableValues({
			...this.tableOptions(),
			...values,
		});
	}

	constructor() {
		effect(() => {
			const next = this.tableOptions();

			if (untracked(() => this._suppressNotify)) {
				this._suppressNotify = false;
				return;
			}

			const previous = untracked(() => this._previousTableOptions);
			this._previousTableOptions = next;

			this.tableOptionsChange.emit(next);

			if (!previous) {
				return;
			}

			const changes = this._getChanges(previous, next);
			if (!changes) {
				return;
			}

			this._scheduleRefresh(changes);
		});

		this._destroyRef.onDestroy(() => clearTimeout(this._debounceHandle));
	}

	ngOnInit() {
		this.tableOptions.set(this.parsedDefaultTableValues);
		this._refresh();
	}

	resetTable(emitEvent = true, forceRefresh = false) {
		this._setTableValues(this.parsedDefaultTableValues, emitEvent);

		if (forceRefresh) {
			this._refresh();
		}
	}

	applyFormFilters(values: Record<string, unknown> | null = null) {
		values ??= this.filterFormModel();

		const { filters, quickFilter } = createFormFilters(
			values,
			this.quickFilters(),
			this.filterFormQuickFilterKey
		);

		if (quickFilter) {
			this.quickFilter = quickFilter;
		}

		this.filters = filters;
	}

	checkFilterForm() {
		const values = this.filterFormModel();
		const updated: Record<string, unknown> = {};

		for (const key of Object.keys(values)) {
			const match: TableSignalFilter | TableSignalQuickFilter | string | null =
				this.filters.find(f => f.key === key) ??
				(key === this.filterFormQuickFilterKey ? this.quickFilter : null);

			updated[key] =
				match && typeof match === 'object' && 'value' in match
					? match.value
					: null;
		}

		this.filterFormModel.set(updated);
	}

	resetFormFilters(resetQuickFilter = false) {
		const values = { ...this.filterFormModel() };
		const defaultQuickFilter = this.quickFilters().find(f => f.default);

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
					this.resetTable(false, true);
				}

				previous = current;
				callback(current);
			},
			{ injector: this._injector }
		);
	}

	private _baseTableValues(): TableSignalOptions<TRow> {
		return {
			pageSize: this.pageSizeDefault,
			page: 1,
			quickFilter: null,
			query: '',
			filters: [],
			selectedRows: [],
		};
	}

	private _resetPageOrRefresh() {
		if (this.page !== 1) {
			this.page = 1;
		}

		this._refresh();
	}

	private _setTableValues(
		data: Partial<TableSignalOptions<TRow>>,
		emitEvent = true
	) {
		if (!emitEvent) {
			this._suppressNotify = true;
		}

		this.tableOptions.set({
			...this.tableOptions(),
			...data,
		});
	}

	private _getChanges(
		previous: TableSignalOptions<TRow>,
		next: TableSignalOptions<TRow>
	): Partial<TableSignalOptions<TRow>> | null {
		const changes: Partial<TableSignalOptions<TRow>> = {};

		let key: keyof TableSignalOptions<TRow>;
		for (key in next) {
			if (key === 'selectedRows') {
				continue;
			}

			if (JSON.stringify(previous[key]) !== JSON.stringify(next[key])) {
				this._assignChange(changes, key, next[key]);
			}
		}

		return Object.keys(changes).length > 0 ? changes : null;
	}

	private _assignChange<K extends keyof TableSignalOptions<TRow>>(
		changes: Partial<TableSignalOptions<TRow>>,
		key: K,
		value: TableSignalOptions<TRow>[K]
	) {
		changes[key] = value;
	}

	private _scheduleRefresh(changes: Partial<TableSignalOptions<TRow>>) {
		clearTimeout(this._debounceHandle);

		const onlyQueryChanged =
			changes.query !== undefined && Object.keys(changes).length === 1;

		this._debounceHandle = setTimeout(
			() => {
				if (changes.page !== undefined) {
					this._refresh();
					return;
				}

				this._resetPageOrRefresh();
			},
			onlyQueryChanged ? 300 : 0
		);
	}
}

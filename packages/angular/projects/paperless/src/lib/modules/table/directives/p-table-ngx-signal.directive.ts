import { Directive, effect, inject, model } from '@angular/core';

import { QuickFilter } from '@paperless/core';

import { TableSignalModel } from '../base/table-signal.component';
import { TableComponent } from '../components/table/table.component';

@Directive({
	selector: 'p-table-ngx[model]',
	host: {
		'(queryChange)': 'handleChange($event, "query")',
		'(quickFilter)': 'handleChange($event, "quickFilter")',
		'(pageChange)': 'handleChange($event, "page")',
		'(pageSizeChange)': 'handleChange($event, "pageSize")',
		'(selectedRowsChange)': 'handleChange($event, "selectedRows")',
	},
})
export class PTableNgxSignalDirective {
	private _base = inject(TableComponent, {
		host: true,
	});

	public readonly model = model<TableSignalModel<unknown>>();

	constructor() {
		effect(() => {
			const model = this.model();
			if (!model) {
				return;
			}

			const page = model.page == null ? 1 : model.page;
			const pageSize = model.pageSize == null ? 12 : model.pageSize;
			const selectedRows = model.selectedRows == null ? [] : model.selectedRows;

			this._base.query = model?.query;
			this._base.page = page;
			this._base.pageSize = pageSize;
			this._base.selectedRows = selectedRows;

			if (model.quickFilter) {
				this._base.activeQuickFilterIdentifier = model.quickFilter.identifier;
			}

			this._base.selectedFiltersAmount =
				!model.filters || model.filters.length === 0
					? undefined
					: model.filters.length;

			this._checkEmptyStateType();
			this._checkResetButtons();
		});
	}

	protected handleChange(
		event: Event,
		type: 'page' | 'pageSize' | 'query' | 'quickFilter' | 'selectedRows'
	) {
		const value = event as unknown as number | string | QuickFilter;
		const base = this.model();
		if (!base) {
			return;
		}

		if (base[type] === value) {
			return;
		}

		this.model.set({
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
			this.model()?.query?.length ||
			(this.model()?.quickFilter && !this.model()?.quickFilter?.default) ||
			(this._base.selectedFiltersAmount &&
				this._base.selectedFiltersAmount > 0) ||
			this.model()?.filters?.length
		) {
			this._base.emptyStateType = 'filtered';
			return;
		}

		this._base.emptyStateType = 'no_filter';
	}

	private _checkResetButtons() {
		const activeQuickFilter = this.model()?.quickFilter;
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

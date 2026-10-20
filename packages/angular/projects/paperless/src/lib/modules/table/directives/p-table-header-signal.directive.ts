import { Directive } from '@angular/core';

import { QuickFilter } from '@paperless/core';

import { BaseSignalValueControl } from '../../../base';

import { TableHeaderDirectiveValue } from './p-table-header.directive';

@Directive({
	selector: 'p-table-header[formField]',
	host: {
		'(queryChange)': 'handleChange($event.detail, "query")',
		'(quickFilter)': 'handleChange($event.detail, "quickFilter")',
	},
})
export class PTableHeaderSignalDirective extends BaseSignalValueControl<TableHeaderDirectiveValue> {
	protected override writeValue(value: TableHeaderDirectiveValue | undefined) {
		this.lastValue = { query: value?.query, quickFilter: value?.quickFilter };
		this.el.nativeElement['query'] = value?.query;

		if (value?.quickFilter) {
			this.el.nativeElement['activeQuickFilterIdentifier'] =
				value.quickFilter.identifier;
		}
	}

	protected handleChange(
		value: string | QuickFilter,
		type: 'query' | 'quickFilter'
	) {
		const base: TableHeaderDirectiveValue = this.lastValue ?? {
			query: '',
			quickFilter: undefined,
		};
		this.handleChangeEvent({
			...base,
			[type]: value,
		});

		if (type === 'quickFilter' && typeof value !== 'string') {
			this.el.nativeElement['activeQuickFilterIdentifier'] = value?.identifier;
		}
	}
}

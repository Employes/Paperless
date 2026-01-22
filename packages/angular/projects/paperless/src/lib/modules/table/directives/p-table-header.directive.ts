import { Directive } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

import { QuickFilter } from '@paperless/core';

import { BaseValueAccessor } from '../../../base';

export interface TableHeaderDirectiveValue {
	query?: string;
	quickFilter?: QuickFilter;
}

@Directive({
	selector: 'p-table-header',
	host: {
		'(queryChange)': 'handleChange($event.detail, "query")',
		'(quickFilter)': 'handleChange($event.detail, "quickFilter")',
	},
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: PTableHeaderDirective,
			multi: true,
		},
	],
})
export class PTableHeaderDirective extends BaseValueAccessor {
	protected override lastValue: TableHeaderDirectiveValue = {
		query: '',
		quickFilter: undefined,
	};

	public override writeValue(value: TableHeaderDirectiveValue) {
		this.el.nativeElement.query = this.lastValue.query = value?.query;
		this.lastValue.quickFilter = value?.quickFilter;

		if (value?.quickFilter) {
			this._setActiveQuickFilter(value.quickFilter);
		}
	}

	public handleChange(
		value: string | QuickFilter,
		type: 'query' | 'quickFilter'
	) {
		this.handleChangeEvent({
			...this.lastValue,
			[type]: value,
		});

		if (type === 'quickFilter' && typeof value !== 'string') {
			this._setActiveQuickFilter(value);
		}
	}

	private _setActiveQuickFilter(quickFilter: QuickFilter) {
		this.el.nativeElement.activeQuickFilterIdentifier = quickFilter?.identifier;
	}
}

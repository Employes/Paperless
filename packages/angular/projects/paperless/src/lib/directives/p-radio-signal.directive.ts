import { Directive } from '@angular/core';

import { BaseSignalValueControl } from '../base';

@Directive({
	selector: 'p-radio[formField]',
	host: {
		'(checkedChange)': 'handleChangeEvent()',
	},
})
export class PRadioSignalDirective extends BaseSignalValueControl<
	string | boolean
> {
	protected override writeValue(value: string | boolean | undefined) {
		const elValue = this._getValue();
		this.lastValue = value;
		this.el.nativeElement['checked'] = value === elValue;
	}

	protected override handleChangeEvent() {
		const elValue = this._getValue();
		const next = this.lastValue === elValue ? undefined : elValue;
		this.lastValue = next;
		this.value.set(next);
	}

	private _getValue(): string | boolean {
		const raw = this.el.nativeElement['value'];
		if (raw === 'true') {
			return true;
		}

		if (raw === 'false') {
			return false;
		}

		return typeof raw === 'string' ? raw : String(raw);
	}
}

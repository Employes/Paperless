import { Directive, effect, input } from '@angular/core';

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
	readonly option = input.required<string | boolean>();

	constructor() {
		super();

		effect(() => {
			this.el.nativeElement['value'] = this.option();
		});
	}

	protected override writeValue(value: string | boolean | undefined) {
		this.lastValue = value;
		this.el.nativeElement['checked'] = value === this.option();
	}

	protected override handleChangeEvent() {
		const next = this.lastValue === this.option() ? undefined : this.option();
		this.lastValue = next;
		this.value.set(next);
	}
}

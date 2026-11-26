import { Directive, effect, input, model } from '@angular/core';
import { FormCheckboxControl } from '@angular/forms/signals';

import { BaseSignalControl } from './value-control-signal';

@Directive()
export class BaseSignalCheckboxControl
	extends BaseSignalControl<boolean>
	implements FormCheckboxControl
{
	readonly checked = model<boolean>(false);
	readonly indeterminate = input<boolean>(false);

	constructor() {
		super();

		this.listen('checkedChange', event => this.handleChangeEvent(event.detail));

		effect(() => {
			if (this.indeterminate()) {
				this.checked.set(true);
				return;
			}

			this.checked.set(this.lastValue ?? false);
		});

		effect(() => {
			this.writeValue(this.checked());
		});
	}

	protected writeValue(value: boolean) {
		this.lastValue = value == null ? false : value;
		this.el.nativeElement['checked'] = this.indeterminate()
			? 'indeterminate'
			: this.lastValue;
	}

	protected handleChangeEvent(value: boolean) {
		if (value === this.lastValue) {
			return;
		}

		this.lastValue = value;
		this.checked.set(value);
	}
}

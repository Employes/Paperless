import { Directive, effect, model } from '@angular/core';
import { FormCheckboxControl } from '@angular/forms/signals';

import { BaseSignalControl } from './value-control-signal';

@Directive()
export class BaseSignalCheckboxControl
	extends BaseSignalControl<boolean>
	implements FormCheckboxControl
{
	readonly checked = model<boolean>(false);

	constructor() {
		super();

		this.listen('checkedChange', event => this.handleChangeEvent(event.detail));

		effect(() => this.writeValue(this.checked()));
	}

	protected writeValue(value: boolean) {
		this.lastValue = value == null ? false : value;
		this.el.nativeElement['checked'] = this.lastValue;
	}

	protected handleChangeEvent(value: boolean) {
		if (value === this.lastValue) {
			return;
		}

		this.lastValue = value;
		this.checked.set(value);
	}
}

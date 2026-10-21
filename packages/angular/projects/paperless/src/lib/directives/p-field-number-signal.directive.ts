import { Directive } from '@angular/core';

import { BaseSignalValueControl } from '../base';

@Directive({
	selector: 'p-field[type=number][formField]',
})
export class PFieldNumberSignalDirective extends BaseSignalValueControl<number> {
	protected override handleChangeEvent(value: number) {
		const raw = value as unknown as string;
		super.handleChangeEvent(
			raw === '' ? (null as unknown as number) : Number.parseFloat(raw)
		);
	}
}

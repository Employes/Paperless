import { Directive } from '@angular/core';

import { BaseSignalValueControl } from '../base';

@Directive({
	selector: 'p-field[type=number][formField]',
})
export class PFieldNumberSignalDirective extends BaseSignalValueControl<number> {}

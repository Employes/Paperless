import { Directive } from '@angular/core';

import { BaseSignalCheckboxControl } from '../base';

@Directive({
	selector: 'p-checkbox[formField]',
})
export class PCheckboxSignalDirective extends BaseSignalCheckboxControl {}

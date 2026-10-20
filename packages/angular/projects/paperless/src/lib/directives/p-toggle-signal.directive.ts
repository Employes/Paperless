import { Directive } from '@angular/core';

import { BaseSignalCheckboxControl } from '../base';

@Directive({
	selector: 'p-toggle[formField]',
})
export class PToggleSignalDirective extends BaseSignalCheckboxControl {}

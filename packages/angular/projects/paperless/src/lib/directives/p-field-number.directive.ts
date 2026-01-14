import { Directive, ElementRef, Renderer2 } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

import { BaseNumberValueAccessor } from '../base/number-value-accessor';

@Directive({
    selector: 'p-field[type=number]',
    host: {
        '(valueChange)': 'handleChangeEvent($event.detail)',
    },
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: FieldNumberDirective,
            multi: true,
        },
    ],
    standalone: false
})
export class FieldNumberDirective extends BaseNumberValueAccessor {
	constructor(el: ElementRef, renderer: Renderer2) {
		super(el, renderer);
	}
}

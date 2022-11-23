import { Directive, ElementRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

import { BaseValueAccessor } from '../base';

@Directive({
    /* tslint:disable-next-line:directive-selector */
    selector: 'p-pagination',
    host: {
        '(pageChange)': 'handleChangeEvent($event.detail)',
    },
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: PaginationDirective,
            multi: true,
        },
    ],
})
export class PaginationDirective extends BaseValueAccessor {
    constructor(el: ElementRef) {
        super(el);
    }

    public override writeValue(value: any) {
        this.el.nativeElement.page = this.lastValue =
            value == null ? 1 : value;
    }

    public override registerOnChange(fn: (_: number | null) => void) {
        super.registerOnChange((value) => fn(parseInt(value, 10)));
    }
}

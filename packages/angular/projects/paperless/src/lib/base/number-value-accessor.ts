/* eslint-disable @typescript-eslint/no-explicit-any */
import { Directive, ElementRef, HostListener, inject } from '@angular/core';
import { ControlValueAccessor, NumberValueAccessor } from '@angular/forms';

@Directive()
export class BaseNumberValueAccessor
	extends NumberValueAccessor
	implements ControlValueAccessor
{
	private readonly _el = inject(ElementRef);

	protected lastValue: any;

	override writeValue(value: any) {
		this._el.nativeElement.value = this.lastValue = value == null ? '' : value;
		super.writeValue(value);
	}

	public handleChangeEvent(value: any) {
		if (value === this.lastValue) {
			return;
		}

		this.lastValue = value;
		this.onChange(value);
	}

	@HostListener('focusout')
	protected _handleBlurEvent() {
		this.onTouched();
	}
}

/* eslint-disable @typescript-eslint/no-explicit-any */
import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';
import { ControlValueAccessor, NumberValueAccessor } from '@angular/forms';

@Directive({
	standalone: false,
})
export class BaseNumberValueAccessor
	extends NumberValueAccessor
	implements ControlValueAccessor
{
	protected lastValue: any;

	constructor(
		protected el: ElementRef,
		protected renderer: Renderer2
	) {
		super(renderer, el);
	}

	override writeValue(value: any) {
		this.el.nativeElement.value = this.lastValue = value == null ? '' : value;
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

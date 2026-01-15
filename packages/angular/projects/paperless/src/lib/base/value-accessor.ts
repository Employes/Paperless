/* eslint-disable @typescript-eslint/no-explicit-any */
import { Directive, ElementRef, HostListener } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';

@Directive({
	standalone: false,
})
export class BaseValueAccessor implements ControlValueAccessor {
	protected onChange: (value: any) => void = () => {
		/**/
	};

	protected onTouched: () => void = () => {
		/**/
	};

	protected lastValue: any;

	constructor(protected el: ElementRef) {}

	public writeValue(value: any) {
		this.el.nativeElement.value = this.lastValue = value == null ? '' : value;
	}

	public handleChangeEvent(value: any) {
		if (value !== this.lastValue) {
			this.lastValue = value;
			this.onChange(value);
		}
	}

	public registerOnChange(fn: (value: any) => void) {
		this.onChange = fn;
	}

	public registerOnTouched(fn: () => void) {
		this.onTouched = fn;
	}

	@HostListener('focusout')
	protected _handleBlurEvent() {
		this.onTouched();
	}
}

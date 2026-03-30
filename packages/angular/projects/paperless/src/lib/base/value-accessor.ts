/* eslint-disable @typescript-eslint/no-explicit-any */
import { Directive, ElementRef, HostListener, inject } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';

@Directive()
export class BaseValueAccessor implements ControlValueAccessor {
	protected readonly el = inject(ElementRef);

	protected onChange: (value: any) => void = () => {
		/**/
	};

	protected onTouched: () => void = () => {
		/**/
	};

	protected lastValue: any;

	public writeValue(value: any) {
		this.el.nativeElement.value = this.lastValue = value == null ? '' : value;
	}

	public handleChangeEvent(value: any) {
		if (value === this.lastValue) {
			return;
		}

		this.lastValue = value;
		this.onChange(value);
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

import { Directive, ElementRef, OnDestroy, OnInit, Self } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { filter, Subscription } from 'rxjs';

import { BaseValueAccessor } from '../base';

@Directive({
	selector: 'p-radio',
	host: {
		'(checkedChange)': 'handleChangeEvent()',
	},
})
export class PRadioDirective
	extends BaseValueAccessor
	implements ControlValueAccessor, OnInit, OnDestroy
{
	private _modelValue: string | boolean | undefined;
	private _valueChanges: Subscription | undefined;

	constructor(
		@Self() private _control: NgControl,
		el: ElementRef
	) {
		super(el);
		_control.valueAccessor = this;
	}

	ngOnInit() {
		this._valueChanges = this._control
			.control!.valueChanges.pipe(filter(value => this._modelValue !== value))
			.subscribe((value: string) => this.writeValue(value));
	}

	override writeValue(value: string) {
		const elValue = this._getValue();
		this._modelValue = value;
		this.el.nativeElement.checked = this._modelValue === elValue;
	}

	override handleChangeEvent() {
		const elValue = this._getValue();

		this._modelValue = this._modelValue === elValue ? undefined : elValue;
		this.onChange(this._modelValue);
	}

	ngOnDestroy() {
		if (this._valueChanges) {
			this._valueChanges.unsubscribe();
		}
	}

	private _getValue() {
		let value = this.el.nativeElement.value;
		if (value === 'true') {
			value = true;
		}

		if (value === 'false') {
			value = false;
		}

		return value;
	}
}

import { OnDestroy } from '@angular/core';
import { Directive, ElementRef, OnInit, Self } from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { filter, Subscription } from 'rxjs';

import { BaseValueAccessor } from '../base';

@Directive({
	selector: 'p-radio',
	host: {
		'(checkedChange)': 'handleChangeEvent($event.detail)',
	},
})
export class RadioDirective
	extends BaseValueAccessor
	implements ControlValueAccessor, OnInit, OnDestroy
{
	private _modelValue: string | undefined;
	private _valueChanges: Subscription | undefined;

	constructor(@Self() private _control: NgControl, el: ElementRef) {
		super(el);
		_control.valueAccessor = this;
	}

	ngOnInit() {
		this._valueChanges = this._control
			.control!.valueChanges.pipe(filter(value => this._modelValue !== value))
			.subscribe((value: any) => this.writeValue(value));
	}

	override writeValue(value: string) {
		this._modelValue = value;
		this.el.nativeElement.checked =
			this._modelValue === this.el.nativeElement.value;
	}

	override handleChangeEvent() {
		this._modelValue =
			this._modelValue === this.el.nativeElement.value
				? undefined
				: this.el.nativeElement.value;
		this.onChange(this._modelValue);
	}

	ngOnDestroy() {
		if (this._valueChanges) {
			this._valueChanges.unsubscribe();
		}
	}
}

/*
    This pipe overrides the default currency pipe from angular,
    this can be removed when angular supports currency defaults
    https://github.com/angular/angular/issues/25461
*/

import { CurrencyPipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'pcurrency',
})
export class CustomCurrencyPipe implements PipeTransform {
	constructor(private _currencyPipe: CurrencyPipe) {}

	transform(
		value: number | string | null | undefined,
		currencyCode = 'EUR',
		display: 'code' | 'symbol' | 'symbol-narrow' | string | boolean = 'symbol',
		digitsInfo = '1.2-2',
		locale = 'nl'
	): string | null {
		return this._currencyPipe.transform(
			value,
			currencyCode,
			display,
			digitsInfo,
			locale
		);
	}
}

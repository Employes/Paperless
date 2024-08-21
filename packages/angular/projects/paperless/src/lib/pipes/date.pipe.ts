import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'pdate',
})
export class CustomDatePipe implements PipeTransform {
	constructor(private _datePipe: DatePipe) {}

	transform(value: any, format = 'dd MMM yyyy') {
		return this._datePipe.transform(value, format);
	}
}

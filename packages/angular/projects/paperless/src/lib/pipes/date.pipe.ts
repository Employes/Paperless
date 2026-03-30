import { DatePipe } from '@angular/common';
import { inject, Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'pdate',
})
export class CustomDatePipe implements PipeTransform {
	private readonly _datePipe = inject(DatePipe);

	transform(value: string | Date, format = 'd MMM yyyy') {
		return this._datePipe.transform(value, format);
	}
}

import { Pipe, PipeTransform } from '@angular/core';

import { SELECT_DEFAULT_MAX_DISPLAYED_ITEMS } from '@paperless/core';

@Pipe({
	name: 'pSelectAutocomplete',
})
export class SelectAutocompletePipe implements PipeTransform {
	transform(value: number) {
		return value > SELECT_DEFAULT_MAX_DISPLAYED_ITEMS;
	}
}

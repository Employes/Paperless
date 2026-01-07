import { CustomCurrencyPipe } from './currency.pipe';
import { CustomDatePipe } from './date.pipe';
import { SafePipe } from './safe.pipe';
import { SelectAutocompletePipe } from './select-autocomplete.pipe';
import { SelectSelectAllPipe } from './select-select-all.pipe';

export * from './currency.pipe';
export * from './date.pipe';
export * from './safe.pipe';
export * from './select-autocomplete.pipe';
export * from './select-select-all.pipe';

export const PIPES = [
	CustomCurrencyPipe,
	CustomDatePipe,
	SafePipe,
	SelectAutocompletePipe,
	SelectSelectAllPipe,
];

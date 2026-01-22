export * from './p-checkbox.directive';
export * from './p-cropper.directive';
export * from './p-datepicker.directive';
export * from './p-field.directive';
export * from './p-field-number.directive';
export * from './p-pagination-pages.directive';
export * from './p-pagination-size.directive';
export * from './p-radio.directive';
export * from './p-select.directive';
export * from './p-toggle.directive';

import { PCheckboxDirective } from './p-checkbox.directive';
import { PCropperDirective } from './p-cropper.directive';
import { PDatepickerDirective } from './p-datepicker.directive';
import { PFieldNumberDirective } from './p-field-number.directive';
import { PFieldDirective } from './p-field.directive';
import { PPaginationPagesDirective } from './p-pagination-pages.directive';
import { PPaginationSizeDirective } from './p-pagination-size.directive';
import { PRadioDirective } from './p-radio.directive';
import { PSelectDirective } from './p-select.directive';
import { PToggleDirective } from './p-toggle.directive';

export const DIRECTIVES = [
	PPaginationSizeDirective,
	PPaginationPagesDirective,
	PSelectDirective,
	PDatepickerDirective,
	PCropperDirective,
	PFieldDirective,
	PFieldNumberDirective,
	PRadioDirective,
	PCheckboxDirective,
	PToggleDirective,
];

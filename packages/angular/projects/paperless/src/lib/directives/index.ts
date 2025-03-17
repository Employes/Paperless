export * from './p-cropper.directive';
export * from './p-datepicker.directive';
export * from './p-page-size-select.directive';
export * from './p-pagination.directive';
export * from './p-select.directive';
export * from './p-field.directive';
export * from './p-radio.directive';
export * from './p-checkbox.directive';
export * from './p-toggle.directive';

import { CheckboxDirective } from './p-checkbox.directive';
import { CropperDirective } from './p-cropper.directive';
import { DatepickerDirective } from './p-datepicker.directive';
import { FieldDirective } from './p-field.directive';
import { PageSizeSelectDirective } from './p-page-size-select.directive';
import { PaginationDirective } from './p-pagination.directive';
import { RadioDirective } from './p-radio.directive';
import { SelectDirective } from './p-select.directive';
import { ToggleDirective } from './p-toggle.directive';

export const DIRECTIVES = [
	PaginationDirective,
	PageSizeSelectDirective,
	SelectDirective,
	DatepickerDirective,
	CropperDirective,
	FieldDirective,
	RadioDirective,
	CheckboxDirective,
	ToggleDirective,
];

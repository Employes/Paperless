import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

import {
	PCheckboxDirective,
	PFieldDirective,
	PFieldNumberDirective,
	PButton,
	PCheckbox,
	PField,
	PToggle,
	PRadioDirective,
	PToggleDirective,
} from 'projects/paperless/src/public-api';

@Component({
	templateUrl: 'inputs.component.html',
	imports: [
		PToggle,
		PField,
		PCheckbox,
		PButton,
		ReactiveFormsModule,
		JsonPipe,
		PFieldDirective,
		PFieldNumberDirective,
		PToggleDirective,
		PCheckboxDirective,
		PRadioDirective,
	],
})
export class InputsComponent {
	public form = new FormGroup({
		toggleOne: new FormControl<boolean>(true),
		toggleTwo: new FormControl<boolean>(false),
		checkboxOne: new FormControl<boolean | 'indeterminate'>(true),
		checkboxTwo: new FormControl<boolean | 'indeterminate'>(false),
		radio: new FormControl<'a' | 'b' | null>(null),
		text: new FormControl<string | null>(null),
		number: new FormControl<number | null>(null),
	});
}

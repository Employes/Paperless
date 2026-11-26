import { JsonPipe } from '@angular/common';
import { Component, signal } from '@angular/core';
import { form, FormField, FormRoot, required } from '@angular/forms/signals';

import {
	PButton,
	PCheckbox,
	PCheckboxSignalDirective,
	PField,
	PFieldNumberSignalDirective,
	PFieldSignalDirective,
	PRadioSignalDirective,
	PSelect,
	PSelectSignalDirective,
	PToggle,
	PToggleSignalDirective,
} from '../../../../../../paperless/src/public-api';

interface Model {
	toggleOne: boolean;
	toggleTwo: boolean;
	checkboxOne: boolean;
	checkboxTwo: boolean;
	radio: 'a' | 'b' | null;
	text: string;
	number: number | null;
	select: number | null;
}

@Component({
	templateUrl: 'signal.component.html',
	imports: [
		PToggle,
		PField,
		PCheckbox,
		PButton,
		PSelect,
		JsonPipe,
		FormRoot,
		FormField,
		PFieldSignalDirective,
		PFieldNumberSignalDirective,
		PToggleSignalDirective,
		PCheckboxSignalDirective,
		PRadioSignalDirective,
		PSelectSignalDirective,
	],
})
export class InputsSignalComponent {
	public readonly checkboxOneIndeterminate = signal(false);

	public readonly model = signal<Model>({
		toggleOne: true,
		toggleTwo: false,
		checkboxOne: true,
		checkboxTwo: false,
		radio: null,
		text: '',
		number: null,
		select: null,
	});

	public selectOptions = [
		{ text: 'Option 1', value: 1 },
		{ text: 'Option 2', value: 2 },
	];

	public form = form(this.model, schema => {
		required(schema.text);
	});
}

import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { PaperlessModule } from 'projects/paperless/src/public-api';

@Component({
	templateUrl: 'inputs.component.html',
	standalone: true,
	imports: [PaperlessModule, ReactiveFormsModule, JsonPipe],
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

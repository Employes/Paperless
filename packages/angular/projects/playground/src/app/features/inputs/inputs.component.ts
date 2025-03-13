import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
	templateUrl: 'inputs.component.html',
})
export class InputsComponent {
	public form = new FormGroup({
		radio: new FormControl<'a' | 'b' | null>(null),
		text: new FormControl<string | null>(null),
	});
}

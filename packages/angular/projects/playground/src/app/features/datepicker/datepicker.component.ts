import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

import {
	PDatepickerDirective,
	PDatepicker,
} from 'projects/paperless/src/public-api';

@Component({
	templateUrl: 'datepicker.component.html',
	imports: [ReactiveFormsModule, PDatepicker, PDatepickerDirective],
})
export class DatepickerComponent {
	public form = new FormGroup({
		startDate: new FormControl(null),
		endDate: new FormControl(null),
	});
}

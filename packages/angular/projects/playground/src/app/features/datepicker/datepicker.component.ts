import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { PaperlessModule } from 'projects/paperless/src/public-api';

@Component({
	templateUrl: 'datepicker.component.html',
	standalone: true,
	imports: [PaperlessModule, ReactiveFormsModule],
})
export class DatepickerComponent {
	public form = new FormGroup({
		startDate: new FormControl(null),
		endDate: new FormControl(null),
	});
}

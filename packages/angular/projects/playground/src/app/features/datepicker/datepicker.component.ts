import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

import {
	PDatepicker,
	PDatepickerDirective,
} from 'projects/paperless/src/public-api';

@UntilDestroy({ checkProperties: true })
@Component({
	templateUrl: 'datepicker.component.html',
	imports: [ReactiveFormsModule, PDatepicker, PDatepickerDirective],
})
export class DatepickerComponent implements OnInit {
	public form = new FormGroup({
		startDate: new FormControl<Date | null>(null),
		endDate: new FormControl<Date | null>(null),
	});

	ngOnInit() {
		this.form.valueChanges
			.pipe(untilDestroyed(this))
			.subscribe(value => console.log('date changed', value));

		setTimeout(() => {
			this.form.get('startDate')?.setValue(new Date());
		}, 1000);
	}
}

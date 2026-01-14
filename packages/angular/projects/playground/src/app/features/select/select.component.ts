import { AsyncPipe, JsonPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

import { PaperlessModule } from 'projects/paperless/src/public-api';

@Component({
	templateUrl: 'select.component.html',
	standalone: true,
	imports: [PaperlessModule, AsyncPipe, JsonPipe, ReactiveFormsModule],
})
export class SelectComponent implements OnInit {
	public items$ = new BehaviorSubject<any[]>([]);
	public loading$ = new BehaviorSubject(true);

	public options = [];
	public form = new FormGroup({
		single: new FormControl(null),
		multi: new FormControl([]),
	});

	ngOnInit() {
		setTimeout(() => {
			this.items$.next([
				{
					value: 1,
					text: 'Value 1',
					avatar:
						'https://images.unsplash.com/photo-1594815550232-e615b7a46f25?auto=format&fit=crop&crop=faces&w=150&h=150&q=80',
				},
				{ value: 2, text: 'Value 2', letters: 'JH' },
				{
					value: 3,
					text: 'Value 3',
					avatar:
						'https://images.unsplash.com/photo-1594815550232-e615b7a46f25?auto=format&fit=crop&crop=faces&w=150&h=150&q=80',
				},
			]);
			this.loading$.next(false);
		}, 5000);
	}
}

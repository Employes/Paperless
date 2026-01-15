import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { state } from '@paperless/core';

import {
	CropperDirective,
	PAvatar,
	PCropper,
} from 'projects/paperless/src/public-api';

@Component({
	templateUrl: 'cropper.component.html',
	imports: [PCropper, PAvatar, ReactiveFormsModule, CropperDirective],
})
export class CropperComponent {
	public state = state;
	public form = new FormGroup({
		user: new FormControl(
			'https://images.unsplash.com/photo-1580314737657-8456bc907659?auto=format&fit=crop&crop=faces&w=500&h=500&q=80'
		),
		company: new FormControl(
			'https://images.unsplash.com/photo-1607435097405-db48f377bff6?auto=format&fit=crop&crop=faces&w=500&h=500&q=80'
		),
	});
}

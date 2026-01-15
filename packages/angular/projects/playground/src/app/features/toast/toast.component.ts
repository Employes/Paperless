import { Component } from '@angular/core';

import {
	PButton,
	ToastService,
	ToastVariants,
} from 'projects/paperless/src/public-api';

@Component({
	templateUrl: 'toast.component.html',
	standalone: true,
	imports: [PButton],
})
export class ToastComponent {
	public variants = {
		neutral: ToastVariants.Neutral,
		positive: ToastVariants.Positive,
		biased: ToastVariants.Biased,
		negative: ToastVariants.Negative,
	};

	constructor(private _toast: ToastService) {}

	showToast(variant: ToastVariants) {
		this._toast.show(
			variant,
			'This is a toast message This is a toast message This is a toast message This is a toast message ',
			variant,
			{
				delay: 'infinite',
			}
		);
	}
}

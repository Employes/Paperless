import { Component } from '@angular/core';

import {
	PButton,
	ToastService,
	PToastVariants,
} from 'projects/paperless/src/public-api';

@Component({
	templateUrl: 'toast.component.html',
	standalone: true,
	imports: [PButton],
})
export class ToastComponent {
	public variants = {
		neutral: PToastVariants.Neutral,
		positive: PToastVariants.Positive,
		biased: PToastVariants.Biased,
		negative: PToastVariants.Negative,
	};

	constructor(private _toast: ToastService) {}

	showToast(variant: PToastVariants) {
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

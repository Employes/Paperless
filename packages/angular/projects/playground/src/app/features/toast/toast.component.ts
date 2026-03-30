import { Component, inject } from '@angular/core';

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
	private readonly _toast = inject(ToastService);

	public variants = {
		neutral: PToastVariants.Neutral,
		positive: PToastVariants.Positive,
		biased: PToastVariants.Biased,
		negative: PToastVariants.Negative,
	};

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

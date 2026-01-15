import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';

import { ToastData, ToastOptions, ToastVariants } from './types';

@Injectable({
	providedIn: 'root',
})
export class ToastService {
	private _toasts: ToastData[] = [];
	public toasts$ = new BehaviorSubject(this._toasts);

	public defaultOptions: ToastOptions = {
		delay: 5000,
		dismissOnAction: true,

		enableAction: true,

		icon: {
			variant: 'negative',
		},
	};

	show(
		header: string,
		content: string,
		variant: ToastVariants = ToastVariants.Success,
		options: ToastOptions = {}
	) {
		options = {
			...this.defaultOptions,
			...options,
			icon: options?.icon
				? { ...this.defaultOptions.icon, ...options.icon }
				: this.defaultOptions.icon,
		};

		const identifier = uuidv4();

		this._toasts.push({
			identifier,
			header,
			content,
			variant,
			options,
		});
		this.toasts$.next(this._toasts);

		return identifier;
	}

	hide(id: string) {
		const index = this._toasts.findIndex(({ identifier }) => identifier === id);
		this._toasts.splice(index, 1);
		this.toasts$.next(this._toasts);

		return id;
	}
}

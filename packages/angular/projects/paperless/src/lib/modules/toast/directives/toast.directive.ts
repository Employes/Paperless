import { Directive, OnInit, input, output } from '@angular/core';

import { PToastActionFunction } from '../types';

@Directive({
	selector: 'p-toast',
	host: {
		'(action)': 'onAction()',
	},
	standalone: true,
})
export class PToastDirective implements OnInit {
	readonly delay = input<number | 'infinite'>(5000);
	readonly identifier = input.required<string>();
	readonly dismissOnAction = input(true);
	readonly actionFunc = input<PToastActionFunction>();
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	readonly actionData = input<any>({});

	readonly dismiss = output<string>();

	ngOnInit(): void {
		const delay = this.delay();
		if (delay === 'infinite' || delay === 0) {
			return;
		}

		setTimeout(() => this.doDismiss(), delay);
	}

	onAction() {
		const actionFunc = this.actionFunc();
		if (this.dismissOnAction() && !actionFunc) {
			return this.doDismiss();
		}

		if (actionFunc) {
			actionFunc(this, this.actionData());
		}
	}

	doDismiss() {
		this.dismiss.emit(this.identifier());
	}
}

import { Directive, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { PToastActionFunction } from '../types';

@Directive({
	selector: 'p-toast',
	host: {
		'(action)': 'onAction()',
	},
	standalone: true,
})
export class PToastDirective implements OnInit {
	@Input() delay: number | 'infinite' = 5000;
	@Input() identifier!: string;
	@Input() dismissOnAction = true;
	@Input() actionFunc?: PToastActionFunction;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	@Input() actionData: any = {};

	@Output() dismiss = new EventEmitter<string>();

	ngOnInit(): void {
		if (this.delay === 'infinite' || this.delay === 0) {
			return;
		}

		setTimeout(() => this.doDismiss(), this.delay);
	}

	onAction() {
		if (this.dismissOnAction && !this.actionFunc) {
			return this.doDismiss();
		}

		if (this.actionFunc) {
			this.actionFunc(this, this.actionData);
		}
	}

	doDismiss() {
		this.dismiss.next(this.identifier);
	}
}

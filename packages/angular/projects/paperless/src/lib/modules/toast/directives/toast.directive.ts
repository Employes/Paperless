import { Directive, EventEmitter, Input, Output } from '@angular/core';
import { ToastActionFunction } from '../types';

@Directive({
    selector: 'p-toast',
    host: {
        '(action)': 'onAction()',
    },
    standalone: false
})
export class ToastDirective {
	@Input() delay: number | 'infinite' = 5000;
	@Input() identifier!: string;
	@Input() dismissOnAction: boolean = true;
	@Input() actionFunc?: ToastActionFunction;
	@Input() actionData: any = {};

	@Output() dismiss: EventEmitter<string> = new EventEmitter();

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

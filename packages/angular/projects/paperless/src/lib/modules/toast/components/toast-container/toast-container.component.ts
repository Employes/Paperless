import { AsyncPipe } from '@angular/common';
import {
	ChangeDetectionStrategy,
	Component,
	ElementRef,
	inject,
	NgZone,
} from '@angular/core';
import { map } from 'rxjs';

import { Components } from '@paperless/core';

import { ProxyCmp } from '../../../../stencil/angular-component-lib/utils';
import { PToast } from '../../../../stencil/components';
import { ToastDirective } from '../../directives/toast.directive';
import { ToastService } from '../../toast.service';

export declare interface PToastContainer extends Components.PToastContainer {
	placement: 'top-start' | 'top-end' | 'bottom-start' | 'bottom-end';
}

/* top-0 bottom-0 left-0 right-0 */
@ProxyCmp({
	defineCustomElementFn: undefined,
	inputs: ['placement'],
})
@Component({
	selector: 'p-toast-container',
	changeDetection: ChangeDetectionStrategy.OnPush,
	templateUrl: './toast-container.component.html',
	inputs: ['placement'],
	standalone: true,
	imports: [PToast, ToastDirective, AsyncPipe],
})
export class ToastContainerComponent {
	private _toastService: ToastService = inject(ToastService);
	public toasts$ = this._toastService.toasts$.pipe(
		map(arr => arr.toReversed())
	);

	protected el: HTMLElement;
	constructor(
		r: ElementRef,
		protected z: NgZone
	) {
		this.el = r.nativeElement;
	}

	dismiss(identifier: string) {
		this._toastService.hide(identifier);
	}
}

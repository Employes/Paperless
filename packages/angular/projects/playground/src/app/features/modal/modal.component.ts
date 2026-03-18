import { CdkPortal, TemplatePortal } from '@angular/cdk/portal';
import { Component, signal } from '@angular/core';

import { TestCropperModalComponent } from './cropper-modal.component';
import { TestModalComponent } from './test-modal.component';

import {
	OverlayRef,
	OverlayService,
	PButton,
	PModal,
} from 'projects/paperless/src/public-api';

@Component({
	templateUrl: 'modal.component.html',
	imports: [PButton, CdkPortal, PModal],
})
export class ModalComponent {
	private _templateModalRef!: OverlayRef<CdkPortal>;

	private test = signal<string>('aaa');

	constructor(private _overlay: OverlayService) {}

	showModal() {
		this._overlay.open<TestModalComponent>(TestModalComponent);
	}

	showCropperModal() {
		const ref = this._overlay.open<TestCropperModalComponent>(
			TestCropperModalComponent,
			{
				data: {
					test: this.test,
				},
			}
		);

		setTimeout(() => this.test.set('bbb'), 2000);

		ref.closed$.subscribe(() => {
			setTimeout(() => this.test.set('ccc'), 1000);
		});
	}

	showTemplateModal(template: TemplatePortal) {
		this._templateModalRef = this._overlay.open(template);
	}

	closeTemplateModal() {
		if (!this._templateModalRef) {
			return;
		}

		this._templateModalRef.close();
	}
}

import { CdkPortal, TemplatePortal } from '@angular/cdk/portal';
import { Component } from '@angular/core';

import { TestCropperModalComponent } from './cropper-modal.component';
import { TestModalComponent } from './test-modal.component';

import {
	OverlayRef,
	OverlayService,
	PaperlessModule,
} from 'projects/paperless/src/public-api';

@Component({
	templateUrl: 'modal.component.html',
	standalone: true,
	imports: [PaperlessModule],
})
export class ModalComponent {
	private _templateModalRef!: OverlayRef<CdkPortal>;

	constructor(private _overlay: OverlayService) {}

	showModal() {
		this._overlay.open<TestModalComponent>(TestModalComponent);
	}

	showCropperModal() {
		this._overlay.open<TestCropperModalComponent>(TestCropperModalComponent);
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

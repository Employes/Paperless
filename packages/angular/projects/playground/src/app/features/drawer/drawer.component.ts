import { CdkPortal, TemplatePortal } from '@angular/cdk/portal';
import { Component, inject } from '@angular/core';

import {
	OverlayRef,
	OverlayService,
	PButton,
	PDrawer,
} from '../../../../../paperless/src/public-api';

import { TestDrawerComponent } from './test-drawer.component';

@Component({
	templateUrl: 'drawer.component.html',
	imports: [PDrawer, PButton, CdkPortal],
})
export class DrawerComponent {
	private readonly _overlay = inject(OverlayService);

	private _templateDrawerRef!: OverlayRef<CdkPortal>;

	showDrawer() {
		this._overlay.open<TestDrawerComponent>(TestDrawerComponent);
	}

	showTemplateDrawer(template: TemplatePortal) {
		this._templateDrawerRef = this._overlay.open(template);
	}

	closeTemplateDrawer() {
		if (!this._templateDrawerRef) {
			return;
		}

		this._templateDrawerRef.close();
	}
}

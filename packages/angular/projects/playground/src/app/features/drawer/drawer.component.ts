import { CdkPortal, TemplatePortal } from '@angular/cdk/portal';
import { Component } from '@angular/core';

import { TestDrawerComponent } from './test-drawer.component';

import {
	OverlayRef,
	OverlayService,
	PButton,
	PDrawer,
} from 'projects/paperless/src/public-api';

@Component({
	templateUrl: 'drawer.component.html',
	imports: [PDrawer, PButton, CdkPortal],
})
export class DrawerComponent {
	private _templateDrawerRef!: OverlayRef<CdkPortal>;

	constructor(private _overlay: OverlayService) {}

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

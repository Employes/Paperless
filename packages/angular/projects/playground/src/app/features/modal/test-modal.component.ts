import { Component } from '@angular/core';

import { OverlayRef, PaperlessModule } from 'projects/paperless/src/public-api';

@Component({
	template: `
		<p-modal
			header="Hello world"
			[show]="true"
			(closed)="close()"
		>
			<div slot="content">Content</div>
			<div
				class="flex w-full justify-between gap-4"
				slot="footer"
			>
				<p-button class="ml-auto w-full desktop-xs:w-auto"> Confirm </p-button>
			</div>
		</p-modal>
	`,
	standalone: true,
	imports: [PaperlessModule],
})
export class TestModalComponent {
	constructor(public _overlayRef: OverlayRef<TestModalComponent>) {}

	close() {
		this._overlayRef.close();
	}
}

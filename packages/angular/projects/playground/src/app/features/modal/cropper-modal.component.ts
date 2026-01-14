import { Component } from '@angular/core';
import { OverlayRef, PaperlessModule } from 'projects/paperless/src/public-api';

@Component({
	template: `
		<p-modal
			[show]="true"
			header="Cropper modal"
			(closed)="close()"
		>
			<p-cropper
				slot="content"
				value="https://images.unsplash.com/photo-1580314737657-8456bc907659?auto=format&fit=crop&crop=faces&w=500&h=500&q=80"
			></p-cropper>
			<div
				slot="footer"
				class="flex w-full justify-between gap-4"
			>
				<p-button class="ml-auto w-full desktop-xs:w-auto"> Confirm </p-button>
			</div>
		</p-modal>
	`,
	standalone: true,
	imports: [PaperlessModule],
})
export class TestCropperModalComponent {
	constructor(public _overlayRef: OverlayRef<TestCropperModalComponent>) {}

	close() {
		this._overlayRef.close();
	}
}

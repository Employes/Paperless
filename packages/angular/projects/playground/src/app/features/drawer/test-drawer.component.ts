import { Component } from '@angular/core';

import { OverlayRef, PaperlessModule } from 'projects/paperless/src/public-api';

@Component({
	template: `
		<p-drawer
			header="Drawer header"
			[show]="true"
			(closed)="close()"
		>
			<div slot="content">
				<p-card-container>
					<p-card-header header="Header">
						<p-button
							chevron
							class="ml-auto"
							icon="pencil"
							icon-only
							size="sm"
							slot="suffix"
							variant="secondary"
						/>
					</p-card-header>
					<p-card-body>
						Bereken het netto-loon en de werkgeverskosten, simpel in maar 3
						stappen weet je wat hier meer text is.
					</p-card-body>
				</p-card-container>
				<div class="h-[300vh]"></div>
				<span>The end!</span>
			</div>
		</p-drawer>
	`,
	standalone: true,
	imports: [PaperlessModule],
})
export class TestDrawerComponent {
	constructor(public _overlayRef: OverlayRef<TestDrawerComponent>) {}

	close() {
		this._overlayRef.close();
	}
}

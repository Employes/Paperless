import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

import { state } from '@paperless/core';

import {
	PAvatar,
	PButton,
	PLayout,
	PNavbar,
	PNavigationItem,
	PNavigationSection,
	PProfile,
	ToastContainerComponent,
} from 'projects/paperless/src/public-api';

@Component({
	selector: 'p-app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
	imports: [
		RouterOutlet,
		RouterLink,
		RouterLinkActive,
		PLayout,
		PNavbar,
		PNavigationSection,
		PNavigationItem,
		PProfile,
		PAvatar,
		PButton,
		ToastContainerComponent,
	],
})
export class AppComponent {
	title = 'playground';
	state = state;
}

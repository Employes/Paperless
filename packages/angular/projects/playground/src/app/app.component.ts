import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

import { state } from '@paperless/core';

import { PaperlessModule } from 'projects/paperless/src/public-api';

@Component({
	selector: 'p-app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
	standalone: true,
	imports: [PaperlessModule, RouterOutlet, RouterLink, RouterLinkActive],
})
export class AppComponent {
	title = 'playground';
	state = state;
}

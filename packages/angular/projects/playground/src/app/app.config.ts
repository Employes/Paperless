import {
	ApplicationConfig,
	importProvidersFrom,
	provideEnvironmentInitializer,
	provideZoneChangeDetection,
} from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {
	provideRouter,
	withEnabledBlockingInitialNavigation,
	withInMemoryScrolling,
	withRouterConfig,
} from '@angular/router';

import { initTheme } from '@paperless/core';

import { routes } from './app.routes';

import { PaperlessModule } from 'projects/paperless/src/public-api';

export const appConfig: ApplicationConfig = {
	providers: [
		provideZoneChangeDetection(),
		importProvidersFrom(ReactiveFormsModule, PaperlessModule),
		provideRouter(
			routes,
			withRouterConfig({
				onSameUrlNavigation: 'reload',
				paramsInheritanceStrategy: 'always',
			}),
			withEnabledBlockingInitialNavigation(),
			withInMemoryScrolling({
				scrollPositionRestoration: 'enabled',
				anchorScrolling: 'enabled',
			})
		),

		provideEnvironmentInitializer(() => initTheme(true, 'employes-theme')),
	],
};

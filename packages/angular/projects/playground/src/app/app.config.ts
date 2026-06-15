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

import { PaperlessModule } from '../../../paperless/src/public-api';

import { routes } from './app.routes';

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

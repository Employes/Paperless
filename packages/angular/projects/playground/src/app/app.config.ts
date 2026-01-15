import {
	ApplicationConfig,
	importProvidersFrom,
	provideEnvironmentInitializer,
} from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {
	provideRouter,
	withEnabledBlockingInitialNavigation,
	withInMemoryScrolling,
	withRouterConfig,
} from '@angular/router';

import { initTheme } from '@paperless/core';
import { defineCustomElements } from '@paperless/core/loader';

import { routes } from './app.routes';

import { PaperlessModule } from 'projects/paperless/src/public-api';

export const appConfig: ApplicationConfig = {
	providers: [
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

		provideEnvironmentInitializer(() => defineCustomElements()),
		provideEnvironmentInitializer(() => initTheme(true, 'employes-theme')),
	],
};

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

import { defineCustomElements } from '@paperless/core/loader';

defineCustomElements();
platformBrowserDynamic()
	.bootstrapModule(AppModule)
	.catch(err => console.error(err));

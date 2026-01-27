import { CurrencyPipe, DatePipe } from '@angular/common';
import { NgModule, provideAppInitializer } from '@angular/core';

import { defineCustomElements } from '@paperless/core/loader';

import { DIRECTIVES } from './directives';
import { MODULES } from './modules';
import { PIPES } from './pipes';
import { DIRECTIVES as STENCIL_DIRECTIVES } from './stencil';

const NGX_PIPES = [DatePipe, CurrencyPipe];

@NgModule({
	imports: [...STENCIL_DIRECTIVES, ...DIRECTIVES, ...MODULES, ...PIPES],
	exports: [...MODULES, ...DIRECTIVES, ...STENCIL_DIRECTIVES, ...PIPES],
	providers: [
		...NGX_PIPES,
		...PIPES,
		provideAppInitializer(() => defineCustomElements()),
	],
})
export class PaperlessModule {}

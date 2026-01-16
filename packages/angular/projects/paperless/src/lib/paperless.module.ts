import { CurrencyPipe, DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';

import { DIRECTIVES } from './directives';
import { MODULES } from './modules';
import { PIPES } from './pipes';
import { DIRECTIVES as STENCIL_DIRECTIVES } from './stencil';

const NGX_PIPES = [DatePipe, CurrencyPipe];

@NgModule({
	imports: [...STENCIL_DIRECTIVES, ...DIRECTIVES, ...MODULES, ...PIPES],
	exports: [...MODULES, ...DIRECTIVES, ...STENCIL_DIRECTIVES, ...PIPES],
	providers: [...NGX_PIPES],
})
export class PaperlessModule {}

import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';

import { DIRECTIVES } from './directives';
import { MODULES } from './modules';
import { PIPES } from './pipes';
import { StencilModule } from './stencil.module';

const NGX_PIPES = [DatePipe, CurrencyPipe];

@NgModule({
	imports: [CommonModule, StencilModule, ...MODULES],
	declarations: [...DIRECTIVES, ...PIPES],
	exports: [StencilModule, ...MODULES, ...DIRECTIVES, ...PIPES],
	providers: [...NGX_PIPES, ...PIPES],
})
export class PaperlessModule {}

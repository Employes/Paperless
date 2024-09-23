import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { DIRECTIVES } from './directives';
import { MODULES, TOAST_SERVICES } from './modules';
import { OVERLAY_SERVICES } from './modules/overlay';
import { PIPES } from './pipes';
import { StencilModule } from './stencil.module';

const NGX_PIPES = [DatePipe, CurrencyPipe];

@NgModule({
	imports: [CommonModule, StencilModule, ...MODULES],
	declarations: [...DIRECTIVES, ...PIPES],
	exports: [StencilModule, ...MODULES, ...DIRECTIVES, ...PIPES],
	providers: [...NGX_PIPES, ...PIPES],
})
export class PaperlessModule {
	static forRoot(): ModuleWithProviders<PaperlessModule> {
		return {
			ngModule: PaperlessModule,
			providers: [...TOAST_SERVICES, ...OVERLAY_SERVICES],
		};
	}
}

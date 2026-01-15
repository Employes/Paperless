import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { StencilModule } from '../../stencil.module';

import { TOAST_COMPONENTS } from './components';
import { TOAST_DIRECTIVES } from './directives';
import { ToastService } from './toast.service';

@NgModule({
	imports: [CommonModule, StencilModule],
	declarations: [...TOAST_COMPONENTS, ...TOAST_DIRECTIVES],
	providers: [ToastService],
	exports: [...TOAST_COMPONENTS, ...TOAST_DIRECTIVES],
})
export class ToastModule {}

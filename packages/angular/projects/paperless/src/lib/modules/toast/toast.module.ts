import { NgModule } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { TOAST_COMPONENTS } from './components';
import { TOAST_DIRECTIVES } from './directives';
import { ToastService } from './toast.service';

@NgModule({
	imports: [...TOAST_COMPONENTS, ...TOAST_DIRECTIVES],
	exports: [...TOAST_COMPONENTS, ...TOAST_DIRECTIVES],
	providers: [ToastService, provideAnimationsAsync()],
})
export class ToastModule {}

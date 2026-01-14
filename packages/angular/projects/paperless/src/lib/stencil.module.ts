import { NgModule } from '@angular/core';

import { DIRECTIVES } from './stencil';

@NgModule({
	declarations: [...DIRECTIVES],
	exports: [...DIRECTIVES],
})
export class StencilModule {}

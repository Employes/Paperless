import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TABLE_COMPONENTS } from './components';
import { TABLE_DIRECTIVES } from './directives';

@NgModule({
	imports: [
		CommonModule,
		RouterModule,
		...TABLE_COMPONENTS,
		...TABLE_DIRECTIVES,
	],
	exports: [...TABLE_COMPONENTS, ...TABLE_DIRECTIVES],
})
export class TableModule {}

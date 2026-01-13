import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { StencilModule } from '../../stencil.module';

import { ObserversModule } from '@angular/cdk/observers';
import { OverlayModule as CDKOverlayModule } from '@angular/cdk/overlay';
import { PlatformModule } from '@angular/cdk/platform';
import { PortalModule } from '@angular/cdk/portal';
import { OverlayService } from './overlay.service';

@NgModule({
	imports: [
		CommonModule,
		StencilModule,
		CDKOverlayModule,
		PlatformModule,
		ObserversModule,
		PortalModule,
	],
	providers: [OverlayService],
	exports: [PortalModule],
})
export class OverlayModule {}

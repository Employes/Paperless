import { ObserversModule } from '@angular/cdk/observers';
import { OverlayModule as CDKOverlayModule } from '@angular/cdk/overlay';
import { PlatformModule } from '@angular/cdk/platform';
import { PortalModule } from '@angular/cdk/portal';
import { NgModule } from '@angular/core';

import { OverlayService } from './overlay.service';

@NgModule({
	imports: [CDKOverlayModule, PlatformModule, ObserversModule, PortalModule],
	providers: [OverlayService],
	exports: [PortalModule],
})
export class OverlayModule {}

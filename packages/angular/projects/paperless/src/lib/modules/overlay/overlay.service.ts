/* eslint-disable @typescript-eslint/no-explicit-any */
import {
	Overlay,
	OverlayConfig,
	OverlayRef as CDKOverlayRef,
} from '@angular/cdk/overlay';
import { CdkPortal, ComponentPortal, ComponentType } from '@angular/cdk/portal';
import {
	ComponentRef,
	Injectable,
	Injector,
	StaticProvider,
} from '@angular/core';

import { OverlayRef } from './overlay.ref';

interface ModalOptions {
	data?: any;
	providers?: StaticProvider[];
}

@Injectable()
export class OverlayService {
	public overlayRef!: OverlayRef<any>;
	constructor(
		private injector: Injector,
		private overlay: Overlay
	) {}

	open<T>(component: ComponentType<T> | CdkPortal, options: ModalOptions = {}) {
		const overlay = this._createOverlay();
		const overlayRef = new OverlayRef<T>(overlay);

		this._attachModalContainer<T>(
			overlay,
			overlayRef,
			component,
			options.providers ?? []
		);

		this._attachData<T>(overlayRef, options);

		this.overlayRef = overlayRef;
		return overlayRef;
	}

	private _attachModalContainer<T>(
		overlay: CDKOverlayRef,
		overlayRef: OverlayRef<T>,
		component: ComponentType<T> | CdkPortal,
		providers: StaticProvider[]
	) {
		const injector = this._createInjector<T>(overlayRef, providers);

		const containerPortal =
			component instanceof CdkPortal
				? component
				: new ComponentPortal(component, null, injector);
		const containerRef: ComponentRef<T> = overlay.attach(containerPortal);

		overlayRef.instance = containerRef.instance;

		return containerRef.instance;
	}

	private _createInjector<T>(
		overlayRef: OverlayRef<T>,
		providers: StaticProvider[]
	): Injector {
		return Injector.create({
			providers: [
				{
					provide: OverlayRef,
					useValue: overlayRef,
				},
				...providers,
			],
			parent: this.injector,
		});
	}

	private _getOverlayConfig(): OverlayConfig {
		const positionStrategy = this.overlay
			.position()
			.global()
			.centerHorizontally()
			.centerVertically();

		const overlayConfig = new OverlayConfig({
			hasBackdrop: false,
			scrollStrategy: this.overlay.scrollStrategies.block(),
			positionStrategy,
		});

		return overlayConfig;
	}

	private _createOverlay() {
		// Returns an OverlayConfig
		const overlayConfig = this._getOverlayConfig();

		// Returns an OverlayRef
		return this.overlay.create(overlayConfig);
	}

	private _attachData<T>(overlayRef: OverlayRef<T>, options: ModalOptions) {
		if (options.data && typeof options.data === 'object') {
			for (const key of Object.keys(options.data)) {
				(overlayRef.instance as any)[key] = options.data[key];
			}
		}
	}
}

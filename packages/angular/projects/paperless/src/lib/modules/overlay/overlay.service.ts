/* eslint-disable @typescript-eslint/no-explicit-any */
import {
	OverlayRef as CDKOverlayRef,
	createOverlayRef,
	Overlay,
	OverlayConfig,
} from '@angular/cdk/overlay';
import {
	CdkPortal,
	ComponentPortal,
	ComponentType,
	TemplatePortal,
} from '@angular/cdk/portal';
import {
	ComponentRef,
	inject,
	Injectable,
	Injector,
	StaticProvider,
	TemplateRef,
} from '@angular/core';

import { OverlayRef } from './overlay.ref';

interface ModalOptions {
	data?: any;
	providers?: StaticProvider[];
}

@Injectable()
export class OverlayService {
	private readonly overlay = inject(Overlay);
	private readonly injector = inject(Injector);

	public overlayRef!: OverlayRef<any>;

	open<T>(
		component: ComponentType<T> | TemplateRef<T> | CdkPortal,
		options: ModalOptions = {}
	) {
		const overlay = this._createOverlay();
		const overlayRef = new OverlayRef<T>(overlay);

		this._attachModalContainer<T>(
			overlay,
			overlayRef,
			component,
			options.providers ?? [],
			options.data ?? {}
		);

		this._attachData<T>(overlayRef, options);

		this.overlayRef = overlayRef;
		return overlayRef;
	}

	private _attachModalContainer<T>(
		overlay: CDKOverlayRef,
		overlayRef: OverlayRef<T>,
		component: ComponentType<T> | TemplateRef<T> | CdkPortal,
		providers: StaticProvider[],
		data: any
	) {
		const injector = this._createInjector<T>(overlayRef, providers);

		const containerPortal =
			component instanceof CdkPortal
				? component
				: component instanceof TemplateRef
					? new TemplatePortal<any>(
							component,
							null!,
							{ $implicit: data },
							injector
						)
					: new ComponentPortal(component, null, injector);
		const containerRef: ComponentRef<T> = overlay.attach(containerPortal);

		overlayRef.componentRef = containerRef;
		overlayRef.instance = containerRef.instance;
		overlayRef.injector = injector;
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
			usePopover: false,
			scrollStrategy: this.overlay.scrollStrategies.block(),
			positionStrategy,
		});

		return overlayConfig;
	}

	private _createOverlay() {
		// Returns an OverlayConfig
		const config = this._getOverlayConfig();
		// Returns an OverlayRef
		return createOverlayRef(this.injector, config);
	}

	private _attachData<T>(overlayRef: OverlayRef<T>, options: ModalOptions) {
		if (!options.data || typeof options.data !== 'object') {
			return;
		}

		if (overlayRef.instance instanceof TemplateRef) {
			return;
		}

		overlayRef.createEffect();
		overlayRef.data.set(options.data);
	}
}

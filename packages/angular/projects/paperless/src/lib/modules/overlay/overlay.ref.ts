import { OverlayRef as CDKOverlayRef } from '@angular/cdk/overlay';
import {
	ComponentRef,
	effect,
	EffectRef,
	Injector,
	signal,
} from '@angular/core';
import { Subject } from 'rxjs';

export class OverlayRef<T> {
	public instance!: T;
	public componentRef!: ComponentRef<T>;
	public injector!: Injector;
	public effectRef!: EffectRef;

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	public readonly data = signal<any>({});
	public readonly closed$ = new Subject();

	constructor(private _overlay: CDKOverlayRef) {}

	createEffect() {
		if (!this.injector || !this.componentRef) {
			return;
		}

		this.effectRef = effect(
			() => {
				const data = this.data();
				for (const key of Object.keys(data)) {
					const value =
						typeof data[key] === 'function' ? data[key]() : data[key];
					this.componentRef.setInput(key, value);
				}
			},
			{
				injector: this.injector,
			}
		);
	}

	close(): void {
		this._overlay.dispose();
		this.closed$.next(null);

		if (this.effectRef) {
			this.effectRef.destroy();
		}
	}
}

import { Component, h, Prop } from '@stencil/core';
import { Observable, Subscription } from 'rxjs';

import { ThemedHost } from '../../../internal/themed-host.component';

@Component({
	tag: 'p-loader',
	styleUrl: 'loader.component.scss',
	shadow: true,
})
export class Loader {
	/**
	 * Wether to show or hide the loader
	 */
	@Prop() show: boolean | Observable<boolean> = true;

	/**
	 * Variant of loader
	 */
	@Prop() variant: 'inline' | 'full-width' | 'full-screen' | 'modal' | 'ghost' =
		'inline';

	/**
	 * Color of the loader
	 */
	@Prop() color: 'indigo' | 'white' | 'off-white' | 'storm' = 'indigo';

	/**
	 * !NOT IMPLEMENTED! Modal title for modal variant
	 */
	@Prop() modalTitle: string;

	/**
	 * !NOT IMPLEMENTED! Modal description for modal variant
	 */
	@Prop() modalDescription: string;

	private _show: boolean | Observable<boolean> = false;
	private _showSubscriber: Subscription;

	componendDidLoad() {
		this._show = this.show;
	}

	componentWillRender() {
		this._checkShow();
	}

	componentShouldUpdate() {
		this._checkShow();
	}

	render() {
		if (!this._show) {
			return;
		}

		if (this.variant === 'ghost') {
			return (
				<ThemedHost class='variant-ghost min-h-4 min-w-4 rounded-2xl'></ThemedHost>
			);
		}

		const loader = (
			<div
				class={`
      loader
      color-${this.color}
    `}
			></div>
		);

		if (this.variant === 'full-screen') {
			return (
				<ThemedHost class='variant-full-screen'>
					<div class='loading-screen'>
						<div class='content'>
							<slot />
						</div>
					</div>
				</ThemedHost>
			);
		}

		return (
			<ThemedHost
				class={`
      variant-default flex
      ${this.variant === 'full-width' && 'w-full justify-center text-4xl'}
    `}
			>
				{loader}
			</ThemedHost>
		);
	}

	private _checkShow() {
		if (this._showSubscriber) {
			this._showSubscriber.unsubscribe();
			this._showSubscriber = null;
		}

		if (typeof this.show !== 'boolean') {
			this._showSubscriber = this.show?.subscribe(show => (this._show = show));
			return;
		}

		this._show = this.show;
	}
}

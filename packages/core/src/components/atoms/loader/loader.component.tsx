import { Component, h, Host, Prop } from '@stencil/core';
import { Observable, Subscription } from 'rxjs';

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
	@Prop() color: 'supportive-lilac' | 'white' | 'off-white' | 'black-teal' =
		'supportive-lilac';

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
			return <Host class='variant-ghost min-h-4 min-w-4 rounded-2xl'></Host>;
		}

		const loader = <div class={`loader color-${this.color}`}></div>;

		if (this.variant === 'full-screen') {
			return (
				<Host class='variant-full-screen'>
					<div class='loading-screen'>
						<div class='content'>
							<slot />
						</div>
					</div>
				</Host>
			);
		}

		return (
			<Host
				class={`variant-default flex ${
					this.variant === 'full-width' && 'flex w-full justify-center text-4xl'
				}`}
			>
				{loader}
			</Host>
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

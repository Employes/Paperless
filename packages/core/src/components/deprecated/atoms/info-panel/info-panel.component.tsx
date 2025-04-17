import {
	Component,
	Element,
	h,
	Host,
	Prop,
	Event,
	EventEmitter,
} from '@stencil/core';

@Component({
	tag: 'p-info-panel',
	styleUrl: 'info-panel.component.scss',
	shadow: true,
})
export class InfoPanel {
	/**
	 * The variant of the info panel
	 */
	@Prop() variant: 'info' | 'negative' | 'positive' | 'unbiased' = 'info';

	/**
	 * The header of the info panel
	 */
	@Prop() header: string;

	/**
	 * The content of the info panel
	 */
	@Prop() content: string;

	/**
	 * Wether the panel can be closed
	 */
	@Prop() closeable: boolean = false;

	/**
	 * When the backdrop is clicked
	 */
	@Event({
		bubbles: false,
	})
	closed: EventEmitter<void>;

	/**
	 * The host element
	 */
	@Element() private _el: HTMLElement;

	render() {
		return (
			<Host
				class={`p-info-panel variant-${this.variant} ${
					this.closeable && 'has-close'
				}`}
			>
				<div class='header'>
					<slot name='header' />
				</div>
				<div class='content'>
					<slot name='content' />
				</div>

				{this.closeable && (
					<div
						class='close'
						onClick={() => this._close()}
					>
						<p-icon variant='negative' />
					</div>
				)}
			</Host>
		);
	}

	private _close() {
		this.closed.emit();
		this._el.remove();
	}
}

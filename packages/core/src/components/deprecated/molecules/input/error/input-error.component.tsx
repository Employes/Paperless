import { Component, h, Host, Prop, State } from '@stencil/core';

@Component({
	tag: 'p-input-error',
	shadow: true,
})
export class InputError {
	/**
	 * The error to show
	 */
	@Prop() error: string;

	/**
	 * Wether to force show the tooltip
	 */
	@Prop() forceShowTooltip = false;

	@State() private _showTooltip = false;

	render() {
		return (
			<Host class='p-input-error'>
				<p-tooltip
					variant='error'
					content={this.error}
					show={this.forceShowTooltip}
					onIsOpen={ev => (this._showTooltip = ev.detail)}
				>
					<p-icon
						class={`${
							this._showTooltip ? 'text-negative' : 'text-negative-light'
						} hover:text-negative`}
						slot='trigger'
						variant='question-circle'
					/>
				</p-tooltip>
			</Host>
		);
	}
}

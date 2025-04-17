import { Component, Event, EventEmitter, h, Host, Prop } from '@stencil/core';

@Component({
	tag: 'p-modal-header',
	styleUrl: 'modal-header.component.scss',
	shadow: true,
})
export class ModalHeader {
	/**
	 * Wether to show the close button on mobile
	 */
	@Prop() showClose = true;

	/**
	 * Close click event
	 */
	@Event({
		bubbles: false,
	})
	close: EventEmitter<MouseEvent>;

	render() {
		return (
			<Host class='p-modal-header'>
				<span>
					<slot />
				</span>

				{this.showClose && (
					<p-button
						variant='secondary'
						icon='negative'
						iconOnly={true}
						onClick={ev => this.close.emit(ev)}
						size='sm'
					></p-button>
				)}
			</Host>
		);
	}
}

import { Component, Event, EventEmitter, h, Host, Prop } from '@stencil/core';

@Component({
	tag: 'p-drawer-header',
	styleUrl: 'drawer-header.component.scss',
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
			<Host class='p-drawer-header'>
				{this.showClose && (
					<p-button
						variant='secondary'
						icon='negative'
						iconOnly={true}
						onClick={() => this.close.emit()}
						size='sm'
					></p-button>
				)}

				<slot />
			</Host>
		);
	}
}

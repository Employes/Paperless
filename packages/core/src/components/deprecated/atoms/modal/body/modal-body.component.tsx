import { Component, h, Host, Prop } from '@stencil/core';

@Component({
	tag: 'p-modal-body',
	styleUrl: 'modal-body.component.scss',
	shadow: true,
})
export class ModalBody {
	/**
	 * The variant of the modal body
	 */
	@Prop() variant: 'default' | 'table-flush' = 'default';

	/**
	 * Wether the modal body should be rounded at the bottom
	 */
	@Prop() roundedBottom: boolean = false;

	/**
	 * Wether the modal body should be rounded at the top
	 */
	@Prop() roundedTop: boolean = false;

	/**
	 * Wether the body should have padding
	 */
	@Prop() padding: boolean = true;

	render() {
		return (
			<Host
				class={`p-modal-body variant-${this.variant} ${
					this.roundedBottom && 'is-rounded-bottom'
				} ${
					this.roundedTop && 'is-rounded-top'
				} ${!this.padding && 'no-padding'}`}
			>
				<slot />
			</Host>
		);
	}
}

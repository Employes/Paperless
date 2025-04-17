import { Component, h, Host, Prop } from '@stencil/core';

@Component({
	tag: 'p-card-body',
	styleUrl: 'card-body.component.scss',
})
export class CardBody {
	/**
	 * Wether the button should inherit text styles
	 */
	@Prop({ reflect: true }) inheritText: boolean = false;

	render() {
		return (
			<Host class="p-card-body">
				<slot />
			</Host>
		);
	}
}

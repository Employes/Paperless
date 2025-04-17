import { Component, h, Host, Prop } from '@stencil/core';

@Component({
	tag: 'p-card-container',
	styleUrl: 'card-container.component.scss',
	shadow: true,
})
export class CardContainer {
	/**
	 * Wether the card should be hoverable
	 */
	@Prop({ reflect: true }) hoverable: boolean = false;

	/**
	 * Wether the card should have shadow
	 */
	@Prop({ reflect: true }) shadow: boolean = true;

	render() {
		return (
			<Host class='p-card-container group'>
				<slot />
			</Host>
		);
	}
}

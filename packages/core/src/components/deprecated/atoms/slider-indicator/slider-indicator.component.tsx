import { Component, h, Host, Prop } from '@stencil/core';

@Component({
	tag: 'p-slider-indicator',
	styleUrl: 'slider-indicator.component.scss',
	shadow: true,
})
export class SliderIndicator {
	/**
	 * Wether the slider indicator is active
	 */
	@Prop() active: boolean = false;

	render() {
		return (
			<Host
				class={`p-slider-indicator ${this.active && 'active'}`}
			></Host>
		);
	}
}

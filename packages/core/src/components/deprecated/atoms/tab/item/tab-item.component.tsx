import { Component, h, Host, Prop } from '@stencil/core';

@Component({
	tag: 'p-tab-item',
	styleUrl: 'tab-item.component.scss',
	shadow: true,
})
export class TabItem {
	/**
	 * Wether the tab item is active
	 */
	@Prop() active: boolean = false;

	render() {
		return (
			<Host class={`p-tab-item ${this.active && 'active'}`}>
				<slot />
			</Host>
		);
	}
}

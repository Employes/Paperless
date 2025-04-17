import { Component, h, Host, Prop } from '@stencil/core';

@Component({
	tag: 'p-table-container',
	styleUrl: 'table-container.component.scss',
	shadow: true,
})
export class TableContainer {
	/*
	 * Wether to show the shadow or not
	 */
	@Prop() shadow: boolean = true;

	render() {
		return (
			<Host class={`p-table-container ${!this.shadow && 'no-shadow'}`}>
				<slot />
			</Host>
		);
	}
}

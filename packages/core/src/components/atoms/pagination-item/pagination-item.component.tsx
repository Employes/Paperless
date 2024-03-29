import { Component, h, Host, Prop } from '@stencil/core';

@Component({
	tag: 'p-pagination-item',
	styleUrl: 'pagination-item.component.scss',
	shadow: true,
})
export class PaginationItem {
	/**
	 * Wether the pagination item is active
	 */
	@Prop() active: boolean = false;

	render() {
		return (
			<Host class={`p-pagination-item ${this.active && 'active'}`}>
				<slot />
			</Host>
		);
	}
}

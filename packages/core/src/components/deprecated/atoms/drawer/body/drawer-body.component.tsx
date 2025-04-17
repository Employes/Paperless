import { Component, h, Host, Prop } from '@stencil/core';

@Component({
	tag: 'p-drawer-body',
	styleUrl: 'drawer-body.component.scss',
	shadow: true,
})
export class ModalBody {
	/**
	 * The variant of the modal body
	 */
	@Prop() variant: 'default' | 'table' = 'default';

	render() {
		return (
			<Host class={`p-drawer-body variant-${this.variant}`}>
				<slot />
			</Host>
		);
	}
}

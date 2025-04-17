import { Component, h, Host } from '@stencil/core';

@Component({
	tag: 'p-modal-footer',
	styleUrl: 'modal-footer.component.scss',
	shadow: true,
})
export class ModalFooter {
	render() {
		return (
			<Host class="p-modal-footer">
				<p-divider class="mb-6 mt-0 hidden desktop-xs:flex" />

				<slot />
			</Host>
		);
	}
}

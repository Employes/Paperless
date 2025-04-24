import { Component, h, Host } from '@stencil/core';

@Component({
	tag: 'p-modal-footer',
	styleUrl: 'modal-footer.component.css',
})
export class ModalFooter {
	render() {
		return (
			<Host class='p-modal-footer flex flex-col rounded-b-none bg-white px-4 pb-4 desktop-xs:rounded-b-2xl'>
				<p-divider class='mb-4 hidden desktop-xs:flex' />

				<div class='flex flex-col gap-4 tablet:flex-row'>
					<slot />
				</div>
			</Host>
		);
	}
}

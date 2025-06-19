import { Component, h } from '@stencil/core';

@Component({
	tag: 'p-modal-footer',
	styleUrl: 'modal-footer.component.css',
	shadow: true,
})
export class ModalFooter {
	render() {
		return (
			<div class='flex flex-col rounded-b-none bg-white pb-[calc(env(safe-area-inset-bottom)+1rem)] desktop-xs:rounded-b-2xl'>
				<p-divider class='mb-4 hidden desktop-xs:inline-block' />

				<div class='flex flex-col gap-4 px-4 tablet:flex-row'>
					<slot />
				</div>
			</div>
		);
	}
}

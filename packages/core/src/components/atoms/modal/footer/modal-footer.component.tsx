import { Component, h } from '@stencil/core';
import { ThemedHost } from '../../../../internal/themed-host.component';

@Component({
	tag: 'p-modal-footer',
	styleUrl: 'modal-footer.component.css',
	shadow: true,
})
export class ModalFooter {
	render() {
		return (
			<ThemedHost>
				<div class='flex flex-col rounded-b-none bg-white px-4 pb-[calc(env(safe-area-inset-bottom)+1rem)] desktop-xs:rounded-b-2xl dark:bg-hurricane-600'>
					<p-divider class='mb-4 hidden desktop-xs:inline-block dark:text-white/10' />

					<div class='flex flex-col gap-4 tablet:flex-row'>
						<slot />
					</div>
				</div>
			</ThemedHost>
		);
	}
}

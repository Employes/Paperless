import { Component, h, Prop } from '@stencil/core';
import { cva } from 'class-variance-authority';

import { ThemedHost } from '../../../../internal/themed-host.component';

const body = cva(
	`
		-mt-px bg-white p-4
		dark:bg-hurricane-600
	`,
	{
		variants: {
			roundedBottom: {
				true: `
					rounded-b-none pb-[calc(env(safe-area-inset-bottom)+1rem)]
					desktop-xs:rounded-b-2xl
				`,
				false: 'pb-4',
			},
			roundedTop: {
				true: `
					rounded-t-lg
					desktop-xs:rounded-t-2xl
				`,
				false: null,
			},
		},
	}
);

@Component({
	tag: 'p-modal-body',
	styleUrl: 'modal-body.component.css',
	shadow: true,
})
export class ModalBody {
	/**
	 * Wether the modal body should be rounded at the bottom
	 */
	@Prop() roundedBottom: boolean = false;

	/**
	 * Wether the modal body should be rounded at the top
	 */
	@Prop() roundedTop: boolean = false;

	render() {
		return (
			<ThemedHost>
				<div
					class={body({
						roundedBottom: this.roundedBottom,
						roundedTop: this.roundedTop,
					})}
				>
					<slot />
				</div>
			</ThemedHost>
		);
	}
}

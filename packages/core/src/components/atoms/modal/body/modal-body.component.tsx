import { Component, h, Prop } from '@stencil/core';
import { cva } from 'class-variance-authority';

const body = cva('bg-white p-4', {
	variants: {
		roundedBottom: {
			true: 'rounded-b-none desktop-xs:rounded-b-2xl pb-[calc(env(safe-area-inset-bottom)+1rem)]',
			false: 'pb-4',
		},
		roundedTop: {
			true: 'rounded-t-lg desktop-xs:rounded-t-2xl',
			false: null,
		},
	},
});

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
			<div
				class={body({
					roundedBottom: this.roundedBottom,
					roundedTop: this.roundedTop,
				})}
			>
				<slot />
			</div>
		);
	}
}

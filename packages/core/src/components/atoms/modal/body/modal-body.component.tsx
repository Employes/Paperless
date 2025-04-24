import { Component, h, Host, Prop } from '@stencil/core';
import { cva } from 'class-variance-authority';

const body = cva(['p-modal-body', 'bg-white p-4 overflow-y-scroll'], {
	variants: {
		roundedBottom: {
			true: 'rounded-b-none desktop-xs:rounded-b-2xl',
			false: null,
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
			<Host>
				<div
					class={body({
						roundedBottom: this.roundedBottom,
						roundedTop: this.roundedTop,
					})}
				>
					<slot />
				</div>
			</Host>
		);
	}
}

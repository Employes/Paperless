import { Component, h, Host, Prop } from '@stencil/core';
import { cva } from 'class-variance-authority';

import smileSvg from '../../../assets/other/smile.svg';

const smile = cva(
	'absolute bottom-0 left-1/2 -translate-x-1/2 z-[-1] aspect-[8/3]',
	{
		variants: {
			variant: {
				modal: 'w-[355%]',
				card: 'w-[310%]',
			},
		},
	}
);

@Component({
	tag: 'p-smile',
	styleUrl: 'smile.component.css',
})
export class Smile {
	/**
	 * The variant of the smile footer
	 */
	@Prop() variant: 'modal' | 'card' = 'modal';

	render() {
		return (
			<Host class={smile({ variant: this.variant })}>
				<div
					class='absolute bottom-0 left-0 h-full w-full text-off-white-500'
					innerHTML={smileSvg}
				></div>
			</Host>
		);
	}
}

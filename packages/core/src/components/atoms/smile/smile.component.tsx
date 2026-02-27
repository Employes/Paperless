import { Component, h, Host, Prop } from '@stencil/core';
import { cva } from 'class-variance-authority';

import smileSvg from '../../../assets/other/smile.svg';

const smile = cva(null, {
	variants: {
		variant: {
			full: null,
			modal: 'w-[355%]',
			card: 'w-[310%]',
		},
	},
	compoundVariants: [
		{
			variant: ['modal', 'card'],
			class: `
				absolute bottom-0 left-1/2 z-[-1] aspect-[8/3] -translate-x-1/2
				text-off-white-500
			`,
		},
	],
});

const svg = cva('text-inherit', {
	variants: {
		variant: {
			full: 'w-inherit',
			modal: null,
			card: null,
		},
	},
	compoundVariants: [
		{
			variant: ['modal', 'card'],
			class: 'absolute bottom-0 left-0 h-full w-full',
		},
	],
});

@Component({
	tag: 'p-smile',
	styleUrl: 'smile.component.css',
})
export class Smile {
	/**
	 * The variant of the smile footer
	 */
	@Prop() variant: 'modal' | 'card' | 'full' = 'modal';

	render() {
		return (
			<Host class={smile({ variant: this.variant })}>
				<div
					class={svg({ variant: this.variant })}
					innerHTML={smileSvg}
				></div>
			</Host>
		);
	}
}

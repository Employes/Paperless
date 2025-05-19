import { Component, h, Prop } from '@stencil/core';
import { cva } from 'class-variance-authority';
import { asBoolean } from '../../../../utils/as-boolean';


const container = cva(
	[
		'flex-1 min-w-0',

		'z-drawer flex flex-col',

		'rounded-2xl bg-white',
		'w-full tablet:w-[22.5rem]',

		'shadow-modal',
	],
	{
		variants: {
			closing: {
				false:
					'animate-slide-in-right',
				true: 'animate-slide-out-right'
			},
		},
	}
);

@Component({
	tag: 'p-drawer-container',
	styleUrl: 'drawer-container.component.css',
	shadow: true
})
export class DrawerContainer {
	/**
	 * Wether the container is closing
	 */
	@Prop() closing: boolean = false;

	render() {
		return (
			<div
				class={container({
					closing: asBoolean(this.closing),
				})}
			>
				<slot />
			</div>
		);
	}
}

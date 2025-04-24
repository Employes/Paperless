import { Component, h, Host, Prop } from '@stencil/core';
import { cva } from 'class-variance-authority';
import { asBoolean } from '../../../../utils/as-boolean';

const container = cva(
	[
		'p-modal-container flex-1 min-w-0',

		'z-modal flex flex-col',
		'rounded-b-none rounded-t-2xl desktop-xs:rounded-b-2xl',

		'desktop-xs:m-auto',
		'max-h-[calc(100dvh-4rem)]',

		'shadow-modal',
	],
	{
		variants: {
			size: {
				base: 'tablet:max-w-[35rem]',
				lg: 'tablet:max-w-[40rem]',
				xl: 'tablet:max-w-[45rem]',
				'2xl': 'tablet:max-w-[65rem]',
			},
			closing: {
				false:
					'animate-slide-in-bottom desktop-xs:animate-slide-in-bottom-small opening',
				true: 'animate-slide-out-bottom desktop-xs:animate-slide-out-bottom-small closing',
			},
		},
	}
);

@Component({
	tag: 'p-modal-container',
	styleUrl: 'modal-container.component.css',
})
export class ModalContainer {
	/**
	 * The size of the modal container
	 */
	@Prop() size: 'base' | 'lg' | 'xl' | '2xl' = 'base';

	/**
	 * Wether the container is closing
	 */
	@Prop() closing: boolean = false;

	render() {
		return (
			<Host
				class={container({
					size: this.size,
					closing: asBoolean(this.closing),
				})}
			>
				<slot />
			</Host>
		);
	}
}

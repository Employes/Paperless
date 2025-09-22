import { Component, h, Prop } from '@stencil/core';
import { cva } from 'class-variance-authority';
import { asBoolean } from '../../../../utils/as-boolean';
import { ThemedHost } from '../../../../internal/themed-host.component';

const container = cva(
	[
		'flex-1 min-w-0 w-full',

		'z-modal flex flex-col',
		'rounded-b-none rounded-t-2xl desktop-xs:rounded-b-2xl',

		'max-h-[calc(100dvh-4rem)]',

		'shadow-modal',

		'dark:border-hurricane-400 dark:border dark:border-solid',
	],
	{
		variants: {
			size: {
				xs: 'tablet:max-w-[20rem]',
				base: 'tablet:max-w-[35rem]',
				lg: 'tablet:max-w-[41rem]',
				xl: 'tablet:max-w-[45rem]',
				'2xl': 'tablet:max-w-[65rem]',
			},
			closing: {
				false:
					'animate-slide-in-bottom desktop-xs:animate-slide-in-bottom-small',
				true: 'animate-slide-out-bottom desktop-xs:animate-slide-out-bottom-small pointer-events-none',
			},
		},
	}
);

@Component({
	tag: 'p-modal-container',
	styleUrl: 'modal-container.component.css',
	shadow: true,
})
export class ModalContainer {
	/**
	 * The size of the modal container
	 */
	@Prop() size: 'xs' | 'base' | 'lg' | 'xl' | '2xl' = 'base';

	/**
	 * Wether the container is closing
	 */
	@Prop() closing: boolean = false;

	render() {
		return (
			<ThemedHost>
				<div
					class={container({
						size: this.size,
						closing: asBoolean(this.closing),
					})}
				>
					<slot />
				</div>
			</ThemedHost>
		);
	}
}

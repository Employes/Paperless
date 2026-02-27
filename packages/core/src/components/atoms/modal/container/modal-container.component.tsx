import { Component, h, Prop } from '@stencil/core';
import { cva } from 'class-variance-authority';

import { ThemedHost } from '../../../../internal/themed-host.component';
import { asBoolean } from '../../../../utils/as-boolean';

const container = cva(
	[
		'w-full min-w-0 flex-1',

		'z-modal flex flex-col',
		`
    rounded-b-none rounded-t-2xl
    desktop-xs:rounded-b-2xl
  `,

		'max-h-[calc(100dvh-4rem)]',

		'shadow-modal',

		'dark:border dark:border-solid dark:border-hurricane-400',
	],
	{
		variants: {
			size: {
				xs: 'tablet:max-w-[20rem]',
				sm: 'tablet:max-w-[27.5rem]',
				base: 'tablet:max-w-[35rem]',
				lg: 'tablet:max-w-[41rem]',
				xl: 'tablet:max-w-[45rem]',
				'2xl': 'tablet:max-w-[65rem]',
			},
			closing: {
				false: `
      animate-slide-in-bottom
      desktop-xs:animate-slide-in-bottom-small
    `,
				true: `
      pointer-events-none animate-slide-out-bottom
      desktop-xs:animate-slide-out-bottom-small
    `,
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
	@Prop() size: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' = 'base';

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

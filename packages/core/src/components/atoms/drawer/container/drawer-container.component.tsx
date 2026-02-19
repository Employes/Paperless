import { Component, h, Prop } from '@stencil/core';
import { cva } from 'class-variance-authority';

import { ThemedHost } from '../../../../internal/themed-host.component';
import { asBoolean } from '../../../../utils/as-boolean';

const container = cva(
	[
		'min-w-0 flex-1 my-safe-2',

		'z-drawer flex flex-col',

		`
    rounded-2xl bg-white
    dark:border dark:border-solid dark:border-hurricane-400
    dark:bg-hurricane-600
  `,
		`
    w-full
    tablet:w-[22.5rem]
  `,

		'shadow-modal',
	],
	{
		variants: {
			closing: {
				false: 'animate-slide-in-right',
				true: 'animate-slide-out-right',
			},
		},
	}
);

@Component({
	tag: 'p-drawer-container',
	styleUrl: 'drawer-container.component.css',
	shadow: true,
})
export class DrawerContainer {
	/**
	 * Wether the container is closing
	 */
	@Prop() closing: boolean = false;

	render() {
		return (
			<ThemedHost>
				<div
					class={container({
						closing: asBoolean(this.closing),
					})}
				>
					<slot />
				</div>
			</ThemedHost>
		);
	}
}

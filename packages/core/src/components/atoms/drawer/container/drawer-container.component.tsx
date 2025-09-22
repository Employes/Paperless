import { Component, h, Prop } from '@stencil/core';
import { cva } from 'class-variance-authority';
import { asBoolean } from '../../../../utils/as-boolean';
import { ThemedHost } from '../../../../internal/themed-host.component';

const container = cva(
	[
		'flex-1 min-w-0 my-safe-2',

		'z-drawer flex flex-col',

		'rounded-2xl bg-white dark:bg-hurricane-600 dark:border-hurricane-400 dark:border dark:border-solid',
		'w-full tablet:w-[22.5rem]',

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

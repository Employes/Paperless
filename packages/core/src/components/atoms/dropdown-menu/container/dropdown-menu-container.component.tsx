import { Component, h, Prop } from '@stencil/core';
import { cva } from 'class-variance-authority';

import { ThemedHost } from '../../../../internal/themed-host.component';
import { asBoolean } from '../../../../utils/as-boolean';

const dropdownMenuContainer = cva(
	[
		'p-dropdown-menu-container',
		'p-1',
		'rounded-lg z-10',
		'border',
		'transform-gpu will-change-transform',
	],
	{
		variants: {
			variant: {
				default: [
					'bg-white border-storm-100 drop-shadow-2',
					'dark:bg-hurricane-400 dark:border-transparent',
				],
				storm: [
					'bg-storm-400 drop-shadow-3 border-storm-400',
					'dark:bg-white dark:border-white/60 dark:border-storm-100',
				],
			},
			fullWidth: {
				false: null,
				true: 'w-full',
			},
			maxWidth: {
				false: null,
				true: 'max-w-[13.875rem]',
			},
		},
		compoundVariants: [
			{
				fullWidth: false,
				maxWidth: true,
				class: 'w-auto',
			},
		],
	}
);

const innerContainer = cva('w-full min-h-full relative', {
	variants: {
		allowOverflow: {
			false: 'overflow-y-auto overflow-x-hidden',
			true: null,
		},
		scrollable: {
			none: null,
			default: 'max-h-[11.5rem]',
			large: 'max-h-[13.875rem]',
			xlarge: 'max-h-[20rem]',
		},
	},
});

@Component({
	tag: 'p-dropdown-menu-container',
	styleUrl: 'dropdown-menu-container.component.css',
	shadow: true,
})
export class DropdownMenuContainer {
	/**
	 * The variant of the container
	 */
	@Prop() variant: 'default' | 'storm' = 'default';

	/**
	 * Wether the container applies it's max width
	 */
	@Prop() maxWidth: boolean = true;

	/**
	 * The class of the container passed by parent
	 */
	@Prop() class: string;

	/**
	 * Wether the container should all available space
	 */
	@Prop() fullWidth: boolean = true;

	/**
	 * Wether to allow overflow
	 */
	@Prop() allowOverflow: boolean = false;

	/**
	 * Wether the container should be scrollable when the threshold is met.
	 */
	@Prop() scrollable: boolean | 'default' | 'large' | 'xlarge' = false;

	render() {
		const scrollable =
			this.scrollable === false
				? 'none'
				: this.scrollable === true
					? 'default'
					: this.scrollable;

		return (
			<ThemedHost>
				<div
					class={dropdownMenuContainer({
						class: this.class,
						variant: this.variant,
						fullWidth: asBoolean(this.fullWidth, true),
						maxWidth: this.maxWidth,
					})}
				>
					<div
						class={innerContainer({
							allowOverflow: asBoolean(this.allowOverflow),
							scrollable,
						})}
					>
						<div class='flex w-full flex-col'>
							<slot />
						</div>
					</div>
				</div>
			</ThemedHost>
		);
	}
}

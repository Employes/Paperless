import { Component, h, Prop } from '@stencil/core';
import { cva } from 'class-variance-authority';

import { ThemedHost } from '../../../../internal/themed-host.component';
import { cn } from '../../../../utils';
import { asBoolean } from '../../../../utils/as-boolean';

// bg-inherit bg-transparent bg-current bg-black
// bg-white-500 bg-white-600 bg-white-700 bg-white-800 bg-white
// bg-negative-red-50 bg-negative-red-100 bg-negative-red-500 bg-negative-red-800 bg-negative-red bg-negative-red-alternative
// bg-positive-green-50 bg-positive-green-100 bg-positive-green-500 bg-positive-green-800 bg-positive-green bg-positive-green-alternative
// bg-amber-50 bg-amber-100 bg-amber-500 bg-amber-800 bg-amber bg-positive-green-alternative
// bg-off-white-50 bg-off-white-100 bg-off-white-200 bg-off-white-300 bg-off-white-400 bg-off-white-500 bg-off-white-600 bg-off-white-700 bg-off-white-800 bg-off-white
// bg-indigo-50 bg-indigo-100 bg-indigo-200 bg-indigo-300 bg-indigo-400 bg-indigo-500 bg-indigo-600 bg-indigo-700 bg-indigo-800 bg-indigo-900 bg-indigo
// bg-storm-50 bg-storm-100 bg-storm-200 bg-storm-300 bg-storm-400 bg-storm-500 bg-storm-600 bg-storm-700 bg-storm-800 bg-storm
// bg-hurricane-50 bg-hurricane-100 bg-hurricane-200 bg-hurricane-300 bg-hurricane-400 bg-hurricane-500 bg-hurricane-600 bg-hurricane-700 bg-hurricane-800 bg-hurricane
// dark:bg-inherit dark:bg-transparent dark:bg-current dark:bg-black
// dark:bg-white-500 dark:bg-white-600 dark:bg-white-700 dark:bg-white-800 dark:bg-white
// dark:bg-negative-red-50 dark:bg-negative-red-100 dark:bg-negative-red-500 dark:bg-negative-red-800 dark:bg-negative-red dark:bg-negative-red-alternative
// dark:bg-positive-green-50 dark:bg-positive-green-100 dark:bg-positive-green-500 dark:bg-positive-green-800 dark:bg-positive-green dark:bg-positive-green-alternative
// dark:bg-amber-50 dark:bg-amber-100 dark:bg-amber-500 dark:bg-amber-800 dark:bg-amber dark:bg-amber-alternative
// dark:bg-off-white-50 dark:bg-off-white-100 dark:bg-off-white-200 dark:bg-off-white-300 dark:bg-off-white-400 dark:bg-off-white-500 dark:bg-off-white-600 dark:bg-off-white-700 dark:bg-off-white-800 dark:bg-off-white
// dark:bg-indigo-50 dark:bg-indigo-100 dark:bg-indigo-200 dark:bg-indigo-300 dark:bg-indigo-400 dark:bg-indigo-500 dark:bg-indigo-600 dark:bg-indigo-700 dark:bg-indigo-800 dark:bg-indigo-900 dark:bg-indigo
// dark:bg-storm-50 dark:bg-storm-100 dark:bg-storm-200 dark:bg-storm-300 dark:bg-storm-400 dark:bg-storm-500 dark:bg-storm-600 dark:bg-storm-700 dark:bg-storm-800 dark:bg-storm
// dark:bg-hurricane-50 dark:bg-hurricane-100 dark:bg-hurricane-200 dark:bg-hurricane-300 dark:bg-hurricane-400 dark:bg-hurricane-500 dark:bg-hurricane-600 dark:bg-hurricane-700 dark:bg-hurricane-800 dark:bg-hurricane

const container = cva(
	['flex h-inherit w-inherit flex-col transition', 'rounded-2xl'],
	{
		variants: {
			variant: {
				default: `
					border-off-white-700
					dark:border-white/15
				`,
				error: `
					border-negative-red-500 ring-2 ring-negative-red-50
					dark:border-negative-red-alternative dark:ring-0
				`,
			},
			hoverable: {
				true: `
					cursor-pointer
					hover:bg-off-white-200
					dark:hover:bg-hurricane-500
				`,
				false: null,
			},
			shadow: {
				false: null,
				true: null,
			},
			active: {
				false: null,
				true: null,
			},
			border: {
				true: 'border border-solid',
				false: 'border-0',
			},
		},
		compoundVariants: [
			{
				shadow: true,
				active: false,
				variant: 'default',
				class: 'shadow-1',
			},
			{
				shadow: true,
				active: true,
				variant: 'default',
				class: 'shadow-2',
			},
		],
	}
);

@Component({
	tag: 'p-card-container',
	styleUrl: 'card-container.component.css',
	shadow: true,
})
export class CardContainer {
	/**
	 * The variant of the container
	 */
	@Prop() variant: 'default' | 'error' = 'default';

	/**
	 * A bg class to apply to the container
	 */
	@Prop() bgClass: string = 'bg-white dark:bg-hurricane-600';

	/**
	 * Wether the card should be hoverable
	 */
	@Prop() active: boolean = false;

	/**
	 * Wether the card should be hoverable
	 */
	@Prop() hoverable: boolean = false;

	/**
	 * Wether the card should have shadow
	 */
	@Prop() shadow: boolean = true;

	/**
	 * Wether the card should have a border
	 */
	@Prop() border: boolean = true;

	render() {
		return (
			<ThemedHost>
				<div
					class={cn(
						container({
							variant: this.variant,
							active: asBoolean(this.active, false),
							hoverable: asBoolean(this.hoverable, false),
							shadow: asBoolean(this.shadow, true),
							border: asBoolean(this.border),
						}),
						this.bgClass
					)}
				>
					<slot />
				</div>
			</ThemedHost>
		);
	}
}

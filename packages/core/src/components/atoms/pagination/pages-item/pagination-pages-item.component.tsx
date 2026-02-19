import { Component, h, Prop } from '@stencil/core';
import { cva } from 'class-variance-authority';

import { ThemedHost } from '../../../../internal/themed-host.component';
import { asBoolean } from '../../../../utils/as-boolean';

const item = cva(
	[
		'p-pagination-item',
		'text-sm',
		'h-6 w-6',
		'flex items-center justify-center text-center',
	],
	{
		variants: {
			variant: {
				default: 'rounded',
				carousel: 'rounded-full border border-solid',
			},
			active: {
				false: null,
				true: null,
			},
			hover: {
				false: null,
				true: null,
			},
			disabled: {
				false: null,
				true: 'cursor-not-allowed',
			},
		},
		compoundVariants: [
			{
				variant: 'default',
				active: false,
				class: `
      bg-off-white-300 text-storm-400
      dark:bg-hurricane-500 dark:text-hurricane-200
    `,
			},
			{
				variant: 'default',
				active: false,
				hover: true,
				class: `
      cursor-pointer
      hover:bg-off-white-500 hover:text-storm-500
      dark:hover:bg-white/15 dark:hover:text-hurricane-100
    `,
			},
			{
				variant: 'default',
				active: true,
				class: `
      bg-off-white-700 font-semibold text-storm-500
      dark:bg-hurricane-300 dark:text-white
    `,
			},

			{
				variant: 'carousel',
				disabled: false,
				class: [
					'border-storm-100 bg-white text-storm-300',
					'dark:border-white/15 dark:bg-white/15 dark:text-hurricane-200',
				],
			},
			{
				variant: 'carousel',
				disabled: false,
				hover: true,
				class: [
					`
       cursor-pointer
       hover:bg-white-600 hover:text-storm-500
       active:border-indigo-600 active:bg-white-600 active:ring active:ring-2
       active:ring-indigo-100
     `,
					'dark:hover:bg-white/25 dark:hover:text-white dark:hover:ring-0',
				],
			},
			{
				variant: 'carousel',
				disabled: true,
				class: [
					'border-storm-500/20 bg-white-600 text-storm-100',
					'dark:border-white/5 dark:bg-hurricane-500 dark:text-hurricane-300',
				],
			},
		],
	}
);

@Component({
	tag: 'p-pagination-pages-item',
	styleUrl: 'pagination-pages-item.component.css',
	shadow: true,
})
export class PaginationPagesItem {
	/**
	 * The variant of the item
	 */
	@Prop() variant: 'default' | 'carousel' = 'default';

	/**
	 * Wether the pagination item is active
	 */
	@Prop() active: boolean = false;

	/**
	 * Wether the pagination item has hover
	 */
	@Prop() hover: boolean = true;

	/**
	 * Wether the pagination item is disabled
	 */
	@Prop() disabled: boolean = false;

	render() {
		return (
			<ThemedHost>
				<div
					class={item({
						variant: this.variant ?? 'default',
						active: asBoolean(this.active),
						hover: asBoolean(this.hover, true),
						disabled: asBoolean(this.disabled),
					})}
				>
					<slot />
				</div>
			</ThemedHost>
		);
	}
}

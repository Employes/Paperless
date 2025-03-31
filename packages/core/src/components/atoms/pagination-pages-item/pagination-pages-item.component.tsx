import { Component, h, Host, Prop } from '@stencil/core';
import { cva } from 'class-variance-authority';

const item = cva(
	[
		'p-pagination-item',
		'text-sm ',
		'h-6 w-6',
		'flex items-center justify-center text-center',
	],
	{
		variants: {
			variant: {
				default: 'rounded text-black-teal-500',
				carousel: 'rounded-full text-white',
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
				class: 'bg-off-white-300',
			},
			{
				variant: 'default',
				active: false,
				hover: true,
				class: 'hover:bg-off-white-500 cursor-pointer',
			},
			{
				variant: 'default',
				active: true,
				class: 'bg-off-white-700 font-semibold',
			},

			{
				variant: 'carousel',
				disabled: false,
				class: 'bg-dark-teal-600',
			},
			{
				variant: 'carousel',
				disabled: false,
				hover: true,
				class: 'hover:bg-dark-teal-700 focus:bg-dark-teal-800 cursor-pointer',
			},
			{
				variant: 'carousel',
				disabled: true,
				class: 'bg-dark-teal-600 opacity-20',
			},
		],
	}
);

@Component({
	tag: 'p-pagination-pages-item',
	styleUrl: 'pagination-pages-item.component.css',
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
			<Host
				class={item({
					variant: this.variant,
					active: this.active,
					hover: this.hover,
					disabled: this.disabled,
				})}
			>
				<slot />
			</Host>
		);
	}
}

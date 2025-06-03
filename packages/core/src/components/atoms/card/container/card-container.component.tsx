import { Component, h, Prop } from '@stencil/core';
import { cva } from 'class-variance-authority';
import { cn } from '../../../../utils';
import { asBoolean } from '../../../../utils/as-boolean';

// bg-inherit bg-transparent bg-current bg-black
// bg-white-500 bg-white-600 bg-white-700 bg-white-800 bg-white
// bg-negative-red-50 bg-negative-red-100 bg-negative-red-500 bg-negative-red-800 bg-negative-red
// bg-positive-green-50 bg-positive-green-100 bg-positive-green-500 bg-positive-green-800 bg-positive-green
// bg-amber-50 bg-amber-100 bg-amber-500 bg-amber-800 bg-amber
// bg-human-beige-50 bg-human-beige-100 bg-human-beige-200 bg-human-beige-300 bg-human-beige-400 bg-human-beige-500 bg-human-beige-600 bg-human-beige-700 bg-human-beige-800 bg-human-beige
// bg-off-white-50 bg-off-white-100 bg-off-white-200 bg-off-white-300 bg-off-white-400 bg-off-white-500 bg-off-white-600 bg-off-white-700 bg-off-white-800 bg-off-white
// bg-supportive-lilac-50 bg-supportive-lilac-100 bg-supportive-lilac-200 bg-supportive-lilac-300 bg-supportive-lilac-400 bg-supportive-lilac-500 bg-supportive-lilac-600 bg-supportive-lilac-700 bg-supportive-lilac-800 bg-supportive-lilac-900 bg-supportive-lilac
// bg-growth-green-50 bg-growth-green-100 bg-growth-green-200 bg-growth-green-300 bg-growth-green-400 bg-growth-green-500 bg-growth-green-600 bg-growth-green-700 bg-growth-green-800 bg-growth-green
// bg-tech-breeze-50 bg-tech-breeze-100 bg-tech-breeze-200 bg-tech-breeze-300 bg-tech-breeze-400 bg-tech-breeze-500 bg-tech-breeze-600 bg-tech-breeze-700 bg-tech-breeze-800 bg-tech-breeze
// bg-teal-50 bg-teal-100 bg-teal-200 bg-teal-300 bg-teal-400 bg-teal-500 bg-teal-600 bg-teal-700 bg-teal-800 bg-teal
// bg-dark-teal-50 bg-dark-teal-100 bg-dark-teal-200 bg-dark-teal-300 bg-dark-teal-400 bg-dark-teal-500 bg-dark-teal-600 bg-dark-teal-700 bg-dark-teal-800 bg-dark-teal
// bg-black-teal-50 bg-black-teal-100 bg-black-teal-200 bg-black-teal-300 bg-black-teal-400 bg-black-teal-500 bg-black-teal-600 bg-black-teal-700 bg-black-teal-800 bg-black-teal

const container = cva(['flex flex-col w-inherit h-inherit', 'rounded-2xl'], {
	variants: {
		variant: {
			default: 'border-off-white-700',
			error: 'border-negative-red ring-2 ring-negative-red-50',
		},
		hoverable: {
			true: 'cursor-pointer hover:bg-off-white-200',
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
});

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
	@Prop() bgClass: string = 'bg-white';

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
		);
	}
}

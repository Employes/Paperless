import { Component, h, Prop } from '@stencil/core';
import { cva } from 'class-variance-authority';
import { cn } from '../../../../utils';
import { asBoolean } from '../../../../utils/as-boolean';

// bg-inherit bg-transparent bg-current bg-black
// bg-white-500 bg-white-600 bg-white-700 bg-white-800 bg-white
// bg-negative-red-50 bg-negative-red-100 bg-negative-red-500 bg-negative-red-800 bg-negative-red
// bg-positive-green-50 bg-positive-green-100 bg-positive-green-500 bg-positive-green-800 bg-positive-green
// bg-amber-50 bg-amber-100 bg-amber-500 bg-amber-800 bg-amber
// bg-off-white-50 bg-off-white-100 bg-off-white-200 bg-off-white-300 bg-off-white-400 bg-off-white-500 bg-off-white-600 bg-off-white-700 bg-off-white-800 bg-off-white
// bg-indigo-50 bg-indigo-100 bg-indigo-200 bg-indigo-300 bg-indigo-400 bg-indigo-500 bg-indigo-600 bg-indigo-700 bg-indigo-800 bg-indigo-900 bg-indigo
// bg-storm-50 bg-storm-100 bg-storm-200 bg-storm-300 bg-storm-400 bg-storm-500 bg-storm-600 bg-storm-700 bg-storm-800 bg-storm

const container = cva(['flex flex-col w-inherit h-inherit', 'rounded-2xl'], {
	variants: {
		variant: {
			default: 'border-off-white-700',
			error: 'border-negative-red-500ring-2 ring-negative-red-50',
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

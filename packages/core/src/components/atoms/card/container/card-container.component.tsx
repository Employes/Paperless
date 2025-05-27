import { Component, h, Prop } from '@stencil/core';
import { cva } from 'class-variance-authority';
import { asBoolean } from '../../../../utils/as-boolean';

const container = cva(
	[
		'flex flex-col w-inherit h-inherit',
		'rounded-2xl border border-solid  bg-white',
	],
	{
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

	render() {
		return (
			<div
				class={container({
					variant: this.variant,
					shadow: asBoolean(this.shadow, true),
					active: asBoolean(this.active, false),
					hoverable: asBoolean(this.hoverable, false),
				})}
			>
				<slot />
			</div>
		);
	}
}

import { Component, h, Prop } from '@stencil/core';
import { cva } from 'class-variance-authority';
import { asBoolean } from '../../../../utils/as-boolean';

const container = cva(
	[
		'flex flex-col w-inherit',
		'rounded-2xl border border-solid border-off-white-700 bg-white',
	],
	{
		variants: {
			hoverable: {
				true: 'cursor-pointer bg-off-white-200',
				false: null,
			},
			shadow: {
				false: null,
				true: 'shadow-1',
			},
			active: {
				false: null,
				true: 'shadow-2',
			},
		},
		compoundVariants: [
			{
				shadow: true,
				hoverable: true,
				class: 'hover:bg-off-white-200',
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

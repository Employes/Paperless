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
		},
		compoundVariants: [
			{
				shadow: true,
				hoverable: true,
				class: 'hover:shadow-2 hover:bg-off-white-200',
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
	@Prop({ reflect: true }) hoverable: boolean = false;

	/**
	 * Wether the card should have shadow
	 */
	@Prop({ reflect: true }) shadow: boolean = true;

	render() {
		return (
			<div
				class={container({
					shadow: asBoolean(this.shadow, true),
					hoverable: asBoolean(this.hoverable, false),
				})}
			>
				<slot />
			</div>
		);
	}
}

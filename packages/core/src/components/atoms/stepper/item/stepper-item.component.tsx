import { Component, h, Prop } from '@stencil/core';
import { cva } from 'class-variance-authority';
import { asBoolean } from '../../../../utils/as-boolean';

const item = cva('flex gap-2', {
	variants: {
		align: {
			start: 'items-start',
			center: 'items-center',
			end: 'items-end',
		},
		contentPosition: {
			start: 'flex-row-reverse',
			end: null,
		},
	},
});

const circle = cva(
	[
		'h-6 w-6 flex items-center justify-center',
		'text-sm text-center font-medium',
		'border border-solid border-indigo-600',
		'rounded-full',
	],
	{
		variants: {
			finished: {
				true: null,
				false: null,
			},
			active: {
				true: null,
				false: null,
			},
		},
		compoundVariants: [
			{
				finished: false,
				active: false,
				class: 'text-indigo-600 bg-indigo-50',
			},
			{
				active: true,
				finished: false,
				class: 'text-white bg-indigo-600',
			},
			{
				active: false,
				finished: true,
				class: 'text-white bg-indigo-600',
			},
		],
	}
);

const content = cva('text-sm font-medium flex-1 mt-[1px]', {
	variants: {
		finished: {
			true: null,
			false: null,
		},
		active: {
			true: null,
			false: null,
		},
		direction: {
			horizontal: null,
			vertical: null,
		},
	},
	compoundVariants: [
		{
			finished: false,
			active: false,
			class: 'text-storm-400',
		},
		{
			active: true,
			finished: false,
			class: 'text-storm-500',
		},
		{
			active: false,
			finished: true,
			class: 'text-storm-500',
		},
		{
			direction: 'horizontal',
			active: false,
			class: 'hidden desktop-xs:inline-block',
		},
	],
});

@Component({
	tag: 'p-stepper-item',
	styleUrl: 'stepper-item.component.css',
	shadow: true,
})
export class StepperItem {
	/**
	 * The number of the step
	 */
	@Prop() number: number = 1;

	/**
	 * The direction of the item
	 */
	@Prop() direction: 'horizontal' | 'vertical' = 'horizontal';

	/**
	 * The alignment of the content in case of vertical direction
	 */
	@Prop() align: 'start' | 'center' | 'end' = 'center';

	/**
	 * The position of the content in case of vertical direction
	 */
	@Prop() contentPosition: 'start' | 'end' = 'end';

	/**
	 * Wether the step is finished
	 */
	@Prop() finished: boolean = false;

	/**
	 * Wether the step is active
	 */
	@Prop() active: boolean = false;

	render() {
		return (
			<div
				class={item({
					align: this.align,
					contentPosition: this.contentPosition,
				})}
			>
				<div
					class={circle({
						active: asBoolean(this.active),
						finished: asBoolean(this.finished),
					})}
				>
					{this.number}
				</div>
				<div
					class={content({
						active: asBoolean(this.active),
						finished: asBoolean(this.finished),
						direction: this.direction,
					})}
				>
					<slot />
				</div>
			</div>
		);
	}
}

import { Component, h, Prop } from '@stencil/core';
import { cva } from 'class-variance-authority';

import { ThemedHost } from '../../../../internal/themed-host.component';
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
		'flex h-6 w-6 items-center justify-center',
		'text-center text-sm font-medium',
		'border border-solid',
		'rounded-full',
	],
	{
		variants: {
			align: {
				start: null,
				center: null,
				end: null,
			},
			direction: {
				horizontal: null,
				vertical: null,
			},
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
				class: [
					'border-indigo-600 bg-indigo-50 text-indigo-600',
					'dark:border-white/15 dark:bg-white/15 dark:text-hurricane-200',
				],
			},
			{
				active: true,
				finished: false,
				class: 'border-indigo-600 bg-indigo-600 text-white',
			},
			{
				active: false,
				finished: true,
				class: 'border-indigo-600 bg-indigo-600 text-white',
			},
			{
				direction: 'vertical',
				align: 'start',
				class: 'mt-5',
			},
			{
				direction: 'vertical',
				align: 'end',
				class: 'mb-5',
			},
		],
	}
);

const content = cva('mt-[1px] flex-1 text-sm font-medium', {
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
			class: `
     text-storm-400
     dark:text-hurricane-200
   `,
		},
		{
			active: true,
			finished: false,
			class: `
     text-storm-500
     dark:text-white
   `,
		},
		{
			active: false,
			finished: true,
			class: `
     text-storm-500
     dark:text-white
   `,
		},
		{
			direction: 'horizontal',
			active: false,
			class: `
     hidden
     desktop-xs:inline-block
   `,
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
			<ThemedHost>
				<div
					class={item({
						align: this.align,
						contentPosition: this.contentPosition,
					})}
				>
					<div
						class={circle({
							align: this.align,
							direction: this.direction,
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
			</ThemedHost>
		);
	}
}

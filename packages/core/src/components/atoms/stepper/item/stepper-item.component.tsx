import { Component, h, Prop } from '@stencil/core';
import { cva } from 'class-variance-authority';

import { ThemedHost } from '../../../../internal/themed-host.component';
import { IconVariant } from '../../../../types';
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
		'flex items-center justify-center',
		'text-center text-sm font-medium',
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
			variant: {
				default: ['size-6', 'border border-solid'],
				icon: 'size-8',
			},
		},
		compoundVariants: [
			// default variant colors
			{
				finished: false,
				active: false,
				variant: 'default',
				class: [
					'border-indigo-600 bg-indigo-50 text-indigo-600',
					'dark:border-white/15 dark:bg-white/15 dark:text-hurricane-200',
				],
			},
			{
				active: true,
				finished: false,
				variant: 'default',
				class: 'border-indigo-600 bg-indigo-600 text-white',
			},
			{
				active: false,
				finished: true,
				variant: 'default',
				class: 'border-indigo-600 bg-indigo-600 text-white',
			},

			// icon variant colors
			{
				finished: false,
				active: false,
				variant: 'icon',
				class: [
					'bg-indigo-100 text-storm-200',
					'dark:bg-white/15 dark:text-hurricane-200',
				],
			},
			{
				active: true,
				finished: false,
				variant: 'icon',
				class: 'bg-indigo-500 text-storm-500',
			},
			{
				active: false,
				finished: true,
				variant: 'icon',
				class: 'bg-indigo-100 text-indigo-600',
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

const content = cva('mt-[1px] flex-1 text-sm', {
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
		variant: {
			default: 'font-medium',
			icon: 'font-semibold',
		},
	},
	compoundVariants: [
		// default variant
		{
			finished: false,
			active: false,
			variant: 'default',
			class: `
     text-storm-400
     dark:text-hurricane-200
   `,
		},
		{
			active: true,
			finished: false,
			variant: 'default',
			class: `
     text-storm-500
     dark:text-white
   `,
		},
		{
			active: false,
			finished: true,
			variant: 'default',
			class: `
     text-storm-500
     dark:text-white
   `,
		},

		// icon variant
		{
			active: false,
			variant: 'icon',
			class: `
     text-storm-300
     dark:text-hurricane-200
   `,
		},
		{
			active: true,
			variant: 'icon',
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
	 * Icon to show instead of the number
	 */
	@Prop() icon: IconVariant;

	/**
	 * The direction of the item
	 */
	@Prop() direction: 'horizontal' | 'vertical' = 'horizontal';

	/**
	 * The variant of the item
	 */
	@Prop() variant: 'default' | 'icon' = 'default';

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
						align: this.variant === 'default' ? this.align : 'center',
						contentPosition: this.contentPosition,
					})}
				>
					<div
						class={circle({
							align: this.align,
							direction: this.direction,
							active: asBoolean(this.active),
							finished: asBoolean(this.finished),
							variant: this.variant,
						})}
					>
						{this.variant === 'icon' && (this.icon || this.finished) ? (
							<p-icon variant={this.finished ? 'checkmark' : this.icon} />
						) : (
							this.number
						)}
					</div>
					<div
						class={content({
							active: asBoolean(this.active),
							finished: asBoolean(this.finished),
							direction: this.direction,
							variant: this.variant,
						})}
					>
						<slot />
					</div>
				</div>
			</ThemedHost>
		);
	}
}

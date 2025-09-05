import { Component, h, Prop } from '@stencil/core';
import { cva } from 'class-variance-authority';
import { RotateOptions } from '../../../../types/tailwind';
import { asBoolean } from '../../../../utils/as-boolean';
import { IconFlipOptions, IconVariant } from '../../icon/icon.component';
import { cn } from '../../../../utils';
import { ThemedHost } from '../../../../internal/themed-host.component';

const segmentItem = cva(
	['flex items-center justify-center', 'rounded-xl', 'cursor-pointer text-sm'],
	{
		variants: {
			variant: {
				default: 'h-6 gap-2',
				block: 'flex-col p-2 text-center',
			},
			active: {
				false: [
					'cursor-pointer',
					'text-storm-300 hover:text-storm-500 hover:bg-storm-50',
					'hover:text-white dark:hover:bg-white/15',
				],
				true: 'bg-indigo-600 text-white',
			},
			iconOnly: {
				false: 'px-2',
				true: 'w-6',
			},
		},
		compoundVariants: [
			{
				variant: 'default',
				active: false,
				class: 'text-storm-500 dark:text-hurricane-200',
			},
			{
				variant: 'block',
				active: false,
				class: 'text-storm-500 dark:text-white',
			},
		],
	}
);

@Component({
	tag: 'p-segment-item',
	styleUrl: 'segment-item.component.css',
	shadow: true,
})
export class SegmentItem {
	/**
	 * The size of the
	 */
	@Prop() variant: 'default' | 'block' = 'default';

	/**
	 * Wether the segment item is active
	 */
	@Prop() active: boolean = false;

	/**
	 * Wether the segment item is icon only
	 */
	@Prop() iconOnly: boolean = false;

	/**
	 * Icon to show on the segment item
	 */
	@Prop() icon: IconVariant;

	/**
	 * Icon flip
	 */
	@Prop() iconFlip: IconFlipOptions;

	/**
	 * Icon rotate
	 */
	@Prop() iconRotate: RotateOptions;

	render() {
		const descriptionSlot =
			this.variant === 'block' ? <slot name='description' /> : null;

		return (
			<ThemedHost>
				<div
					class={segmentItem({
						variant: this.variant,
						active: asBoolean(this.active),
						iconOnly: asBoolean(this.iconOnly),
					})}
				>
					{this.icon && (
						<p-icon
							class={cn('mb-1', {
								'text-storm-300 dark:text-hurricane-200': !asBoolean(
									this.active
								),
								'text-indigo-200': asBoolean(this.active),
							})}
							variant={this.icon}
							flip={this.iconFlip}
							rotate={this.iconRotate}
						/>
					)}

					{this.variant === 'default' ? (
						<slot />
					) : (
						<div class='flex flex-col items-center'>
							<p class={cn('my-0 font-medium empty:hidden', {})}>
								<slot name='title' />
							</p>
							{descriptionSlot && (
								<p
									class={cn('my-0 text-xs font-medium', {
										'text-storm-300 dark:text-hurricane-200': !asBoolean(
											this.active
										),
										'text-indigo-200': asBoolean(this.active),
									})}
								>
									{descriptionSlot}
								</p>
							)}
						</div>
					)}
				</div>
			</ThemedHost>
		);
	}
}

import { Component, h, Host, Prop } from '@stencil/core';
import { cva } from 'class-variance-authority';
import { RotateOptions } from '../../../types/tailwind';
import { IconFlipOptions, IconVariant } from '../icon/icon.component';

const segmentItem = cva(
	[
		'p-segment-item',
		'flex items-center justify-center',
		'rounded-2xl',
		'cursor-pointer text-sm',
	],
	{
		variants: {
			variant: {
				default: 'h-6 gap-2',
				block: 'flex-col p-4',
			},
			active: {
				false: 'cursor-pointer text-black-teal-400 hover:bg-black-teal-50',
				true: 'bg-dark-teal-600 text-white',
			},
			iconOnly: {
				false: 'px-2',
				true: 'w-6',
			},
		},
	}
);

@Component({
	tag: 'p-segment-item',
	styleUrl: 'segment-item.component.css',
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
		const titleSlot =
			this.variant === 'block' ? <slot name='title' /> : <slot />;
		const descriptionSlot =
			this.variant === 'block' ? <slot name='description' /> : null;

		return (
			<Host
				class={segmentItem({
					variant: this.variant,
					active: this.active,
					iconOnly: this.iconOnly,
				})}
			>
				{this.icon && (
					<p-icon
						variant={this.icon}
						flip={this.iconFlip}
						rotate={this.iconRotate}
					/>
				)}
				<p class='empty:hidden'>{titleSlot}</p>
				{descriptionSlot && <p>{descriptionSlot}</p>}
			</Host>
		);
	}
}

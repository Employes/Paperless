import { Component, h, Host, Prop } from '@stencil/core';
import { cva } from 'class-variance-authority';
import { RotateOptions } from '../../../types/tailwind';
import { IconFlipOptions, IconVariant } from '../icon/icon.component';

const segmentItem = cva(
	[
		'p-segment-item',
		'flex items-center justify-center',
		'h-6 gap-2 rounded-full',
		'cursor-pointer text-sm',
	],
	{
		variants: {
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
		return (
			<Host
				class={segmentItem({
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
				<slot />
			</Host>
		);
	}
}

import { Component, h, Host, Prop } from '@stencil/core';
import { RotateOptions } from '../../../types';
import { IconFlipOptions, IconVariant } from '../../atoms/icon/icon.component';
import { cva } from 'class-variance-authority';
import { cn } from '../../../utils/cn';

const label = cva(
	['flex items-center justify-center gap-2', 'h-6 rounded-full'],
	{
		variants: {
			variant: {
				positive: 'bg-positive-green-100 text-positive-green-800',
				unbiased: 'bg-amber-100  text-amber-800',
				negative: 'bg-negative-red-100 text-negative-red-800',
				neutral: 'bg-supportive-lilac-100 text-supportive-lilac-900',
				unavailable: 'bg-white-700 text-dark-teal-800',
			},
			iconOnly: {
				false: 'px-2',
				true: 'p-2 w-6',
			},
			keepMobileContent: {
				false: null,
				true: null,
			},
		},
		compoundVariants: [
			{
				keepMobileContent: false,
				iconOnly: false,
				class: 'p-2 w-6 desktop-xs:w-auto desktop-xs:py-0',
			},
		],
	}
);

@Component({
	tag: 'p-label',
	styleUrl: 'label.component.css',
	shadow: true,
})
export class Label {
	/**
	 * Variant of the label
	 */
	@Prop({ reflect: true }) variant:
		| 'positive'
		| 'unbiased'
		| 'negative'
		| 'neutral'
		| 'unavailable' = 'neutral';

	/**
	 * Wether to only show the icon
	 */
	@Prop({ reflect: true }) iconOnly: boolean = false;

	/**
	 * Icon to show on the label
	 */
	@Prop({ reflect: true }) icon: IconVariant;

	/**
	 * Icon flip
	 */
	@Prop() iconFlip: IconFlipOptions;

	/**
	 * Icon rotate
	 */
	@Prop() iconRotate: RotateOptions;

	/**
	 * Wether to keep the content on mobile
	 */
	@Prop({ reflect: true }) keepMobileContent: boolean = false;

	render() {
		return (
			<Host class='p-label'>
				<div
					class={label({
						variant: this.variant,
						iconOnly: this.iconOnly,
						keepMobileContent: this.keepMobileContent,
					})}
				>
					{this.icon && (
						<p-icon
							class='flex-shrink-0'
							variant={this.icon}
							flip={this.iconFlip}
							rotate={this.iconRotate}
						/>
					)}

					{!this.iconOnly && (
						<div
							class={cn(
								'flex-1 overflow-hidden text-ellipsis whitespace-nowrap text-sm',
								{
									hidden: !this.keepMobileContent,
									'desktop-xs:block': !this.keepMobileContent,
								}
							)}
						>
							<slot />
						</div>
					)}
				</div>
			</Host>
		);
	}
}

import { Component, h, Prop } from '@stencil/core';
import { cva } from 'class-variance-authority';

import { ThemedHost } from '../../../internal/themed-host.component';
import { IconFlipOptions, IconVariant, RotateOptions } from '../../../types';
import { cn } from '../../../utils/cn';

const label = cva(
	['flex items-center justify-center gap-2', 'h-6 rounded-full'],
	{
		variants: {
			variant: {
				positive: [
					'bg-positive-green-100 text-positive-green-800',
					`
						dark:bg-positive-green-alternative/15 dark:text-positive-green-alternative
					`,
				],
				biased: [
					'bg-amber-100 text-amber-800',
					'dark:bg-amber-alternative/15 dark:text-amber-alternative',
				],
				negative: [
					'bg-negative-red-100 text-negative-red-800',
					'dark:bg-negative-red-alternative/15 dark:text-negative-red-alternative',
				],
				neutral: [
					'bg-indigo-100 text-indigo-900',
					'dark:bg-indigo-300/15 dark:text-indigo-400',
				],
				unavailable: [
					'bg-white-700 text-storm-800',
					'dark:bg-hurricane-100/15 dark:text-hurricane-100',
				],
			},
			iconOnly: {
				false: 'px-2',
				true: 'w-6 p-2',
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
				class: `
					w-6 p-2
					desktop-xs:w-auto desktop-xs:py-0
				`,
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
		| 'biased'
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
			<ThemedHost>
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
							flip={this.iconFlip}
							rotate={this.iconRotate}
							variant={this.icon}
						/>
					)}

					{!this.iconOnly && (
						<div
							class={cn(
								`
									flex-1 overflow-hidden text-ellipsis whitespace-nowrap text-sm
									font-medium
								`,
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
			</ThemedHost>
		);
	}
}

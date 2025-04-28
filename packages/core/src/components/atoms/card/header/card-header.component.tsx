import { Component, h, Prop } from '@stencil/core';
import { cva } from 'class-variance-authority';

import { RotateOptions } from '../../../../types/tailwind';
import {
	IconFlipOptions,
	IconVariant,
} from '../../../atoms/icon/icon.component';

const header = cva(
	'inline-flex w-full relative flex-col justify-start z-[1] rounded-t-2xl overflow-hidden relative',
	{
		variants: {
			variant: {
				default: 'px-4',
				curve: 'aspect-[5/1] max-h-[6.25rem]',
			},
		},
	}
);

const content = cva('flex items-center gap-2', {
	variants: {
		variant: {
			default: 'py-3',
			curve: 'px-4 pt-3',
		},
	},
});
const title = cva('h-8 flex items-center font-bold text-sm');

@Component({
	tag: 'p-card-header',
	styleUrl: 'card-header.component.css',
	shadow: true,
})
export class CardHeader {
	/**
	 * The variant of the card header
	 */
	@Prop() variant: 'default' | 'curve' = 'default';

	/**
	 * Content of the card header
	 */
	@Prop() header: string;

	/**
	 * Icon to show on the button
	 */
	@Prop() icon?: IconVariant;

	/**
	 * Icon flip
	 */
	@Prop() iconFlip?: IconFlipOptions;

	/**
	 * Icon rotate
	 */
	@Prop() iconRotate?: RotateOptions;

	render() {
		return (
			<div
				class={header({
					variant: this.variant,
				})}
			>
				<div
					class={content({
						variant: this.variant,
					})}
				>
					{this.icon ? (
						<p-icon
							variant={this.icon}
							flip={this.iconFlip}
							rotate={this.iconRotate}
						/>
					) : (
						<slot name='prefix' />
					)}

					<div class={title()}>
						<span>{this.header?.length ? this.header : <slot />}</span>

						<slot name='content-suffix' />
					</div>

					<div class='ml-auto empty:hidden'>
						<slot name='suffix' />
					</div>
				</div>

				{this.variant === 'default' ? (
					<p-divider />
				) : (
					<p-smile variant='card' />
				)}
			</div>
		);
	}
}

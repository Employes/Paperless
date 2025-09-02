import { Component, h, Prop } from '@stencil/core';
import { cva } from 'class-variance-authority';

import { RotateOptions } from '../../../../types/tailwind';
import {
	IconFlipOptions,
	IconVariant,
} from '../../../atoms/icon/icon.component';
import { asBoolean } from '../../../../utils/as-boolean';
import { ThemedHost } from '../../../../internal/themed-host.component';

const header = cva(
	'inline-flex w-full relative flex-col justify-start z-[1] rounded-t-2xl relative',
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

const title = cva(
	'h-8 flex items-center font-bold text-sm gap-2 min-w-0 text-storm-500 dark:text-white'
);

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

	/**
	 * Wether to show the divider
	 */
	@Prop() divider = true;

	render() {
		return (
			<ThemedHost>
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
								class='text-storm-300 dark:text-hurricane-200'
								variant={this.icon}
								flip={this.iconFlip}
								rotate={this.iconRotate}
							/>
						) : (
							<slot name='prefix' />
						)}

						<div class={title()}>
							<span class='max-w-full overflow-hidden text-ellipsis'>
								{this.header?.length ? this.header : <slot />}
							</span>

							<slot name='content-suffix' />
						</div>

						<div class='ml-auto flex items-center justify-end gap-4 empty:hidden'>
							<slot name='suffix' />
						</div>
					</div>

					{this.variant === 'default' ? (
						asBoolean(this.divider) && <p-divider class='dark:text-white/15' />
					) : (
						<div class='pointer-events-none absolute left-0 top-0 z-[-1] h-full w-full overflow-hidden rounded-t-2xl'>
							<p-smile
								class='dark:text-hurricane-400'
								variant='card'
							/>
						</div>
					)}
				</div>
			</ThemedHost>
		);
	}
}

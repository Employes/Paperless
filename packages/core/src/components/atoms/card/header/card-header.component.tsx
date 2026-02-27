import { Component, h, Prop } from '@stencil/core';
import { cva } from 'class-variance-authority';

import { ThemedHost } from '../../../../internal/themed-host.component';
import { IconFlipOptions, IconVariant } from '../../../../types/icon';
import { RotateOptions } from '../../../../types/tailwind';
import { asBoolean } from '../../../../utils/as-boolean';

const header = cva(
	`relative z-[1] inline-flex w-full flex-col justify-start rounded-t-2xl`,
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
	`
		flex h-8 min-w-0 items-center gap-2 text-sm font-bold text-storm-500
		dark:text-white
	`
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
								class='
									text-storm-300
									dark:text-hurricane-200
								'
								flip={this.iconFlip}
								rotate={this.iconRotate}
								variant={this.icon}
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

						<div
							class='
								ml-auto flex items-center justify-end gap-4
								empty:hidden
							'
						>
							<slot name='suffix' />
						</div>
					</div>

					{this.variant === 'default' ? (
						asBoolean(this.divider) && (
							<p-divider
								class='
									text-off-white-700
									dark:text-white/15
								'
							/>
						)
					) : (
						<div
							class='
								pointer-events-none absolute left-0 top-0 z-[-1] h-full w-full
								overflow-hidden rounded-t-2xl
							'
						>
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

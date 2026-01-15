import { Component, Event, EventEmitter, h, Prop } from '@stencil/core';
import { cva } from 'class-variance-authority';

import { ThemedHost } from '../../../internal/themed-host.component';
import { IconFlipOptions, IconVariant, RotateOptions } from '../../../types';

const indicator = cva('w-[2px] rounded-full h-9 flex-shrink-0', {
	variants: {
		variant: {
			neutral: 'bg-indigo-800 dark:bg-indigo-400',
			positive: 'bg-positive-green-500 dark:bg-positive-green-alternative',
			biased: 'bg-amber-500 dark:bg-amber-alternative',
			negative: 'bg-negative-red-500 dark:bg-negative-red-alternative',
		},
	},
});

const content = cva([
	'flex justify-between items-center gap-2',
	'w-[calc(100%-2px-0.5rem)]',
]);

@Component({
	tag: 'p-toast',
	styleUrl: 'toast.component.css',
	shadow: true,
})
export class Toast {
	/**
	 * The variant of the toast
	 */
	@Prop() variant: 'neutral' | 'positive' | 'biased' | 'negative' = 'positive';

	/**
	 * The header of the toast
	 */
	@Prop() header?: string;

	/**
	 * The content of the toast
	 */
	@Prop() content?: string;

	/**
	 * Wether to enable the close button
	 */
	@Prop() enableAction: boolean = true;

	/**
	 * Icon to show on the button
	 */
	@Prop() actionIcon: IconVariant = 'negative';

	/**
	 * Icon flip
	 */
	@Prop() actionIconFlip: IconFlipOptions;

	/**
	 * Icon rotate
	 */
	@Prop() actionIconRotate: RotateOptions;

	/**
	 * Button click event
	 */
	@Event({
		bubbles: false,
	})
	action: EventEmitter<MouseEvent>;

	render() {
		return (
			<ThemedHost>
				<div
					class='flex gap-2 rounded-lg border border-solid border-storm-100 bg-white p-2 shadow-2 dark:border-hurricane-800 dark:bg-hurricane-800'
					onClick={() => this._onClick()}
				>
					<div class={indicator({ variant: this.variant })} />
					<div class={content()}>
						<div class='flex w-full min-w-0 flex-col'>
							<p class='m-0 overflow-hidden text-ellipsis whitespace-nowrap text-sm font-semibold text-storm-500 dark:text-white'>
								{this.header?.length ? this.header : <slot name='header' />}
							</p>
							<p class='m-0 w-full overflow-hidden text-ellipsis whitespace-nowrap text-xs text-storm-300 dark:text-hurricane-200'>
								{this.content?.length ? this.content : <slot name='content' />}
							</p>
						</div>

						{this.enableAction && (
							<div class='flex-shrink-0 cursor-pointer p-2 text-storm-200 hover:text-storm-500 hover:text-white dark:text-hurricane-200'>
								<p-icon
									variant={this.actionIcon}
									flip={this.actionIconFlip}
									rotate={this.actionIconRotate}
								/>
							</div>
						)}
					</div>
				</div>
			</ThemedHost>
		);
	}

	private _onClick() {
		if (this.enableAction) {
			this.action.emit();
		}
	}
}

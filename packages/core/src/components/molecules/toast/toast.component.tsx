import { Component, Event, EventEmitter, h, Host, Prop } from '@stencil/core';
import { RotateOptions } from '../../../types';
import { IconFlipOptions, IconVariant } from '../../atoms/icon/icon.component';
import { cva } from 'class-variance-authority';

const indicator = cva('w-[2px] rounded-full h-9 flex-shrink-0', {
	variants: {
		variant: {
			neutral: 'bg-supportive-lilac-800',
			positive: 'bg-positive-green-500',
			biased: 'bg-amber-500',
			negative: 'bg-negative-red-500',
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
			<Host onClick={() => this._onClick()}>
				<div class={indicator({ variant: this.variant })} />
				<div class={content()}>
					<div class='flex w-full min-w-0 flex-col'>
						<p class='m-0 overflow-hidden text-ellipsis whitespace-nowrap text-sm font-semibold text-white-500'>
							{this.header?.length ? this.header : <slot name='header' />}
						</p>
						<p class='m-0 w-full overflow-hidden text-ellipsis whitespace-nowrap text-xs text-dark-teal-200'>
							{this.content?.length ? this.content : <slot name='content' />}
						</p>
					</div>

					{this.enableAction && (
						<p-button
							variant='transparent'
							iconOnly
							icon={this.actionIcon}
							iconFlip={this.actionIconFlip}
							iconRotate={this.actionIconRotate}
							class='flex-shrink-0'
						/>
					)}
				</div>
			</Host>
		);
	}

	private _onClick() {
		if (this.enableAction) {
			this.action.emit();
		}
	}
}

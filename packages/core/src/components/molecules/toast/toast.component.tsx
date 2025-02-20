import { Component, Event, EventEmitter, h, Host, Prop } from '@stencil/core';
import { RotateOptions } from '../../../types';
import { IconFlipOptions, IconVariant } from '../../atoms/icon/icon.component';

@Component({
	tag: 'p-toast',
	styleUrl: 'toast.component.scss',
	shadow: true,
})
export class Toast {
	/**
	 * The variant of the toast
	 */
	@Prop() variant: 'positive' | 'unbiased' | 'negative' = 'positive';

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
			<Host
				class={`p-toast variant-${this.variant}`}
				onClick={() => this._onClick()}
			>
				<div class='flex w-full min-w-0 flex-col'>
					<p class='font-semibold text-storm'>
						{this.header?.length ? this.header : <slot name='header' />}
					</p>
					<p class='w-full text-sm text-storm-medium'>
						{this.content?.length ? this.content : <slot name='content' />}
					</p>
				</div>

				{this.enableAction && (
					<p-button
						variant='secondary'
						iconOnly
						size='sm'
						icon={this.actionIcon}
						iconFlip={this.actionIconFlip}
						iconRotate={this.actionIconRotate}
						class='flex-shrink-0'
					/>
				)}
			</Host>
		);
	}

	private _onClick() {
		if (this.enableAction) {
			this.action.emit();
		}
	}
}

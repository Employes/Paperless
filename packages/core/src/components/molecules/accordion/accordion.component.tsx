import { Component, Event, EventEmitter, h, Host, Prop } from '@stencil/core';
import { cn } from '../../../utils';

@Component({
	tag: 'p-accordion',
	styleUrl: 'accordion.component.css',
	shadow: true,
})
export class Accordion {
	/**
	 * The variant of the accordion
	 */
	@Prop() variant: 'primary' | 'secondary' = 'primary';

	/**
	 * Header of the accordion
	 */
	@Prop() header!: string;

	/**
	 * Wether the accordion is open
	 */
	@Prop() open: boolean = false;

	/**
	 * Wether the accordion can be closed
	 */
	@Prop() closeable: boolean = true;

	/**
	 * Wether the accordion can be opened
	 */
	@Prop() openable: boolean = true;

	/**
	 * Open change event
	 */
	@Event({
		bubbles: false,
	})
	isOpen: EventEmitter<boolean>;

	render() {
		return (
			<Host>
				<div
					class={cn('flex cursor-pointer items-center gap-2', {
						'text-black-teal-500': this.variant === 'primary',
						'text-black-teal-300': this.variant === 'secondary',
					})}
					onClick={() => this._onClick()}
				>
					<p-icon
						class='flex shrink-0'
						variant='caret'
						rotate={this.open ? 0 : -90}
					/>
					<p class='my-0 shrink-0 whitespace-nowrap text-base font-medium'>
						{this.header}
					</p>
					<p-divider class='flex-1' />
				</div>
				{this.open && (
					<div class='mt-4'>
						<slot />
					</div>
				)}
			</Host>
		);
	}

	private _onClick() {
		if (!this.closeable && this.open) {
			return;
		}

		if (!this.openable && !this.open) {
			return;
		}

		this.open = !this.open;
		this.isOpen.emit(this.open);
	}
}

import { Component, Event, EventEmitter, h, Host, Prop } from '@stencil/core';

@Component({
	tag: 'p-accordion',
	styleUrl: 'accordion.component.scss',
	shadow: true,
})
export class Accordion {
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
			<Host class='p-accordion'>
				<div
					class='flex cursor-pointer items-center gap-3 text-storm-vague'
					onClick={() => this._onClick()}
				>
					<p-icon
						class='flex'
						variant='caret'
						rotate={this.open ? 0 : -90}
					/>
					<p class='m-0 whitespace-nowrap text-lg font-medium'>{this.header}</p>
					<p-divider />
				</div>
				{this.open && (
					<div class='mt-6'>
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

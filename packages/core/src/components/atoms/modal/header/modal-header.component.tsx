import { Component, Event, EventEmitter, h, Prop } from '@stencil/core';
import { cva } from 'class-variance-authority';

const header = cva(
	'inline-flex w-full flex-col relative bg-white rounded-t-2xl overflow-hidden'
);

const content = cva([
	'flex justify-end',
	'w-full p-4 pb-0 bg-off-white -mb-1 h-12',
]);

const title = cva([
	'flex-1 text-center',
	'absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2',
	'black-teal-500 text-2xl text-ambit font-bold',
]);

@Component({
	tag: 'p-modal-header',
	styleUrl: 'modal-header.component.css',
	shadow: true,
})
export class ModalHeader {
	/**
	 * Wether to show the close button on mobile
	 */
	@Prop() showClose = true;

	/**
	 * Close click event
	 */
	@Event({
		bubbles: false,
	})
	close: EventEmitter<MouseEvent>;

	render() {
		return (
			<div class={header()}>
				<div class={content()}>
					<div class={title()}>
						<slot />
					</div>

					{this.showClose && (
						<p-button
							variant='secondary'
							icon='negative'
							iconOnly={true}
							onClick={ev => this.close.emit(ev)}
						></p-button>
					)}
				</div>

				<p-smile-footer />
			</div>
		);
	}
}

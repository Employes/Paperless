import { Component, Event, EventEmitter, h, Prop } from '@stencil/core';
import { cva } from 'class-variance-authority';

const header = cva([
	'w-full flex-col bg-white relative rounded-t-2xl overflow-hidden z-[1]',
	'inline-flex aspect-[7/1]',
]);

const content = cva(['flex justify-end', 'w-full p-4 pb-0 h-12']);

const title = cva([
	'flex-1 text-center',
	'w-[calc(100%-7rem)]',
	'absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2',
	'storm-500 text-2xl text-ambit font-bold',
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

				<p-smile />
			</div>
		);
	}
}

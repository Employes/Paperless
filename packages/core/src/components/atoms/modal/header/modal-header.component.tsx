import { Component, Event, EventEmitter, h, Prop } from '@stencil/core';
import { cva } from 'class-variance-authority';

import { ThemedHost } from '../../../../internal/themed-host.component';

const header = cva([
	`
   relative z-[1] w-full flex-col overflow-hidden rounded-t-2xl bg-white
   dark:bg-hurricane-600
 `,
	'inline-flex aspect-[7/1] max-h-28',
]);

const content = cva(['flex justify-end', 'h-12 w-full p-4 pb-0']);

const title = cva([
	'flex-1 text-center',
	'w-[calc(100%-7rem)]',
	'absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2',
	`
   text-ambit text-2xl font-bold text-storm-500
   dark:text-white
 `,
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
			<ThemedHost>
				<div class={header()}>
					<div class={content()}>
						<div class={title()}>
							<slot />
						</div>

						{this.showClose && (
							<p-button
								icon='negative'
								iconOnly={true}
								variant='secondary'
								onClick={ev => this.close.emit(ev)}
							></p-button>
						)}
					</div>

					<p-smile class='dark:text-hurricane-400' />
				</div>
			</ThemedHost>
		);
	}
}

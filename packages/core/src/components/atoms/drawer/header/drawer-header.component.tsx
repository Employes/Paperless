import { Component, Event, EventEmitter, h, Prop } from '@stencil/core';
import { cva } from 'class-variance-authority';

import { ThemedHost } from '../../../../internal/themed-host.component';

const header = cva([
	'w-full min-h-18 flex-col relative rounded-t-2xl overflow-hidden z-[1]',
	'bg-white dark:bg-hurricane-600',
	'inline-flex',
]);

const content = cva(['flex justify-between', 'w-full p-4 pb-0 min-h-12']);

const title = cva([
	'flex-1 text-center',
	'text-storm-500 dark:text-white text-2xl text-ambit font-bold',
]);

@Component({
	tag: 'p-drawer-header',
	styleUrl: 'drawer-header.component.css',
	shadow: true,
})
export class DrawerHeader {
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
						{this.showClose && (
							<p-button
								variant='secondary'
								icon='negative'
								iconOnly={true}
								onClick={ev => this.close.emit(ev)}
							></p-button>
						)}

						<div class={title()}>
							<slot />
						</div>

						{this.showClose && <div class='size-8' />}
					</div>

					<p-smile class='dark:text-hurricane-400' />
				</div>
			</ThemedHost>
		);
	}
}

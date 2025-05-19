import { Component, Event, EventEmitter, h, Prop } from '@stencil/core';
import { cva } from 'class-variance-authority';

const header = cva([
	'w-full min-h-18 flex-col bg-white relative rounded-t-2xl overflow-hidden z-[1]',
	'inline-flex',
]);

const content = cva(['flex justify-between', 'w-full p-4 pb-0 min-h-12']);

const title = cva([
	'flex-1 text-center',
	'black-teal-500 text-2xl text-ambit font-bold',
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

					{this.showClose && <div class="size-8" />}
				</div>

				<p-smile />
			</div>
		);
	}
}

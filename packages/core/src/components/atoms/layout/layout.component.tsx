import { Component, h, Host, Prop, Event, EventEmitter } from '@stencil/core';

@Component({
	tag: 'p-layout',
	styleUrl: 'layout.component.scss',
	shadow: true,
})
export class Layout {
	/**
	 * Variant of the layout
	 */
	@Prop() variant: 'default' | 'login' | 'office' = 'default';

	/**
	 * Event whenever the layout is being scrolled
	 */
	@Event() scroll: EventEmitter<any>;

	render() {
		return (
			<Host
				class={`
					p-layout
					variant-${this.variant}
				`}
			>
				<div
					class='content'
					onScroll={ev => this.scroll.emit(ev)}
				>
					<div class='inner-content'>
						<slot name='content' />
					</div>
				</div>
				<div class='sidebar'>
					<slot name='sidebar' />
				</div>
				<div class='topbar'>
					<slot name='topbar' />
				</div>
			</Host>
		);
	}
}

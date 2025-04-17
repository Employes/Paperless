import { Component, h, Host, Prop } from '@stencil/core';

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

	render() {
		return (
			<Host class={`p-layout variant-${this.variant}`}>
				<div class='content'>
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

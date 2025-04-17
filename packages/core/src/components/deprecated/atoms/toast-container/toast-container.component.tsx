import { Component, h, Host, Prop } from '@stencil/core';

@Component({
	tag: 'p-toast-container',
	styleUrl: 'toast-container.component.scss',
	shadow: true,
})
export class ToastContainer {
	/**
	 * The placement of the container
	 */
	@Prop() placement: 'top-start' | 'top-end' | 'bottom-start' | 'bottom-end' =
		'top-end';

	render() {
		return (
			<Host class={`p-toast-container placement-${this.placement}`}>
				<slot />
			</Host>
		);
	}
}

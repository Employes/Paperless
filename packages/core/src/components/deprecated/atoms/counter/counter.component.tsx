import { Component, h, Host, Prop } from '@stencil/core';

@Component({
	tag: 'p-counter',
	styleUrl: 'counter.component.scss',
	shadow: true,
})
export class Counter {
	/**
	 * The variant of the counter
	 */
	@Prop() variant: 'info' | 'negative' | 'positive' | 'unbiased' = 'info';

	/**
	 * The size of the counter
	 */
	@Prop() size: 'default' | 'mini' = 'default';

	render() {
		return (
			<Host class={`p-counter variant-${this.variant} size-${this.size}`}>
				<slot />
			</Host>
		);
	}
}

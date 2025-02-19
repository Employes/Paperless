import { Component, Element, h, Host, Prop } from '@stencil/core';

@Component({
	tag: 'p-divider',
	styleUrl: 'divider.component.scss',
	shadow: true,
})
export class Divider {
	/**
	 * The variant of the modal body
	 */
	@Prop({ reflect: true }) variant: 'horizontal' | 'vertical' = 'horizontal';

	/**
	 * The host element
	 */
	@Element() private _el: HTMLElement;

	render() {
		const hasSlotted = !!this._el.innerHTML?.length;
		return (
			<Host class='p-divider'>
				<div class='content'>
					<div
						class={`flex items-center ${
							hasSlotted && 'px-2'
						} text-xs font-semibold uppercase text-storm-light`}
					>
						<slot />
					</div>
				</div>
			</Host>
		);
	}
}

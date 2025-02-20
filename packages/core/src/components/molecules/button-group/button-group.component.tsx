import { Component, Element, h, Host, Listen, Prop } from '@stencil/core';
import { Button } from '../button/button.component';

@Component({
	tag: 'p-button-group',
	shadow: true,
})
export class ButtonGroup {
	/**
	 * The size of the child buttons
	 */
	@Prop() size: 'sm' | 'base' | 'lg' = 'base';

	/**
	 * The host element
	 */
	@Element() private _el: HTMLElement;

	componentWillLoad() {
		this._checkButtons();
	}

	render() {
		return (
			<Host class='p-button-group flex items-center'>
				<slot />
			</Host>
		);
	}

	@Listen('slotchange')
	slotchange() {
		this._checkButtons();
	}

	private _checkButtons() {
		const buttons = Array.from(
			this._el.querySelectorAll(':scope > p-button')
		) as any as Button[];

		for (let i = 0; i < buttons.length; i++) {
			const button = buttons[i];

			button.size = this.size;

			// first
			if (i === 0) {
				button.buttonGroupPosition = 'start';
				continue;
			}

			// last
			if (i === buttons.length - 1) {
				button.buttonGroupPosition = 'end';
				continue;
			}

			// rest
			button.buttonGroupPosition = 'center';
		}
	}
}

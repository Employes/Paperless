import { Component, Element, h, Host } from '@stencil/core';

@Component({
	tag: 'p-portal',
})
export class Portal {
	/**
	 * The host element
	 */
	@Element() _el: HTMLElement;

	private _moved: boolean = false;

	private createPortal() {
		document.body.append(this._el);
	}

	componentDidLoad() {
		this.createPortal();
	}

	disconnectedCallback() {
		this._moved ? this._el.remove() : (this._moved = true);
	}

	render() {
		return (
			<Host>
				<slot />
			</Host>
		);
	}
}

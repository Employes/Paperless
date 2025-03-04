import { Component, Element, h, Host, Prop } from '@stencil/core';

@Component({
	tag: 'p-portal',
})
export class Portal {
	@Prop() containerClass: string;

	@Element() _element: HTMLElement;

	private _moved: boolean = false;

	private createPortal() {
		document.body.append(this._element);
	}

	componentDidLoad() {
		this.createPortal();
	}

	disconnectedCallback() {
		this._moved ? this._element.remove() : (this._moved = true);
	}

	render() {
		return (
			<Host>
				<slot />
			</Host>
		);
	}
}

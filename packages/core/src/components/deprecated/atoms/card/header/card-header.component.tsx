import { Component, h, Host, Prop, Element } from '@stencil/core';

@Component({
	tag: 'p-card-header',
	styleUrl: 'card-header.component.scss',
})
export class CardHeader {
	/**
	 * Content of the card header
	 */
	@Prop() header: string;

	/**
	 * Enable the title arrow
	 */
	@Prop() arrow: boolean = false;

	/**
	 * The host element
	 */
	@Element() private _el: HTMLElement;

	private _hasContentSlot = false;
	private _hasContentSuffixSlot = false;

	componentWillLoad() {
		this._hasContentSlot = !!this._el.querySelector(
			':scope > [slot="content"]'
		);

		this._hasContentSuffixSlot = !!this._el.querySelector(
			':scope > [slot="content-suffix"]'
		);
	}

	render() {
		return (
			<Host class='p-card-header'>
				<slot name='prefix' />

				{(this.header?.length ||
					this._hasContentSlot ||
					this._hasContentSuffixSlot ||
					this.arrow) && (
					<div class='content'>
						<span>
							{this.header?.length ? this.header : <slot name='content' />}
						</span>

						<slot name='content-suffix' />

						{this.arrow && (
							<p-icon
								variant='arrow'
								class='group-hover:text-indigo'
							/>
						)}
					</div>
				)}

				<slot name='suffix' />
			</Host>
		);
	}
}

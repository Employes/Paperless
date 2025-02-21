import { Component, Element, h, Host, Prop, State } from '@stencil/core';
import { cva } from 'class-variance-authority';

const profileContent = cva(['flex gap-2 items-center w-full'], {
	variants: {
		dropdown: {
			false: 'h-10 py-1',
			true: null,
		},
	},
});

@Component({
	tag: 'p-profile',
	styleUrl: 'profile.component.scss',
})
export class Profile {
	/**
	 * The position of the dropdown
	 */
	@Prop() dropdownLocation: 'top-end' | 'bottom-end' = 'bottom-end';

	/**
	 * The host element
	 */
	@Element() private _el: HTMLElement;

	@State() private _dropdownOpen = false;
	@State() private _hasDropdownSlot = false;

	componentWillLoad() {
		this._hasDropdownSlot = !!this._el.querySelector(
			':scope > [slot="dropdown"]'
		);
	}

	render() {
		const content = this._getContent();

		return (
			<Host class='p-profile inline-block'>
				{this._hasDropdownSlot ? (
					<p-dropdown
						class='block'
						strategy='absolute'
						placement={this.dropdownLocation}
						applyFullWidth={true}
						applyMaxWidth={false}
						onIsOpen={ev => (this._dropdownOpen = ev.detail)}
					>
						<p-button
							variant='secondary'
							chevron={this._dropdownOpen ? 'up' : 'down'}
							active={this._dropdownOpen}
							slot='trigger'
							size='lg'
						>
							{content}
						</p-button>
						<div slot='items'>
							<slot name='dropdown' />
						</div>
					</p-dropdown>
				) : (
					content
				)}
			</Host>
		);
	}

	private _getContent() {
		return (
			<div
				class={profileContent({
					dropdown: this._hasDropdownSlot,
				})}
			>
				<slot name='avatar' />
				<div class='flex flex-1 flex-col'>
					<p class='font-sm font-medium'>
						<slot name='title' />
					</p>
					<p class='text-xs text-black-teal-300'>
						<slot name='subtitle' />
					</p>
				</div>

				<slot name='post-title' />
			</div>
		);
	}
}

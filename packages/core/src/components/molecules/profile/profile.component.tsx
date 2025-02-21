import { Component, Element, h, Host, Prop, State } from '@stencil/core';
import { cva } from 'class-variance-authority';

const profileContent = cva(['flex gap-2 items-center flex-1 min-w-0'], {
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

	componentWillRender() {
		this._updateAvatar();
	}

	render() {
		const content = this._getContent();
		return (
			<Host class='p-profile inline-block w-inherit'>
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
							variant='dropdown'
							chevron={this._dropdownOpen ? 'up' : 'down'}
							active={this._dropdownOpen}
							slot='trigger'
							size='lg'
							class='w-full px-2'
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
				<div class='flex min-w-0 flex-1 flex-col items-start'>
					<p class='overflow-hidden text-ellipsis whitespace-nowrap text-sm font-medium'>
						<slot name='title' />
					</p>
					<p class='overflow-hidden text-ellipsis whitespace-nowrap text-xs text-black-teal-300'>
						<slot name='subtitle' />
					</p>
				</div>

				<slot name='post-title' />
			</div>
		);
	}

	private _updateAvatar() {
		const avatar = this._el.querySelector(
			'p-avatar[slot="avatar"]'
		) as HTMLPAvatarElement;

		if (!avatar) {
			return;
		}

		avatar.size = this._hasDropdownSlot ? 'sm' : avatar.size;
	}
}

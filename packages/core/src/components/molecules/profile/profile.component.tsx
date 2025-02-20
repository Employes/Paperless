import { Component, Element, h, Host, Prop, State } from '@stencil/core';
import { cva } from 'class-variance-authority';

const profileContent = cva(['flex h-10 gap-2 items-center w-full'], {
	variants: {
		dropdown: {
			false: 'py-1',
			true: 'bg-white p-2 shadow-1 border rounded-lg hover:shadow-2 cursor-pointer',
		},
		dropdownOpen: {
			false: 'border-black-teal-100',
			true: 'shadow-2 border-supportive-lilac-800 ring ring-2 ring-supportive-lilac-100',
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
	 * The size of the profile avatar
	 */
	@Prop({ reflect: true }) size:
		| 'xs'
		| 'sm'
		| 'base'
		| 'lg'
		| 'xl'
		| '2xl'
		| '3xl'
		| '4xl' = 'base';

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
						{content}
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
					dropdownOpen: this._dropdownOpen,
				})}
				slot='trigger'
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
				{this._hasDropdownSlot && this._getIcon()}
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

	private _getIcon() {
		return (
			<p-icon
				variant='caret'
				flip={this._dropdownOpen ? 'vertical' : 'horizontal'}
			/>
		);
	}
}

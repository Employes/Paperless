import { Component, Element, h, Host, Prop, State } from '@stencil/core';

@Component({
	tag: 'p-profile',
	styleUrl: 'profile.component.scss',
	shadow: true,
})
export class Profile {
	/**
	 * The variant of the profile
	 */
	@Prop() variant: 'company' | 'user' = 'user';

	/**
	 * The size of the profile avatar
	 */
	@Prop({ reflect: true }) size:
		| 'xsmall'
		| 'small'
		| 'table'
		| 'medium'
		| 'large'
		| 'xlarge' = 'small';

	/**
	 * The host element
	 */
	@Element() private _el: HTMLElement;

	@State() private _dropdownOpen = false;

	componentWillRender() {
		this._updateAvatar();
	}

	render() {
		const hasDropdownSlot = !!this._el.querySelector(
			':scope > [slot="dropdown"]'
		);
		const content = this._getContent(hasDropdownSlot);
		const dropdownItems = <slot name='dropdown' />;
		return (
			<Host
				class={`p-profile ${hasDropdownSlot && 'has-dropdown'} ${
					this._dropdownOpen && 'active'
				}`}
			>
				{hasDropdownSlot ? (
					<p-dropdown
						class='w-full min-w-0'
						strategy='absolute'
						placement={this.variant === 'user' ? 'top-end' : 'bottom-end'}
						applyFullWidth={true}
						applyMaxWidth={false}
						onIsOpen={ev => (this._dropdownOpen = ev.detail)}
					>
						{content}
						<div slot='items'>{dropdownItems}</div>
					</p-dropdown>
				) : (
					content
				)}
			</Host>
		);
	}

	private _getContent(hasDropdownSlot) {
		return (
			<div
				class='content'
				slot='trigger'
			>
				<slot name='avatar' />
				<div class='name'>
					<slot name='title' />
					<slot name='subtitle' />
				</div>

				{hasDropdownSlot && this._getIcon()}
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

		avatar.variant = this.variant ?? avatar.variant;
		avatar.size = this.size ?? avatar?.size;
	}

	private _getIcon() {
		return (
			<p-icon
				class='ml-auto'
				variant={this.variant === 'company' ? 'chevron' : 'more'}
			/>
		);
	}
}

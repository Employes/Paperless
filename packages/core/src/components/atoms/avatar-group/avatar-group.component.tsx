import { Component, h, Host, Prop } from '@stencil/core';

@Component({
	tag: 'p-avatar-group',
	styleUrl: 'avatar-group.component.scss',
})
export class AvatarGroup {
	/**
	 * The amount to show after the avatars
	 */
	@Prop() extra: number;

	render() {
		return (
			<Host class='p-avatar-group flex items-center -space-x-1 overflow-hidden'>
				<slot />

				{this.extra && (
					<span class='pl-3 text-sm text-black-teal-300'>+{this.extra}</span>
				)}
			</Host>
		);
	}
}

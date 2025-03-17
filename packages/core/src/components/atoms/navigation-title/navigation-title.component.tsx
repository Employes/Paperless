import { Component, h, Host } from '@stencil/core';

@Component({
	tag: 'p-navigation-title',
	styleUrl: 'navigation-title.component.css',
	shadow: true,
})
export class NavigationTitle {
	render() {
		return (
			<Host class='p-navigation-title text-xs font-medium text-black-teal-300'>
				<slot />
			</Host>
		);
	}
}

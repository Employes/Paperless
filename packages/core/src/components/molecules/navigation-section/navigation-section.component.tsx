import { Component, h, Host, Prop } from '@stencil/core';

@Component({
	tag: 'p-navigation-section',
	styleUrl: 'navigation-section.component.scss',
})
export class NavigationSection {
	/**
	 * The title of the section
	 */
	@Prop() title: string;

	render() {
		return (
			<Host class='p-navigation-section flex flex-col'>
				{this.title?.length > 0 && (
					<p-navigation-title>{this.title}</p-navigation-title>
				)}

				<slot />
			</Host>
		);
	}
}

import { Component, h, Host, Prop } from '@stencil/core';

@Component({
	tag: 'p-navigation-section',
	styleUrl: 'navigation-section.component.scss',
})
export class NavigationSection {
	/**
	 * The header of the section
	 */
	@Prop() header: string;

	render() {
		return (
			<Host class='p-navigation-section flex flex-col gap-2'>
				{this.header?.length > 0 && (
					<p-navigation-title>{this.header}</p-navigation-title>
				)}

				<div class='flex flex-col'>
					<slot />
				</div>
			</Host>
		);
	}
}

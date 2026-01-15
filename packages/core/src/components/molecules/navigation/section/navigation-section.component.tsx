import { Component, h, Prop } from '@stencil/core';

import { ThemedHost } from '../../../../internal/themed-host.component';

@Component({
	tag: 'p-navigation-section',
	styleUrl: 'navigation-section.component.css',
})
export class NavigationSection {
	/**
	 * The header of the section
	 */
	@Prop() header: string;

	render() {
		return (
			<ThemedHost class='flex flex-col gap-2'>
				{this.header?.length > 0 && (
					<p-navigation-title>{this.header}</p-navigation-title>
				)}

				<div class='flex flex-col'>
					<slot />
				</div>
			</ThemedHost>
		);
	}
}

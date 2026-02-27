import { Component, h } from '@stencil/core';

import { ThemedHost } from '../../../internal/themed-host.component';

@Component({
	tag: 'p-navigation-title',
	styleUrl: 'navigation-title.component.css',
	shadow: true,
})
export class NavigationTitle {
	render() {
		return (
			<ThemedHost
				class='
      text-xs font-medium text-storm-300
      dark:text-hurricane-200
    '
			>
				<slot />
			</ThemedHost>
		);
	}
}

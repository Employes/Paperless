import { Component, h } from '@stencil/core';

import { ThemedHost } from '../../../../internal/themed-host.component';

@Component({
	tag: 'p-card-body',
	styleUrl: 'card-body.component.css',
	shadow: true,
})
export class CardBody {
	render() {
		return (
			<ThemedHost>
				<slot />
			</ThemedHost>
		);
	}
}

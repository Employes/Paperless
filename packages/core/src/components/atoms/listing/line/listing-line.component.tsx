import { Component, h } from '@stencil/core';

import { ThemedHost } from '../../../../internal/themed-host.component';

@Component({
	tag: 'p-listing-line',
	styleUrl: 'listing-line.component.css',
	shadow: true,
})
export class ListingLine {
	render() {
		return <ThemedHost />;
	}
}

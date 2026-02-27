import { Component, h } from '@stencil/core';

import { ThemedHost } from '../../../../internal/themed-host.component';

@Component({
	tag: 'p-segment-container',
	styleUrl: 'segment-container.component.css',
	shadow: true,
})
export class SegmentContainer {
	render() {
		return (
			<ThemedHost>
				<div
					class='
       flex rounded-2xl border border-solid border-off-white-700
       bg-off-white-300 p-1
       dark:border-hurricane-400 dark:bg-hurricane-600
     '
				>
					<slot />
				</div>
			</ThemedHost>
		);
	}
}

import { Component, h, Host } from '@stencil/core';

@Component({
	tag: 'p-segment-container',
	styleUrl: 'segment-container.component.css',
})
export class SegmentContainer {
	render() {
		return (
			<Host class='flex rounded-2xl border border-solid border-off-white-700 bg-off-white-300 p-1'>
				<slot />
			</Host>
		);
	}
}

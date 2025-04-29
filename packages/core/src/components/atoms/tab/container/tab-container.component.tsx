import { Component, h } from '@stencil/core';

@Component({
	tag: 'p-tab-container',
	styleUrl: 'tab-container.component.css',
	shadow: true,
})
export class TabContainer {
	render() {
		return (
			<div class='relative flex h-8 w-full flex-col'>
				<div class='z-10 flex w-full gap-5 overflow-x-auto scrollbar-hide'>
					<slot />
				</div>
				<p-divider class='absolute bottom-0 left-0 m-0 w-full' />
			</div>
		);
	}
}

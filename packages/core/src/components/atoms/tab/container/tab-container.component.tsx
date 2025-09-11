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
				<div class='scrollbar-hide z-10 flex w-full gap-5 overflow-x-auto'>
					<slot />
				</div>
				<p-divider class='absolute bottom-0 left-0 m-0 w-full text-off-white-700 dark:text-hurricane-400' />
			</div>
		);
	}
}

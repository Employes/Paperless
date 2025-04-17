import { Component, h, Host } from '@stencil/core';

@Component({
	tag: 'p-tab-group',
	shadow: true,
})
export class TabGroup {
	render() {
		return (
			<Host class="p-tab-group relative flex w-full flex-col">
				<div class="scrollbar-hide z-10 flex w-full gap-5 overflow-x-auto">
					<slot />
				</div>
				<p-divider class="absolute bottom-0 left-0 m-0 w-full" />
			</Host>
		);
	}
}

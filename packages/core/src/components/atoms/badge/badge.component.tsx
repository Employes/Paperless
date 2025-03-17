import { Component, h, Host } from '@stencil/core';

@Component({
	tag: 'p-badge',
	styleUrl: 'badge.component.css',
	shadow: false,
})
export class Badge {
	render() {
		return (
			<Host class='p-badge inline-flex h-4 min-w-[1.5rem] items-center justify-center rounded-full bg-teal px-1 text-center text-xs font-semibold text-white'>
				<slot />
			</Host>
		);
	}
}

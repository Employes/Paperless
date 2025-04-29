import { Component, h, Host } from '@stencil/core';
import { cva } from 'class-variance-authority';

const badge = cva([
	'inline-flex items-center justify-center',
	'h-4 min-w-[1.5rem] px-1',
	'rounded-full',
	'bg-dark-teal-400',
	'text-center text-xs font-semibold text-white',
]);

@Component({
	tag: 'p-badge',
	styleUrl: 'badge.component.css',
	shadow: false,
})
export class Badge {
	render() {
		return (
			<Host class={badge()}>
				<slot />
			</Host>
		);
	}
}

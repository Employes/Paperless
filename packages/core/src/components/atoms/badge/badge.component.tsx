import { Component, h } from '@stencil/core';
import { cva } from 'class-variance-authority';

const badge = cva([
	'inline-flex items-center justify-center',
	'h-4 min-w-4 px-1',
	'rounded-full',
	'bg-dark-teal-400',
	'text-center text-xs font-semibold text-white tracking-tight',
]);

@Component({
	tag: 'p-badge',
	styleUrl: 'badge.component.css',
	shadow: true,
})
export class Badge {
	render() {
		return (
			<div class={badge()}>
				<slot />
			</div>
		);
	}
}

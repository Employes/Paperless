import { Component, h } from '@stencil/core';
import { cva } from 'class-variance-authority';

import { ThemedHost } from '../../../internal/themed-host.component';

const badge = cva([
	'inline-flex items-center justify-center',
	'h-4 min-w-4 px-1',
	'rounded-full',
	'bg-storm-100 dark:bg-white/20',
	'text-storm-500 dark:text-white',
	'text-center text-xs font-semibold tracking-tight',
]);

@Component({
	tag: 'p-badge',
	styleUrl: 'badge.component.css',
	shadow: true,
})
export class Badge {
	render() {
		return (
			<ThemedHost>
				<div class={badge()}>
					<slot />
				</div>
			</ThemedHost>
		);
	}
}

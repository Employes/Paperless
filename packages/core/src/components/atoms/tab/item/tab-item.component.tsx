import { Component, h, Prop } from '@stencil/core';
import { cva } from 'class-variance-authority';

import { ThemedHost } from '../../../../internal/themed-host.component';

const item = cva(
	[
		'flex h-8 flex-col justify-between text-sm',
		'cursor-pointer',
		`
    after:content-['
    ']
    after:h-[2px]
  `,
	],
	{
		variants: {
			active: {
				true: `
      text-indigo-600
      after:bg-indigo-600
    `,
				false: [
					`
       text-storm-300
       after:bg-transparent
       hover:text-storm-400
       hover:after:bg-storm-400
     `,
					`
       dark:text-hurricane-200
       dark:hover:text-white
       dark:hover:after:bg-white
     `,
				],
			},
		},
	}
);

@Component({
	tag: 'p-tab-item',
	styleUrl: 'tab-item.component.css',
	shadow: true,
})
export class TabItem {
	/**
	 * Wether the tab item is active
	 */
	@Prop() active: boolean = false;

	render() {
		return (
			<ThemedHost>
				<div class={item({ active: this.active })}>
					<slot />
				</div>
			</ThemedHost>
		);
	}
}

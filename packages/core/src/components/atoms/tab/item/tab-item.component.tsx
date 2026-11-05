import { Component, h, Prop } from '@stencil/core';
import { cva } from 'class-variance-authority';

import { ThemedHost } from '../../../../internal/themed-host.component';

const item = cva(
	[
		'flex h-8 items-center justify-center gap-2 text-sm',
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

	/**
	 * Wether to show a chevron or not
	 */
	@Prop() chevron?: boolean | 'up' | 'down' = false;

	/**
	 * Chevron position
	 */
	@Prop() chevronPosition?: 'start' | 'end' = 'end';

	render() {
		return (
			<ThemedHost>
				<div class={item({ active: this.active })}>
					{this.chevron && this.chevronPosition === 'start' && (
						<p-icon
							rotate={this.chevron === 'up' ? 180 : 0}
							variant='caret'
						/>
					)}
					<slot />
					{this.chevron && this.chevronPosition === 'end' && (
						<p-icon
							rotate={this.chevron === 'up' ? 180 : 0}
							variant='caret'
						/>
					)}
				</div>
			</ThemedHost>
		);
	}
}

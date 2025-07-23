import { Component, h, Prop } from '@stencil/core';
import { cva } from 'class-variance-authority';

const item = cva(
	[
		'h-8 flex flex-col justify-between text-sm',
		'cursor-pointer',
		"after:h-[2px] after:content-[' ']",
	],
	{
		variants: {
			active: {
				true: 'after:bg-indigo-600 text-indigo-600',
				false:
					'text-storm-300 after:bg-transparent hover:after:bg-storm-400 hover:text-storm-400',
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
			<div class={item({ active: this.active })}>
				<slot />
			</div>
		);
	}
}

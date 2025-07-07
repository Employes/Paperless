import { Component, h, Prop } from '@stencil/core';
import { cva } from 'class-variance-authority';

const item = cva(
	[
		'text-base h-8 flex flex-col justify-between text-sm',
		'cursor-pointer',
		"after:h-[2px] after:content-[' ']",
	],
	{
		variants: {
			active: {
				true: 'after:bg-dark-teal-600 text-dark-teal-600',
				false:
					'text-dark-teal-400 after:bg-transparent hover:after:bg-dark-teal-100',
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

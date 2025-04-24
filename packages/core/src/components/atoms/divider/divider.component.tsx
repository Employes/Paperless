import { Component, h, Prop, Element } from '@stencil/core';
import { cva } from 'class-variance-authority';

const content = cva(
	[
		'flex items-center',
		'after:bg-off-white-700 before:bg-off-white-700',
		'after:flex-1 before:flex-1',
		'h-inherit w-inherit',
	],
	{
		variants: {
			variant: {
				horizontal: ['after:h-px before:h-px'],
				vertical: ['flex-col', 'after:w-px before:w-px'],
			},
		},
	}
);

@Component({
	tag: 'p-divider',
	styleUrl: 'divider.component.css',
	shadow: true,
})
export class Divider {
	/**
	 * The variant of the modal body
	 */
	@Prop({ reflect: true }) variant: 'horizontal' | 'vertical' = 'horizontal';

	/**
	 * The host element
	 */
	@Element() private _el: HTMLElement;

	render() {
		const hasContent = this._el.innerHTML?.length > 0;
		return (
			<div class={content({ variant: this.variant })}>
				<div class='flex items-center px-2 text-xs font-semibold uppercase text-black-teal-200 empty:px-0'>
					{hasContent && <slot />}
				</div>
			</div>
		);
	}
}

import { Component, h, Prop, Element, Host } from '@stencil/core';
import { cva } from 'class-variance-authority';

const content = cva(
	[
		'flex items-center',
		'after:bg-current before:bg-current',
		'after:flex-1 before:flex-1',
	],
	{
		variants: {
			variant: {
				horizontal: ['after:h-px before:h-px', 'w-full'],
				vertical: ['flex-col', 'after:w-px before:w-px', 'h-full'],
			},
		},
	}
);

@Component({
	tag: 'p-divider',
	styleUrl: 'divider.component.css',
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
			<Host
				class={{
					'text-off-white-700': !this._el.className.includes('text'),
				}}
			>
				<div class={content({ variant: this.variant })}>
					<div class='flex items-center px-2 text-xs font-semibold uppercase text-black-teal-200 empty:px-0'>
						{hasContent && <slot />}
					</div>
				</div>
			</Host>
		);
	}
}

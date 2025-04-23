import { Component, h, Host, Prop } from '@stencil/core';
import { cva } from 'class-variance-authority';

const divider = cva(['p-divider', 'block text-off-white-700'], {
	variants: {
		variant: {
			horizontal: 'w-full',
			vertical: 'h-full w-auto',
		},
	},
});

const content = cva(
	[
		'flex items-center',
		"after:content-[' '] before:content-[' ']",
		'after:bg-current before:bg-current',
		'after:flex-1 before:flex-1',
	],
	{
		variants: {
			variant: {
				horizontal: ['w-full', 'after:h-px before:h-px'],
				vertical: ['h-full w-auto flex-col', 'after:w-px before:w-px'],
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

	render() {
		return (
			<Host class={divider({ variant: this.variant })}>
				<div class={content({ variant: this.variant })}>
					<div class='flex items-center px-2 text-xs font-semibold uppercase text-black-teal-200 empty:px-0'>
						<slot />
					</div>
				</div>
			</Host>
		);
	}
}

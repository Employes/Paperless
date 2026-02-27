import { Component, h, Prop } from '@stencil/core';
import { cva } from 'class-variance-authority';

const container = cva(
	[
		'fixed z-toast flex flex-col gap-4',
		'tablet:max-w-[26.5rem]',
		'z-[600]',

		`
    w-[calc(100%-(env(safe-area-inset-left,0)+env(safe-area-inset-right,
    0)+2rem))]
  `,
		`
    max-w-[calc(100%-(env(safe-area-inset-left,0)+env(safe-area-inset-right,0)+2rem))]
  `,
	],
	{
		variants: {
			placement: {
				'top-start': [
					'top-[calc(env(safe-area-inset-top,0)+1rem)]',
					'left-[calc(env(safe-area-inset-left,0)+1rem)]',
				],
				'top-end': [
					'top-[calc(env(safe-area-inset-top,0)+1rem)]',
					'right-[calc(env(safe-area-inset-right,0)+1rem)]',
				],
				'bottom-start': [
					'bottom-[calc(env(safe-area-inset-bottom,0)+1rem)]',
					'left-[calc(env(safe-area-inset-left,0)+1rem)]',
				],
				'bottom-end': [
					'bottom-[calc(env(safe-area-inset-bottom,0)+1rem)]',
					'right-[calc(env(safe-area-inset-right,0)+1rem)]',
				],
			},
		},
	}
);

@Component({
	tag: 'p-toast-container',
	styleUrl: 'toast-container.component.css',
	shadow: true,
})
export class ToastContainer {
	/**
	 * The placement of the container
	 */
	@Prop() placement: 'top-start' | 'top-end' | 'bottom-start' | 'bottom-end' =
		'top-end';

	render() {
		return (
			<div
				class={container({
					placement: this.placement,
				})}
			>
				<slot />
			</div>
		);
	}
}

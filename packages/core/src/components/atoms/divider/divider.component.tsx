import { Component, Element, h, Prop } from '@stencil/core';
import { cva } from 'class-variance-authority';
import { ThemedHost } from '../../../internal/themed-host.component';

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
			alignContent: {
				start: 'before:hidden',
				center: null,
				end: 'after:hidden',
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
	 * Where to align the content
	 */
	@Prop({ reflect: true }) alignContent: 'start' | 'center' | 'end' = 'center';

	/**
	 * The host element
	 */
	@Element() private _el: HTMLElement;

	render() {
		const hasContent = this._el.innerHTML?.length > 0;
		return (
			<ThemedHost
				class={{
					'text-off-white-700 dark:text-hurricane-400':
						!this._el.className.includes('text'),
				}}
			>
				<div
					class={content({
						variant: this.variant,
						alignContent: this.alignContent,
					})}
				>
					<div class='flex items-center px-2 text-sm font-medium text-storm-400 empty:px-0 dark:text-hurricane-200'>
						{hasContent && <slot />}
					</div>
				</div>
			</ThemedHost>
		);
	}
}

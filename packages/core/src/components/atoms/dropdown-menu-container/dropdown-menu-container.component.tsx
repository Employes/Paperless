import { Component, h, Host, Prop } from '@stencil/core';
import { cva } from 'class-variance-authority';

const dropdownMenuContainer = cva(
	[
		'p-dropdown-menu-container',
		'w-auto p-1',
		'bg-white rounded-lg z-10 drop-shadow-2',
		'border border-black-teal-100',
	],
	{
		variants: {
			fullWidth: {
				false: null,
				true: 'w-full',
			},
			allowOverflow: {
				false: 'overflow-y-auto overflow-x-hidden',
				true: null,
			},
			scrollable: {
				none: null,
				default: 'max-h-[11.5rem]',
				large: 'max-h-[13.875rem]',
				xlarge: 'max-h-[20rem]',
			},
			maxWidth: {
				false: null,
				true: 'max-w-[13.875rem]',
			},
		},
	}
);

@Component({
	tag: 'p-dropdown-menu-container',
	styleUrl: 'dropdown-menu-container.component.scss',
})
export class DropdownMenuContainer {
	/**
	 * Wether the container applies it's max width
	 */
	@Prop() maxWidth: boolean = true;

	/**
	 * The class of the container passed by parent
	 */
	@Prop() class: string;

	/**
	 * Wether the container should all available space
	 */
	@Prop() fullWidth: boolean = true;

	/**
	 * Wether to allow overflow
	 */
	@Prop() allowOverflow: boolean = false;

	/**
	 * Wether the container should be scrollable when the threshold is met.
	 */
	@Prop() scrollable: boolean | 'default' | 'large' | 'xlarge' = false;

	render() {
		const scrollable =
			this.scrollable === false
				? 'none'
				: this.scrollable === true
				? 'default'
				: this.scrollable;

		return (
			<Host
				class={dropdownMenuContainer({
					class: this.class,
					fullWidth: this.fullWidth,
					allowOverflow: this.allowOverflow,
					scrollable,
					maxWidth: this.maxWidth,
				})}
			>
				<div class='flex w-full flex-col gap-[1px]'>
					<slot />
				</div>
			</Host>
		);
	}
}

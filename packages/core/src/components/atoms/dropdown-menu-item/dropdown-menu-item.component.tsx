import { Component, Host, Prop, h } from '@stencil/core';
import { IconVariant } from '../icon/icon.component';
import { cva } from 'class-variance-authority';

const dropdownMenuItem = cva(
	[
		'p-dropdown-menu-item flex px-2 py-1 gap-2 text-sm font-medium group rounded-lg items-center h-8 max-w-full',
	],
	{
		variants: {
			active: {
				false: null,
				true: 'bg-supportive-lilac-100',
			},
			disabled: {
				false: null,
				true: 'bg-supportive-lilac-100 text-black-teal-200 cursor-not-allowed',
			},
			enableHover: {
				false: null,
				true: null,
			},
		},
		compoundVariants: [
			{
				active: false,
				enableHover: true,
				disabled: false,
				class: 'hover:bg-supportive-lilac-50',
			},
			{
				enableHover: true,
				disabled: false,
				class: 'cursor-pointer',
			},
		],
	}
);

const dropdownMenuItemIcon = cva(['text-base'], {
	variants: {
		active: {
			false: 'text-black-teal-300',
			true: false,
		},
		disabled: {
			false: false,
			true: 'text-black-teal-100',
		},
	},
});

@Component({
	tag: 'p-dropdown-menu-item',
	styleUrl: 'dropdown-menu-item.component.scss',
})
export class DropdownMenuItem {
	/**
	 * Wether the dropdown menu item is active
	 */
	@Prop() active: boolean = false;

	/**
	 * The variant of the item
	 */
	@Prop() variant: 'default' | 'checkbox' = 'default';

	/**
	 * Wether to enable the hover state
	 */
	@Prop() enableHover: boolean = true;

	/**
	 * Wether the item is disabled
	 */
	@Prop() disabled: boolean = false;

	/**
	 * Icon of the navigation item
	 */
	@Prop() icon: IconVariant;

	/**
	 *  wether to use the container for text
	 */
	@Prop() useContainer = true;

	render() {
		return (
			<Host
				class={dropdownMenuItem({
					active: this.active,
					enableHover: this.enableHover,
					disabled: this.disabled,
				})}
			>
				{/* class={`p-dropdown-menu-item ${this.active && 'active'} ${ */}
				{/* 	this.enableHover && 'hover' */}
				{/* }`} */}
				{this.icon && (
					<p-icon
						class={dropdownMenuItemIcon({
							active: this.active,
							disabled: this.disabled,
						})}
						variant={this.icon}
					/>
				)}

				{this.variant === 'checkbox' && (
					<input
						type='checkbox'
						class='p-input size-small flex-shrink-0'
						checked={this.active}
					/>
				)}

				{this.useContainer ? (
					<div class='block w-full overflow-hidden text-ellipsis whitespace-nowrap text-start'>
						<slot />
					</div>
				) : (
					<slot />
				)}
			</Host>
		);
	}
}

import { Component, Host, Prop, h } from '@stencil/core';
import { IconVariant } from '../icon/icon.component';
import { cva } from 'class-variance-authority';

const dropdownMenuItem = cva(
	[
		'p-dropdown-menu-item flex px-2 py-1 gap-2 text-sm font-medium group rounded-lg items-center h-8 max-w-full',
	],
	{
		variants: {
			variant: {
				default: null,
				negative: null,
			},
			active: {
				false: null,
				true: null,
			},
			disabled: {
				false: null,
				true: 'cursor-not-allowed',
			},
			enableHover: {
				false: null,
				true: null,
			},
		},
		compoundVariants: [
			{
				variant: 'default',
				active: false,
				enableHover: true,
				disabled: false,
				class: 'text-black-teal hover:bg-supportive-lilac-50',
			},
			{
				variant: 'default',
				active: true,
				disabled: false,
				class: 'bg-supportive-lilac-100',
			},
			{
				variant: 'default',
				disabled: true,
				class: 'text-black-teal-200',
			},
			{
				variant: 'default',
				disabled: true,
				active: true,
				class: 'bg-supportive-lilac-100',
			},

			{
				variant: 'negative',
				active: false,
				enableHover: true,
				disabled: false,
				class: 'text-negative-red hover:bg-negative-red-50',
			},
			{
				variant: 'negative',
				active: true,
				disabled: false,
				class: 'bg-negative-red-100 text-negative-red',
			},
			{
				variant: 'negative',
				disabled: true,
				class: 'text-negative-red-100',
			},
			{
				variant: 'negative',
				disabled: true,
				active: true,
				class: 'bg-negative-red-50',
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
		variant: {
			default: null,
			negative: null,
		},
		active: {
			false: null,
			true: null,
		},
		disabled: {
			false: null,
			true: 'text-black-teal-100',
		},
	},
	compoundVariants: [
		{
			variant: 'default',
			active: false,
			disabled: false,
			class: 'text-black-teal-300 group-hover:text-black-teal',
		},

		{
			variant: 'negative',
			active: false,
			disabled: false,
			class: 'text-negative-red group-hover:text-negative-red-800',
		},
		{
			variant: 'negative',
			active: true,
			disabled: false,
			class: 'text-negative-red-800',
		},
	],
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
	 * Wether the dropdown menu item has a checkbox
	 */
	@Prop() checkbox: boolean = false;

	/**
	 * The variant of the item
	 */
	@Prop() variant: 'default' | 'negative' = 'default';

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
					variant: this.variant,
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
							variant: this.variant,
							active: this.active,
							disabled: this.disabled,
						})}
						variant={this.icon}
					/>
				)}

				{this.checkbox && (
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

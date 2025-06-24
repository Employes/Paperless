import { Component, Prop, h } from '@stencil/core';
import { cva } from 'class-variance-authority';
import { asBoolean } from '../../../../utils/as-boolean';
import { IconVariant } from '../../icon/icon.component';
import { cn } from '../../../../utils';

const dropdownMenuItem = cva(
	[
		'p-dropdown-menu-item flex px-2 py-1 gap-2 text-sm font-medium group rounded-lg items-center max-w-full',
	],
	{
		variants: {
			variant: {
				default: null,
				'dark-teal': null,
				negative: null,
			},
			active: {
				false: null,
				true: null,
			},
			disabled: {
				false: 'cursor-pointer',
				true: 'cursor-not-allowed',
			},
			enableHover: {
				false: null,
				true: null,
			},
			enableTextWrap: {
				true: 'min-h-8',
				false: 'h-8',
			},
		},
		compoundVariants: [
			{
				variant: 'default',
				active: false,
				enableHover: true,
				disabled: false,
				class: 'hover:bg-supportive-lilac-50',
			},
			{
				variant: 'default',
				active: true,
				disabled: false,
				class: 'bg-supportive-lilac-100',
			},
			{
				variant: 'default',
				disabled: false,
				class: 'text-black-teal',
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
				variant: 'dark-teal',
				active: false,
				enableHover: true,
				class: 'text-white',
			},
			{
				variant: 'dark-teal',
				active: false,
				enableHover: true,
				disabled: false,
				class: 'hover:bg-dark-teal-500',
			},
			{
				variant: 'dark-teal',
				active: true,
				class: 'text-white bg-dark-teal-600',
			},
			{
				variant: 'dark-teal',
				disabled: true,
				class: 'opacity-40',
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
			'dark-teal': null,
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
		wave: {
			true: 'group-hover:animate-wave',
			false: null,
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
			variant: 'dark-teal',
			active: false,
			disabled: false,
			class: 'text-dark-teal-100 group-hover:text-white',
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
	styleUrl: 'dropdown-menu-item.component.css',
	shadow: true,
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
	@Prop() variant: 'default' | 'dark-teal' | 'negative' = 'default';

	/**
	 * Wether to enable the hover state
	 */
	@Prop() enableHover?: boolean = true;

	/**
	 * Wether to enable wrapping the text to a new line
	 */
	@Prop() enableTextWrap?: boolean = false;

	/**
	 * Wether the item is disabled
	 */
	@Prop() disabled: boolean = false;

	/**
	 * Icon of the navigation item
	 */
	@Prop() icon: IconVariant;

	/**
	 * Wether to apply wave animation to icon
	 */
	@Prop() iconWave: boolean = false;

	/**
	 *  wether to use the container for text
	 */
	@Prop() useContainer = true;

	render() {
		return (
			<div
				class={dropdownMenuItem({
					variant: this.variant,
					active: asBoolean(this.active),
					enableHover: asBoolean(this.enableHover ?? true, true),
					enableTextWrap: this.enableTextWrap,
					disabled: asBoolean(this.disabled),
				})}
			>
				{this.icon && (
					<p-icon
						class={dropdownMenuItemIcon({
							variant: this.variant,
							active: asBoolean(this.active),
							disabled: asBoolean(this.disabled),
							wave: asBoolean(this.iconWave),
						})}
						variant={this.icon}
					/>
				)}

				{this.checkbox && (
					<p-checkbox
						checked={this.active}
						disabled={this.disabled}
					/>
				)}

				{this.useContainer ? (
					<div
						class={cn('block w-full overflow-hidden text-start', {
							'text-ellipsis whitespace-nowrap': !this.enableTextWrap,
						})}
					>
						<slot />
					</div>
				) : (
					<slot />
				)}
			</div>
		);
	}
}

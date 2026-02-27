import { Component, Prop, h } from '@stencil/core';
import { cva } from 'class-variance-authority';

import { ThemedHost } from '../../../../internal/themed-host.component';
import { IconVariant } from '../../../../types/icon';
import { cn } from '../../../../utils';
import { asBoolean } from '../../../../utils/as-boolean';

const dropdownMenuItem = cva(
	[
		`
			p-dropdown-menu-item group flex max-w-full items-center gap-2 rounded-lg
			text-sm
		`,
	],
	{
		variants: {
			variant: {
				default: null,
				storm: null,
				negative: null,
				pagination: `
					h-6 px-2 text-xs text-storm-300
					dark:text-hurricane-200
				`,
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
				true: null,
				false: null,
			},
			autoHeight: {
				true: null,
				false: null,
			},
		},
		compoundVariants: [
			{
				autoHeight: false,
				enableTextWrap: true,
				class: 'min-h-8',
			},
			{
				autoHeight: false,
				enableTextWrap: false,
				class: 'h-8',
			},
			{
				variant: ['default', 'storm', 'negative'],
				class: 'px-2 py-1 font-medium',
			},
			{
				variant: ['default', 'pagination'],
				active: false,
				enableHover: true,
				disabled: false,
				class: `
					hover:bg-indigo-50
					dark:hover:bg-indigo-600/10
				`,
			},
			{
				variant: 'default',
				active: true,
				disabled: false,
				class: `
					bg-indigo-100
					dark:bg-indigo-600/20
				`,
			},
			{
				variant: 'default',
				disabled: false,
				class: `
					text-storm-500
					dark:text-white
				`,
			},
			{
				variant: 'default',
				disabled: true,
				class: `
					text-storm-200
					dark:text-hurricane-300
				`,
			},
			{
				variant: 'default',
				disabled: true,
				active: true,
				class: `
					bg-indigo-50
					dark:bg-white/5
				`,
			},

			{
				variant: 'storm',
				active: false,
				enableHover: true,
				class: `
					text-white
					dark:text-storm-500
				`,
			},
			{
				variant: 'storm',
				active: false,
				enableHover: true,
				disabled: false,
				class: `
					hover:bg-storm-500
					dark:hover:bg-storm-500/15
				`,
			},
			{
				variant: 'storm',
				active: true,
				class: `
					bg-storm-600 text-white
					dark:bg-storm-500/20 dark:text-storm-500
				`,
			},
			{
				variant: 'storm',
				disabled: true,
				class: 'opacity-40',
			},

			{
				variant: 'negative',
				active: false,
				enableHover: true,
				disabled: false,
				class: `
					text-negative-red-500
					hover:bg-negative-red-50
					dark:hover:bg-negative-red-500/10
				`,
			},
			{
				variant: 'negative',
				active: true,
				disabled: false,
				class: `
					bg-negative-red-100 text-negative-red-500
					dark:bg-negative-red-500/15
				`,
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
			storm: null,
			negative: null,
			pagination: null,
		},
		active: {
			false: null,
			true: null,
		},
		disabled: {
			false: null,
			true: 'text-storm-100',
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
			class: [
				`
					text-storm-300
					group-hover:text-storm-500
				`,
				`
					dark:text-hurricane-200
					dark:group-hover:text-white
				`,
			],
		},

		{
			variant: 'storm',
			active: false,
			disabled: false,
			class: [
				`
					text-storm-100
					group-hover:text-white
				`,
				`
					dark:text-storm-300
					dark:group-hover:text-storm-500
				`,
			],
		},

		{
			variant: 'negative',
			active: false,
			disabled: false,
			class: `
				text-negative-red-500
				group-hover:text-negative-red-800
				dark:text-negative-red-alternative
				dark:group-hover:text-negative-red-500
			`,
		},
		{
			variant: 'negative',
			active: true,
			disabled: false,
			class: `
				text-negative-red-800
				dark:text-negative-red-500
			`,
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
	@Prop() variant: 'default' | 'storm' | 'negative' | 'pagination' = 'default';

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

	/**
	 *  wether to auto adjust the height
	 */
	@Prop() autoHeight = false;

	render() {
		return (
			<ThemedHost>
				<div
					class={cn(
						dropdownMenuItem({
							variant: this.variant,
							active: asBoolean(this.active),
							enableHover: asBoolean(this.enableHover ?? true),
							autoHeight: asBoolean(this.autoHeight ?? false),
							enableTextWrap: this.enableTextWrap,
							disabled: asBoolean(this.disabled),
						})
					)}
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
			</ThemedHost>
		);
	}
}

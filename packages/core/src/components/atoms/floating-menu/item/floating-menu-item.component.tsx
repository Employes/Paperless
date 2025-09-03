import { Component, h, Prop } from '@stencil/core';
import { cva } from 'class-variance-authority';
import { ThemedHost } from '../../../../internal/themed-host.component';
import { RotateOptions } from '../../../../types';
import { asBoolean } from '../../../../utils/as-boolean';
import { IconFlipOptions, IconVariant } from '../../icon/icon.component';

const item = cva(
	['group', 'flex gap-2 items-center h-8 px-2', 'text-sm', 'rounded-lg'],
	{
		variants: {
			hover: {
				false: null,
				true: null,
			},
			disabled: {
				false: null,
				true: 'opacity-60 cursor-not-allowed',
			},
		},
		compoundVariants: [
			{
				disabled: true,
				class: 'cursor-not-allowed text-storm-50',
			},
			{
				disabled: false,
				class: 'text-storm-100',
			},
			{
				disabled: false,
				hover: true,
				class: [
					'cursor-pointer active:text-storm-100/60 hover:bg-storm-800 active:bg-storm-700',
					'dark:hover:bg-hurricane-500 dark:active:bg-hurricane-600/50',
				],
			},
		],
	}
);

const icon = cva([], {
	variants: {
		hover: {
			false: null,
			true: null,
		},
		disabled: {
			false: null,
			true: null,
		},
	},
	compoundVariants: [
		{
			disabled: false,
			hover: true,
			class: 'group-hover:text-storm-100 group-active:text-storm-100/60',
		},
	],
});

@Component({
	tag: 'p-floating-menu-item',
	styleUrl: 'floating-menu-item.component.css',
})
export class FloatingMenuItem {
	/**
	 * Wether it should have a hover effect
	 */
	@Prop() hover: boolean = true;

	/**
	 * Wether the item is disabled
	 */
	@Prop() disabled: boolean = false;

	/**
	 * Wether loading is applied
	 */
	@Prop() loading: boolean = false;

	/**
	 * Icon to show on the item
	 */
	@Prop() icon: IconVariant;

	/**
	 * Icon position
	 */
	@Prop() iconPosition: 'start' | 'end' = 'end';

	/**
	 * Icon flip
	 */
	@Prop() iconFlip: IconFlipOptions;

	/**
	 * Icon rotate
	 */
	@Prop() iconRotate: RotateOptions;

	render() {
		return (
			<ThemedHost
				class={item({
					hover: asBoolean(this.hover) && !asBoolean(this.loading),
					disabled: asBoolean(this.disabled),
				})}
			>
				{this._getIcon()}

				<p class='min-w-0 overflow-hidden text-ellipsis text-nowrap font-semibold empty:hidden'>
					<slot />
				</p>
			</ThemedHost>
		);
	}

	private _getIcon() {
		if (!this.icon && !this.loading) {
			return;
		}

		if (this.loading) {
			return <p-loader color='white' />;
		}

		return (
			<p-icon
				class={icon({
					hover: asBoolean(this.hover),
					disabled: asBoolean(this.disabled),
				})}
				variant={this.icon}
				flip={this.iconFlip}
				rotate={this.iconRotate}
			/>
		);
	}
}

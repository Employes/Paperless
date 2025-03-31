import { Component, h, Host, Prop } from '@stencil/core';
import { IconFlipOptions, IconVariant } from '../icon/icon.component';
import { RotateOptions } from '../../../types';
import { cva } from 'class-variance-authority';

const item = cva(
	[
		'p-floating-menu-item group',
		'flex gap-2 items-center h-6',
		'text-sm text-dark-teal-300',
	],
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
				disabled: false,
				hover: true,
				class: 'cursor-pointer hover:text-dark-teal-100',
			},
		],
	}
);

const icon = cva(['text-dark-teal-200'], {
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
			class: 'group-hover:text-dark-teal-100',
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
	@Prop({ reflect: true }) hover: boolean = true;

	/**
	 * Wether the item is disabled
	 */
	@Prop({ reflect: true }) disabled: boolean = false;

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
			<Host
				class={item({
					hover: this.hover && !this.loading,
					disabled: this.disabled,
				})}
			>
				{this._getIcon()}

				<p class='min-w-0 overflow-hidden text-ellipsis text-nowrap font-semibold'>
					<slot />
				</p>
			</Host>
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
					hover: this.hover,
					disabled: this.disabled,
				})}
				variant={this.icon}
				flip={this.iconFlip}
				rotate={this.iconRotate}
			/>
		);
	}
}

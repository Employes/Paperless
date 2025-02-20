import { Component, h, Host, Prop } from '@stencil/core';
import { RotateOptions, TextSizeOptions } from '../../../types/tailwind';
import { iconsDeprecated } from '../../../utils/icons-deprecated';
import { IconFlipOptions } from '../icon/icon.component';

export type IconDeprecatedVariant = keyof typeof iconsDeprecated;

@Component({
	tag: 'p-icon-deprecated',
	styleUrl: 'icon.component.scss',
	// shadow: true,
})
export class Icon {
	/**
	 * The icon the be displayed
	 */
	@Prop() variant!: IconDeprecatedVariant;

	/**
	 * The size of the icon, using tailwind sizes
	 */
	@Prop() size: TextSizeOptions = 'auto';

	/**
	 * Wether to rotate the icon x degrees
	 */
	@Prop() rotate: RotateOptions = 0;

	/**
	 * Wether to flip the icon horizontally or vertically
	 */
	@Prop() flip: IconFlipOptions = 'none';

	render() {
		const icon = iconsDeprecated[this.variant];

		const styles = {
			'p-icon flex': true,
			'text-auto': this.size === 'auto',
			'text-xxs': this.size === 'xxs',
			'text-xs': this.size === 'xs',
			'text-sm': this.size === 'sm',
			'text-base': this.size === 'base',
			'text-lg': this.size === 'lg',
			'text-xl': this.size === 'xl',
			'text-2xl': this.size === '2xl',
			'text-3xl': this.size === '3xl',
			'text-4xl': this.size === '4xl',
			transform: !!this.rotate || this.flip !== 'none',
			'scale-x-flip': this.flip === 'horizontal',
			'scale-y-flip': this.flip === 'vertical',
			'rotate-0': this.rotate === 0,
			'rotate-25': this.rotate === 25,
			'rotate-45': this.rotate === 45,
			'rotate-90': this.rotate === 90,
			'rotate-135': this.rotate === 135,
			'rotate-180': this.rotate === 180,
			'rotate-225': this.rotate === 225,
			'rotate-270': this.rotate === 270,
			'rotate-315': this.rotate === 315,
			'-rotate-0': this.rotate === -0,
			'-rotate-25': this.rotate === -25,
			'-rotate-45': this.rotate === -45,
			'-rotate-90': this.rotate === -90,
			'-rotate-135': this.rotate === -135,
			'-rotate-180': this.rotate === -180,
			'-rotate-225': this.rotate === -225,
			'-rotate-270': this.rotate === -270,
			'-rotate-315': this.rotate === -315,
		};

		return (
			<Host
				class={styles}
				innerHTML={icon}
			></Host>
		);
	}
}

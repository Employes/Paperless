import { Component, h, Host, Prop } from '@stencil/core';
import { cva } from 'class-variance-authority';
import { TextSizeOptions } from '../../../types/tailwind';
import { icons } from '../../../utils/icons';

export type IconVariant = keyof typeof icons;
export type IconFlipOptions = 'none' | 'horizontal' | 'vertical';

const icon = cva(['p-icon inline-flex'], {
	variants: {
		flip: {
			none: null,
			horizontal: 'scale-x-flip',
			vertical: 'scale-y-flip',
		},
		size: {
			auto: 'text-auto',
			xxs: 'text-xxs',
			xs: 'text-xs',
			sm: 'text-sm',
			base: 'text-base',
			lg: 'text-lg',
			xl: 'text-xl',
			'2xl': 'text-2xl',
			'3xl': 'text-3xl',
			'4xl': 'text-4xl',
		},
		transform: {
			true: 'transform-gpu scale-[0.99]',
			false: null,
		},
	},
});

@Component({
	tag: 'p-icon',
	styleUrl: 'icon.component.css',
})
export class Icon {
	/**
	 * The icon the be displayed
	 */
	@Prop() variant!: IconVariant;

	/**
	 * The size of the icon, using tailwind sizes
	 */
	@Prop() size: TextSizeOptions = 'base';

	/**
	 * Wether to rotate the icon x degrees
	 */
	@Prop() rotate: number = 0;

	/**
	 * Wether to flip the icon horizontally or vertically
	 */
	@Prop() flip: IconFlipOptions = 'none';

	render() {
		const svg = icons[this.variant];

		return (
			<Host
				class={icon({
					flip: this.flip,
					size: this.size,
					transform: this.flip !== 'none' || this.rotate > 0 || this.rotate < 0,
				})}
				style={{
					'--tw-rotate': `${this.rotate}deg`,
				}}
				innerHTML={svg}
			></Host>
		);
	}
}

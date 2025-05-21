import { Component, h, Prop, Element } from '@stencil/core';
import { cva } from 'class-variance-authority';
import { TextSizeOptions } from '../../../types/tailwind';
import { icons } from '../../../utils/icons';

export type IconVariant = keyof typeof icons;
export type IconFlipOptions = 'none' | 'horizontal' | 'vertical';

const icon = cva(['p-icon inline-flex', 'transform-gpu transition-transform'], {
	variants: {
		flip: {
			none: null,
			horizontal: 'scale-x-flip',
			vertical: 'scale-y-flip',
		},
		size: {
			auto: null,
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
			true: 'scale-[0.9999]',
			false: null,
		},
	},
});

@Component({
	tag: 'p-icon',
	styleUrl: 'icon.component.css',
	shadow: true,
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

	/**
	 * The host element
	 */
	@Element() _el: HTMLElement;

	componentWillRender() {
		const icon = icons[this.variant];
		if (!icon) {
			console.warn(`[p-icon] Variant "${this.variant}" does not exist `);
		}
	}

	render() {
		const hasTextSizeClass = /text-(xs|sm|base|lg|xl)/.test(this._el.className);
		const svg = icons[this.variant];

		return (
			<div
				class={icon({
					flip: this.flip,
					size: hasTextSizeClass ? 'auto': this.size,
					transform: this.flip !== 'none' || this.rotate > 0 || this.rotate < 0,
				})}
				style={{
					'--tw-rotate': `${this.rotate}deg`,
				}}
				title={this.variant}
				innerHTML={svg}
			></div>
		);
	}
}

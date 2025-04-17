import { Component, h, Host, Prop } from '@stencil/core';
import { RotateOptions } from '../../../../types/tailwind';
import {
	IconFlipOptions,
	IconVariant,
} from '../../../atoms/icon/icon.component';

@Component({
	tag: 'p-status',
	styleUrl: 'status.component.scss',
})
export class Status {
	/**
	 * The variant of the status
	 */
	@Prop() variant: 'default' | 'positive' | 'unbiased' | 'negative' = 'default';

	/**
	 * Icon to show on the status
	 */
	@Prop() icon: IconVariant;

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
				class={`p-status variant-${this.variant}
                }`}
			>
				{this._getIcon()}
				<slot />
			</Host>
		);
	}

	private _getIcon() {
		const icon = this.icon || this._getVariantIcon();

		if (!icon) {
			return;
		}

		return (
			<p-icon
				variant={icon}
				flip={this.iconFlip}
				rotate={this.iconRotate}
			/>
		);
	}

	private _getVariantIcon() {
		let icon = null;
		switch (this.variant) {
			case 'positive':
				icon = 'checkmark';
				break;
			case 'negative':
				icon = 'negative';
				break;
			case 'unbiased':
				icon = 'clock';
				break;
			default:
				icon = null;
				break;
		}

		return icon;
	}
}

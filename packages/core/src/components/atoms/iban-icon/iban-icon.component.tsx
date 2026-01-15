import { Component, h, Prop } from '@stencil/core';

import { IBAN_ICON_VARIANTS_ARRAY, IbanIconVariant } from '../../../types';

@Component({
	tag: 'p-iban-icon',
	shadow: true,
})
export class IbanIcon {
	/**
	 * The iban you want to get an icon for
	 */
	@Prop({ reflect: true }) iban: string;

	/**
	 * The variant of the icon you want toshow
	 */
	@Prop({ reflect: true }) variant: IbanIconVariant;

	render() {
		let variant: string = this.variant;

		if (this.iban?.length) {
			variant = this.iban.slice(4, 8).toLowerCase();
		}

		const exists = IBAN_ICON_VARIANTS_ARRAY.includes(
			variant as IbanIconVariant
		);

		return exists && this._getIcon(variant as IbanIconVariant);
	}

	private _getIcon(variant: IbanIconVariant) {
		switch (variant) {
			case 'abna': {
				return <img src='./assets/iban-icons/icon-abn.svg' />;
			}
			case 'rabo': {
				return <img src='./assets/iban-icons/icon-rabo.svg' />;
			}
			case 'ingb': {
				return <img src='./assets/iban-icons/icon-ing.png' />;
			}
			case 'bunq': {
				return <img src='./assets/iban-icons/icon-bunq.svg' />;
			}
			case 'asnb': {
				return <img src='./assets/iban-icons/icon-asn.svg' />;
			}
			case 'trio': {
				return <img src='./assets/iban-icons/icon-triodos.svg' />;
			}
			case 'knab': {
				return <img src='./assets/iban-icons/icon-knab.svg' />;
			}
			case 'snsb': {
				return <img src='./assets/iban-icons/icon-sns.svg' />;
			}
		}
	}
}

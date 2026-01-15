import { Component, h, Host, Prop } from '@stencil/core';

import illustrations from '../../../../utils/illustrations-deprecated';

export type IllustrationDeprecatedVariant = keyof typeof illustrations;

@Component({
	tag: 'p-illustration-deprecated',
	// shadow: true,
})
export class Illustration {
	/**
	 * The icon the be displayed
	 */
	@Prop() variant!: IllustrationDeprecatedVariant;

	componentDidLoad() {
		console.warn(
			'[p-illustration-deprecated] Deprecated, please use p-illustration'
		);
	}

	render() {
		const illustration = illustrations[this.variant];

		return (
			<Host
				class='p-illustration block'
				innerHTML={illustration}
			></Host>
		);
	}
}

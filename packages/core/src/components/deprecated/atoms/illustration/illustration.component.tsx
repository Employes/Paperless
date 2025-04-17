import { Component, h, Host, Prop } from '@stencil/core';
import illustrations from '../../../../utils/illustrations';

export type IllustrationVariant = keyof typeof illustrations;

@Component({
	tag: 'p-illustration',
	// shadow: true,
})
export class Illustration {
	/**
	 * The icon the be displayed
	 */
	@Prop() variant!: IllustrationVariant;

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

import { Component, h, Host, Prop } from '@stencil/core';
import illustrations from '../../../utils/illustrations';

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

	componentWillRender() {
		const illustration = illustrations[this.variant];
		if (!illustration) {
			console.warn(
				`[p-illustration] Variant "${this.variant}" does not exist `
			);
		}
	}

	render() {
		const illustration = illustrations[this.variant];

		return (
			<Host
				class='block text-8xl'
				innerHTML={illustration}
			></Host>
		);
	}
}

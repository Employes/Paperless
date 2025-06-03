import { Component, h, Host, Prop, Element } from '@stencil/core';
import illustrations from '../../../utils/illustrations';
import { cn } from '../../../utils';

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

	/**
	 * The host element
	 */
	@Element() private _el: HTMLElement;

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
		const hasSize = [...this._el.classList.values()].some(val =>
			val.match(/['xs'|'sm'|'base'|'lg'|'xl']/)
		);

		return (
			<Host
				class={cn('block', { 'text-8xl': !hasSize })}
				innerHTML={illustration}
			></Host>
		);
	}
}

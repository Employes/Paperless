import { Component, h, Host, Prop } from '@stencil/core';

@Component({
	tag: 'p-stepper-line',
	styleUrl: 'stepper-line.component.css',
	shadow: true,
})
export class StepperLine {
	/**
	 * Wether the line is active
	 */
	@Prop({ reflect: true }) active: boolean = false;

	/**
	 * The direction of the stepper line
	 */
	@Prop({ reflect: true }) direction: 'horizontal' | 'vertical' =
		'horizontal';

	render() {
		return <Host />;
	}
}

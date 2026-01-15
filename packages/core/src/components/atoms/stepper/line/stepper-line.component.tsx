import { Component, h, Prop } from '@stencil/core';

import { ThemedHost } from '../../../../internal/themed-host.component';

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
	@Prop({ reflect: true }) direction: 'horizontal' | 'vertical' = 'horizontal';

	render() {
		return <ThemedHost />;
	}
}

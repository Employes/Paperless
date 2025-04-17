import { newSpecPage } from '@stencil/core/testing';
import { StepperLine } from '../stepper-line.component';

describe('p-stepper-line', () => {
	it('renders', async () => {
		const { root } = await newSpecPage({
			components: [StepperLine],
			html: '<p-stepper-line></p-stepper-line>',
		});
		expect(root).toEqualHtml(`
      <p-stepper-line class="p-stepper-line">
        <mock:shadow-root>
        </mock:shadow-root>
      </p-stepper-line>
    `);
	});
});

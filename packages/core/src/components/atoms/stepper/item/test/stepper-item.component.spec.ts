import { newSpecPage } from '@stencil/core/testing';
import { StepperItem } from '../stepper-item.component';

describe('p-stepper-item', () => {
	it('renders', async () => {
		const { root } = await newSpecPage({
			components: [StepperItem],
			html: '<p-stepper-item></p-stepper-item>',
		});
		expect(root).toEqualHtml(`
      <p-stepper-item class="p-stepper-item">
        <mock:shadow-root>
        </mock:shadow-root>
      </p-stepper-item>
    `);
	});
});

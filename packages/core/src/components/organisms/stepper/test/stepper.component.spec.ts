import { newSpecPage } from '@stencil/core/testing';

import { Stepper } from '../stepper.component';

describe('p-stepper', () => {
	it('renders', async () => {
		const { root } = await newSpecPage({
			components: [Stepper],
			html: '<p-stepper></p-stepper>',
		});
		expect(root).toEqualHtml(`
      <p-stepper class="p-stepper">
        <mock:shadow-root>
        </mock:shadow-root>
      </p-stepper>
    `);
	});
});
